import hashlib
import json
from pathlib import Path

import chromadb
import fitz
from sentence_transformers import SentenceTransformer

DEFAULT_DATA_DIR = Path("data")
DEFAULT_DB_DIR = Path("db")
DEFAULT_MANIFEST_PATH = DEFAULT_DB_DIR / "ingestion_manifest.json"
COLLECTION_NAME = "uni_docs"

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
        client = chromadb.PersistentClient(path=str(DEFAULT_DB_DIR))
        _COLLECTION = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
    return _COLLECTION


def _file_hash(file_path: Path) -> str:
    hasher = hashlib.sha256()
    with file_path.open("rb") as source:
        for chunk in iter(lambda: source.read(8192), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def _load_manifest(manifest_path: Path) -> dict:
    if not manifest_path.exists():
        return {"files": {}}
    try:
        return json.loads(manifest_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"files": {}}


def _save_manifest(manifest_path: Path, manifest: dict) -> None:
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")


def chunks_spliter(text: str, chunk_size: int = 300, overlap: int = 50) -> list[str]:
    words = text.split()
    step = max(chunk_size - overlap, 1)
    chunks = []

    for i in range(0, len(words), step):
        chunk = words[i : i + chunk_size]
        if chunk:
            chunks.append(" ".join(chunk))

    return chunks


def _extract_text(file_path: Path) -> str:
    doc = fitz.open(file_path)
    extracted_text = ""
    for page_num in range(doc.page_count):
        extracted_text += doc[page_num].get_text()
    doc.close()
    return extracted_text


def carga_archivos_nuevos(
    data_dir: Path = DEFAULT_DATA_DIR,
    manifest_path: Path = DEFAULT_MANIFEST_PATH,
) -> dict:
    """Ingiere solo PDFs nuevos o modificados en data/ y actualiza el manifest."""
    data_dir = Path(data_dir)
    manifest_path = Path(manifest_path)

    if not data_dir.exists():
        return {"processed": [], "skipped": [], "reason": f"No existe {data_dir}"}

    manifest = _load_manifest(manifest_path)
    manifest_files = manifest.setdefault("files", {})
    processed = []
    skipped = []

    model = _get_model()
    collection = _get_collection()

    for file_path in sorted(data_dir.glob("*.pdf")):
        current_hash = _file_hash(file_path)
        rel_path = str(file_path)
        if manifest_files.get(rel_path) == current_hash:
            skipped.append(rel_path)
            continue

        extracted_text = _extract_text(file_path)
        chunks = chunks_spliter(extracted_text)
        if not chunks:
            skipped.append(rel_path)
            manifest_files[rel_path] = current_hash
            continue

        embeddings = model.encode(chunks)
        ids = [f"{current_hash}_{i}" for i in range(len(chunks))]
        metadatas = [
            {
                "source": file_path.name,
                "path": rel_path,
                "chunk_index": i,
                "file_hash": current_hash,
            }
            for i in range(len(chunks))
        ]

        # Evita duplicados si el archivo ya se habia indexado con ese hash.
        try:
            collection.delete(ids=ids)
        except Exception:
            pass

        collection.add(
            documents=chunks,
            embeddings=embeddings.tolist(),
            metadatas=metadatas,
            ids=ids,
        )

        manifest_files[rel_path] = current_hash
        processed.append({"file": rel_path, "chunks": len(chunks)})

    _save_manifest(manifest_path, manifest)
    return {"processed": processed, "skipped": skipped, "manifest": str(manifest_path)}


# Backward compatibility with previous function name.
def cargaArchivos() -> dict:
    return carga_archivos_nuevos()


