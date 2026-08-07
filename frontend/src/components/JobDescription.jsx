import React from "react";
import { FileCode, Sparkles, X, AlignLeft } from "lucide-react";

const SAMPLE_TEMPLATES = [
  {
    label: "Frontend React Engineer",
    text: `We are looking for a Senior Frontend Engineer to build high-performance React web applications. 
Key Requirements:
- 3+ years experience with React, TypeScript/JavaScript, and Next.js or Vite.
- Proficiency in HTML5, Tailwind CSS, CSS Custom Properties, and Responsive Web Design.
- Experience integrating REST APIs and GraphQL.
- Strong knowledge of Git, CI/CD, state management (Redux, Zustand, Context API).
- Experience with web performance optimization, automated testing (Jest, Cypress), and UI/UX accessibility standards.`
  },
  {
    label: "Python AI & Backend Dev",
    text: `Seeking a Backend & AI Engineer to design AI-driven services and microservices.
Key Requirements:
- 3+ years experience with Python 3.10+, FastAPI, Flask, or Django.
- Experience integrating LLMs, OpenAI API, Gemini API, and LangChain or LlamaIndex.
- Strong SQL database skills (PostgreSQL, SQLite, SQLAlchemy).
- Knowledge of Docker, REST APIs, asynchronous programming (asyncio, Celery).
- Familiarity with Vector Databases (ChromaDB, Pinecone) and prompt engineering.`
  }
];

function JobDescription({ jobDescription, setJobDescription }) {
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;
  const charCount = jobDescription.length;

  return (
    <div className="bg-[#efe9de] rounded-xl border border-[#e6dfd8] p-6 shadow-xs flex flex-col h-full justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#cc785c]">
              <FileCode size={18} />
            </div>
            <h2 className="font-display-serif text-2xl text-[#141413] font-normal">
              2. Job Description
            </h2>
          </div>
          
          {jobDescription && (
            <button
              onClick={() => setJobDescription("")}
              className="text-xs font-medium text-[#6c6a64] hover:text-[#c64545] flex items-center gap-1 bg-[#faf9f5] px-2.5 py-1 rounded-full border border-[#e6dfd8] transition-colors"
              title="Clear text"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <p className="text-sm text-[#6c6a64] mb-3">
          Paste the target target role specs to analyze keyword matching and skill alignment.
        </p>

        {/* Sample Templates Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-[#8e8b82] flex items-center gap-1 font-medium">
            <Sparkles size={12} className="text-[#cc785c]" /> Preset Samples:
          </span>
          {SAMPLE_TEMPLATES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setJobDescription(sample.text)}
              className="text-xs text-[#3d3d3a] bg-[#faf9f5] hover:bg-[#e8e0d2] px-2.5 py-1 rounded-md border border-[#e6dfd8] transition-colors"
            >
              + {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative flex-grow my-2">
        <textarea
          className="w-full h-48 sm:h-52 bg-[#faf9f5] text-[#141413] border border-[#e6dfd8] rounded-lg p-4 font-sans text-sm leading-relaxed resize-none focus:outline-none focus:border-[#cc785c] focus:ring-3 focus:ring-[#cc785c]/15 transition-all placeholder:text-[#8e8b82]"
          placeholder="Paste the target Job Description specs here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      {/* Footer Word Counter */}
      <div className="mt-2 flex items-center justify-between text-xs text-[#6c6a64] pt-2 border-t border-[#e6dfd8]/60">
        <div className="flex items-center gap-1.5 font-mono">
          <AlignLeft size={13} className="text-[#8e8b82]" />
          <span>{wordCount} words</span> • <span>{charCount} characters</span>
        </div>
        <span className={jobDescription.length > 50 ? "text-[#5db872] font-semibold" : "text-[#8e8b82]"}>
          {jobDescription.length > 50 ? "✓ Spec Ready" : "Min 30 chars recommended"}
        </span>
      </div>

    </div>
  );
}

export default JobDescription;