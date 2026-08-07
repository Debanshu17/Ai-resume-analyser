from pydantic import BaseModel


from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    filename: str
    job_description: str


class AnalysisResponse(BaseModel):
    filename: str
    match_percentage: int
    matched_skills: list[str]
    missing_skills: list[str]
    ai_analysis: str