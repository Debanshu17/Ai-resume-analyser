import React from "react";
import { Link } from "react-router-dom";
import SpikeMark from "./SpikeMark";
import { Cpu, ShieldCheck, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#181715] text-[#a09d96] pt-16 pb-12 border-t border-[#252320]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#252320]">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-[#252320]">
                <SpikeMark size={20} className="text-[#faf9f5]" />
              </div>
              <span className="font-display-serif text-xl text-[#faf9f5] font-normal tracking-tight">
                Claude <span className="font-sans text-xs text-[#cc785c] uppercase font-semibold">Editorial</span>
              </span>
            </div>
            <p className="text-sm text-[#a09d96] leading-relaxed">
              A warm-canvas editorial interface for resume optimization, powered by Google Gemini AI & Anthropic design aesthetics.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1e1b] border border-[#252320] text-xs text-[#5db872]">
              <span className="w-2 h-2 rounded-full bg-[#5db872] animate-pulse"></span>
              All Systems Operational
            </div>
          </div>

          {/* Column 2: System Capabilities */}
          <div>
            <h4 className="text-xs font-semibold text-[#faf9f5] uppercase tracking-widest mb-4">
              Core Engine
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#faf9f5] transition-colors">
                  ATS Match Scoring
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#faf9f5] transition-colors">
                  Semantic Skill Gap Audit
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#faf9f5] transition-colors">
                  AI Strengths & Weaknesses
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#faf9f5] transition-colors">
                  Structured Json Output
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Design & Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-[#faf9f5] uppercase tracking-widest mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Cpu size={14} className="text-[#cc785c]" />
                FastAPI Python Backend
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#5db8a6]" />
                Google Gemini Pro / Flash AI
              </li>
              <li className="flex items-center gap-2">
                <Heart size={14} className="text-[#e8a55a]" />
                Vite + React + Tailwind v4
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-[#faf9f5] uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#faf9f5] transition-colors">
                  Resume Workspace
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-[#faf9f5] transition-colors">
                  Analysis History Logs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#faf9f5] transition-colors">
                  Design System Specs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e8b82] gap-4">
          <p>© {new Date().getFullYear()} AI Resume Analyser. Crafted with warm cream canvas & editorial elegance.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>API Status</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
