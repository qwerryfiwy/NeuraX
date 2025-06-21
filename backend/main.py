from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from openai import AzureOpenAI  
from dotenv import load_dotenv
import fitz
import numpy as np
import faiss
import pickle

# ========= CONFIG =========
load_dotenv()

VECTOR_DB_DIR = "vector_db"
INDEX_FILE = os.path.join(VECTOR_DB_DIR, "neurax.index")
CHUNKS_FILE = os.path.join(VECTOR_DB_DIR, "chunks.pkl")

os.makedirs(VECTOR_DB_DIR, exist_ok=True)

client = AzureOpenAI(
    api_key=os.getenv("AZURE_API_KEY"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version="2024-12-01-preview"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========= UTILS =========
def save_vector_store(embeddings, chunks):
    dim = len(embeddings[0])
    index = faiss.IndexFlatL2(dim)
    index.add(np.array(embeddings).astype("float32"))

    faiss.write_index(index, INDEX_FILE)
    with open(CHUNKS_FILE, "wb") as f:
        pickle.dump(chunks, f)

def load_vector_store():
    if not os.path.exists(INDEX_FILE) or not os.path.exists(CHUNKS_FILE):
        return None, None

    index = faiss.read_index(INDEX_FILE)
    with open(CHUNKS_FILE, "rb") as f:
        chunks = pickle.load(f)

    return index, chunks

# ========= MODELS =========
class PromptRequest(BaseModel):
    prompt: str

# ========= ROUTES =========

@app.post("/ask")
async def ask(request: PromptRequest):
    try:
        response = client.chat.completions.create(
            model="mindcraft-gpt4o",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are NeuraX, a Deep Learning-focused AI assistant. "
                        "You only answer questions related to deep learning, neural networks, machine learning, "
                        "training strategies, loss functions, activation functions, and similar topics. "
                        "Do NOT respond to questions outside of this scope. "
                        "Explain concepts clearly, use math notation if helpful, and keep responses concise but informative."
                    )
                },
                {"role": "user", "content": request.prompt}
            ]
        )
        reply = response.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}

@app.post("/upload-doc")
async def upload_doc(file: UploadFile = File(...)):
    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")
    full_text = "\n".join([page.get_text() for page in doc])

    chunks = [full_text[i:i + 1000] for i in range(0, len(full_text), 1000)]
    embeddings = []

    for chunk in chunks:
        res = client.embeddings.create(
            model="text-embedding-ada-002",
            input=chunk
        )
        embeddings.append(res.data[0].embedding)

    save_vector_store(embeddings, chunks)

    response = client.chat.completions.create(
        model="mindcraft-gpt4o",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that summarizes documents."
            },
            {
                "role": "user",
                "content": full_text[:3500]
            }
        ]
    )
    summary = response.choices[0].message.content
    return {"summary": summary}

@app.post("/ask-doc")
async def ask_doc(question: str = Body(...)):
    index, chunks = load_vector_store()

    if index is None or chunks is None:
        return {"answer": "No document uploaded yet."}

    res = client.embeddings.create(
        model="text-embedding-ada-002",
        input=question
    )
    question_emb = np.array(res.data[0].embedding).astype("float32")

    D, I = index.search(np.array([question_emb]), k=3)
    top_chunks = [chunks[i] for i in I[0]]

    context = "\n\n".join(top_chunks)

    response = client.chat.completions.create(
        model="mindcraft-gpt4o",
        messages=[
            {
                "role": "system",
                "content": "You are an assistant that ONLY answers based on the following document context."
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion:\n{question}"
            }
        ]
    )

    answer = response.choices[0].message.content
    return {"answer": answer}
