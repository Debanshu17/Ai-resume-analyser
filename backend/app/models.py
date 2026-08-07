from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)

    file_name = Column(String)

    candidate_name = Column(String)

    match_percentage = Column(Integer)

    matched_skills = Column(String)

    missing_skills = Column(String)

    summary = Column(String)

    strengths = Column(String)

    weaknesses = Column(String)

    suggestions = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )