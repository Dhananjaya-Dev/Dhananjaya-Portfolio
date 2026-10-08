import React from 'react';
import { PROJECTS_IN_PROGRESS } from '../data/portfolioData';
import { Clock, Sparkles, FolderGit2 } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative border-t border-white/[0.06] bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/40 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Active Development</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Projects in Progress
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Currently building practical applications across Java, Spring Boot, React, databases, microservices, and cloud technologies.
          </p>
        </div>

        {/* 3 Attractive Placeholder Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS_IN_PROGRESS.map((project, idx) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl p-7 flex flex-col justify-between border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 relative group overflow-hidden shadow-lg"
            >
              {/* Subtle architectural background grid */}
              <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />

              <div className="relative z-10">
                {/* Header with Slot & Status Indicator */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/20">
                    Slot #{idx + 1}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span>In Progress</span>
                  </span>
                </div>

                {/* Blueprint Card Visual Area */}
                <div className="mb-6 p-6 rounded-xl bg-[#090c17] border border-white/[0.06] flex flex-col items-center justify-center text-center group-hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                    <FolderGit2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Repository Architecture
                  </span>
                </div>

                {/* Primary Card Heading: Project Coming Soon */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Detailed project information, architectural overview, and live repository links will be added later.
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Build underway</span>
                </span>
                <span className="text-slate-400 text-[11px]">
                  Upcoming Showcase
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Progress Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#111628] to-[#0f1422] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Honest & Verifiable Engineering
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Each project slot will be populated with tested code, schema definitions, and public GitHub repositories as milestones are completed.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>3 Project Slots In Progress</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
