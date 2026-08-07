import { useState, useRef } from "react";
import api from "../services/api";
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2, ArrowUpRight } from "lucide-react";

function ResumeUpload({ setUploadedFile }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf") || selectedFile.name.endsWith(".docx")) {
        setFile(selectedFile);
        setMessage("");
        setStatus("idle");
      } else {
        setMessage("Please select a PDF file (.pdf)");
        setStatus("error");
      }
    }
  };

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setStatus("uploading");
    setMessage("Parsing document structure...");

    try {
      const response = await api.post("/upload", formData);
      setMessage(response.data.message || "Resume processed successfully");
      setUploadedFile(response.data.filename);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setMessage("Failed to parse resume document. Please try again.");
      setStatus("error");
    }
  };

  const removeFile = () => {
    setFile(null);
    setMessage("");
    setStatus("idle");
    setUploadedFile("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-[#efe9de] rounded-xl border border-[#e6dfd8] p-6 shadow-xs flex flex-col h-full justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-center text-[#cc785c]">
              <FileText size={18} />
            </div>
            <h2 className="font-display-serif text-2xl text-[#141413] font-normal">
              1. Resume Upload
            </h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6c6a64] bg-[#faf9f5] px-2.5 py-1 rounded-full border border-[#e6dfd8]">
            PDF Format
          </span>
        </div>
        <p className="text-sm text-[#6c6a64] mb-5">
          Upload your candidate resume to extract skills, experience timeline, and qualification metrics.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-[#cc785c] bg-[#cc785c]/5"
            : file
            ? "border-[#5db872] bg-[#5db872]/5"
            : "border-[#e6dfd8] bg-[#faf9f5] hover:border-[#cc785c]/50 hover:bg-[#faf9f5]/80"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />

        {!file ? (
          <div className="py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#efe9de] border border-[#e6dfd8] flex items-center justify-center mx-auto text-[#cc785c]">
              <Upload size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#141413]">
                Click or drag & drop resume here
              </p>
              <p className="text-xs text-[#8e8b82] mt-1">
                Supports PDF up to 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-[#cc785c] text-white flex items-center justify-center font-mono text-xs font-bold">
                PDF
              </div>
              <div>
                <p className="text-sm font-semibold text-[#141413] truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-[#6c6a64]">
                  {(file.size / 1024).toFixed(1)} KB • Ready
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-1.5 text-[#6c6a64] hover:text-[#c64545] rounded-md hover:bg-[#efe9de] transition-colors"
              title="Remove file"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Upload Action & Status Bar */}
      <div className="mt-5 space-y-3">
        {file && status !== "success" && (
          <button
            onClick={uploadResume}
            disabled={status === "uploading"}
            className="w-full py-2.5 px-4 rounded-md font-medium text-sm text-white bg-[#cc785c] hover:bg-[#a9583e] active:bg-[#8c3f27] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
          >
            {status === "uploading" ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Parsing PDF...
              </>
            ) : (
              <>
                Confirm & Process Resume <ArrowUpRight size={16} />
              </>
            )}
          </button>
        )}

        {/* Message Feedback Banner */}
        {message && (
          <div
            className={`p-3 rounded-md text-xs font-medium flex items-center gap-2 border ${
              status === "success"
                ? "bg-[#5db872]/10 text-[#2e683b] border-[#5db872]/30"
                : status === "error"
                ? "bg-[#c64545]/10 text-[#c64545] border-[#c64545]/30"
                : "bg-[#5db8a6]/10 text-[#256d60] border-[#5db8a6]/30"
            }`}
          >
            {status === "success" && <CheckCircle2 size={15} className="shrink-0 text-[#5db872]" />}
            {status === "error" && <AlertCircle size={15} className="shrink-0 text-[#c64545]" />}
            {status === "uploading" && <span className="w-2 h-2 rounded-full bg-[#5db8a6] animate-ping shrink-0" />}
            <span className="truncate">{message}</span>
          </div>
        )}
      </div>

    </div>
  );
}

export default ResumeUpload;