import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative border-t border-white/[0.06] bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering Background & Direction
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-2xl">
            Passionate about backend reliability, object-oriented design, and complete end-to-end web delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            {PERSONAL_INFO.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`p-5 rounded-2xl border transition-colors ${
                  index === 0
                    ? 'bg-[#111422] border-cyan-500/20 text-white font-medium text-lg sm:text-xl shadow-sm'
                    : 'bg-[#0e111d]/60 border-white/[0.06]'
                }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Engineering Pillars */}
            <div className="pt-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                What Guides My Development
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PERSONAL_INFO.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#111422]/90 border border-white/[0.06] hover:border-white/[0.14] transition-colors"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recruiter Quick Snapshot Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel-elevated p-6 sm:p-7 rounded-2xl border border-white/10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Candidate Snapshot
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Entry-Level Ready
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Full Name</span>
                  <p className="font-semibold text-white">{PERSONAL_INFO.name}</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Primary Target Role</span>
                  <p className="font-medium text-slate-200">
                    Full Stack Java Developer / Backend Engineer
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Current Location</span>
                  <p className="text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {PERSONAL_INFO.location}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Education</span>
                  <p className="text-slate-200 font-medium">
                    B.Tech in Computer Science Engineering (2022 - 2026)
                  </p>
                  <p className="text-xs text-slate-400">CGPA: 7.76 / 10 • BPUT Odisha</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Specialized Training</span>
                  <p className="text-slate-200 font-medium">Full Stack Java Development (2026)</p>
                  <p className="text-xs text-slate-400">Naresh i Technologies, Hyderabad</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-0.5">Work Authorization & Relocation</span>
                  <p className="text-slate-300 text-xs">
                    Immediate joining availability. Open to on-site, hybrid, and remote opportunities across India.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-cyan-500/30 transition-all text-center"
                >
                  <span>Connect directly at {PERSONAL_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Fresher Mindset Notice */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs text-slate-400 flex gap-3 items-start">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-200 font-medium">Committed to growth:</strong> Actively coding, refining microservice architectural patterns, and applying best practices in RESTful design and relational databases daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
