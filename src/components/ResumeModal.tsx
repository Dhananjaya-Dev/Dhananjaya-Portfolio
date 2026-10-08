import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF Viewer"
    >
      <div className="relative w-full max-w-4xl h-[92vh] bg-[#0c0f1c] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 bg-[#111628] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Dhananjaya Barik - Resume
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {PERSONAL_INFO.title} • Official Document
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
              aria-label="Open resume PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </a>

            <a
              href={PERSONAL_INFO.resumePath}
              download="Dhananjaya-Barik-Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
              title="Download PDF"
              aria-label="Download resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Actual PDF Document */}
        <div className="flex-1 w-full bg-[#151928] relative">
          <iframe
            src={`${PERSONAL_INFO.resumePath}#toolbar=1`}
            title="Dhananjaya Barik Resume PDF Document"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
