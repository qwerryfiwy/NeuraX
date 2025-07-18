#  NeuraX

> An AI-powered Deep Learning assistant + smart document brain, built for coders and students.

---

##  Overview

**NeuraX** is a smart, domain-specific AI assistant that helps users:

- Understand Deep Learning concepts  
- Upload PDFs and get instant summaries  
- Ask contextual questions grounded in your documents  

It's built with the power of **Azure OpenAI (GPT-4o)** and a blazing fast **FastAPI backend**, combined with a slick **Next.js frontend** styled in TailwindCSS.

---

##  Modules Included

### 1. NeuraX Assistant
Ask anything related to Deep Learning:  
- L1 vs L2 regularization  
- What is vanishing gradient?  
- CNN vs RNN vs Transformer  
- Backpropagation, optimizers, activation functions...

 NeuraX only answers DL-related queries using prompt control. No off-topic distractions.

---

###  2. NeuraX Docs
Upload your notes or research papers (`.pdf`) and:

-  Automatically extract and summarize the content  
-  Ask questions based only on your uploaded doc  
-  Uses embeddings + FAISS to fetch relevant text chunks  

Works offline, remembers your doc, and responds fast.

---

## Tech Stack

| Layer       | Tech Used                                                                 |
|-------------|---------------------------------------------------------------------------|
| Frontend    | [Next.js](https://nextjs.org/docs), [TailwindCSS](https://tailwindcss.com/docs), [Framer Motion](https://www.framer.com/motion/), [TypeScript](https://www.typescriptlang.org/docs/) |
| Backend     | [FastAPI](https://fastapi.tiangolo.com/), [Python](https://docs.python.org/3/), [Azure OpenAI GPT-4o](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/overview) |
| Embedding   | [Azure OpenAI Embeddings](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/how-to/use-embeddings) |
| Vector DB   | [FAISS](https://github.com/facebookresearch/faiss) + [Pickle](https://docs.python.org/3/library/pickle.html) for local persistence |
| Security    | [.env-based Key Management](https://12factor.net/config) ([dotenv for Python](https://pypi.org/project/python-dotenv/), [dotenv for Next.js](https://nextjs.org/docs/basic-features/environment-variables)) |


---

##  Folder Structure

NeuraX/
├── frontend/ # Next.js frontend
│ ├── pages/assistant.tsx
│ ├── pages/docs.tsx
│ └── components/
├── backend/ # FastAPI backend
│ ├── main.py # Unified backend
│ ├── vector_db/ # FAISS index + chunk data
│ └── .env

## API Endpoints

### `POST /ask`
> Deep Learning assistant

```json
{"prompt": "Explain dropout in neural nets"}
```

### POST /upload-doc
Upload a PDF and get a summary  
{
  "summary": "This paper covers gradient descent and..."
}

## Setup Instructions

### Requirements

-Node.js, npm
-Python 3.9+
-Azure OpenAI access (GPT-4o + Embedding deployment)

## Frontend

---

##  Setup Instructions

###  Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
AZURE_API_KEY=your-azure-key
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
uvicorn main:app --reload --port 8001
```

