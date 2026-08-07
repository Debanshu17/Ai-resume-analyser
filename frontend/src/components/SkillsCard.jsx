import React from "react";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

function SkillsCard({ title, skills = [] }) {
  const isMatched = title.toLowerCase().includes("matched");
  const isMissing = title.toLowerCase().includes("missing");

  const badgeBorder = isMatched ? "border-[#5db872]/30" : isMissing ? "border-[#c64545]/30" : "border-[#e6dfd8]";
  const badgeBg = isMatched ? "bg-[#5db872]/10" : isMissing ? "bg-[#c64545]/10" : "bg-[#efe9de]";
  const badgeText = isMatched ? "text-[#5db872]" : isMissing ? "text-[#c64545]" : "text-[#141413]";
  const Icon = isMatched ? CheckCircle2 : isMissing ? AlertCircle : Sparkles;

  return (
    <div className="bg-[#181715] text-[#faf9f5] rounded-xl p-6 border border-[#252320] flex flex-col justify-between shadow-lg h-full">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#252320]">
          <div className="flex items-center gap-2">
            <Icon size={18} className={badgeText} />
            <h3 className="font-display-serif text-lg text-[#faf9f5] font-normal tracking-tight">
              {title}
            </h3>
          </div>
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${badgeBorder} ${badgeBg} ${badgeText}`}>
            {skills.length} skills
          </span>
        </div>

        {skills.length === 0 ? (
          <p className="text-xs text-[#a09d96] italic py-4">
            No specific {title.toLowerCase()} detected in analysis.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${badgeBg} ${badgeBorder} ${badgeText}`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isMatched ? "#5db872" : isMissing ? "#c64545" : "#cc785c" }} />
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#252320] flex items-center justify-between text-[11px] text-[#a09d96]">
        <span>{isMatched ? "Verified keywords" : isMissing ? "Recommended additions" : "Skills breakdown"}</span>
        <span className="font-mono">ATS Tagging</span>
      </div>
    </div>
  );
}

export default SkillsCard;