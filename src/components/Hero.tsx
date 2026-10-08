import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FileText, ArrowDown, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons/BrandIcons';
import { TechIcon } from './icons/TechIcons';
import { ProfileAvatar } from './ProfileAvatar';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden tech-grid-bg"
    >
      {/* Subtle Ambient Backing Glow (Restrained & Architectural) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[400px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning, Headline, CTAs */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-6">
            {/* Availability Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs sm:text-sm font-mono text-slate-300 backdrop-blur-md shadow-inner-light">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-medium">Fresher Candidate</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200">Open to Full Stack Java Roles</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 items-center gap-1.5 hidden sm:inline-flex">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Hyderabad, India
              </span>
            </div>

            {/* Primary Heading: Dhananjaya Barik */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              <span className="block text-slate-100">{PERSONAL_INFO.name}</span>
            </h1>

            {/* Professional Title: Full Stack Java Developer */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-wide bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.title}
              </h2>
              <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-emerald-400/60" />
            </div>

            {/* Supporting Text */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed text-balance">
              {PERSONAL_INFO.summaryHeadline}
            </p>

            {/* Primary Call-to-Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* View Resume Button */}
              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-200 shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/20 active:scale-[0.98] group"
                id="hero-resume-btn"
                aria-label="View Resume PDF (opens in a new tab)"
              >
                <FileText className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>View Resume</span>
              </a>

              {/* Explore My Work Button */}
              <button
                onClick={scrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-[#121626] hover:bg-[#181d33] border border-white/10 hover:border-cyan-500/30 transition-all duration-200 group"
                id="hero-explore-btn"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all" />
              </button>

              {/* Get In Touch Button */}
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Selected Technology Badges with Real Icons */}
            <div className="pt-4 border-t border-white/[0.08]">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 text-center lg:text-left">
                Core Specialization & Stack
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111422] border border-white/[0.08] hover:border-amber-500/40 text-slate-200 text-xs font-mono transition-colors shadow-sm">
                  <TechIcon name="Java" className="w-4 h-4" />
                  <span>Java (Core & Adv)</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111422] border border-white/[0.08] hover:border-emerald-500/40 text-slate-200 text-xs font-mono transition-colors shadow-sm">
                  <TechIcon name="Spring Boot" className="w-4 h-4" />
                  <span>Spring Boot</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111422] border border-white/[0.08] hover:border-cyan-500/40 text-slate-200 text-xs font-mono transition-colors shadow-sm">
                  <TechIcon name="React.js" className="w-4 h-4" />
                  <span>React</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111422] border border-white/[0.08] hover:border-blue-500/40 text-slate-200 text-xs font-mono transition-colors shadow-sm">
                  <TechIcon name="MySQL" className="w-4 h-4" />
                  <span>SQL (Oracle & MySQL)</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111422] border border-white/[0.08] hover:border-sky-500/40 text-slate-200 text-xs font-mono transition-colors shadow-sm">
                  <TechIcon name="Docker" className="w-4 h-4" />
                  <span>Docker</span>
                </div>
              </div>
            </div>

            {/* Social / Direct Channels */}
            <div className="flex items-center justify-center lg:justify-start gap-5 text-slate-400 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="font-mono">GitHub</span>
              </a>

              <span className="text-slate-700">|</span>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="font-mono">LinkedIn</span>
              </a>

              <span className="text-slate-700">|</span>

              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                aria-label="LeetCode Profile"
              >
                <LeetCodeIcon className="w-4 h-4 text-amber-400" />
                <span className="font-mono">LeetCode</span>
              </a>

              <span className="text-slate-700">|</span>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono">Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Personal Photo / Reusable Avatar Component Area */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Subtle ambient border halo */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500/20 via-transparent to-emerald-500/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Reusable ProfileAvatar configured for Hero */}
              <div className="relative p-2 rounded-full bg-[#0d101d] border border-white/10 shadow-2xl">
                <ProfileAvatar
                  size="hero"
                  shape="circle"
                  showStatusBadge={true}
                  className="transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            {/* Quick status caption */}
            <div className="mt-5 text-center">
              <span className="text-xs font-mono text-slate-400 block font-medium">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-cyan-400/90 block">
                {PERSONAL_INFO.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
