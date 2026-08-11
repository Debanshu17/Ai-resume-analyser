# AI Resume Analyzer — Technical Documentation

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-61DAFB)
![Python](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-3776AB)
![AI](https://img.shields.io/badge/AI_Engine-Google%20Gemini-FFAA00)

A highly technical, full-stack recruitment intelligence platform designed to automate resume screening using Generative AI. This document serves as a deep dive into the architecture, tools, and code implementation of the project.

**Live Demo:** [View Application](https://debanshu17.github.io/Ai-resume-analyser/)

---

## 🏗 System Architecture

The application follows a decoupled client-server architecture, communicating via a RESTful API.

```mermaid
graph LR
    A[Client - React/Vite] -->|POST /analyze (Multipart Form)| B(FastAPI Backend)
    B --> C{PyMuPDF Parser}
    C -->|Extracts Raw Text| D[Google Gemini API]
    D -->|Generates JSON| B
    B -->|Returns Analysis| A
```

---

## 🛠 Core Technologies & Technical Decisions

### 1. Frontend (Client-Side)
- **Framework:** `React 19` bootstrapped with `Vite`. Vite was chosen over Create React App for its native ES modules support, resulting in sub-second hot module replacement (HMR) and significantly faster build times.
- **Styling:** `Tailwind CSS v4`. The UI implements an "Anthropic Claude Editorial" design system, utilizing custom serif typography (Cormorant Garamond) and a bespoke color palette mapped via CSS variables in `index.css`.
- **State Management:** React `useState` and `useRef` for local component state and DOM manipulation (e.g., smooth scrolling to results).
- **HTTP Client:** `Axios` configured in `src/services/api.js` to handle asynchronous API calls and multipart/form-data uploads.
- **Animations:** `canvas-confetti` triggered programmatically upon high-scoring candidate matches (≥ 70%).

### 2. Backend (Server-Side)
- **Framework:** `FastAPI` (Python). Selected for its extreme speed (built on Starlette/Pydantic) and automatic OpenAPI documentation generation.
- **Concurrency:** Uses `async def` endpoints, allowing the server to handle concurrent API requests efficiently without blocking the main event loop.
- **CORS Middleware:** Configured in `main.py` via `CORSMiddleware` to accept cross-origin requests from the GitHub Pages production URL and localhost.

### 3. File Processing
- **Library:** `PyMuPDF` (imported as `fitz`).
- **Implementation:** Handles in-memory PDF parsing (`fitz.open(stream=contents, filetype="pdf")`). This avoids writing temporary files to the disk, reducing latency and avoiding I/O bottlenecks.

### 4. Artificial Intelligence Engine
- **Provider:** Google Gemini 2.5 Flash (`google-generativeai` SDK).
- **Previous Iteration:** Originally developed using local `Ollama` (Llama 3), but migrated to Gemini API to facilitate serverless cloud deployment on Render without requiring heavy GPU compute instances.
- **Prompt Engineering Strategy:** The backend strictly prompts the LLM to act as an HR Recruiter and enforces a JSON-only response schema using `generation_config=genai.types.GenerationConfig(response_mime_type="application/json")`.

---

## 🧩 Key Code Implementation Details

### API Endpoint (`backend/app/main.py`)
The `/analyze` endpoint receives a `UploadFile` and a form data string (`job_description`). It streams the PDF bytes into PyMuPDF, extracts the text, and passes it to the AI controller.

```python
@app.post("/analyze")
async def analyze_resume(filename: UploadFile = File(...), job_description: str = Form(...)):
    contents = await filename.read()
    pdf_document = fitz.open(stream=contents, filetype="pdf")
    resume_text = ""
    for page in pdf_document:
        resume_text += page.get_text()
    
    analysis_result = analyze_resume_with_ai(resume_text, job_description)
    return analysis_result
```

### AI JSON Parsing (`backend/app/ai.py`)
The Gemini API call explicitly requests structured data. To ensure stability, the code includes a fallback cleaning mechanism that strips accidental markdown code blocks (` ```json `) before passing the string to `json.loads()`.

### Tailwind v4 Configuration (`frontend/src/index.css`)
Unlike Tailwind v3, which relies on `tailwind.config.js`, this project uses Tailwind v4's CSS-driven configuration. To ensure the Vite build successfully compiles all utility classes in the Linux CI environment (GitHub Actions), explicit `@source` directives are utilized:
```css
@import "tailwindcss";
@source "../index.html";
@source "../src";
```

---

## 🚀 Deployment Infrastructure

### Frontend Deployment (GitHub Pages)
- **Pipeline:** Automated via GitHub Actions (`.github/workflows/deploy.yml`).
- **Trigger:** On `push` to the `main` branch.
- **Process:** Checks out code, sets up Node 20, runs `npm ci`, executes `vite build`, and uploads the `/dist` directory to GitHub Pages.

### Backend Deployment (Render.com)
- **Pipeline:** Automated via Render Blueprint (`render.yaml`).
- **Configuration:** Defines the `ai-resume-backend` web service, sets the environment to Python, and specifies the startup command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- **Secrets Management:** The `GEMINI_API_KEY` is securely injected into the Render environment variables, preventing exposure in the public repository.

---

## 💻 Local Development Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
echo "GEMINI_API_KEY=your_actual_key_here" > .env
uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```