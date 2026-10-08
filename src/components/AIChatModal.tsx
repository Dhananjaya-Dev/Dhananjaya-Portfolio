import React, { useState, useRef, useEffect } from 'react';
import { queryAIAssistant, type ChatAction, type ActionType } from '../services/aiAssistantService';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Mail,
  Coffee,
  Code2,
  GraduationCap,
  Rocket
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  actions?: ChatAction[];
  isGemini?: boolean;
}

const WELCOME_TEXT =
  "Hi! I'm Dhananjaya's AI portfolio assistant. I can quickly tell you about his Java skills, education, projects, and how to contact him.";

interface QuickActionChip {
  id: string;
  label: string;
  prompt: string;
  icon: React.ReactNode;
  directAction?: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  onOpen
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: WELCOME_TEXT,
      timestamp: 'Just now',
      suggestedQuestions: [
        'Why Java?',
        'What are his skills?',
        'Tell me about his education.',
        'Is he open to opportunities?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'contact', label: 'Contact Dhananjaya' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => textareaRef.current?.focus(), 120);
    }
  }, [isOpen, messages, isTyping]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await queryAIAssistant(text);
      const assistantMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: response.suggestedFollowUps,
        actions: response.actions,
        isGemini: response.isGemini
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: `I encountered a brief issue retrieving the information. Please feel free to email Dhananjaya directly at ${PERSONAL_INFO.email}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { type: 'contact', label: 'Contact Dhananjaya' },
          { type: 'resume', label: 'View Resume' }
        ]
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'assistant',
        text: WELCOME_TEXT,
        timestamp: 'Just now',
        suggestedQuestions: [
          'Why Java?',
          'What are his skills?',
          'Tell me about his education.',
          'Is he open to opportunities?'
        ],
        actions: [
          { type: 'resume', label: 'View Resume' },
          { type: 'contact', label: 'Contact Dhananjaya' }
        ]
      }
    ]);
  };

  const handleActionClick = (actionType: ActionType) => {
    if (actionType === 'resume') {
      window.open(PERSONAL_INFO.resumePath, '_blank', 'noopener,noreferrer');
    } else if (actionType === 'contact') {
      onClose();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(`mailto:${PERSONAL_INFO.email}`, '_self');
      }
    } else if (actionType === 'github') {
      window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
    } else if (actionType === 'linkedin') {
      window.open(PERSONAL_INFO.linkedin, '_blank', 'noopener,noreferrer');
    }
  };

  // Quick Action Chips as specified in requirement #3
  const QUICK_ACTION_CHIPS: QuickActionChip[] = [
    {
      id: 'chip-why-java',
      label: 'Why Java?',
      prompt: 'Why did Dhananjaya choose Java?',
      icon: <Coffee className="w-3.5 h-3.5 text-amber-400" />
    },
    {
      id: 'chip-skills',
      label: 'What are his skills?',
      prompt: 'What are Dhananjaya’s technical skills and stack?',
      icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />
    },
    {
      id: 'chip-education',
      label: 'Education',
      prompt: 'Tell me about Dhananjaya’s education and certifications.',
      icon: <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
    },
    {
      id: 'chip-opportunities',
      label: 'Open to opportunities?',
      prompt: 'Is Dhananjaya open to entry-level opportunities?',
      icon: <Rocket className="w-3.5 h-3.5 text-emerald-400" />
    },
    {
      id: 'chip-resume',
      label: 'View Resume',
      prompt: 'Tell me about his resume credentials.',
      icon: <FileText className="w-3.5 h-3.5 text-cyan-400" />,
      directAction: () => {
        window.open(PERSONAL_INFO.resumePath, '_blank', 'noopener,noreferrer');
      }
    },
    {
      id: 'chip-contact',
      label: 'Contact Dhananjaya',
      prompt: 'How can I contact Dhananjaya Barik?',
      icon: <Mail className="w-3.5 h-3.5 text-emerald-400" />
    }
  ];

  return (
    <>
      {/* 1. Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#0d101e]/95 hover:bg-[#12172b] text-cyan-300 border border-cyan-500/35 hover:border-cyan-400 shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/25 backdrop-blur-md transition-all duration-300 group hover:-translate-y-0.5 active:scale-95"
          aria-label="✦ Ask Dhananjaya AI Recruiter Assistant"
          id="ask-dhananjaya-ai-btn"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-cyan-300 transition-colors">
            ✦ Ask Dhananjaya AI
          </span>
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-w-[440px] h-[600px] max-h-[85vh] flex flex-col rounded-2xl bg-[#0b0e1b] border border-cyan-500/30 shadow-2xl shadow-black/90 overflow-hidden animate-fade-in backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Dhananjaya AI Recruiter Assistant"
        >
          {/* 2. Chat Header */}
          <div className="px-4 py-3.5 bg-[#101528] border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    ✦ Dhananjaya AI
                  </h3>
                  {/* Status Indicator */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available</span>
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400">
                  Recruiter Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Clear chat history"
                aria-label="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Close chat"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips Bar (Visible above message stream for fast recruiter exploration) */}
          <div className="px-3 py-2 bg-[#0d1122]/90 border-b border-white/[0.05] overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {QUICK_ACTION_CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => {
                    if (chip.directAction) {
                      chip.directAction();
                    } else {
                      handleSendMessage(chip.prompt);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 hover:text-cyan-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-150 active:scale-95"
                >
                  {chip.icon}
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 leading-relaxed relative group ${
                      isAssistant
                        ? 'bg-[#14192d] text-slate-200 border border-white/[0.08] shadow-sm'
                        : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md rounded-br-sm'
                    }`}
                  >
                    {/* Message Body */}
                    <div className="whitespace-pre-wrap leading-relaxed text-[12px] sm:text-[13px]">
                      {msg.text}
                    </div>

                    {/* Copy action for assistant responses */}
                    {isAssistant && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 rounded bg-black/50 text-slate-400 hover:text-white transition-opacity"
                        title="Copy text"
                        aria-label="Copy response to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Recruiter Action Buttons (Direct Links for Resume, Contact, GitHub, LinkedIn) */}
                  {isAssistant && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%]">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => handleActionClick(act.type)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold text-slate-200 bg-[#161c33] hover:bg-[#1e2544] border border-cyan-500/30 hover:border-cyan-400/60 shadow-sm transition-all duration-150"
                        >
                          {act.type === 'resume' && <FileText className="w-3.5 h-3.5 text-cyan-400" />}
                          {act.type === 'contact' && <Mail className="w-3.5 h-3.5 text-emerald-400" />}
                          {act.type === 'github' && <GithubIcon className="w-3.5 h-3.5 text-slate-300" />}
                          {act.type === 'linkedin' && <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />}
                          <span>{act.label}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp and engine indicator */}
                  <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400 font-mono">
                    <span>{msg.timestamp}</span>
                    {isAssistant && msg.isGemini && (
                      <span className="text-[9px] text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded border border-cyan-500/20">
                        Gemini AI
                      </span>
                    )}
                  </div>

                  {/* Suggested Follow-Up Question Chips */}
                  {isAssistant && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/25 hover:border-cyan-400/40 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 7. Typing Indicator (3 animated dots) */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#14192d] border border-white/[0.08] w-fit shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form Area */}
          <div className="p-3 bg-[#101528] border-t border-white/[0.08] shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Ask about skills, Java, education, resume..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-[#161c32] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50 resize-none max-h-24"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-bold transition-all shadow-sm active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono text-slate-400">
                Recruiter Intelligence • Verified Portfolio Data
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
