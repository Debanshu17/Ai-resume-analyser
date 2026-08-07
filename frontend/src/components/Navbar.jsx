import React from "react";
import { Link, useLocation } from "react-router-dom";
import SpikeMark from "./SpikeMark";
import { Sparkles, History, Info, FileText } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f5] border-b border-[#e6dfd8] h-16 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="p-1.5 rounded-md bg-[#efe9de] group-hover:bg-[#e8e0d2] transition-colors">
            <SpikeMark size={22} className="text-[#141413]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display-serif text-xl text-[#141413] tracking-tight leading-none font-medium">
              Claude <span className="font-sans text-xs uppercase tracking-widest text-[#cc785c] font-semibold ml-1">Editorial</span>
            </span>
            <span className="text-[11px] text-[#6c6a64] font-medium tracking-wide">
              AI Resume Analyser
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#efe9de]/60 p-1 rounded-lg border border-[#e6dfd8]">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              isActive("/")
                ? "bg-[#faf9f5] text-[#141413] shadow-sm font-semibold border border-[#e6dfd8]"
                : "text-[#6c6a64] hover:text-[#141413] hover:bg-[#efe9de]"
            }`}
          >
            <Sparkles size={15} className={isActive("/") ? "text-[#cc785c]" : ""} />
            Analyzer
          </Link>

          <Link
            to="/history"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              isActive("/history")
                ? "bg-[#faf9f5] text-[#141413] shadow-sm font-semibold border border-[#e6dfd8]"
                : "text-[#6c6a64] hover:text-[#141413] hover:bg-[#efe9de]"
            }`}
          >
            <History size={15} className={isActive("/history") ? "text-[#cc785c]" : ""} />
            History
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              isActive("/about")
                ? "bg-[#faf9f5] text-[#141413] shadow-sm font-semibold border border-[#e6dfd8]"
                : "text-[#6c6a64] hover:text-[#141413] hover:bg-[#efe9de]"
            }`}
          >
            <Info size={15} className={isActive("/about") ? "text-[#cc785c]" : ""} />
            About System
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#cc785c] hover:bg-[#a9583e] active:bg-[#8c3f27] rounded-md shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#cc785c]/30"
          >
            <FileText size={15} className="mr-1.5" />
            New Analysis
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
