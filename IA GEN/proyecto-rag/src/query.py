import chromadb
from sentence_transformers import SentenceTransformer

#Zona de variables
client = chromadb.PersistentClient(path="db/")
collection = client.get_collection(name="uni_docs")
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

#====================
def queryEmb(consulta):
    embedding = model.encode(consulta).tolist()
    results = collection.query(
        query_embeddings=[embedding],
        n_results=3
    )
    print("========DEBUG========")
    print(results)
    print("========DEBUG========")
    return results