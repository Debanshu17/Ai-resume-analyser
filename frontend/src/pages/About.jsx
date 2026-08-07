import React from "react";
import SpikeMark from "../components/SpikeMark";
import { ShieldCheck, Cpu, Code2, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-[#faf9f5] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header Band */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <SpikeMark size={20} className="text-[#cc785c]" />
          <span className="text-xs uppercase font-mono tracking-widest text-[#cc785c] font-semibold">
            System Architecture Specs
          </span>
        </div>
        <h1 className="font-display-serif text-5xl font-normal text-[#141413] tracking-tight leading-tight">
          About AI Resume Analyser
        </h1>
        <p className="text-base text-[#3d3d3a] leading-relaxed">
          Built with an editorial warm-canvas interface following Anthropic's Claude product design specification (<code className="bg-[#efe9de] px-2 py-0.5 rounded font-mono text-xs text-[#cc785c]">DESIGN-claude.md</code>) and powered by Python FastAPI & Google Gemini 2.5 AI.
        </p>
      </div>

      {/* 2-Column Design & Tech Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Design Language */}
        <div className="bg-[#efe9de] rounded-xl p-8 border border-[#e6dfd8] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#cc785c]">
              <Layers size={20} />
            </div>
            <h2 className="font-display-serif text-2xl text-[#141413]">
              Design System Philosophy
            </h2>
          </div>

          <ul className="space-y-4 text-sm text-[#6c6a64] leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#cc785c] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#141413]">Warm Cream Canvas (<code className="font-mono text-xs">#faf9f5</code>)</strong> — Humanist background that avoids cold sterile grays or harsh pure white.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#cc785c] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#141413]">Signature Anthropic Coral (<code className="font-mono text-xs">#cc785c</code>)</strong> — Purposefully reserved for high-voltage primary actions and full-bleed callout moments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#cc785c] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#141413]">Slab-Serif Display & Monospace</strong> — Cormorant Garamond / Copernicus headlines paired with JetBrains Mono code view.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#cc785c] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#141413]">Dark Navy Surface Contrast (<code className="font-mono text-xs">#181715</code>)</strong> — Alternating dark surface cards to anchor product chrome and code blocks.
              </span>
            </li>
          </ul>
        </div>

        {/* Right: Technical Stack */}
        <div className="bg-[#181715] text-[#faf9f5] rounded-xl p-8 border border-[#252320] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#252320] border border-[#252320] flex items-center justify-center text-[#5db8a6]">
              <Cpu size={20} />
            </div>
            <h2 className="font-display-serif text-2xl text-[#faf9f5]">
              Technical Stack Breakdown
            </h2>
          </div>

          <div className="space-y-4 text-sm text-[#a09d96]">
            <div className="p-4 bg-[#1f1e1b] rounded-lg border border-[#252320] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#cc785c] uppercase">Backend API</span>
                <p className="text-sm font-semibold text-[#faf9f5]">Python FastAPI + PyPDF2</p>
              </div>
              <Code2 size={18} className="text-[#cc785c]" />
            </div>

            <div className="p-4 bg-[#1f1e1b] rounded-lg border border-[#252320] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#5db872] uppercase">Database Persistence</span>
                <p className="text-sm font-semibold text-[#faf9f5]">SQLite + SQLAlchemy ORM</p>
              </div>
              <ShieldCheck size={18} className="text-[#5db872]" />
            </div>

            <div className="p-4 bg-[#1f1e1b] rounded-lg border border-[#252320] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#5db8a6] uppercase">AI Intelligence Engine</span>
                <p className="text-sm font-semibold text-[#faf9f5]">Google Gemini Flash / Pro API</p>
              </div>
              <Cpu size={18} className="text-[#5db8a6]" />
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer Callout */}
      <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display-serif text-2xl text-[#141413]">
            Ready to test candidate resumes?
          </h3>
          <p className="text-xs text-[#6c6a64] mt-1">
            Jump back to the analysis workspace to evaluate candidate qualifications.
          </p>
        </div>
        <Link
          to="/"
          className="px-6 py-3 bg-[#cc785c] text-white hover:bg-[#a9583e] rounded-md font-medium text-sm flex items-center gap-2 transition-colors shrink-0 shadow-xs"
        >
          Open Workspace <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}

export default About;
