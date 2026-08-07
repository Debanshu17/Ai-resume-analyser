import React from "react";
import SpikeMark from "./SpikeMark";

function Loader({ message = "Analyzing Resume with AI..." }) {
  return (
    <div className="bg-[#181715] text-[#faf9f5] rounded-xl p-10 border border-[#252320] flex flex-col items-center justify-center text-center shadow-2xl my-8">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] flex items-center justify-center pulse-glow">
          <SpikeMark size={36} className="text-[#141413] spin-slow" />
        </div>
        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#cc785c] animate-ping" />
      </div>

      <h3 className="font-display-serif text-2xl text-[#faf9f5] font-normal tracking-tight mb-2">
        Claude Intelligence Engine
      </h3>

      <p className="text-sm text-[#a09d96] font-sans mb-6 max-w-md leading-relaxed">
        {message}
      </p>

      {/* Progress steps animation */}
      <div className="w-full max-w-sm bg-[#1f1e1b] rounded-lg p-3 border border-[#252320] space-y-2 text-left text-xs font-mono">
        <div className="flex items-center gap-2 text-[#5db872]">
          <span>✓</span> <span>Extracting document metadata & text...</span>
        </div>
        <div className="flex items-center gap-2 text-[#5db8a6] animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5db8a6]"></span> <span>Matching skill vectors against job specs...</span>
        </div>
        <div className="flex items-center gap-2 text-[#a09d96]">
          <span>○</span> <span>Generating strategic optimization report...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
