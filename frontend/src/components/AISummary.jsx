import { useState } from "react";
import { Sparkles, CheckCircle, AlertTriangle, Lightbulb, Code, Copy, Check } from "lucide-react";

function AISummary({
  summary = "",
  strengths = [],
  weaknesses = [],
  suggestions = []
}) {
  const [activeTab, setActiveTab] = useState("summary");
  const [copied, setCopied] = useState(false);

  const rawJson = JSON.stringify({ summary, strengths, weaknesses, suggestions }, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#181715] text-[#faf9f5] rounded-xl border border-[#252320] shadow-xl overflow-hidden">
      
      {/* Product Chrome Top Bar */}
      <div className="bg-[#1f1e1b] px-6 py-4 border-b border-[#252320] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mock Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#c64545]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#e8a55a]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#5db872]/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-[#a09d96] pl-2 border-l border-[#252320]">
            Claude-3.6-Sonnet / Synthesis Output
          </span>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1 bg-[#181715] p-1 rounded-lg border border-[#252320]">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "summary"
                ? "bg-[#252320] text-[#faf9f5] font-semibold"
                : "text-[#a09d96] hover:text-[#faf9f5]"
            }`}
          >
            <Sparkles size={13} className="text-[#cc785c]" /> Summary
          </button>

          <button
            onClick={() => setActiveTab("strengths")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "strengths"
                ? "bg-[#252320] text-[#faf9f5] font-semibold"
                : "text-[#a09d96] hover:text-[#faf9f5]"
            }`}
          >
            <CheckCircle size={13} className="text-[#5db872]" /> Strengths ({strengths.length})
          </button>

          <button
            onClick={() => setActiveTab("weaknesses")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "weaknesses"
                ? "bg-[#252320] text-[#faf9f5] font-semibold"
                : "text-[#a09d96] hover:text-[#faf9f5]"
            }`}
          >
            <AlertTriangle size={13} className="text-[#e8a55a]" /> Gaps ({weaknesses.length})
          </button>

          <button
            onClick={() => setActiveTab("suggestions")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "suggestions"
                ? "bg-[#252320] text-[#faf9f5] font-semibold"
                : "text-[#a09d96] hover:text-[#faf9f5]"
            }`}
          >
            <Lightbulb size={13} className="text-[#5db8a6]" /> Suggestions ({suggestions.length})
          </button>

          <button
            onClick={() => setActiveTab("json")}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === "json"
                ? "bg-[#252320] text-[#cc785c] font-semibold"
                : "text-[#a09d96] hover:text-[#faf9f5]"
            }`}
          >
            <Code size={13} /> JSON
          </button>
        </div>
      </div>

      {/* Main Tab Content Body */}
      <div className="p-6 md:p-8">
        
        {/* TAB 1: Executive Summary */}
        {activeTab === "summary" && (
          <div className="space-y-4">
            <h3 className="font-display-serif text-2xl text-[#faf9f5] font-normal tracking-tight">
              Executive Evaluation Summary
            </h3>
            <p className="text-sm md:text-base text-[#a09d96] leading-relaxed font-sans border-l-2 border-[#cc785c] pl-4 py-1">
              {summary || "No executive summary generated yet."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-6 border-t border-[#252320]">
              <div className="bg-[#1f1e1b] p-4 rounded-lg border border-[#252320]">
                <span className="text-xs font-mono text-[#5db872] uppercase tracking-wider">Top Match Factor</span>
                <p className="text-xs text-[#faf9f5] mt-1 font-medium">Strong core skill keyword alignment in recent experience history.</p>
              </div>
              <div className="bg-[#1f1e1b] p-4 rounded-lg border border-[#252320]">
                <span className="text-xs font-mono text-[#e8a55a] uppercase tracking-wider">Primary Gap</span>
                <p className="text-xs text-[#faf9f5] mt-1 font-medium">Missing specific framework toolings highlighted in role requirements.</p>
              </div>
              <div className="bg-[#1f1e1b] p-4 rounded-lg border border-[#252320]">
                <span className="text-xs font-mono text-[#5db8a6] uppercase tracking-wider">Action Priority</span>
                <p className="text-xs text-[#faf9f5] mt-1 font-medium">Integrate missing technical keywords into your experience bullet points.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Strengths */}
        {activeTab === "strengths" && (
          <div className="space-y-4">
            <h3 className="font-display-serif text-2xl text-[#faf9f5] font-normal tracking-tight flex items-center gap-2">
              <CheckCircle className="text-[#5db872]" size={22} /> Identified Candidate Strengths
            </h3>
            <ul className="space-y-3 pt-2">
              {strengths.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#1f1e1b] border border-[#252320] rounded-lg p-4 text-sm text-[#faf9f5] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#5db872]/20 text-[#5db872] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 3: Weaknesses / Gaps */}
        {activeTab === "weaknesses" && (
          <div className="space-y-4">
            <h3 className="font-display-serif text-2xl text-[#faf9f5] font-normal tracking-tight flex items-center gap-2">
              <AlertTriangle className="text-[#e8a55a]" size={22} /> Qualification Gaps & Missing Specs
            </h3>
            <ul className="space-y-3 pt-2">
              {weaknesses.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#1f1e1b] border border-[#252320] rounded-lg p-4 text-sm text-[#faf9f5] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#e8a55a]/20 text-[#e8a55a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    !
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 4: Suggestions */}
        {activeTab === "suggestions" && (
          <div className="space-y-4">
            <h3 className="font-display-serif text-2xl text-[#faf9f5] font-normal tracking-tight flex items-center gap-2">
              <Lightbulb className="text-[#5db8a6]" size={22} /> Strategic Optimization Recommendations
            </h3>
            <ul className="space-y-3 pt-2">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#1f1e1b] border border-[#252320] rounded-lg p-4 text-sm text-[#faf9f5] flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#5db8a6]/20 text-[#5db8a6] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    →
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 5: JSON Code View */}
        {activeTab === "json" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#a09d96]">
                Structured Analysis Payload (JSON)
              </span>
              <button
                onClick={handleCopyJson}
                className="text-xs font-mono text-[#cc785c] hover:text-[#faf9f5] bg-[#1f1e1b] border border-[#252320] px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={13} className="text-[#5db872]" /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy Payload"}
              </button>
            </div>
            <pre className="bg-[#1f1e1b] text-[#5db8a6] p-5 rounded-lg border border-[#252320] font-mono text-xs overflow-x-auto leading-relaxed max-h-80 select-all">
              {rawJson}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
}

export default AISummary;