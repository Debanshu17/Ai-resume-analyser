import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";
import AnalyzeButton from "../components/AnalyzeButton";
import MatchCard from "../components/MatchCard";
import SkillsCard from "../components/SkillsCard";
import AISummary from "../components/AISummary";
import Loader from "../components/Loader";
import SpikeMark from "../components/SpikeMark";
import api from "../services/api";
import { Sparkles, ArrowDown, ShieldCheck, Cpu, Zap, CheckCircle2, FileSearch } from "lucide-react";

function Home() {
  const [uploadedFile, setUploadedFile] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const resultsRef = useRef(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#cc785c", "#5db8a6", "#e8a55a", "#5db872"]
    });
  };

  const analyzeResume = async () => {
    if (!uploadedFile) {
      alert("Please upload a PDF resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a Job Description spec.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await api.post("/analyze", {
        filename: uploadedFile,
        job_description: jobDescription
      });

      setAnalysis(response.data);
      setIsAnalyzing(false);

      if (response.data.match_percentage >= 70) {
        triggerConfetti();
      }

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);

    } catch (error) {
      console.error("Analysis Error:", error);
      setIsAnalyzing(false);
      alert("Analysis failed. Please ensure the backend server is running on http://127.0.0.1:8000.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      
      {/* HERO SECTION */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#e6dfd8] max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-xs font-medium text-[#141413]">
            <SpikeMark size={14} className="text-[#cc785c]" />
            <span>Anthropic Claude Editorial Aesthetic</span>
            <span className="text-[#6c6a64]">·</span>
            <span className="text-[#cc785c] font-semibold">Gemini 2.5 AI Engine</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#141413] tracking-tight leading-[1.08]">
            Meet your resume <br className="hidden sm:inline" />
            <span className="italic font-light text-[#cc785c]">thinking partner.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#3d3d3a] leading-relaxed max-w-2xl mx-auto font-sans">
            Transform raw candidate resumes into high-impact job matches. Evaluates ATS keyword alignment, pinpoints skill gaps, and synthesizes strategic executive rewrites.
          </p>

          {/* Quick Metrics Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6c6a64] font-medium">
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-[#e8a55a]" /> Instant Semantic Parsing
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#5db872]" /> ATS Keyword Scoring
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu size={14} className="text-[#5db8a6]" /> Deep Skill Gap Audit
            </span>
          </div>

        </div>
      </section>

      {/* WORKSPACE SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display-serif text-3xl text-[#141413] font-normal">
              Analysis Workspace
            </h2>
            <p className="text-sm text-[#6c6a64] mt-1">
              Upload your resume and paste your target job description to run evaluation.
            </p>
          </div>
          <a
            href="#model-comparison"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-[#cc785c] hover:underline font-medium"
          >
            How it works <ArrowDown size={12} />
          </a>
        </div>

        {/* 2-Column Inputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ResumeUpload setUploadedFile={setUploadedFile} />
          <JobDescription jobDescription={jobDescription} setJobDescription={setJobDescription} />
        </div>

        {/* Action Button Container */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <AnalyzeButton
            analyzeResume={analyzeResume}
            isAnalyzing={isAnalyzing}
            disabled={!uploadedFile || !jobDescription.trim()}
          />
          {!uploadedFile || !jobDescription.trim() ? (
            <p className="text-xs text-[#8e8b82] mt-3">
              Upload a resume PDF and enter a job description to activate analysis.
            </p>
          ) : null}
        </div>

      </section>

      {/* LOADING OVERLAY */}
      {isAnalyzing && (
        <section className="py-10 px-4 max-w-4xl mx-auto">
          <Loader message="Extracting candidate skill matrix and matching against target job description..." />
        </section>
      )}

      {/* RESULTS SECTION (DARK NAVY PRODUCT SURFACE) */}
      {analysis && !isAnalyzing && (
        <section ref={resultsRef} className="py-16 bg-[#181715] text-[#faf9f5] border-t border-[#252320]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#252320]">
              <div>
                <div className="flex items-center gap-2">
                  <SpikeMark size={20} className="text-[#cc785c]" />
                  <span className="text-xs uppercase font-mono tracking-widest text-[#cc785c] font-semibold">
                    Evaluation Matrix Complete
                  </span>
                </div>
                <h2 className="font-display-serif text-3xl md:text-4xl text-[#faf9f5] font-normal mt-1">
                  AI Skill Alignment & ATS Report
                </h2>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-xs font-mono text-[#a09d96] hover:text-[#faf9f5] bg-[#252320] px-4 py-2 rounded-md border border-[#252320] transition-colors"
              >
                ↑ Back to Workspace
              </button>
            </div>

            {/* 3-Column Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MatchCard percentage={analysis.match_percentage} />
              <SkillsCard title="Matched Skills" skills={analysis.matched_skills} />
              <SkillsCard title="Missing Skills" skills={analysis.missing_skills} />
            </div>

            {/* AI Summary Tabbed Panel */}
            <AISummary
              summary={analysis.ai_analysis?.summary}
              strengths={analysis.ai_analysis?.strengths}
              weaknesses={analysis.ai_analysis?.weaknesses}
              suggestions={analysis.ai_analysis?.suggestions}
            />

          </div>
        </section>
      )}

      {/* MODEL / STRATEGY SHOWCASE BAND */}
      <section id="model-comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e6dfd8]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cc785c] font-semibold">
            Analysis Tiers & Methodology
          </span>
          <h2 className="font-display-serif text-4xl text-[#141413] font-normal mt-2">
            Multi-Tiered Evaluation Strategy
          </h2>
          <p className="text-sm text-[#6c6a64] mt-3">
            Designed on Claude's model hierarchy principles — balancing quick scans with deep semantic audits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Fast Scan */}
          <div className="bg-[#efe9de] rounded-xl p-8 border border-[#e6dfd8] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#5db8a6] mb-5">
                <Zap size={20} />
              </div>
              <span className="text-xs font-mono text-[#8e8b82] uppercase tracking-wider">Tier 1 · Haiku Speed</span>
              <h3 className="font-display-serif text-2xl text-[#141413] font-normal mt-1 mb-3">
                Rapid Keyword Scan
              </h3>
              <p className="text-sm text-[#6c6a64] leading-relaxed">
                Extracts raw hard skills, technical acronyms, and candidate education dates in milliseconds.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e6dfd8] text-xs text-[#8e8b82] flex items-center justify-between">
              <span>Latency: &lt; 0.5s</span>
              <span className="font-semibold text-[#5db8a6]">Standard</span>
            </div>
          </div>

          {/* Card 2: Featured Sonnet Matching */}
          <div className="bg-[#181715] text-[#faf9f5] rounded-xl p-8 border border-[#252320] flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#cc785c] text-white text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full">
              Default Active
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#252320] border border-[#252320] flex items-center justify-center text-[#cc785c] mb-5">
                <Sparkles size={20} />
              </div>
              <span className="text-xs font-mono text-[#cc785c] uppercase tracking-wider">Tier 2 · Sonnet Balance</span>
              <h3 className="font-display-serif text-2xl text-[#faf9f5] font-normal mt-1 mb-3">
                Semantic Skill Alignment
              </h3>
              <p className="text-sm text-[#a09d96] leading-relaxed">
                Understands contextual skill equivalencies (e.g., React JS ↔ Next.js, Python ↔ FastAPI) beyond exact word matches.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#252320] text-xs text-[#a09d96] flex items-center justify-between">
              <span>Gemini 2.5 Engine</span>
              <span className="font-semibold text-[#cc785c]">High Accuracy</span>
            </div>
          </div>

          {/* Card 3: Executive Audit */}
          <div className="bg-[#efe9de] rounded-xl p-8 border border-[#e6dfd8] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#e8a55a] mb-5">
                <FileSearch size={20} />
              </div>
              <span className="text-xs font-mono text-[#8e8b82] uppercase tracking-wider">Tier 3 · Opus Depth</span>
              <h3 className="font-display-serif text-2xl text-[#141413] font-normal mt-1 mb-3">
                Executive Rewrite Strategy
              </h3>
              <p className="text-sm text-[#6c6a64] leading-relaxed">
                Synthesizes strategic bullet point improvements, quantifiable achievement suggestions, and ATS formatting guidelines.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e6dfd8] text-xs text-[#8e8b82] flex items-center justify-between">
              <span>Deep Synthesis</span>
              <span className="font-semibold text-[#e8a55a]">Comprehensive</span>
            </div>
          </div>

        </div>
      </section>

      {/* FULL-BLEED CORAL CALLOUT BAND */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#cc785c] text-white rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#faf9f5]/80 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Optimize Candidate Standout
            </span>
            <h2 className="font-display-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Ready to elevate your resume fit score above 85%?
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed">
              Upload candidate PDFs, test against multiple job specifications, and review past analysis records anytime in your local history archive.
            </p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="shrink-0 bg-[#faf9f5] text-[#141413] hover:bg-[#efe9de] px-8 py-3.5 rounded-lg text-sm font-semibold transition-colors shadow-md focus:outline-none"
          >
            Start New Evaluation
          </button>
        </div>
      </section>

    </div>
  );
}

export default Home;