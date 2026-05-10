import json
<<<<<<< Updated upstream
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

=======
import os
import re
import sys
import time
import unicodedata

import requests
import streamlit as st

BASE_DIR = os.path.dirname(__file__)
SRC_DIR = os.path.join(BASE_DIR, "src")
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

from pdf import cargaArchivos, list_pdfs, delete_document, dataDir
from query import queryEmb
from generador import generar_preguntas, evaluar_respuesta

STATS_FILE = os.path.join(BASE_DIR, "session_stats.json")


def _normalize(text: str) -> str:
    normalized = unicodedata.normalize("NFD", text)
    return "".join(c for c in normalized if unicodedata.category(c) != "Mn").lower()


def _parse_request(message: str):
    normalized = _normalize(message)

    dificultad = "media"
    if "dificil" in normalized:
        dificultad = "dificil"
    elif "facil" in normalized:
        dificultad = "facil"

    tipo_eval = "abierta"
    if "opcion" in normalized and "multiple" in normalized:
        tipo_eval = "opcion_multiple"
    elif "mixto" in normalized or "mixta" in normalized:
        tipo_eval = "mixto"
    elif "abierta" in normalized:
        tipo_eval = "abierta"

    cantidad = 5
    number_match = re.search(r"(\d+)", normalized)
    if number_match:
        cantidad = max(1, min(20, int(number_match.group(1))))

    tema = ""
    for key in ["tema", "sobre", "de"]:
        match = re.search(rf"{key}\s+([a-z0-9\s_-]+)", normalized)
        if match:
            tema = match.group(1).strip()
            break

    if tema:
        stop_words = {
            "pregunta", "preguntas", "dificil", "facil", "media",
            "opcion", "multiple", "mixto", "abierta", "abiertas",
            "dificultad", "evaluacion", "evaluar"
        }
        tokens = [t for t in tema.split() if t not in stop_words]
        tema = " ".join(tokens).strip()

    return {
        "tema": tema or "general",
        "dificultad": dificultad,
        "tipo_eval": tipo_eval,
        "cantidad": cantidad
    }


def _parse_request_with_flags(message: str):
    normalized = _normalize(message)
    flags = {"tema": False, "dificultad": False, "tipo_eval": False, "cantidad": False}

    dificultad = "media"
    if "dificil" in normalized:
        dificultad = "dificil"
        flags["dificultad"] = True
    elif "facil" in normalized:
        dificultad = "facil"
        flags["dificultad"] = True
    elif "media" in normalized:
        flags["dificultad"] = True

    tipo_eval = "abierta"
    if "opcion" in normalized and "multiple" in normalized:
        tipo_eval = "opcion_multiple"
        flags["tipo_eval"] = True
    elif "mixto" in normalized or "mixta" in normalized:
        tipo_eval = "mixto"
        flags["tipo_eval"] = True
    elif "abierta" in normalized:
        flags["tipo_eval"] = True

    cantidad = 5
    number_match = re.search(r"(\d+)", normalized)
    if number_match:
        cantidad = max(1, min(20, int(number_match.group(1))))
        flags["cantidad"] = True

    tema = ""
    for key in ["tema", "sobre", "de"]:
        match = re.search(rf"{key}\s+([a-z0-9\s_-]+)", normalized)
        if match:
            tema = match.group(1).strip()
            flags["tema"] = True
            break

    if tema:
        stop_words = {
            "pregunta", "preguntas", "dificil", "facil", "media",
            "opcion", "multiple", "mixto", "abierta", "abiertas",
            "dificultad", "evaluacion", "evaluar"
        }
        tokens = [t for t in tema.split() if t not in stop_words]
        tema = " ".join(tokens).strip()

    return {
        "tema": tema or "general",
        "dificultad": dificultad,
        "tipo_eval": tipo_eval,
        "cantidad": cantidad
    }, flags


def _is_eval_intent(message: str) -> bool:
    normalized = _normalize(message)
    keywords = [
        "pregunta", "preguntas", "evaluacion", "evaluar",
        "dificil", "facil", "media", "opcion", "multiple", "mixto"
    ]
    if re.search(r"\d+", normalized):
        return True
    return any(k in normalized for k in keywords)


def _detect_wants_eval(message: str) -> bool:
    normalized = _normalize(message)
    keywords = ["estudiar", "evaluacion", "evaluar", "preguntas", "examen", "quiz"]
    return any(k in normalized for k in keywords)


def _is_greeting(message: str) -> bool:
    normalized = _normalize(message).strip()
    greetings = {
        "hola", "buenas", "buenos dias", "buenas tardes", "buenas noches",
        "hello", "hi", "hey", "saludos"
    }
    return normalized in greetings


def _next_missing_field(flags):
    order = ["tema", "cantidad", "dificultad", "tipo_eval"]
    for field in order:
        if not flags.get(field, False):
            return field
    return None


def _missing_fields(flags):
    return [k for k, v in flags.items() if not v]


def _ollama_chat(messages):
    try:
        response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": "mistral:7b-instruct",
                "messages": messages,
                "stream": False
            },
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        content = data.get("message", {}).get("content")
        if not content:
            return "No pude generar una respuesta en este momento."
        return content
    except requests.exceptions.ConnectionError:
        return "No puedo conectar con Ollama en este momento."
    except requests.exceptions.Timeout:
        return "Se agoto el tiempo de espera con Ollama."
    except requests.exceptions.HTTPError:
        return "Error HTTP al consultar Ollama."
    except ValueError:
        return "Respuesta invalida de Ollama."


def _load_stats():
    if not os.path.exists(STATS_FILE):
        return []
    with open(STATS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_stats(stats):
    with open(STATS_FILE, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2)


def _estimate_tokens(text: str) -> int:
    return max(1, len(text) // 4)


def _init_state():
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "settings" not in st.session_state:
        st.session_state.settings = {
            "tema": "general",
            "dificultad": "media",
            "tipo_eval": "abierta",
            "cantidad": 5
        }
    if "settings_flags" not in st.session_state:
        st.session_state.settings_flags = {
            "tema": False,
            "dificultad": False,
            "tipo_eval": False,
            "cantidad": False
        }
    if "wants_eval" not in st.session_state:
        st.session_state.wants_eval = False
    if "evaluation" not in st.session_state:
        st.session_state.evaluation = {
            "active": False,
            "current_question": None,
            "current_index": 0,
            "total": 0,
            "results": [],
            "start_time": None,
            "tokens": 0,
            "awaiting_answer": False
        }
    if "stats" not in st.session_state:
        st.session_state.stats = _load_stats()


_init_state()

st.title("Demo RAG - Evaluacion")

st.sidebar.header("Documentos")

uploaded_files = st.sidebar.file_uploader(
    "Subir PDFs",
    type=["pdf"],
    accept_multiple_files=True
)

if uploaded_files:
    os.makedirs(dataDir, exist_ok=True)
    for uploaded in uploaded_files:
        save_path = os.path.join(dataDir, uploaded.name)
        if os.path.exists(save_path):
            base, ext = os.path.splitext(uploaded.name)
            count = 1
            while os.path.exists(save_path):
                save_path = os.path.join(dataDir, f"{base}_{count}{ext}")
                count += 1
        with open(save_path, "wb") as f:
            f.write(uploaded.getbuffer())
    st.sidebar.success("PDFs guardados. Presiona 'Procesar PDFs'.")

if st.sidebar.button("Procesar PDFs"):
    cargaArchivos()
    st.sidebar.success("Procesamiento completado.")

st.sidebar.subheader("Listado de PDFs")
existing_pdfs = list_pdfs()
if existing_pdfs:
    selected = st.sidebar.selectbox("Selecciona para eliminar", existing_pdfs)
    if st.sidebar.button("Eliminar documento"):
        delete_document(selected)
        st.sidebar.success("Documento eliminado.")
else:
    st.sidebar.info("No hay PDFs cargados.")

tabs = st.tabs(["Chat", "Evaluacion", "Estadisticas", "Debug"])

with tabs[0]:
    st.header("Chat")
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    user_message = st.chat_input("Escribe tu mensaje")
    if user_message:
        st.session_state.messages.append({"role": "user", "content": user_message})
        st.session_state.evaluation["tokens"] += _estimate_tokens(user_message)

        eval_state = st.session_state.evaluation
        if eval_state["active"] and eval_state["awaiting_answer"]:
            evaluacion = evaluar_respuesta(eval_state["current_question"], user_message)
            evaluacion.update({
                "pregunta": eval_state["current_question"],
                "respuesta": user_message
            })
            eval_state["results"].append(evaluacion)
            eval_state["tokens"] += _estimate_tokens(user_message)
            eval_state["current_index"] += 1
            eval_state["awaiting_answer"] = False

            feedback_message = _ollama_chat([
                {
                    "role": "system",
                    "content": (
                        "Eres un evaluador educativo. Responde en una frase breve. "
                        "Si score >= 0.6 di 'Respuesta correcta'. "
                        "Si score < 0.6 di 'Respuesta incorrecta' y da una sugerencia corta."
                    )
                },
                {
                    "role": "user",
                    "content": (
                        f"Pregunta: {evaluacion['pregunta']}\n"
                        f"Respuesta usuario: {evaluacion['respuesta']}\n"
                        f"Score: {evaluacion['score']}\n"
                        f"Feedback base: {evaluacion['feedback']}"
                    )
                }
            ])

            if eval_state["current_index"] >= eval_state["total"]:
                eval_state["active"] = False
                duration = time.time() - eval_state["start_time"]
                st.session_state.stats.append({
                    "tokens": eval_state["tokens"],
                    "duration": round(duration, 2)
                })
                _save_stats(st.session_state.stats)

                scores = [r["score"] for r in eval_state["results"]]
                total_score = sum(scores)
                avg_score = total_score / len(scores)
                debiles = [r for r in eval_state["results"] if r["score"] < 0.6]
                fragments = "\n\n".join(
                    [f"Documento: {r['documento']}\nFragmento: {r['fragmento']}" for r in debiles]
                )
                final_feedback = _ollama_chat([
                    {
                        "role": "system",
                        "content": (
                            "Eres un tutor. Resume debilidades y sugiere que reforzar en 3-5 lineas. "
                            "Usa los fragmentos como evidencia."
                        )
                    },
                    {
                        "role": "user",
                        "content": (
                            f"Puntaje total: {round(total_score, 2)}\n"
                            f"Promedio: {round(avg_score, 2)}\n"
                            f"Fragmentos debiles:\n{fragments}"
                        )
                    }
                ])
                response_text = (
                    f"{feedback_message}\n\n"
                    f"Puntaje final: {round(total_score, 2)} (Promedio: {round(avg_score, 2)})\n"
                    f"Retroalimentacion final:\n{final_feedback}"
                )
            else:
                resultados = queryEmb(st.session_state.settings["tema"])
                chunks = [r["texto"] for r in resultados]
                pregunta = generar_preguntas(
                    chunks,
                    tema=st.session_state.settings["tema"],
                    dificultad=st.session_state.settings["dificultad"],
                    tipo_eval=st.session_state.settings["tipo_eval"],
                    cantidad=1
                )
                eval_state["current_question"] = pregunta
                eval_state["awaiting_answer"] = True
                response_text = (
                    f"{feedback_message}\n\n"
                    f"Pregunta {eval_state['current_index'] + 1}:\n{pregunta}"
                )
        else:
            parsed, flags = _parse_request_with_flags(user_message)
            if _is_greeting(user_message):
                st.session_state.wants_eval = True
                next_field = _next_missing_field(st.session_state.settings_flags)
                response_text = _ollama_chat([
                    {
                        "role": "system",
                        "content": (
                            "Eres un tutor conversacional. Responde saludo y pide solo un dato faltante "
                            "para iniciar evaluacion. Se breve."
                        )
                    },
                    {
                        "role": "user",
                        "content": f"El dato faltante actual es: {next_field}."
                    }
                ])
            elif st.session_state.wants_eval or _detect_wants_eval(user_message) or _is_eval_intent(user_message) or any(flags.values()):
                st.session_state.wants_eval = True
                st.session_state.settings.update(parsed)
                for key, value in flags.items():
                    if value:
                        st.session_state.settings_flags[key] = True

                missing = _missing_fields(st.session_state.settings_flags)
                if missing:
                    next_field = _next_missing_field(st.session_state.settings_flags)
                    response_text = _ollama_chat([
                        {
                            "role": "system",
                            "content": (
                                "Eres un tutor. Pide la informacion faltante de forma breve y amigable. "
                                "Pregunta solo por un campo faltante en este orden: tema, cantidad, dificultad, tipo_eval."
                            )
                        },
                        {
                            "role": "user",
                            "content": (
                                f"Mensaje usuario: {user_message}\n"
                                f"Campos faltantes: {', '.join(missing)}\n"
                                f"Siguiente campo a pedir: {next_field}"
                            )
                        }
                    ])
                else:
                    resultados = queryEmb(st.session_state.settings["tema"])
                    if not resultados:
                        response_text = "No encontre informacion relacionada en los documentos para ese tema."
                    else:
                        eval_state.update({
                            "active": True,
                            "current_question": None,
                            "current_index": 0,
                            "total": st.session_state.settings["cantidad"],
                            "results": [],
                            "start_time": time.time(),
                            "tokens": 0,
                            "awaiting_answer": False
                        })
                        chunks = [r["texto"] for r in resultados]
                        pregunta = generar_preguntas(
                            chunks,
                            tema=st.session_state.settings["tema"],
                            dificultad=st.session_state.settings["dificultad"],
                            tipo_eval=st.session_state.settings["tipo_eval"],
                            cantidad=1
                        )
                        eval_state["current_question"] = pregunta
                        eval_state["awaiting_answer"] = True
                        st.session_state.wants_eval = False
                        st.session_state.settings_flags = {
                            "tema": False,
                            "dificultad": False,
                            "tipo_eval": False,
                            "cantidad": False
                        }
                        response_text = (
                            "Evaluacion iniciada:\n\n"
                            f"Pregunta 1:\n{pregunta}"
                        )
            else:
                resultados = queryEmb(user_message)
                context = resultados[0]["texto"] if resultados else ""
                response_text = _ollama_chat([
                    {
                        "role": "system",
                        "content": (
                            "Eres un asistente educativo. Responde en espanol de forma clara y breve. "
                            "Usa el contexto si esta disponible."
                        )
                    },
                    {
                        "role": "user",
                        "content": (
                            f"Contexto:\n{context}\n\n"
                            f"Pregunta: {user_message}"
                        )
                    }
                ])

        st.session_state.messages.append({"role": "assistant", "content": response_text})
        # Force a clean rerun so the chat is rendered only from session history in correct order.
        st.rerun()

with tabs[1]:
    settings = st.session_state.settings
    st.header("Evaluacion")
    if st.button("Iniciar evaluacion"):
        resultados = queryEmb(settings["tema"])
        if not resultados:
            st.warning("No se encontraron resultados para el tema.")
        else:
            st.session_state.evaluation.update({
                "active": True,
                "current_question": None,
                "current_index": 0,
                "total": settings["cantidad"],
                "results": [],
                "start_time": time.time(),
                "tokens": 0
            })

    if st.session_state.evaluation["active"]:
        eval_state = st.session_state.evaluation
        if eval_state["current_question"] is None:
            resultados = queryEmb(settings["tema"])
            chunks = [r["texto"] for r in resultados]
            pregunta = generar_preguntas(
                chunks,
                tema=settings["tema"],
                dificultad=settings["dificultad"],
                tipo_eval=settings["tipo_eval"],
                cantidad=1
            )
            eval_state["current_question"] = pregunta
            eval_state["tokens"] += _estimate_tokens(pregunta)

        st.subheader(f"Pregunta {eval_state['current_index'] + 1} de {eval_state['total']}")
        st.write(eval_state["current_question"])
        respuesta = st.text_area("Tu respuesta", key=f"respuesta_{eval_state['current_index']}")

        if st.button("Evaluar respuesta"):
            evaluacion = evaluar_respuesta(eval_state["current_question"], respuesta)
            evaluacion.update({
                "pregunta": eval_state["current_question"],
                "respuesta": respuesta
            })
            eval_state["results"].append(evaluacion)
            eval_state["tokens"] += _estimate_tokens(respuesta)
            eval_state["current_index"] += 1
            eval_state["current_question"] = None

            if eval_state["current_index"] >= eval_state["total"]:
                eval_state["active"] = False
                duration = time.time() - eval_state["start_time"]
                st.session_state.stats.append({
                    "tokens": eval_state["tokens"],
                    "duration": round(duration, 2)
                })
                _save_stats(st.session_state.stats)

    st.subheader("Resultados")
    results = st.session_state.evaluation["results"]
    if results:
        scores = [r["score"] for r in results]
        total_score = sum(scores)
        avg_score = total_score / len(scores)
        st.metric("Puntaje total", round(total_score, 2))
        st.metric("Promedio", round(avg_score, 2))

        st.subheader("Detalle")
        for r in results:
            st.markdown(f"**Pregunta:** {r['pregunta']}")
            st.markdown(f"**Respuesta:** {r['respuesta']}")
            st.markdown(f"**Score:** {r['score']} - {r['feedback']}")
            st.markdown(f"**Documento:** {r['documento']}")
            st.markdown("---")

        st.subheader("Retroalimentacion final")
        fallos = [r for r in results if r["score"] < 0.6]
        if not fallos:
            st.success("Excelente desempeño. No hay temas por reforzar.")
        else:
            for r in fallos:
                similares = queryEmb(r["pregunta"])
                similares_docs = [s["documento"] for s in similares if s.get("documento")]
                st.markdown(
                    f"Debes reforzar: {settings['tema']} - (Documento: {r['documento']})"
                )
                st.markdown(f"Chunk relacionado: {r['fragmento']}")
                if similares_docs:
                    st.markdown(f"Temas similares en embeddings: {', '.join(similares_docs)}")
                st.markdown("---")

with tabs[2]:
    st.header("Estadisticas")
    if st.session_state.stats:
        tokens_series = [s["tokens"] for s in st.session_state.stats]
        durations = [s["duration"] for s in st.session_state.stats]
        st.line_chart(tokens_series)
        st.bar_chart(durations)
        st.metric("Promedio de tiempo", round(sum(durations) / len(durations), 2))
    else:
        st.info("Sin estadisticas aun.")

with tabs[3]:
    st.header("Debug")
    st.subheader("Parametros detectados")
    st.write(st.session_state.settings)
    st.subheader("Estado de evaluacion")
    st.json(st.session_state.evaluation)
    st.subheader("Mensajes")
    st.json(st.session_state.messages)
>>>>>>> Stashed changes
