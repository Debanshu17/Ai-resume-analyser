import { useEffect, useState } from "react";
import api from "../services/api";
import SpikeMark from "../components/SpikeMark";
import { Search, Trash2, Calendar, FileText, Award, BarChart2, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const totalAnalyses = history.length;
  const highestMatch = history.length > 0 ? Math.max(...history.map((item) => item.match_percentage)) : 0;
  const averageMatch = history.length > 0 ? Math.round(history.reduce((sum, item) => sum + item.match_percentage, 0) / history.length) : 0;

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    setLoading(true);
    try {
      const response = await api.get("/history");
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteHistory(id) {
    try {
      await api.delete(`/history/${id}`);
      setDeleteId(null);
      fetchHistory();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredHistory = history.filter((item) =>
    item.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf9f5] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e6dfd8]">
        <div>
          <div className="flex items-center gap-2">
            <SpikeMark size={18} className="text-[#cc785c]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#cc785c] font-semibold">
              Archive & Logs
            </span>
          </div>
          <h1 className="font-display-serif text-4xl sm:text-5xl font-normal text-[#141413] tracking-tight mt-1">
            Resume Evaluation History
          </h1>
          <p className="text-sm text-[#6c6a64] mt-1">
            Review past candidate evaluation logs, ATS scores, and historical benchmarks.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#efe9de] text-[#141413] hover:bg-[#e8e0d2] border border-[#e6dfd8] text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back to Analyzer
        </Link>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-6 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono text-[#8e8b82] uppercase tracking-wider">Total Evaluated</span>
            <p className="font-display-serif text-4xl text-[#141413] font-medium mt-2">
              {totalAnalyses}
            </p>
            <span className="text-xs text-[#6c6a64] mt-1 inline-block">Saved PDF Resumes</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#cc785c]">
            <FileText size={24} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-6 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono text-[#8e8b82] uppercase tracking-wider">Peak Match Score</span>
            <p className="font-display-serif text-4xl text-[#5db872] font-medium mt-2">
              {highestMatch}%
            </p>
            <span className="text-xs text-[#6c6a64] mt-1 inline-block">Best Qualification Score</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#5db872]">
            <Award size={24} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-6 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-mono text-[#8e8b82] uppercase tracking-wider">Average Alignment</span>
            <p className="font-display-serif text-4xl text-[#e8a55a] font-medium mt-2">
              {averageMatch}%
            </p>
            <span className="text-xs text-[#6c6a64] mt-1 inline-block">Across all candidate specs</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#e8a55a]">
            <BarChart2 size={24} />
          </div>
        </div>

      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e8b82]" />
        <input
          type="text"
          placeholder="Search evaluation records by filename (e.g. resume.pdf)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#faf9f5] text-[#141413] border border-[#e6dfd8] rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#cc785c] focus:ring-3 focus:ring-[#cc785c]/15 transition-all"
        />
      </div>

      {/* History Records List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-sm text-[#8e8b82]">
            Loading historical evaluation logs...
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-12 text-center space-y-3">
            <Zap size={32} className="mx-auto text-[#8e8b82]" />
            <h3 className="font-display-serif text-xl text-[#141413]">No matching evaluation logs found</h3>
            <p className="text-xs text-[#6c6a64]">
              {search ? "No records match your search query." : "Run your first resume analysis to populate history logs."}
            </p>
          </div>
        ) : (
          filteredHistory.map((item) => {
            const isHigh = item.match_percentage >= 75;
            const isMed = item.match_percentage >= 50 && item.match_percentage < 75;
            const badgeColor = isHigh ? "bg-[#5db872]/15 text-[#2e683b] border-[#5db872]/30" : isMed ? "bg-[#e8a55a]/15 text-[#8c5617] border-[#e8a55a]/30" : "bg-[#c64545]/15 text-[#c64545] border-[#c64545]/30";

            return (
              <div
                key={item.id}
                className="bg-[#efe9de] border border-[#e6dfd8] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#cc785c]/40 transition-all shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-base text-[#141413]">
                      {item.file_name}
                    </span>
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      {item.match_percentage}% Match
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#6c6a64]">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#8e8b82]" />
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[11px] text-[#8e8b82]">
                      Log ID #{item.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="p-2 text-[#6c6a64] hover:text-[#c64545] hover:bg-[#faf9f5] rounded-md border border-transparent hover:border-[#e6dfd8] transition-all"
                    title="Delete log record"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-display-serif text-xl text-[#141413]">
              Delete Evaluation Log?
            </h3>
            <p className="text-xs text-[#6c6a64]">
              Are you sure you want to delete log #{deleteId}? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs font-medium text-[#3d3d3a] hover:bg-[#efe9de] rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteHistory(deleteId)}
                className="px-4 py-2 text-xs font-medium text-white bg-[#c64545] hover:bg-[#a93232] rounded-md transition-colors shadow-xs"
              >
                Delete Log
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default History;