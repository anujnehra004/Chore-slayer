import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { STORY_NODES } from './storyData';
import type { ExecutionLogEntry } from '../types';
import confetti from 'canvas-confetti';
import { Sparkles, Terminal, ChevronRight, RefreshCw, Bot } from 'lucide-react';


interface StoryModeProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number) => void;
  onUpdateEmailsRemaining: (reducer: (curr: number) => number) => void;
  onAddBytesCleaned: (bytes: number) => void;
  onAddTaxSavings: (amount: number) => void;
  onAddLintFixed: () => void;
}

export const StoryMode: React.FC<StoryModeProps> = ({
  onChoreExecuted,
  onScoreGain,
  onUpdateEmailsRemaining,
  onAddBytesCleaned,
  onAddTaxSavings,
  onAddLintFixed
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('intro');
  const [history, setHistory] = useState<string[]>([]);
  const [lastExecutedChore, setLastExecutedChore] = useState<string | null>(null);

  const currentNode = STORY_NODES[currentNodeId] || STORY_NODES['intro'];

  const handleSelectOption = (option: typeof currentNode.options[0]) => {
    sounds.playCoin();
    onScoreGain(option.scoreGain);

    // Execute real background chore based on choice
    const { type, count, label, rawApi } = option.choreExecution;
    setLastExecutedChore(label);

    if (type === 'email') {
      onUpdateEmailsRemaining(curr => Math.max(0, curr - count));
      onChoreExecuted({
        category: 'Email',
        action: 'STORY_BATCH_EMAIL_PURGE',
        details: label,
        bytesOrItemsImpacted: count,
        rawCommand: rawApi
      });
    } else if (type === 'file') {
      const bytes = count * 50 * 1024 * 1024; // ~50MB per file
      onAddBytesCleaned(bytes);
      onChoreExecuted({
        category: 'Filesystem',
        action: 'STORY_FS_ORGANIZE',
        details: label,
        bytesOrItemsImpacted: bytes,
        rawCommand: rawApi
      });
    } else if (type === 'expense') {
      onAddTaxSavings(558.15);
      onChoreExecuted({
        category: 'Finance',
        action: 'STORY_TAX_LEDGER_POST',
        details: label,
        bytesOrItemsImpacted: 1860,
        rawCommand: rawApi
      });
    } else if (type === 'lint') {
      for (let i = 0; i < count; i++) onAddLintFixed();
      onChoreExecuted({
        category: 'Code',
        action: 'STORY_AST_REFACTOR',
        details: label,
        bytesOrItemsImpacted: count,
        rawCommand: rawApi
      });
    }

    if (option.nextNodeId === 'node_victory') {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      sounds.playVictory();
    }

    setHistory(prev => [...prev, currentNodeId]);
    setCurrentNodeId(option.nextNodeId);
  };

  const resetStory = () => {
    sounds.playWhoosh();
    setCurrentNodeId('intro');
    setHistory([]);
    setLastExecutedChore(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">PROTOCOL OUTLIER 2026</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                Interactive Story RPG (Stage {history.length + 1})
              </span>

            </div>
            <p className="text-xs text-slate-400">
              Your narrative decisions directly trigger automated background workers to clean emails, sort files, audit expenses, and patch code!
            </p>
          </div>
        </div>

        <button
          onClick={resetStory}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Restart Narrative
        </button>
      </div>

      {/* Main Narrative Stage */}
      <div className={`w-full min-h-[420px] rounded-2xl bg-gradient-to-b ${currentNode.backgroundTheme} border border-slate-800 p-6 my-4 flex flex-col justify-between relative shadow-inner overflow-hidden`}>
        {/* Speaker Profile */}
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border-2 border-cyan-400/60 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20">
            {currentNode.avatar}
          </div>
          <div>
            <h3 className="text-lg font-black text-white tracking-wide">{currentNode.speaker}</h3>
            <span className="text-xs text-cyan-400 font-mono">{currentNode.role}</span>
          </div>
        </div>

        {/* Dialogue Box */}
        <div className="my-6 p-5 rounded-2xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-md z-10 shadow-2xl">
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
            "{currentNode.dialogue}"
          </p>
        </div>

        {/* Narrative Choices */}
        <div className="flex flex-col gap-3 z-10">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" /> CHOOSE TACTICAL RESPONSE (EXECUTES REAL CHORE):
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentNode.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className="flex flex-col text-left p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/95 border border-cyan-500/40 hover:border-cyan-400 transition-all group active:scale-[0.98] shadow-lg shadow-cyan-950/50"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {option.text}
                  </span>
                  <ChevronRight className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-2">{option.actionDescription}</p>

                <div className="mt-auto pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-semibold truncate max-w-[240px]">
                    ⚡ {option.choreExecution.label}
                  </span>
                  <span className="text-cyan-400 font-bold ml-2">+{option.scoreGain} XP</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real Execution Ticker */}
      <div className="w-full p-2.5 bg-slate-950 rounded-xl border border-cyan-500/20 flex items-center justify-between text-xs font-mono text-cyan-300">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-pink-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" /> STORY BACKGROUND EXECUTOR:
          </span>
          <span className="text-slate-300 truncate">
            {lastExecutedChore || 'System standing by. Awaiting operative decisions.'}
          </span>
        </div>
        <span className="text-[11px] text-emerald-400 shrink-0 font-bold ml-2">● STORY WORKER SYNCED</span>
      </div>
    </div>
  );
};
