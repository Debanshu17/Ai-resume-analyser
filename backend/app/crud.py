from sqlalchemy.orm import Session
from app.models import ResumeAnalysis


def save_analysis(
    db: Session,
    filename,
    match_percentage,
    matched_skills,
    missing_skills,
    ai_analysis
):

    analysis = ResumeAnalysis(
        file_name=filename,
        match_percentage=match_percentage,
        matched_skills=", ".join(matched_skills),
        missing_skills=", ".join(missing_skills),
        summary=ai_analysis["summary"],
        suggestions=", ".join(ai_analysis["suggestions"])
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis