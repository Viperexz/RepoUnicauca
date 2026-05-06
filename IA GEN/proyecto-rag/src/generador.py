import requests
import json
from collections import Counter

import requests

OLLAMA_URL = "http://localhost:11434/api/chat"
DEFAULT_MODEL = "mistral:7b-instruct"


def _chat_ollama(prompt: str, model: str = DEFAULT_MODEL) -> str:
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "stream": False,
        },
        timeout=90,
    )
    response.raise_for_status()
    return response.json()["message"]["content"]


def extract_setup_from_message(user_message: str, contextos: list[dict] | None = None, model: str = DEFAULT_MODEL) -> dict:
    """Usa el modelo LLM para extraer parámetros (tema, cantidad, dificultad, modo, tipo_eval) del mensaje del usuario.

    Retorna un dict con las claves extraídas; si falta alguna, la deja como None.
    """
    context_text = ""
    if contextos:
        context_text = _contexto_para_prompt(contextos[:2])

    prompt = f"""Eres un asistente que extrae información de mensajes del usuario.
El usuario ha escrito: "{user_message}"

Extrae y devuelve SOLO un JSON con estas claves:
- "tema": el tema a estudiar (string, obligatorio).
- "cantidad": número de preguntas deseadas (integer 2-20, opcional).
- "dificultad": nivel de dificultad (string: "facil", "media" o "dificil", opcional).
- "modo": tipo de sesión (string: "evaluacion" o "generacion", opcional, default "evaluacion").
- "tipo_eval": tipo de preguntas si modo es evaluacion (string: "opcion_multiple", "preguntas_abiertas" o "mixto", opcional, default "mixto").

Si falta información, deja el valor como null.
Responde SOLO con el JSON, sin texto adicional.

Contextos disponibles:
{context_text if context_text else "No hay contextos."}
"""

    try:
        raw = _chat_ollama(prompt, model=model)
        result = json.loads(raw)
        return {
            "tema": result.get("tema"),
            "cantidad": result.get("cantidad"),
            "dificultad": result.get("dificultad"),
            "modo": result.get("modo", "evaluacion"),
            "tipo_eval": result.get("tipo_eval", "mixto"),
        }
    except Exception:
        # Fallback: retorna dict vacío para que el usuario envíe más datos
        return {
            "tema": None,
            "cantidad": None,
            "dificultad": None,
            "modo": "evaluacion",
            "tipo_eval": "mixto",
        }


def _contexto_para_prompt(contextos: list[dict]) -> str:
    partes = []
    for i, ctx in enumerate(contextos, start=1):
        tema = (ctx.get("metadata") or {}).get("source", "tema_general")
        texto = ctx.get("text", "")
        partes.append(f"[Chunk {i} | Tema: {tema}]\n{texto}")
    return "\n\n".join(partes)


def _fallback_questions(contextos: list[dict], cantidad: int) -> list[dict]:
    preguntas = []
    for i in range(cantidad):
        ctx = contextos[i % len(contextos)] if contextos else {"text": "", "metadata": {}}
        tema = (ctx.get("metadata") or {}).get("source", "tema_general")
        tipo = "abierta" if i % 2 == 0 else "opcion_multiple"
        if tipo == "abierta":
            preguntas.append(
                {
                    "id": f"q{i+1}",
                    "tipo": tipo,
                    "tema": tema,
                    "pregunta": "Resume una idea clave del fragmento proporcionado.",
                    "opciones": [],
                    "respuesta_esperada": "Debe basarse en el fragmento y ser coherente.",
                    "chunk_ref": ctx.get("text", "")[:600],
                }
            )
        else:
            preguntas.append(
                {
                    "id": f"q{i+1}",
                    "tipo": tipo,
                    "tema": tema,
                    "pregunta": "Selecciona la opción que mejor corresponda al fragmento.",
                    "opciones": ["A) Opcion 1", "B) Opcion 2", "C) Opcion 3", "D) Opcion 4"],
                    "respuesta_esperada": "A",
                    "chunk_ref": ctx.get("text", "")[:600],
                }
            )
    return preguntas


def generar_preguntas(
    contextos: list[dict],
    cantidad: int = 6,
    tema_usuario: str = "",
    dificultad: str = "",
    model: str = DEFAULT_MODEL,
) -> tuple[list[dict], int]:
    """Genera preguntas mixtas (abiertas y opcion multiple) en JSON."""
    if cantidad < 1 or not contextos:
        return [], 0

    contexto = _contexto_para_prompt(contextos)
    dificultad_str = f"Nivel de dificultad: {dificultad}." if dificultad else ""
    prompt = f"""
Eres un docente universitario. Con base SOLO en los chunks, genera {cantidad} preguntas de estudio en espanol.
Reglas:
- Mezcla ambos tipos: "abierta" y "opcion_multiple".
- Devuelve SOLO JSON valido (lista), sin texto adicional.
- Cada elemento debe tener: id, tipo, tema, pregunta, opciones, respuesta_esperada, chunk_ref.
- Para "opcion_multiple", usa exactamente 4 opciones (A-D) y en respuesta_esperada pon solo la letra correcta.
- Para "abierta", opciones debe ser [] y respuesta_esperada un criterio corto de evaluacion.
- chunk_ref debe ser un fragmento textual breve del chunk usado.
- Si los chunks no contienen informacion suficiente, devuelve una lista vacia [].

Tema solicitado: {tema_usuario or "(no especificado)"}.
{dificultad_str}

Chunks:
{contexto}
""".strip()

    try:
        raw = _chat_ollama(prompt, model=model)
        preguntas = json.loads(raw)
        if not isinstance(preguntas, list):
            raise ValueError("El modelo no devolvio una lista")
        tokens_est = len(prompt.split()) + len(raw.split())
        preguntas_final = preguntas[:cantidad]
        for i, p in enumerate(preguntas_final):
            if tema_usuario:
                p["tema"] = tema_usuario
            # Completa chunk_ref si falta usando contexto disponible
            if not p.get("chunk_ref"):
                ctx = contextos[i % len(contextos)] if contextos else {"text": "", "metadata": {}}
                p["chunk_ref"] = ctx.get("text", "")[:600]
                p["chunk_source"] = (ctx.get("metadata") or {}).get("source", "")
            else:
                # Añade fuente si podemos inferirla del contexto más cercano
                if "chunk_source" not in p:
                    p["chunk_source"] = ""
        return preguntas_final, tokens_est
    except Exception:
        fallback = _fallback_questions(contextos, cantidad)
        for i, p in enumerate(fallback):
            if tema_usuario:
                p["tema"] = tema_usuario
            if "chunk_source" not in p:
                ctx = contextos[i % len(contextos)] if contextos else {"metadata": {}}
                p["chunk_source"] = (ctx.get("metadata") or {}).get("source", "")
        return fallback, 0


def chat_with_model(user_message: str, contextos: list[dict] | None = None, model: str = DEFAULT_MODEL) -> tuple[str, int]:
    """Genera una respuesta del modelo usando opcionalmente contextos RAG.

    Devuelve texto plano que puede mostrarse al usuario en el chat.
    """
    context_text = ""
    if contextos:
        context_text = _contexto_para_prompt(contextos[:3])

    prompt_parts = []
    if context_text:
        prompt_parts.append(f"Contextos relevantes:\n{context_text}\n\n")

    prompt_parts.append(f"Usuario: {user_message}\n\nReponde en español de forma breve. Si falta el numero de preguntas o la dificultad, pide esa informacion claramente. Si ya tiene tema, cantidad y dificultad, confirma y responde que estas listo para generar las preguntas.")

    prompt = "\n".join(prompt_parts)
    try:
        resp = _chat_ollama(prompt, model=model)
        tokens_est = len(prompt.split()) + len(resp.split())
        return resp, tokens_est
    except Exception:
        # Fallback simple si el modelo no responde
        if "pregunta" in user_message.lower() or "preguntas" in user_message.lower():
            fallback = "¿Cuántas preguntas deseas (ej. 5)?"
            return fallback, len(fallback.split())
        fallback = "Claro, ¿puedes decirme el tema que quieres estudiar?"
        return fallback, len(fallback.split())


def _mejorar_feedback_con_contexto(
    pregunta: dict,
    respuesta_usuario: str,
    correcta: bool,
    score: float,
    model: str = DEFAULT_MODEL,
) -> dict:
    fragmento = str(pregunta.get("chunk_ref", "")).strip()
    fuente = str(pregunta.get("chunk_source", "")).strip() or str(pregunta.get("tema", ""))
    if not fragmento:
        return {
            "feedback": "No hay informacion suficiente en la base de conocimiento para dar retroalimentacion.",
            "fragmento": "",
            "fuente": fuente,
            "tokens": 0,
        }

    prompt = f"""
Eres un tutor experto. Usa SOLO el fragmento proporcionado para dar retroalimentacion.
Devuelve SOLO JSON con estas claves:
- feedback: retroalimentacion mejorada en espanol (1-3 oraciones).
- fragmento: cita breve literal del fragmento (1-2 oraciones).
- fuente: el nombre del documento.

Correcta: {str(correcta).lower()}.
Score: {score:.2f}.
Pregunta: {pregunta.get("pregunta", "")}
Respuesta estudiante: {respuesta_usuario}
Fragmento (fuente: {fuente}):
{fragmento}

Si el fragmento no soporta una respuesta, indicalo en el feedback.
""".strip()

    try:
        raw = _chat_ollama(prompt, model=model)
        parsed = json.loads(raw)
        tokens_est = len(prompt.split()) + len(raw.split())
        return {
            "feedback": parsed.get("feedback", "Retroalimentacion generada."),
            "fragmento": parsed.get("fragmento", fragmento[:300]),
            "fuente": parsed.get("fuente", fuente),
            "tokens": tokens_est,
        }
    except Exception:
        return {
            "feedback": "Retroalimentacion generada con contexto disponible.",
            "fragmento": fragmento[:300],
            "fuente": fuente,
            "tokens": 0,
        }


def evaluar_respuesta(pregunta: dict, respuesta_usuario: str, model: str = DEFAULT_MODEL) -> dict:
    """Evalua una respuesta y retorna puntaje [0,1], comentario y tema."""
    tipo = pregunta.get("tipo", "abierta")
    tema = pregunta.get("tema", "tema_general")
    esperada = str(pregunta.get("respuesta_esperada", "")).strip()
    fragmento = str(pregunta.get("chunk_ref", "")).strip()
    fuente = str(pregunta.get("chunk_source", "")).strip() or str(tema)

    if not fragmento:
        return {
            "correcta": False,
            "score": 0.0,
            "feedback": "No hay informacion suficiente en la base de conocimiento para evaluar esta respuesta.",
            "tema": tema,
            "fragmento": "",
            "fuente": fuente,
            "tokens": 0,
        }

    if tipo == "opcion_multiple":
        correcta = esperada.lower()
        usuario = respuesta_usuario.strip().lower()[:1]
        ok = usuario == correcta
        score = 1.0 if ok else 0.0
        feedback_data = _mejorar_feedback_con_contexto(
            pregunta,
            respuesta_usuario,
            correcta=ok,
            score=score,
            model=model,
        )
        return {
            "correcta": ok,
            "score": score,
            "feedback": feedback_data.get("feedback", "Correcto." if ok else f"Incorrecto. Respuesta esperada: {esperada}."),
            "tema": tema,
            "fragmento": feedback_data.get("fragmento", fragmento[:300]),
            "fuente": feedback_data.get("fuente", fuente),
            "tokens": feedback_data.get("tokens", 0),
        }

    prompt = f"""
Evalua esta respuesta abierta del estudiante usando SOLO el fragmento.
Devuelve SOLO JSON con: correcta (bool), score (float), feedback (string), fragmento (string), fuente (string).
Si el fragmento no soporta la respuesta, retorna correcta=false y score=0.

Pregunta: {pregunta.get("pregunta", "")}
Criterio esperado: {esperada}
Respuesta estudiante: {respuesta_usuario}
Fragmento (fuente: {fuente}):
{fragmento}
""".strip()

    try:
        raw = _chat_ollama(prompt, model=model)
        parsed = json.loads(raw)
        score = float(parsed.get("score", 0.0))
        tokens_est = len(prompt.split()) + len(raw.split())
        return {
            "correcta": bool(parsed.get("correcta", score >= 0.6)),
            "score": max(0.0, min(1.0, score)),
            "feedback": parsed.get("feedback", "Respuesta evaluada."),
            "tema": tema,
            "fragmento": parsed.get("fragmento", fragmento[:300]),
            "fuente": parsed.get("fuente", fuente),
            "tokens": tokens_est,
        }
    except Exception:
        # Fallback rapido por solapamiento de palabras clave.
        claves = Counter(esperada.lower().split())
        respuesta_tokens = Counter(respuesta_usuario.lower().split())
        interseccion = sum((claves & respuesta_tokens).values())
        total = max(sum(claves.values()), 1)
        score = interseccion / total
        return {
            "correcta": score >= 0.4,
            "score": score,
            "feedback": "Respuesta revisada con heuristica local.",
            "tema": tema,
            "fragmento": fragmento[:300],
            "fuente": fuente,
            "tokens": len(prompt.split()) + len(respuesta_usuario.split()),
        }
