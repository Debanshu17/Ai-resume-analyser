# AI Resume Analyzer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-61DAFB)
![Python](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-3776AB)
![AI](https://img.shields.io/badge/AI_Engine-Google%20Gemini-FFAA00)

A full-stack, AI-powered recruitment tool designed to automate and enhance the resume screening process. It uses natural language processing to semantically analyze candidate resumes against target job descriptions, providing instant ATS compatibility scoring, skill-gap analysis, and actionable feedback.

**Live Demo:** [View Application](https://debanshu17.github.io/Ai-resume-analyser/)

## Features
- **Semantic Skill Matching:** Moves beyond basic keyword matching to understand context and skill equivalencies using Google Gemini AI.
- **ATS Compatibility Scoring:** Generates a percentage score indicating how well the candidate's resume aligns with the job requirements.
- **Skill Gap Identification:** Automatically extracts and categorizes exactly which mandatory skills are present and which are missing.
- **Executive Summaries:** Generates strategic, actionable feedback on how to improve the resume for the specific role.
- **Editorial UI Design:** A highly polished, distraction-free interface built with React and Tailwind CSS v4.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS v4, Lucide Icons, Axios.
- **Backend:** Python, FastAPI, PyMuPDF (for reliable PDF parsing), Uvicorn.
- **AI Engine:** Google Gemini 2.5 Flash API.
- **Deployment:** GitHub Pages (Frontend) & Render.com (Backend API).

## Local Development Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file and add your Gemini API Key
echo "GEMINI_API_KEY=your_actual_key_here" > .env

# Run the FastAPI server
uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend

# Install Node modules
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Architecture
1. **Client:** User uploads a PDF resume and pastes a job description.
2. **API:** The React frontend sends the PDF and text to the FastAPI backend.
3. **Processing:** `PyMuPDF` extracts the raw text from the PDF file.
4. **AI Generation:** The backend constructs a strict prompt and queries the Google Gemini API to return a structured JSON evaluation.
5. **Display:** The frontend parses the JSON and renders the ATS score, matched/missing skills, and the AI summary.

## License
This project is open-source and available under the MIT License.