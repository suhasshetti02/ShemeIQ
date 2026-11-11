# SchemeIQ — AI-Powered Government Scheme Discovery

SchemeIQ is a web application prototype for exploring Indian government schemes. It combines PDF text extraction and OCR, transformer-based summarization, semantic/keyword search, and profile-based scheme recommendations.

> **Project status:** Research / academic prototype. Recommendations are similarity-ranked suggestions, not official eligibility determinations. Always verify scheme details against the relevant government department or official portal.

## Features implemented

- PDF upload and text extraction using PyPDF2, with Tesseract OCR fallback for scanned PDFs.
- Chunked summarization using Hugging Face's DistilBART summarization pipeline.
- Scheme data preprocessing from CSV into a combined text field and extracted state field.
- Sentence-Transformer embeddings using `all-MiniLM-L6-v2`.
- Semantic search combined with TF-IDF keyword scoring and category/state keyword boosts.
- Profile-based recommendations using a saved K-nearest-neighbours model and additional eligibility-related heuristics.
- Next.js frontend with sign-in/sign-up pages, policy upload, recommendations, and search result components.

## Technology stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| API | Python, FastAPI, Uvicorn |
| OCR / PDF | PyTesseract, pdf2image, PyPDF2 |
| NLP / ML | Transformers, Sentence-Transformers, scikit-learn, pandas, NumPy |
| Data | CSV files and serialized local model / embedding artifacts |

## Architecture

```text
Next.js frontend
    │
    ▼
FastAPI backend
    ├── PDF text extraction / OCR
    ├── DistilBART summarization
    ├── CSV preprocessing
    ├── SentenceTransformer embeddings
    ├── Semantic + TF-IDF search
    └── KNN + profile heuristics for recommendations
```

## Repository layout

- `backend/main.py` — FastAPI app and API endpoints.
- `backend/src/preprocessing.py` — scheme-data cleaning and state extraction.
- `backend/src/embedding_model.py` — SentenceTransformer embeddings and pickle cache.
- `backend/src/search.py` — hybrid semantic / TF-IDF search.
- `backend/src/recommender.py` — profile-based recommendation ranking.
- `backend/src/summarizer.py` — scheme-summary helper.
- `frontend/` — Next.js application and UI components.
- `IBMZDatathon.pem` and `ibmzdatathonvideo.ppk` — credential-like files currently present in the repository; see the security notice below.

## Run locally

### Backend

Requirements include Python compatible with the pinned versions, Tesseract OCR, Poppler (for PDF image conversion), the CSV dataset, and the required serialized artifacts (including the KNN model).

```bash
cd backend
python -m venv .venv
# Activate the environment, then:
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend loads its dataset, summarization pipeline, embedding model, and cached model files during module initialization. First startup may download model weights and can take time.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL for the address where FastAPI is running.

## API endpoints

- `GET /` — API welcome response.
- `POST /pdf-summarize` — upload a PDF for extraction and summarization.
- `POST /recommend` — submit a profile and receive ranked scheme suggestions.
- `GET /search` — search scheme records using a query.

See `backend/main.py` for the exact request models and response structures.

## Important limitations and follow-up work

- The OCR executable path in `backend/main.py` is hard-coded to a Windows installation path. Configure it per machine or use the system PATH.
- The application expects local CSV and serialized artifacts such as `data/updated_data.csv`, `models/scheme_embeddings.pkl`, and `models/knn_model.pkl`. They must exist and correspond to the same scheme dataset.
- CORS currently allows all origins. Restrict it to the deployed frontend.
- Search and recommendation scoring contain heuristics and assumptions. A similarity score is not proof that a citizen is eligible for a scheme.
- The profile includes sensitive personal attributes. Minimize collection, document purpose and retention, and apply access controls before real-user deployment.
- Validate uploaded file size/type and handle malformed PDFs consistently.
- Review the recommender's state-field naming and model/data index alignment before relying on its results.
- Tests and deployment instructions should be expanded to cover a clean-machine setup and reproducible recommendation evaluation.

## Security notice — exposed private keys

The repository currently contains files named `IBMZDatathon.pem` and `ibmzdatathonvideo.ppk`, which are private-key formats. Treat the associated credentials as exposed: revoke or replace the corresponding keys, remove the files from the repository, and purge them from Git history. Deleting them in a new commit alone does not invalidate exposed keys.

## License

See repository and model/dataset licenses before redistribution.
