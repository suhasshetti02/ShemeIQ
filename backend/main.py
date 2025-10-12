from fastapi import FastAPI, File, UploadFile,Query
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
from transformers import pipeline
import pytesseract
from pdf2image import convert_from_bytes
import re
import os

from pydantic import BaseModel
import pandas as pd
import pickle
import json

from src.preprocessing import prepare_data
from src.recommender import recommend_schemes
from src.search import search
from src.embedding_model import create_embeddings
from src.summarizer import summarize_scheme

app = FastAPI(
    title="Government Scheme Recommendation & Search API",
    description="AI-powered system to recommend and search Indian government schemes.",
    version="1.0.0"
)

# --- Tesseract OCR setup ---
# Replace with your Tesseract installation path if not in PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# --- Summarization model ---
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

# --- CORS middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helper: chunk text ---
def chunk_text(text, max_words=500):
    words = text.split()
    for i in range(0, len(words), max_words):
        yield " ".join(words[i:i + max_words])

# --- Helper: clean OCR text ---
def clean_text(text):
    # Remove non-ASCII characters and extra whitespace
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

@app.post("/pdf-summarize")
async def summarize(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        return {"error": "Only PDF files are allowed."}

    contents = await file.read()
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))

    # --- Extract text from PDF pages ---
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text

    # --- If PDF has no extractable text, use OCR ---
    if not text.strip():
        try:
            images = convert_from_bytes(contents)
            for image in images:
                ocr_text = pytesseract.image_to_string(image)
                text += ocr_text
        except Exception as e:
            return {"error": f"OCR failed: {str(e)}"}

    # --- Clean text ---
    text = clean_text(text)

    if not text.strip():
        return {"error": "No readable text found in PDF."}

    # --- Chunk text for summarization ---
    chunks = list(chunk_text(text, max_words=500))
    summaries = []

    for i, chunk in enumerate(chunks):
        try:
            print(f"Summarizing chunk {i+1}/{len(chunks)}...")
            summary = summarizer(
                chunk,
                max_length=400,  # max per chunk
                min_length=50,
                do_sample=False
            )[0]["summary_text"]
            summaries.append(summary)
        except Exception as e:
            print(f"Skipping chunk {i+1} due to error: {e}")
            continue

    if not summaries:
        return {"error": "Summarization failed on all chunks."}

    # --- Combine chunk summaries for final summary ---
    combined_summary = " ".join(summaries)

    try:
        final_summary = summarizer(
            combined_summary,
            max_length=1000,  # final summary length
            min_length=300,
            do_sample=False
        )[0]["summary_text"]
    except:
        # fallback if final summarization fails
        final_summary = combined_summary

    return {"summary": final_summary}

# ----------- Load Models and Data -----------
print("🔹 Loading data and models...")

# Load preprocessed data
DATA_PATH = "data/updated_data.csv"
PROCESSED_PATH = "data/processed_schemes.csv"
df = prepare_data(DATA_PATH, PROCESSED_PATH)

# Load Sentence-BERT model
embeddings, model = create_embeddings(df, "models/scheme_embeddings.pkl")

# ----------- API Models -----------

class UserProfile(BaseModel):
    age: int
    gender: str
    state: str
    occupation: str
    income: float
    caste: str = "general"
    others: str = ""

class SchemeInput(BaseModel):
    name:str
    eligibilty : str = ""
    description: str = ""
    benefits: str = ""
    department: str = ""


# ----------- Routes -----------

@app.get("/")
def root():
    return {"message": "Welcome to the Government Scheme Recommendation & Search API 🚀"}

@app.post("/recommend")
def recommend(user: UserProfile):
    """
    Recommend government schemes based on user profile.
    """
    recommendations = recommend_schemes(
        user_profile=user.dict(),
        df=df,
        embeddings_path="models/scheme_embeddings.pkl",
        model=model,
        knn_path="models/knn_model.pkl"
    )
    return recommendations.head(10).to_dict(orient="records")

@app.get("/search")
def search_endpoint(
    query: str = Query(..., description="Search schemes by name, category, state, etc."),
):
    """
    Search schemes using semantic + keyword-based hybrid search.
    """
    results = search(df, query, model, embeddings)
    
    return json.loads(results.to_json(orient='records'))


@app.post('/summarize')
def summarize(scheme:SchemeInput):
    summary = summarize_scheme(scheme.model_dump())
    
    return {"summary" : summary}


