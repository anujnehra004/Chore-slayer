import React from 'react';
import type { GameMode } from '../types';
import { sounds } from '../audio/soundEffects';
import { 
  Volume2, 
  VolumeX, 
  Mail, 
  FolderSync, 
  DollarSign, 
  Scissors, 
  BookOpen, 
  ListOrdered, 
  Bot,
  Zap
} from 'lucide-react';


interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  score: number;
  combo: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalChoresExecuted: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  score,
  combo,
  soundEnabled,
  onToggleSound,
  totalChoresExecuted
}) => {
  const modes: { id: GameMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'inbox', label: 'Inbox Invaders', icon: <Mail className="w-4 h-4" />, badge: '5,000 Emails' },
    { id: 'folders', label: 'Folder Frenzy', icon: <FolderSync className="w-4 h-4" />, badge: 'Zip Sorter' },
    { id: 'expenses', label: 'Expense Exorcist', icon: <DollarSign className="w-4 h-4" />, badge: 'Tax Deductions' },
    { id: 'lint', label: 'Lint Samurai', icon: <Scissors className="w-4 h-4" />, badge: 'AST Cleanse' },
    { id: 'story', label: 'Protocol Outlier', icon: <BookOpen className="w-4 h-4" />, badge: 'Story RPG' },
    { id: 'ledger', label: 'Audit Ledger', icon: <ListOrdered className="w-4 h-4" />, badge: `${totalChoresExecuted}` },
    { id: 'ai', label: 'Gemini Co-Pilot', icon: <Bot className="w-4 h-4 text-cyan-400" />, badge: 'AI Hub' }
  ];

  return (
    <header className="w-full bg-slate-950/90 border-b border-cyan-500/30 sticky top-0 z-50 backdrop-blur-xl">
      {/* Top Banner with Hackathon Credentials */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 px-4 py-1.5 border-b border-cyan-500/20 flex flex-wrap items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wide">Google for Developers</span>
          <span className="text-slate-500">•</span>
          <span className="font-semibold text-cyan-400">PromptWars x OUTLIER'2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold">
            &#123;Build with AI&#125;
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            BACKGROUND CHORE ENGINE: 100% OPERATIONAL
          </span>
          <span className="hidden sm:inline text-slate-500">SATA | SMC | ENACTUS</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectMode('inbox')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              CHORE<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">SLAYER</span>
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
              Real-World Chore Execution Gaming
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {modes.map(mode => {
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  sounds.playWhoosh();
                  onSelectMode(mode.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
                {mode.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                    {mode.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Score & Audio Control */}
        <div className="flex items-center gap-3">
          {/* XP & Combo */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block leading-tight">SCORE</span>
              <span className="text-sm font-black text-cyan-400">{score.toLocaleString()} XP</span>
            </div>
            {combo > 1 && (
              <div className="border-l border-slate-700 pl-2">
                <span className="text-[10px] text-pink-400 block leading-tight">COMBO</span>
                <span className="text-sm font-black text-pink-400 animate-pulse">{combo}x</span>
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
