import json
import os
import google.generativeai as genai

# Configure the Gemini API client using the environment variable
# If not present, we handle it gracefully below.
gemini_api_key = os.environ.get("GEMINI_API_KEY", "")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

def analyze_resume_with_ai(resume_text, job_description):

    if not gemini_api_key:
        return {
            "summary": "Error: GEMINI_API_KEY environment variable is not set.",
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
        }

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

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
            ),
        )

        content = response.text.strip()

        # Remove markdown if model accidentally returns it (fallback)
        if content.startswith("```json"):
            content = content.replace("```json", "", 1)
        if content.startswith("```"):
            content = content.replace("```", "", 1)
        if content.endswith("```"):
            content = content[:-3]

        content = content.strip()

        return json.loads(content)

    except Exception as e:
        print(f"Gemini API Error: {e}")
        return {
            "summary": f"Failed to analyze with Gemini API: {str(e)}",
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
        }