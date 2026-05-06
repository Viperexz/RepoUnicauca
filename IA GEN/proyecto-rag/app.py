import json
import re
from datetime import datetime
from pathlib import Path
from typing import Protocol, TypeGuard

import streamlit as st

from main import ejecutar_pipeline
from src.generador import evaluar_respuesta, chat_with_model, extract_setup_from_message
from src.pdf import carga_archivos_nuevos
from src.query import query_embeddings

DATA_DIR = Path("data")
DB_DIR = Path("db")
USAGE_FILE = DB_DIR / "usage_stats.json"
MANIFEST_FILE = DB_DIR / "ingestion_manifest.json"

MAX_DISTANCE = 0.80
MIN_CONTEXTS = 1
MIN_CHUNK_CHARS = 30


class UploadedFileLike(Protocol):
    name: str

    def getbuffer(self) -> bytes:
        ...


def _default_usage() -> dict:
    return {
        "total_sessions": 0,
        "total_answers": 0,
        "total_questions": 0,
        "total_score": 0.0,
        "total_uploads": 0,
        "last_session": "",
        "session_durations": [],
        "session_tokens": [],
    }


def _load_usage() -> dict:
    if not USAGE_FILE.exists():
        return _default_usage()
    try:
        return json.loads(USAGE_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return _default_usage()


def _save_usage(data: dict) -> None:
    USAGE_FILE.parent.mkdir(parents=True, exist_ok=True)
    USAGE_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")


def _is_uploaded_file_like(value: object) -> TypeGuard[UploadedFileLike]:
    return hasattr(value, "name") and hasattr(value, "getbuffer")


def _save_uploaded_pdf(uploaded_file: UploadedFileLike) -> str:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    original_name = Path(uploaded_file.name).name
    target = DATA_DIR / original_name

    if target.exists():
        stem = target.stem
        suffix = target.suffix
        idx = 1
        while (DATA_DIR / f"{stem}_{idx}{suffix}").exists():
            idx += 1
        target = DATA_DIR / f"{stem}_{idx}{suffix}"

    target.write_bytes(uploaded_file.getbuffer())
    return target.name


def _list_current_pdfs() -> list[str]:
    if not DATA_DIR.exists():
        return []
    return sorted([p.name for p in DATA_DIR.glob("*.pdf")])


def _load_manifest_paths() -> set[str]:
    if not MANIFEST_FILE.exists():
        return set()
    try:
        manifest = json.loads(MANIFEST_FILE.read_text(encoding="utf-8"))
        files = manifest.get("files", {})
        return {Path(path).name for path in files.keys()}
    except json.JSONDecodeError:
        return set()


def _extract_topic(text: str) -> str:
    msg = text.strip()
    # Try to extract topic before common separators or keywords
    separators = [
        r"^([^,]+),\s*(?:nivel|dificultad|preguntas|cantidad)",
        r"^([^y]+)\s+y\s+(?:nivel|dificultad|preguntas|cantidad)",
    ]
    for pattern in separators:
        match = re.search(pattern, msg, flags=re.IGNORECASE)
        if match:
            return match.group(1).strip()

    patterns = [
        r"tema\s*[:\-]?\s*(.+)$",
        r"estudiar\s+(?:el\s+tema\s+)?(.+)$",
        r"necesito\s+(.+)$",
    ]
    for pattern in patterns:
        match = re.search(pattern, msg, flags=re.IGNORECASE)
        if match:
            result = match.group(1).strip(" .")
            # Remove trailing difficulty/quantity info
            result = re.sub(r",\s*(?:nivel|dificultad|preguntas|cantidad).*$", "", result, flags=re.IGNORECASE)
            return result.strip()
    return msg.strip(" .")


def _extract_question_count(text: str) -> int | None:
    # Look for patterns like "5 preguntas" or just numbers in quantity context
    patterns = [
        r"(\d{1,2})\s+preguntas?",
        r"cantidad\s*[:=]?\s*(\d{1,2})",
        r"(\d{1,2})\s+(?:preguntas|questions|q|pregs)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text, flags=re.IGNORECASE)
        if match:
            value = int(match.group(1))
            if 2 <= value <= 20:
                return value
    # Final fallback: any 1-2 digit number not preceded by certain words
    match = re.search(r"(\d{1,2})\s*(?:preguntas?)?", text, flags=re.IGNORECASE)
    if not match:
        return None
    value = int(match.group(1))
    if 2 <= value <= 20:
        return value
    return None


def _extract_difficulty(text: str) -> str | None:
    msg = text.lower()
    # First try explicit match for "nivel X"
    nivel_match = re.search(r"nivel\s+(facil|bajo|basico|media|medio|normal|intermedia|dificil|alto|avanzada|avanzado)", msg, flags=re.IGNORECASE)
    if nivel_match:
        nivel = nivel_match.group(1).lower()
        if nivel in ("facil", "bajo", "basico"):
            return "facil"
        elif nivel in ("media", "medio", "normal", "intermedia"):
            return "media"
        elif nivel in ("dificil", "alto", "avanzada", "avanzado"):
            return "dificil"

    mapping = {
        "facil": "facil",
        "basico": "facil",
        "media": "media",
        "intermedia": "media",
        "normal": "media",
        "dificil": "dificil",
        "avanzada": "dificil",
        "avanzado": "dificil",
    }
    for key, value in mapping.items():
        if key in msg:
            return value
    return None


def _infer_mode(text: str) -> str | None:
    msg = text.lower()
    if any(word in msg for word in ["evaluar", "evaluacion", "examinar", "quiz"]):
        return "evaluacion"
    if any(word in msg for word in ["generar", "solo preguntas", "solo generar", "crear preguntas"]):
        return "generacion"
    return None


def _infer_tipo_eval(text: str) -> str | None:
    msg = text.lower()
    if any(word in msg for word in ["opcion multiple", "multiple choice", "test"]):
        return "opcion_multiple"
    if any(word in msg for word in ["abierta", "abiertas", "respuesta abierta"]):
        return "preguntas_abiertas"
    return None


def _sync_setup_widgets(setup: dict) -> None:
    if st.session_state.get("last_setup_source") != "chat":
        return
    st.session_state.cfg_tema = setup.get("tema", "")
    st.session_state.cfg_cantidad = int(setup.get("cantidad") or 6)
    st.session_state.cfg_dificultad = setup.get("dificultad") or "media"
    st.session_state.cfg_modo = setup.get("mode") or "evaluacion"
    st.session_state.cfg_tipo_eval = setup.get("tipo_eval") or "mixto"
    st.session_state.last_setup_source = "synced"


def _append_message(role: str, content: str) -> None:
    st.session_state.chat_messages.append({"role": role, "content": content})


def _validate_topic_availability(tema: str, min_contexts: int = MIN_CONTEXTS) -> bool:
    """Valida que el tema tenga suficientes contextos RAG disponibles.

    Retorna True si hay contextos suficientes, False si el tema no está en la base de conocimiento.
    Si falla, limpia los contextos almacenados.
    """
    try:
        contextos = query_embeddings(tema, n_results=max(min_contexts * 2, 6), max_distance=MAX_DISTANCE)
        # Si obtenemos al menos min_contexts y tienen contenido significativo
        if len(contextos) >= min_contexts:
            valid_contexts = [c for c in contextos if c.get("text") and len(c.get("text", "")) >= MIN_CHUNK_CHARS]
            # Guarda los contextos validados en session_state para reutilizarlos
            if len(valid_contexts) >= min_contexts:
                st.session_state.contextos = valid_contexts
                return True
        # Si falla la validación, limpia contextos para evitar uso de datos anteriores
        st.session_state.contextos = []
        return False
    except Exception:
        # Si hay error, también limpia contextos
        st.session_state.contextos = []
        return False


def _start_quiz_if_ready() -> None:
    setup = st.session_state.setup
    if not (setup["tema"] and setup["cantidad"] and setup["dificultad"]):
        return

    tema_usuario = str(setup["tema"]).strip()
    result = ejecutar_pipeline(
        tema=tema_usuario,
        cantidad=int(setup["cantidad"]),
        tema_usuario=tema_usuario,
        dificultad=str(setup["dificultad"]),
        max_distance=MAX_DISTANCE,
    )

    # accumulate tokens used during generation
    gen_tokens = int(result.get("generated_tokens", 0))
    st.session_state.session_tokens = st.session_state.get("session_tokens", 0) + gen_tokens

    preguntas = result["preguntas"]
    # Validar que se generaron preguntas
    if not preguntas or len(preguntas) == 0:
        _append_message("assistant", "No se encontró información suficiente en la base de conocimiento para generar preguntas específicas sobre ese tema.")
        setup["tema"] = ""
        return

    # If evaluation mode requests a specific type, filter generated questions
    tipo_req = st.session_state.setup.get("tipo_eval", "mixto")
    if st.session_state.setup.get("mode") == "evaluacion" and tipo_req != "mixto":
        if tipo_req == "opcion_multiple":
            preguntas = [p for p in preguntas if p.get("tipo") == "opcion_multiple"]
        elif tipo_req == "preguntas_abiertas":
            preguntas = [p for p in preguntas if p.get("tipo") == "abierta"]

    # Validar que quedan preguntas después del filtro
    if not preguntas or len(preguntas) == 0:
        _append_message("assistant", f"Error: No hay preguntas del tipo '{tipo_req}' disponibles. Intenta con otro tipo.")
        return

    st.session_state.preguntas = preguntas
    st.session_state.contextos = result["contextos"]
    st.session_state.indice = 0
    st.session_state.resultados = []

    # Branch by mode: generacion shows the generated questions, evaluacion starts asking them
    mode = st.session_state.setup.get("mode", "evaluacion")
    if mode == "generacion":
        st.session_state.chat_mode = "show_generated"
        # present generated questions as a list
        lista = "\n\n".join([f"{i+1}. {q.get('pregunta','')}" for i, q in enumerate(st.session_state.preguntas)])
        _append_message("assistant", f"Generé las preguntas solicitadas:\n\n{lista}")
        return

    st.session_state.chat_mode = "quiz"

    st.session_state.usage["total_sessions"] += 1
    st.session_state.usage["total_questions"] += len(st.session_state.preguntas)
    st.session_state.usage["last_session"] = datetime.now().isoformat(timespec="seconds")
    _save_usage(st.session_state.usage)

    if st.session_state.preguntas and len(st.session_state.preguntas) > 0:
        primera_pregunta = st.session_state.preguntas[0]
        primera_formateada = _format_question_display(primera_pregunta)
        msg_inicio = f"✅ **Iniciando evaluación**\n\n**Pregunta 1/{len(st.session_state.preguntas)}:**\n\n{primera_formateada}"
        _append_message("assistant", msg_inicio)
    else:
        _append_message("assistant", "Error al iniciar la sesión de preguntas.")


def _process_setup_message(user_text: str) -> None:
    setup = st.session_state.setup
    _append_message("user", user_text)

    # Use LLM to intelligently extract parameters from user message
    contextos = st.session_state.contextos if st.session_state.contextos else None
    extracted = extract_setup_from_message(user_text, contextos=contextos)

    # Fallback con regex/heuristicas si el LLM no encuentra algo
    extracted.setdefault("tema", None)
    extracted.setdefault("cantidad", None)
    extracted.setdefault("dificultad", None)
    extracted.setdefault("modo", None)
    extracted.setdefault("tipo_eval", None)

    if not extracted.get("tema"):
        extracted["tema"] = _extract_topic(user_text)
    if not extracted.get("cantidad"):
        extracted["cantidad"] = _extract_question_count(user_text)
    if not extracted.get("dificultad"):
        extracted["dificultad"] = _extract_difficulty(user_text)
    if not extracted.get("modo"):
        extracted["modo"] = _infer_mode(user_text)
    if not extracted.get("tipo_eval"):
        extracted["tipo_eval"] = _infer_tipo_eval(user_text)

    # Update setup with extracted values (keep existing if not found in this message)
    if extracted.get("tema"):
        setup["tema"] = extracted["tema"]
    if extracted.get("cantidad"):
        setup["cantidad"] = extracted["cantidad"]
    if extracted.get("dificultad"):
        setup["dificultad"] = extracted["dificultad"]
    if extracted.get("modo"):
        setup["mode"] = extracted["modo"]
    if extracted.get("tipo_eval"):
        setup["tipo_eval"] = extracted["tipo_eval"]

    st.session_state.last_setup_source = "chat"

    # If we now have all required params, start quiz
    if setup["tema"] and setup["cantidad"] and setup["dificultad"]:
        # Validar que el tema esté disponible en la base de conocimiento
        if not _validate_topic_availability(str(setup["tema"])):
            msg_error = f"El tema '{setup['tema']}' no tiene suficiente información en la base de conocimiento. Por favor, elige otro tema o carga PDFs relacionados."
            _append_message("assistant", msg_error)
            # Reset tema para que pueda intentar otro
            setup["tema"] = ""
            return

        _start_quiz_if_ready()
        return

    # Use LLM to ask what's missing using RAG for context
    missing = []
    if not setup["tema"]:
        missing.append("tema")
    if not setup["cantidad"]:
        missing.append("numero de preguntas")
    if not setup["dificultad"]:
        missing.append("dificultad")

    if missing:
        missing_str = ", ".join(missing)
        prompt_ask = f"El usuario dijo: '{user_text}'. Me falta: {missing_str} para generar preguntas. Por favor, pide de forma amable la información que falta."
        assistant_reply, tok = chat_with_model(prompt_ask, contextos=contextos)
        st.session_state.session_tokens = st.session_state.get("session_tokens", 0) + int(tok)
        _append_message("assistant", assistant_reply)


def _format_question_display(pregunta: dict) -> str:
    """Formatea una pregunta para mostrar en el chat, incluyendo opciones si existen."""
    tipo = pregunta.get("tipo", "abierta")
    pregunta_texto = pregunta.get("pregunta", "")
    opciones = pregunta.get("opciones", [])

    if tipo == "opcion_multiple" and opciones:
        opciones_str = "\n".join([f"  {opt}" for opt in opciones])
        return f"{pregunta_texto}\n\n{opciones_str}"
    return pregunta_texto


def _process_quiz_message(user_text: str) -> None:
    _append_message("user", user_text)
    idx = st.session_state.indice
    preguntas = st.session_state.preguntas
    if idx >= len(preguntas):
        return

    pregunta_actual = preguntas[idx]
    evaluacion = evaluar_respuesta(pregunta_actual, user_text)
    st.session_state.resultados.append(
        {"pregunta": pregunta_actual, "respuesta": user_text, "evaluacion": evaluacion}
    )
    st.session_state.indice += 1
    st.session_state.usage["total_answers"] += 1
    st.session_state.usage["total_score"] += float(evaluacion.get("score", 0.0))
    # add tokens used by evaluation if provided
    st.session_state.session_tokens = st.session_state.get("session_tokens", 0) + int(evaluacion.get("tokens", 0))
    _save_usage(st.session_state.usage)

    score_pct = int(evaluacion.get("score", 0) * 100)
    emoji_score = "🎉" if evaluacion.get("correcta") else "📝"
    feedback = evaluacion.get("feedback", "Respuesta evaluada.")
    _append_message("assistant", f"{emoji_score} **Puntaje: {score_pct}%**\n\n{feedback}")

    # Muestra un fragmento relacionado a la pregunta actual
    fragmento = evaluacion.get("fragmento") or pregunta_actual.get("chunk_ref", "")
    fuente = evaluacion.get("fuente") or pregunta_actual.get("chunk_source", "")
    if fragmento:
        fuente_label = f" ({fuente})" if fuente else ""
        preview = fragmento[:300].strip() + ("..." if len(fragmento) > 300 else "")
        _append_message("assistant", f"📌 **Fragmento relacionado{fuente_label}:**\n> {preview}")

    if st.session_state.indice < len(preguntas) and len(preguntas) > st.session_state.indice:
        siguiente = preguntas[st.session_state.indice]
        siguiente_formateada = _format_question_display(siguiente)
        num_actual = st.session_state.indice + 1
        num_total = len(preguntas)
        _append_message("assistant", f"**Pregunta {num_actual}/{num_total}:**\n\n{siguiente_formateada}")
        return

    # finalize session: compute duration and persist tokens/duration
    st.session_state.chat_mode = "done"
    resultados = st.session_state.resultados
    promedio = sum(r["evaluacion"]["score"] for r in resultados) / max(len(resultados), 1)

    temas = {}
    for r in resultados:
        tema = r["evaluacion"].get("tema", "tema_general")
        temas.setdefault(tema, []).append(float(r["evaluacion"].get("score", 0.0)))

    if not temas:
        _append_message("assistant", "Error: No hay resultados para procesar.")
        return

    tema_mas_debil = min(temas.items(), key=lambda kv: sum(kv[1]) / len(kv[1]))[0]
    promedio_tema_debil = sum(temas[tema_mas_debil]) / len(temas[tema_mas_debil])

    # Buscar fragmentos directamente asociados a preguntas del tema más débil
    relacionados = []
    for r in resultados:
        if r["evaluacion"].get("tema") != tema_mas_debil:
            continue
        pregunta = r.get("pregunta", {})
        chunk = pregunta.get("chunk_ref", "")
        fuente = pregunta.get("chunk_source", "")
        if chunk and chunk.strip():
            relacionados.append({"text": chunk, "source": fuente})

    # Si no hay fragmentos asociados, usa contextos actuales
    if not relacionados and st.session_state.contextos:
        relacionados = [
            {"text": c.get("text", ""), "source": (c.get("metadata") or {}).get("source", "")}
            for c in st.session_state.contextos
            if c.get("text", "").strip()
        ][:3]

    # record session duration and tokens in usage
    start = st.session_state.get("session_start")
    if start:
        try:
            start_dt = datetime.fromisoformat(start)
            dur = (datetime.now() - start_dt).total_seconds()
        except Exception:
            dur = 0.0
    else:
        dur = 0.0

    usage = st.session_state.usage
    usage.setdefault("session_durations", []).append(dur)
    usage.setdefault("session_tokens", []).append(int(st.session_state.get("session_tokens", 0)))
    _save_usage(usage)

    # Resumen final
    resumen_msg = f"""
🎓 **Sesión completada**

📊 **Resultados:**
- **Puntaje final:** {promedio:.1%}
- **Tema más débil:** {tema_mas_debil} ({promedio_tema_debil:.1%})
- **Tiempo de sesión:** {int(dur)}s
- **Preguntas respondidas:** {len(resultados)}
"""
    _append_message("assistant", resumen_msg.strip())

    # Mostrar fragmentos recomendados para estudio (alineados a preguntas)
    if relacionados:
        estudio_msg = f"📚 **Recomendaciones de estudio para reforzar '{tema_mas_debil}':**\n\n"
        for i, ctx in enumerate(relacionados[:3], start=1):
            texto_preview = ctx.get("text", "")[:300].strip() + ("..." if len(ctx.get("text", "")) > 300 else "")
            fuente = ctx.get("source", "Material")
            fuente_label = f" ({fuente})" if fuente else ""
            estudio_msg += f"**Fragmento {i}**{fuente_label}:\n> {texto_preview}\n\n"
        _append_message("assistant", estudio_msg.strip())
    else:
        _append_message("assistant", "📚 No hay fragmentos disponibles para refuerzo en este momento.")


st.set_page_config(page_title="Tutor RAG", page_icon="📚", layout="wide")

# Encabezado mejorado
st.markdown("""
<style>
    [data-testid="stHeader"] {background-color: #1e3a8a;}
    .main {background-color: #f8fafc;}
    .stTabs [data-baseweb="tab-list"] button [data-testid="stMarkdownContainer"] p {font-size: 1.1rem; font-weight: 600;}
</style>
""", unsafe_allow_html=True)

col1, col2 = st.columns([4, 1])
with col1:
    st.markdown("# 📚 Tutor RAG - Sistema Inteligente de Evaluación")
with col2:
    st.markdown(f"<div style='text-align:right; margin-top:5px;'><span style='font-size:0.8rem; color:#666;'>v1.0</span></div>", unsafe_allow_html=True)

st.markdown("Aprende con preguntas generadas por IA basadas en tus documentos. **Carga PDFs → Configura sesión → Responde preguntas → Recibe retroalimentación.**")
st.divider()

if "usage" not in st.session_state:
    st.session_state.usage = _load_usage()
    st.session_state.uploaded_names = []
    st.session_state.preguntas = []
    st.session_state.contextos = []
    st.session_state.indice = 0
    st.session_state.resultados = []
    st.session_state.chat_mode = "setup"
    st.session_state.setup = {"tema": "", "cantidad": 0, "dificultad": "", "mode": "evaluacion", "tipo_eval": "mixto"}
    st.session_state.chat_messages = [
        {
            "role": "assistant",
            "content": "Hola. Para comenzar, dime el tema que deseas estudiar. Ejemplo: Necesito estudiar el tema API.",
        }
    ]
    st.session_state.session_tokens = 0
    st.session_state.last_setup_source = "init"
    st.session_state.cfg_tema = ""
    st.session_state.cfg_cantidad = 6
    st.session_state.cfg_dificultad = "media"
    st.session_state.cfg_modo = "evaluacion"
    st.session_state.cfg_tipo_eval = "mixto"

tab_carga, tab_chat, tab_stats = st.tabs(["PDF", "Chat", "Estadisticas"])

with tab_carga:
    st.subheader("📚 Base de conocimiento (PDFs)")
    st.markdown("Carga tus documentos aquí para generar preguntas basadas en su contenido.")
    st.divider()

    col_upload, col_inventory = st.columns([1, 1])

    with col_upload:
        st.markdown("**📤 Subir nuevos archivos**")
        files_to_upload = st.file_uploader(
            "Selecciona uno o varios PDFs",
            type=["pdf"],
            accept_multiple_files=True,
        )
        if st.button("✅ Guardar y procesar", key="btn_upload_pdf", use_container_width=True):
            if not files_to_upload:
                st.warning("⚠️ No seleccionaste archivos.")
            else:
                with st.spinner("Procesando archivos..."):
                    guardados = []
                    for f in files_to_upload:
                        if _is_uploaded_file_like(f):
                            guardados.append(_save_uploaded_pdf(f))
                    st.session_state.uploaded_names.extend(guardados)
                    st.session_state.usage["total_uploads"] += len(guardados)
                    _save_usage(st.session_state.usage)
                    result = carga_archivos_nuevos()
                    st.success(f"✅ {len(guardados)} archivo(s) guardado(s) e indexado(s)")
                    with st.expander("📊 Detalles de indexación", expanded=False):
                        st.json(result)

    with col_inventory:
        st.markdown("**📋 PDFs actuales en base de datos**")
        pdfs = _list_current_pdfs()
        indexed = _load_manifest_paths()
        st.metric("Total PDFs indexados", len(pdfs))
        if pdfs:
            rows = []
            for name in pdfs:
                status = "✅ Indexado" if name in indexed else "⏳ Pendiente"
                rows.append({"Archivo": name, "Estado": status})
            st.dataframe(rows, use_container_width=True, hide_index=True)
        else:
            st.info("📭 No hay PDFs cargados aún. Sube uno para comenzar.")

        if st.session_state.uploaded_names:
            st.markdown("**Últimos archivos subidos:**")
            for name in st.session_state.uploaded_names[-5:]:
                st.caption(f"✓ {name}")
    st.divider()

with tab_chat:
    st.subheader("💬 Centro de aprendizaje interactivo")

    with st.expander("⚙️ Configuración de sesión", expanded=True):
        st.markdown("**Define los parámetros de tu sesión de estudio:**")
        _sync_setup_widgets(st.session_state.setup)
        c1, c2, c3 = st.columns([2, 1.5, 1.5])
        with c1:
            tema_input = st.text_input(
                "🎯 Tema a estudiar",
                value=st.session_state.cfg_tema,
                placeholder="Ej: Programación en Python, Termodinámica, etc.",
                key="cfg_tema",
            )
        with c2:
            cantidad_input = st.number_input(
                "📝 # preguntas",
                min_value=2,
                max_value=20,
                value=int(st.session_state.cfg_cantidad or 6),
                key="cfg_cantidad",
            )
        with c3:
            dificultad_input = st.selectbox(
                "🔥 Dificultad",
                options=["facil", "media", "dificil"],
                format_func=lambda x: {"facil": "🟢 Fácil", "media": "🟡 Media", "dificil": "🔴 Difícil"}[x],
                index={"facil": 0, "media": 1, "dificil": 2}.get(str(st.session_state.cfg_dificultad or "media"), 1),
                key="cfg_dificultad",
            )

        colm1, colm2, colm3 = st.columns([1.5, 1.5, 1])
        with colm1:
            modo = st.selectbox(
                "🎓 Modo",
                options=["evaluacion", "generacion"],
                format_func=lambda x: "✅ Evaluación (preguntas + calificación)" if x == "evaluacion" else "📄 Generación (solo preguntas)",
                index={"evaluacion": 0, "generacion": 1}.get(str(st.session_state.cfg_modo or "evaluacion"), 0),
                key="cfg_modo",
            )
        with colm2:
            tipo_eval = st.selectbox(
                "📋 Tipo de preguntas",
                options=["opcion_multiple", "preguntas_abiertas", "mixto"],
                format_func=lambda x: {
                    "opcion_multiple": "📌 Opción múltiple",
                    "preguntas_abiertas": "✍️ Preguntas abiertas",
                    "mixto": "🔀 Mixto",
                }[x],
                index={
                    "opcion_multiple": 0,
                    "preguntas_abiertas": 1,
                    "mixto": 2,
                }.get(str(st.session_state.cfg_tipo_eval or "mixto"), 2),
                key="cfg_tipo_eval",
            )
        with colm3:
            if st.button("🚀 Iniciar", use_container_width=True):
                # Validar que el tema esté disponible ANTES de cualquier cosa
                tema_a_validar = str(tema_input).strip()
                if not tema_a_validar:
                    st.error("❌ Por favor, especifica un tema.")
                elif not _validate_topic_availability(tema_a_validar):
                    st.error(f"❌ El tema '{tema_a_validar}' no tiene suficiente información en la base de conocimiento.\n\nCarga PDFs relacionados o elige otro tema.")
                else:
                    # Tema válido, proceder con configuración
                    st.session_state.setup["tema"] = tema_a_validar
                    st.session_state.setup["cantidad"] = int(cantidad_input or 6)
                    st.session_state.setup["dificultad"] = dificultad_input
                    st.session_state.setup["mode"] = modo
                    st.session_state.setup["tipo_eval"] = tipo_eval
                    st.session_state.session_start = datetime.now().isoformat(timespec="seconds")
                    st.session_state.session_tokens = 0
                    st.session_state.last_setup_source = "ui"
                    _start_quiz_if_ready()
        st.divider()

    for message in st.session_state.chat_messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    user_input = st.chat_input("Escribe aqui tu mensaje...")
    input_text = str(user_input).strip() if user_input else ""
    if input_text:
        if st.session_state.chat_mode == "setup":
            _process_setup_message(input_text)
        elif st.session_state.chat_mode == "quiz":
            _process_quiz_message(input_text)
        else:
            _append_message(
                "user",
                input_text,
            )
            _append_message(
                "assistant",
                "Si quieres una nueva sesion escribe: reiniciar.",
            )
            if input_text.lower() == "reiniciar":
                st.session_state.chat_mode = "setup"
                st.session_state.setup = {
                    "tema": "",
                    "cantidad": 0,
                    "dificultad": "",
                    "mode": "evaluacion",
                    "tipo_eval": "mixto",
                }
                st.session_state.preguntas = []
                st.session_state.contextos = []
                st.session_state.indice = 0
                st.session_state.resultados = []
                st.session_state.last_setup_source = "init"
                st.session_state.cfg_tema = ""
                st.session_state.cfg_cantidad = 6
                st.session_state.cfg_dificultad = "media"
                st.session_state.cfg_modo = "evaluacion"
                st.session_state.cfg_tipo_eval = "mixto"
                _append_message(
                    "assistant",
                    "Sesion reiniciada. Dime el nuevo tema de estudio.",
                )
        st.rerun()

with tab_stats:
    st.subheader("📊 Estadísticas de desempeño")
    st.markdown("Seguimiento de tu progreso en todas las sesiones.")
    st.divider()

    usage = st.session_state.usage
    total_answers = int(usage.get("total_answers", 0))
    average = (float(usage.get("total_score", 0.0)) / total_answers) if total_answers else 0.0

    # Métricas principales
    col_m1, col_m2, col_m3, col_m4 = st.columns(4)
    col_m1.metric("🎓 Sesiones totales", int(usage.get("total_sessions", 0)))
    col_m2.metric("❓ Preguntas generadas", int(usage.get("total_questions", 0)))
    col_m3.metric("📝 Respuestas registradas", total_answers)
    col_m4.metric("⭐ Promedio global", f"{average:.1%}")

    st.caption(f"📅 Última sesión: {usage.get('last_session') or 'Sin registros'}")
    st.divider()

    # Gráficas de tokens y duración
    session_tokens = usage.get("session_tokens", [])
    session_durations = usage.get("session_durations", [])

    if session_tokens or session_durations:
        col_graph1, col_graph2 = st.columns(2)

        with col_graph1:
            if session_tokens:
                st.markdown("**📈 Tokens por sesión (estimado)**")
                try:
                    import pandas as pd
                    df_tokens = pd.DataFrame({"Sesión": range(1, len(session_tokens) + 1), "Tokens": session_tokens})
                    st.bar_chart(df_tokens.set_index("Sesión"))
                except Exception:
                    st.write(session_tokens)

        with col_graph2:
            if session_durations:
                st.markdown("**⏱️ Duración de sesiones (segundos)**")
                try:
                    import pandas as pd
                    df_dur = pd.DataFrame({"Sesión": range(1, len(session_durations) + 1), "Duración": [int(d) for d in session_durations]})
                    st.line_chart(df_dur.set_index("Sesión"))
                except Exception:
                    st.write([int(d) for d in session_durations])

        st.divider()

    # Desempeño por tema in sesión actual
    if st.session_state.resultados:
        st.markdown("**🎯 Desempeño por tema (sesión actual)**")
        topics = {}
        for item in st.session_state.resultados:
            topic = item["evaluacion"].get("tema", "tema_general")
            topics.setdefault(topic, []).append(float(item["evaluacion"].get("score", 0.0)))
        table = [
            {
                "📌 Tema": topic,
                "⭐ Promedio": f"{round(sum(scores) / len(scores), 1)}%",
                "🎯 Respuestas": len(scores),
                "💯 Mejor": f"{max(scores):.1%}",
                "📉 Peor": f"{min(scores):.1%}",
            }
            for topic, scores in topics.items()
        ]
        st.dataframe(table, use_container_width=True, hide_index=True)
    else:
        st.info("📭 No hay respuestas en sesiones actuales. ¡Inicia una para ver estadísticas!")

