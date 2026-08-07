import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

function AnalyzeButton({ analyzeResume, isAnalyzing = false, disabled = false }) {
  return (
    <button
      onClick={analyzeResume}
      disabled={disabled || isAnalyzing}
      className={`relative group overflow-hidden px-8 py-3.5 rounded-lg text-base font-semibold text-white transition-all duration-200 flex items-center gap-3 shadow-md focus:outline-none focus:ring-4 focus:ring-[#cc785c]/30 ${
        disabled || isAnalyzing
          ? "bg-[#e6dfd8] text-[#6c6a64] cursor-not-allowed shadow-none border border-[#e6dfd8]"
          : "bg-[#cc785c] hover:bg-[#a9583e] active:bg-[#8c3f27] cursor-pointer pulse-glow"
      }`}
    >
      {isAnalyzing ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Synthesizing Gemini AI Insights...</span>
        </>
      ) : (
        <>
          <Sparkles size={19} className="text-[#faf9f5] group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-sans tracking-wide">Run AI Resume Analysis</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
        </>
      )}
    </button>
  );
}

export default AnalyzeButton;
