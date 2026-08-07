import json
import ollama


def analyze_resume_with_ai(resume_text, job_description):

    prompt = f"""
You are an experienced HR recruiter.

Analyze the following resume against the given job description.

Resume:
{resume_text}

Job Description:
{job_description}

You MUST respond ONLY with valid JSON.

Do NOT write explanations.
Do NOT use markdown.
Do NOT use ```json.
Do NOT write any text before or after the JSON.

Return ONLY this JSON format:

{{
    "summary": "",
    "strengths": [
        ""
    ],
    "weaknesses": [
        ""
    ],
    "suggestions": [
        ""
    ]
}}
"""

    response = ollama.chat(
        model="llama3",
        format="json",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response["message"]["content"].strip()

    # Remove markdown if model accidentally returns it
    if content.startswith("```json"):
        content = content.replace("```json", "", 1)

    if content.startswith("```"):
        content = content.replace("```", "", 1)

    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    try:
        return json.loads(content)

    except Exception:

        return {
            "summary": content,
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
        }