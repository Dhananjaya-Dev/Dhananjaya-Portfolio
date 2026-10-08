import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIChatModal } from './components/AIChatModal';

export const App: React.FC = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 selection:bg-cyan-500/25 selection:text-cyan-300 relative flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar onOpenAI={() => setIsAIChatOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Recruiter AI Assistant ("Ask Dhananjaya AI") */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onOpen={() => setIsAIChatOpen(true)}
        onClose={() => setIsAIChatOpen(false)}
      />
    </div>
  );
};

export default App;
