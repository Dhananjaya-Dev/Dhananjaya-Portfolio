import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  Server,
  Layout,
  Database,
  Cloud,
  Terminal,
  Sparkles,
  Search,
  Code
} from 'lucide-react';
import { TechIcon } from './icons/TechIcons';

const ICON_MAP: Record<string, React.ReactNode> = {
  Server: <Server className="w-5 h-5 text-emerald-400" />,
  Layout: <Layout className="w-5 h-5 text-cyan-400" />,
  Database: <Database className="w-5 h-5 text-blue-400" />,
  Cloud: <Cloud className="w-5 h-5 text-sky-400" />,
  Terminal: <Terminal className="w-5 h-5 text-amber-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-purple-400" />
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) {
      return true;
    }
    const q = searchQuery.toLowerCase();
    const matchesName = cat.name.toLowerCase().includes(q);
    const matchesSkills = cat.skills.some((skill) => skill.toLowerCase().includes(q));
    return matchesName || matchesSkills;
  });

  return (
    <section id="skills" className="py-24 relative border-t border-white/[0.06] bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Skills & Engineering Stack
            </h2>
            <p className="mt-2 text-slate-400 text-base max-w-2xl">
              Categorized technical skill set spanning core backend architectures, modern frontend interfaces, database design, and cloud workflows.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (e.g. Spring, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111422] border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.06]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
            }`}
          >
            All Categories ({SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-400">({cat.skills.length})</span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const isAI = category.id === 'ai';
            const isBackend = category.id === 'backend';

            return (
              <div
                key={category.id}
                className={`glass-panel rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 relative overflow-hidden ${
                  isBackend
                    ? 'border-emerald-500/30 bg-[#0f1424]/80 shadow-lg shadow-emerald-950/20 md:col-span-2 lg:col-span-1'
                    : 'border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                {/* Background watermark/accent */}
                {isBackend && (
                  <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                )}

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                        {ICON_MAP[category.iconName] || <Code className="w-5 h-5 text-cyan-400" />}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {category.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {category.skills.length} competencies
                        </span>
                      </div>
                    </div>

                    {isBackend && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Primary Focus
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills badges with Real Technology Icons */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => {
                      const isHighlighted =
                        searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            isHighlighted
                              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400 shadow-sm'
                              : 'bg-[#151928] text-slate-200 border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#1a2034]'
                          }`}
                        >
                          <TechIcon name={skill} className="w-4 h-4 shrink-0" />
                          <span className="font-medium">{skill}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Footnote for AI Category to reinforce engineering integrity */}
                {isAI && (
                  <div className="mt-5 pt-4 border-t border-white/[0.06] bg-purple-950/20 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <p className="text-[11px] text-purple-300/80 leading-normal">
                      <strong>Professional Practice:</strong> AI tools are leveraged purely as development accelerators for testing, refactoring, and documentation—grounded upon rigorous fundamental Java engineering.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
