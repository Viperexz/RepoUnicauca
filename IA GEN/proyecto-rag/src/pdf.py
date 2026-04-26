import fitz
import os
import chromadb
from sentence_transformers import SentenceTransformer

#Zona de variables
dataDir = "data/"
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
client = chromadb.PersistentClient(path="db/")
collection = client.get_or_create_collection(name="uni_docs",metadata = {"hnsw:space": "cosine"})
files = []
#====================

def split_chunks(text: str, chunk_size: int = 300, overlap: int = 50) -> list[str]:
    words = text.split()
    step = chunk_size - overlap
    chunks = []

    for i in range(0, len(words), step):
        chunk = words[i: i + chunk_size]
        chunks.append(" ".join(chunk))

    return chunks


#Recorrido archivo
def cargaArchivos():
    for file in os.listdir(dataDir):
        if '.pdf' in file:
            files.append(dataDir+file)
    if len(files) == 0:
        print("No pdf files found")
    else:
        for file in files:
            doc = fitz.open(file)
            extracted_text = ""
            for page_num in range(doc.page_count):
                page = doc[page_num]
                extracted_text += page.get_text()
            doc.close()
            chunks = split_chunks(extracted_text)
            embeddings = model.encode(chunks)

            collection.add(
                documents=chunks,
                embeddings=embeddings.tolist(),
                ids=[f"{file}_{i}" for i in range(len(chunks))]
            )
            print("========DEBUG========")
            print(f"Total chunks: {len(chunks)}")
            print(f"Primer chunk:\n{chunks[1]}")
            print(embeddings.shape)
            print("========DEBUG========")


