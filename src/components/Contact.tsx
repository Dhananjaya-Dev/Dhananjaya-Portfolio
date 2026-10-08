import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  ArrowRight,
  Edit3
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './icons/BrandIcons';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'unconfigured' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@company.com)';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please provide a subject line';
    } else if (formData.subject.trim().length < 2) {
      errs.subject = 'Subject must be at least 2 characters';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide your message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || status === 'submitting') {
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Honest real delivery success
        setStatus('success');
        setServerMessage(data.message || 'Your message has been delivered successfully.');
      } else if (data.configured === false || response.status === 503) {
        // Honest unconfigured state — NEVER falsely claim message was sent
        setStatus('unconfigured');
        setServerMessage(
          data.message ||
            'The message service is not configured yet. Please use the email or LinkedIn links below.'
        );
      } else {
        // Error response from server
        setStatus('error');
        setServerMessage(
          data.error ||
            'Could not deliver the message. Please contact Dhananjaya directly via email.'
        );
      }
    } catch {
      // Network or offline error
      setStatus('error');
      setServerMessage(
        'The message service is not configured yet. Please use the email or LinkedIn links below.'
      );
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setErrors({});
    setServerMessage('');
  };

  const handleReturnToEdit = () => {
    setStatus('idle');
  };

  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry / Job Opportunity'
  )}&body=${encodeURIComponent(
    formData.message
      ? `Hi Dhananjaya,\n\nFrom: ${formData.name || 'Recruiter'} (${formData.email || 'Email'})\n\nMessage:\n${formData.message}`
      : `Hi Dhananjaya,\n\nI came across your Full Stack Java Developer portfolio and would like to connect.`
  )}`;

  return (
    <section id="contact" className="py-24 relative border-t border-white/[0.06] bg-[#090a0f]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-cyan-600/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something Great
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
            I am actively open to entry-level Full Stack Java Developer and Backend Developer opportunities. Whether you have an open position, an inquiry, or would like to discuss engineering, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Details & Verified Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-400">
                  Feel free to use the form or get in touch through any of the channels below.
                </p>
              </div>

              {/* Email direct copy box */}
              <div className="p-4 rounded-xl bg-[#131728] border border-white/[0.08] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-400 block">Direct Email</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location info */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#131728] border border-white/[0.08]">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Location</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>

              {/* Professional Profiles */}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <span className="text-xs font-mono uppercase text-slate-400 block">
                  Professional Profiles:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#111422] border border-white/[0.06] hover:border-cyan-500/40 text-xs text-slate-200 hover:text-white transition-all group"
                    aria-label="LinkedIn Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-2">
                      <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#111422] border border-white/[0.06] hover:border-white/20 text-xs text-slate-200 hover:text-white transition-all group"
                    aria-label="GitHub Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-slate-300" />
                      <span className="font-medium">GitHub</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>

                  <a
                    href={PERSONAL_INFO.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#111422] border border-white/[0.06] hover:border-amber-500/40 text-xs text-slate-200 hover:text-white transition-all group sm:col-span-2"
                    aria-label="LeetCode Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-2">
                      <LeetCodeIcon className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">LeetCode Problem Solving</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: "Send Me a Message" Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-elevated p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-1">
                Send Me a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below to reach out directly regarding engineering opportunities.
              </p>

              {/* State A: Honest Success Delivery State */}
              {status === 'success' && (
                <div className="p-6 rounded-xl bg-[#101b22] border border-emerald-500/40 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      Message Delivered Successfully!
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. Your message has been transmitted to <span className="text-cyan-300 font-mono">{PERSONAL_INFO.email}</span>. Dhananjaya will review and respond promptly.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}

              {/* State B: Honest Unconfigured Service State (Strict Compliance: Never fake success) */}
              {status === 'unconfigured' && (
                <div className="p-6 rounded-xl bg-[#161a29] border border-cyan-500/30 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      Message Service Pending Configuration
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      {serverMessage ||
                        'The message service is not configured yet. Please use the email or LinkedIn links below.'}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-2 max-w-md mx-auto">
                      Your drafted message has been preserved. You can launch your mail client with your message pre-filled with one click:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={mailtoUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-colors shadow-md"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Default Mail Client</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>LinkedIn Message</span>
                    </a>

                    <button
                      onClick={handleReturnToEdit}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Form</span>
                    </button>
                  </div>
                </div>
              )}

              {/* State C: Active Form */}
              {(status === 'idle' || status === 'submitting' || status === 'error') && (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Error banner if submission failed */}
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5 animate-fade-in">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block">Submission Notice</span>
                        <p className="mt-0.5 text-slate-300">
                          {serverMessage ||
                            'The message service is not configured yet. Please use the email or LinkedIn links below.'}
                        </p>
                        <a
                          href={mailtoUrl}
                          className="inline-flex items-center gap-1 text-cyan-300 hover:underline mt-1 font-mono text-[11px]"
                        >
                          <span>Click here to open email directly</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-slate-300 mb-1.5"
                      >
                        Your Name <span className="text-cyan-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        disabled={status === 'submitting'}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full bg-[#131728] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors disabled:opacity-50 ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-400'
                            : 'border-white/10 focus:border-cyan-400'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono animate-fade-in"
                        >
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-slate-300 mb-1.5"
                      >
                        Email Address <span className="text-cyan-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="s.jenkins@company.com"
                        value={formData.email}
                        disabled={status === 'submitting'}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full bg-[#131728] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors disabled:opacity-50 ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-400'
                            : 'border-white/10 focus:border-cyan-400'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono animate-fade-in"
                        >
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Subject <span className="text-cyan-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Opportunity / Interview Inquiry / Collaboration"
                      value={formData.subject}
                      disabled={status === 'submitting'}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      aria-required="true"
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={`w-full bg-[#131728] border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors disabled:opacity-50 ${
                        errors.subject
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.subject && (
                      <p
                        id="contact-subject-error"
                        className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono animate-fade-in"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-slate-300 mb-1.5"
                    >
                      Message <span className="text-cyan-400" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      disabled={status === 'submitting'}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-required="true"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full bg-[#131728] border rounded-xl p-3.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors resize-none disabled:opacity-50 ${
                        errors.message
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono animate-fade-in"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-cyan-950/40 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Architecture & Privacy Disclaimer */}
                  <div className="pt-1 text-center">
                    <p className="text-[10px] font-mono text-slate-400 leading-normal">
                      Secure server-side delivery architecture. Direct email: <span className="text-slate-300">{PERSONAL_INFO.email}</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
