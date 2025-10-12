# 🌐 SchemeIQ — AI-Powered Government Scheme Discovery Platform  

> Empowering citizens to easily discover, understand, and access government schemes through AI-driven summarization, recommendation, and multilingual support.  

---

## 🚀 Overview  
Government schemes are often lengthy, complex, and difficult to interpret — especially for citizens in rural areas or those with limited literacy.  
**SchemeIQ** aims to simplify access to these policies using AI-based summarization, recommendation, and translation features.  

The platform helps users:  
- 📄 Summarize uploaded government policy PDFs  
- 🎯 Get personalized scheme recommendations  
- 🔍 Search and explore schemes using natural language queries  
- 🌎 Translate content into local languages like Hindi and Kannada  

---

## 🧠 Key Features  

✅ **PDF Summarization**  
- Extracts text from PDF using OCR (PyTesseract)  
- Summarizes documents with transformer models (DistilBART)  

✅ **Smart Search**  
- Hybrid (semantic + keyword) search using Sentence-BERT embeddings  

✅ **Personalized Recommendations**  
- Suggests schemes based on user profile (age, gender, occupation, income, etc.)  

✅ **Multilingual Support**  
- Translates schemes dynamically into user-selected languages  

✅ **Modern Web Interface**  
- Responsive and accessible design with light/dark themes  

---

## 🧩 Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Next.js), Tailwind CSS, ShadCN/UI |
| **Backend** | FastAPI (Python) |
| **Machine Learning** | DistilBART, Sentence-BERT |
| **OCR** | PyTesseract, pdf2image |
| **Database** | Firebase / MongoDB |
| **Hosting** | IBM Cloud / Vercel |
| **Language Translation** | Helsinki-NLP / Custom Model |

---

## ⚙️ Installation & Setup  

### 🖥 Backend Setup  
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
