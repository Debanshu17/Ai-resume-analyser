import json
from pathlib import Path


SKILLS_FILE = Path(__file__).parent / "skills.json"

with open(SKILLS_FILE, "r") as file:
    SKILLS = json.load(file)


def extract_skills(text):

    found_skills = []

    text = text.lower()

    for skill in SKILLS:

        if skill.lower() in text:

            found_skills.append(skill)

    return sorted(list(set(found_skills)))

def compare_skills(resume_skills, jd_skills):

    matched_skills = []

    missing_skills = []

    for skill in jd_skills:

        if skill in resume_skills:

            matched_skills.append(skill)

        else:

            missing_skills.append(skill)

    if len(jd_skills) == 0:

        match_percentage = 0

    else:

        match_percentage = round(
            (len(matched_skills) / len(jd_skills)) * 100
        )

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": match_percentage
    }