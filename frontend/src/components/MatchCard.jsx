import React from "react";
import { Award, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

function MatchCard({ percentage = 0 }) {
  // Color coding based on percentage score
  let statusColor = "#5db872"; // Green
  let statusBadge = "Strong Match";
  let StatusIcon = CheckCircle2;
  let bgGlow = "rgba(93, 184, 114, 0.15)";

  if (percentage < 50) {
    statusColor = "#c64545"; // Red
    statusBadge = "Low Match";
    StatusIcon = AlertTriangle;
    bgGlow = "rgba(198, 69, 69, 0.15)";
  } else if (percentage < 75) {
    statusColor = "#e8a55a"; // Amber
    statusBadge = "Moderate Alignment";
    StatusIcon = Zap;
    bgGlow = "rgba(232, 165, 90, 0.15)";
  } else {
    statusBadge = "Exceptional Fit";
    StatusIcon = Award;
  }

  // SVG Circular progress math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#181715] text-[#faf9f5] rounded-xl p-6 border border-[#252320] flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
      
      {/* Subtle Background Glow Accent */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: bgGlow }}
      />

      <div className="flex items-center gap-2 mb-4">
        <StatusIcon size={18} style={{ color: statusColor }} />
        <h3 className="font-display-serif text-lg text-[#faf9f5] font-normal tracking-tight">
          ATS Match Index
        </h3>
      </div>

      {/* SVG Radial Gauge */}
      <div className="relative w-32 h-32 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#252320"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Active progress track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={statusColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display-serif text-3xl font-medium text-[#faf9f5] leading-none">
            {percentage}%
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#a09d96] mt-1">
            Match Score
          </span>
        </div>
      </div>

      {/* Status Badge Tag */}
      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
        style={{
          borderColor: `${statusColor}40`,
          backgroundColor: `${statusColor}15`,
          color: statusColor
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
        {statusBadge}
      </div>

    </div>
  );
}

export default MatchCard;