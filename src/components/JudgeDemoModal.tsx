import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { voiceAnnouncer } from '../voice/voiceAnnouncer';
import confetti from 'canvas-confetti';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Trophy, 
  Zap, 
  Play
} from 'lucide-react';


interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstantDemonstration: () => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onInstantDemonstration
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "Google for Developers // PromptWars x OUTLIER'2026",
      badge: "The Problem Statement",
      text: "We all procrastinate on painful digital chores—cleaning out 5,000 unread emails, sorting messy folders, reviewing expenses, or fixing lint errors. Build an experience where playing a fast-paced game or interactive story actually executes the real-world chore in the background.",
      highlight: "ChoreSlayer turns soul-crushing digital suffering into high-octane gaming with an authentic asynchronous background execution daemon."
    },
    {
      title: "Arena 1: Inbox Invaders (5,000 Unread Emails)",
      badge: "Mailbox Purge",
      text: "Fast-paced space shooter on HTML5 Canvas. Zapping spam auto-unsubscribes and archives them; capturing VIP boss emails stars them and drafts an AI reply. Press [B] for the Super Mass Bomb to vaporize 500 unreads at once down to Inbox Zero!",
      highlight: "Real RFC-822 / IMAP commands executed live in the background worker."
    },
    {
      title: "Arena 2: Folder Frenzy (Messy Desktop & Downloads)",
      badge: "Filesystem & Real ZIP Export",
      text: "Physics-based portal sorter. Fling chaotic screenshots, duplicate installers, and contracts into smart taxonomy portals. Performs SHA-256 deduplication and ISO-8601 semantic renaming.",
      highlight: "Concrete Real-World Output: Generates and downloads a real organized .zip file using JSZip directly to the user's computer!"
    },
    {
      title: "Arena 3: Expense Exorcist (Tax Review & Subscriptions)",
      badge: "Finance & IRS Section 162",
      text: "Tinder-style rapid card-swipe rhythm game. Swipe Left for 100% Business Deductions, Right for Personal, Up for 50% Meals, or Exorcise zombie recurring subscriptions that drain bank accounts.",
      highlight: "Concrete Real-World Output: Exports an IRS-compliant CSV expense ledger ready for accountants."
    },
    {
      title: "Arena 4: Lint Samurai (AST Code Cleanse)",
      badge: "Compiler & Type Safety",
      text: "Cyberpunk Katana slasher. Slashes loose equality (==), implicit any types, dead variables, and token-leaking console.log statements with a real-time side-by-side AST code diff viewer.",
      highlight: "Concrete Real-World Output: Download the pristine, zero-lint TypeScript file with one click."
    },
    {
      title: "PromptWars Arena & Gemini AI Co-Pilot",
      badge: "{Build with AI} Innovation",
      text: "Battle against the Chaos Procrastination Daemon using Google Gemini AI Prompt Strikes. Features natural language chore automation and real-time prompt precision scoring.",
      highlight: "Zero Data Loss Architecture: Full immutable audit ledger with one-click Undo for all real chore actions."
    }
  ];

  const handleNext = () => {
    sounds.playWhoosh();
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    sounds.playWhoosh();
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  const handleInstantSimulate = () => {
    sounds.playVictory();
    voiceAnnouncer.speak("Instant demonstration activated! All chores executed!");
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
    onInstantDemonstration();
    onClose();
  };

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-2xl p-6 relative flex flex-col justify-between overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                JUDGE QUICK SHOWCASE
              </span>
              <h3 className="text-base font-black text-white">ChoreSlayer 2026 Pitch Deck</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="my-6 z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
              {slide.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <h2 className="text-xl font-black text-white">{slide.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">{slide.text}</p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span className="text-xs text-cyan-200 font-mono font-semibold">{slide.highlight}</span>
          </div>
        </div>

        {/* Instant Slay Button for Busy Judges */}
        <div className="p-3 bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900 rounded-xl border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-slate-300 font-sans">
              Short on time? Simulate an entire complete session instantly:
            </span>
          </div>
          <button
            onClick={handleInstantSimulate}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> INSTANT 100% CLEANSE
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 z-10">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-cyan-400' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all"
          >
            {currentSlide === slides.length - 1 ? 'Close Tour' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
