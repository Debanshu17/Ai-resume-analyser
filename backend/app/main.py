from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
import shutil

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import engine, Base, get_db
from app.schemas import AnalyzeRequest
from app.parser import extract_text_from_pdf
from app.matcher import extract_skills, compare_skills
from app.ai import analyze_resume_with_ai
from app.crud import save_analysis
import app.models
from app.models import ResumeAnalysis

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://debanshu17.github.io",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

UPLOAD_FOLDER = Path("../uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Resume Analyzer API"
    }


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }


@app.get("/extract/{filename}")
def extract_resume_text(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    text = extract_text_from_pdf(file_path)
    skills = extract_skills(text)

    return {
        "filename": filename,
        "resume_text": text,
        "skills": skills
    }


@app.post("/analyze")
async def analyze_resume(
    request: AnalyzeRequest,
    db: Session = Depends(get_db)
):

    file_path = UPLOAD_FOLDER / request.filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Extract resume text
    resume_text = extract_text_from_pdf(file_path)

    # Extract skills
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(request.job_description)

    # Compare skills
    result = compare_skills(
        resume_skills,
        jd_skills
    )

    # AI Analysis
    ai_result = analyze_resume_with_ai(
        resume_text,
        request.job_description
    )

    # Save to database
    save_analysis(
        db,
        request.filename,
        result["match_percentage"],
        result["matched_skills"],
        result["missing_skills"],
        ai_result
    )

    # Return response
    return {
        "filename": request.filename,
        "resume_skills": resume_skills,
        "job_description_skills": jd_skills,
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "match_percentage": result["match_percentage"],
        "ai_analysis": ai_result
    }
@app.get("/history")
def get_history(db: Session = Depends(get_db)):

    history = (
        db.query(ResumeAnalysis)
        .order_by(ResumeAnalysis.created_at.desc())
        .all()
    )

    return history
@app.delete("/history/{analysis_id}")
def delete_history(
    analysis_id: int,
    db: Session = Depends(get_db)
):

    analysis = (
        db.query(ResumeAnalysis)
        .filter(ResumeAnalysis.id == analysis_id)
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    db.delete(analysis)
    db.commit()

    return {
        "message": "Analysis deleted successfully"
    }