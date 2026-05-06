from pathlib import Path

import chromadb
from sentence_transformers import SentenceTransformer

COLLECTION_NAME = "uni_docs"
DB_DIR = Path("db")

_MODEL = None
_COLLECTION = None


def _get_model() -> SentenceTransformer:
    global _MODEL
    if _MODEL is None:
        _MODEL = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
    return _MODEL


def _get_collection():
    global _COLLECTION
    if _COLLECTION is None:
        client = chromadb.PersistentClient(path=str(DB_DIR))
        _COLLECTION = client.get_or_create_collection(name=COLLECTION_NAME)
    return _COLLECTION


def query_embeddings(consulta: str, n_results: int = 6, max_distance: float | None = 0.6) -> list[dict]:
    model = _get_model()
    collection = _get_collection()
    embedding = model.encode(consulta).tolist()
    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results,
        include=["documents", "metadatas", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    contextos = []
    for i, doc in enumerate(documents):
        distance = distances[i] if i < len(distances) else None
        if max_distance is not None and distance is not None and distance > max_distance:
            continue
        contextos.append(
            {
                "text": doc,
                "metadata": metadatas[i] if i < len(metadatas) else {},
                "distance": distance,
            }
        )
    return contextos


# Backward compatibility with previous function name.
def queryEmb(consulta):
    contextos = query_embeddings(consulta, n_results=3, max_distance=None)
    return {"documents": [[c["text"] for c in contextos]], "metadatas": [[c["metadata"] for c in contextos]]}
