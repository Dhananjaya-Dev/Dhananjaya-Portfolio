import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Award, MapPin, CheckCircle2 } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative border-t border-white/[0.06] bg-[#090a0f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Specialized Training
          </h2>
          <p className="mt-2 text-slate-400 text-base">
            Formal computer science engineering foundation backed by rigorous industry-standard enterprise Java full stack training.
          </p>
        </div>

        {/* Education Timeline / Cards */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 md:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-white/[0.08]">
          {EDUCATION_DATA.map((item, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                {/* Timeline Center Node */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#111422] border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 z-10 shadow-lg shadow-cyan-950/40 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                  {isFirst ? (
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Award className="w-5 h-5 text-emerald-400" />
                  )}
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div
                  className={`w-full md:w-[calc(50%-40px)] pl-14 md:pl-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'
                  }`}
                >
                  <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
                        {item.duration}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">
                        {item.score}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{item.degree}</h3>

                    <h4 className="text-sm font-medium text-slate-300 mb-1">
                      {item.institution}
                    </h4>

                    {item.university && (
                      <p className="text-xs text-slate-400 mb-2">
                        {item.university}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] space-y-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Coursework & Proficiencies:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
