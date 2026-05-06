# Tutor RAG - Sistema Inteligente de Evaluación

Sistema de preguntas adaptativas basado en RAG que genera evaluaciones personalizadas a partir de tus documentos PDF.

## 🎯 Características

- ✅ Ingesta incremental (solo PDFs nuevos/modificados)
- 🤖 Generación inteligente con RAG (opción múltiple + abiertas)
- 💬 Chat interactivo con validación en tiempo real
- 📊 Retroalimentación por tema + fragmentos de estudio
- 📈 Estadísticas con gráficas de desempeño
- 🔒 Limitado a base de conocimiento (PDFs cargados)

## 📋 Requisitos

- Python 3.10+
- PDFs en `data/`
- Ollama activo con modelo `mistral:7b-instruct`

## 🚀 Instalación rápida

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requisitos.txt

# Abre 2 terminales:
# Terminal 1:
ollama serve

# Terminal 2:
streamlit run app.py
```

Luego abre **http://localhost:8501**

## 📖 Uso

### Flujo en Streamlit:
1. **PDF**: Sube documentos
2. **Chat**: Configura tema, cantidad, dificultad
3. **Responde**: Preguntas una por una
4. **Estadísticas**: Revisa desempeño

### CLI:
```bash
python main.py --tema "Python" --cantidad 6
```

## 🏗️ Componentes

- `src/pdf.py`: Ingesta incremental
- `src/query.py`: Búsqueda RAG
- `src/generador.py`: Generación + evaluación LLM
- `app.py`: Interfaz Streamlit
- `main.py`: Pipeline CLI

## ✅ Mejoras v1.0

✅ Opciones de preguntas formateadas en chat
✅ Fragmentos de estudio mostrados al final
✅ Interfaz moderna con emojis y colores
✅ Gráficas de tokens y duración
✅ Validación de disponibilidad de temas
✅ Manejo robusto de errores

## 🧪 Pruebas

```bash
python -m unittest tests/test_pipeline.py
python -m py_compile app.py
```
