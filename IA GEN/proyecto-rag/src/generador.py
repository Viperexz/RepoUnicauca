import requests

def generar_preguntas(chunks):
    chunks_preguntas = []
    for chunk in chunks:
        chunks_preguntas.append(chunk+"\n\n")
    texto = "\n\n".join(chunks)
    pregunta = f"Dado el siguiente texto académico:\n\n{texto}\n\nGenera 5 preguntas de estudio abiertas en español."
    #pregunta = f"Dado el siguiente texto académico:\n\n{texto}\n\nDame un resumen para estudio en español."
    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "mistral",
            "messages": [{"role": "user", "content": pregunta}],
            "stream": False
        }
    )
    print("Respuesta de la pregunta: ")
    return response.json()["message"]["content"]
