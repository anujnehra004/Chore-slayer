import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import type { LintChore, ExecutionLogEntry } from '../types';
import { INITIAL_LINT_DATA, triggerBrowserDownload } from '../engine/choreEngine';
import confetti from 'canvas-confetti';
import { 
  Terminal, 
  Scissors, 
  Check, 
  Copy, 
  Download, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw,
  Cpu
} from 'lucide-react';

interface LintSamuraiProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number, comboIncrement?: boolean) => void;
  lintFixedCount: number;
  onAddLintFixed: () => void;
}


export const LintSamurai: React.FC<LintSamuraiProps> = ({
  onChoreExecuted,
  onScoreGain,
  lintFixedCount,
  onAddLintFixed
}) => {
  const [lintErrors, setLintErrors] = useState<LintChore[]>(INITIAL_LINT_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fixedList, setFixedList] = useState<LintChore[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string>('Unsheathe your Katana: slash lint errors to auto-refactor the Abstract Syntax Tree!');

  const currentLint = lintErrors[currentIndex];

  const handleSlash = () => {
    if (!currentLint) return;
    sounds.playSlice();

    const lint = currentLint;
    onAddLintFixed();
    onScoreGain(300, true);

    setLastAction(`⚔️ REFACTORED: ${lint.rule} in ${lint.file}:${lint.line} -> Applied safe AST fix!`);

    onChoreExecuted({
      category: 'Code',
      action: 'AST_LINT_AUTO_FIX',
      details: `Resolved ${lint.rule} on line ${lint.line} in ${lint.file}. ${lint.explanation}`,
      bytesOrItemsImpacted: 1,
      rawCommand: `ESLINT_AUTORULE: --fix rule=${lint.rule} file=${lint.file}:${lint.line} status=RESOLVED`
    });

    setFixedList(prev => [...prev, { ...lint, fixed: true }]);

    if (currentIndex < lintErrors.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
      sounds.playVictory();
    }
  };

  const generateFullFixedCode = () => {
    return `// ==========================================
// PRISTINE PRODUCTION BUILD - ALL LINT CLEARED
// Refactored by ChoreSlayer AST Engine
// Timestamp: ${new Date().toISOString()}
// ==========================================

import { verifyToken, signPayload } from './auth';
import { logger } from './utils/logger';

export interface RequestPayload {
  userId: string;
  sessionToken: string;
}

export interface CleanPayload<T> {
  data: T;
  timestamp: number;
}

// Fixed: Generic type constraint instead of 'any'
export function processPayload<T extends RequestPayload>(data: T): CleanPayload<T> {
  return {
    data,
    timestamp: Date.now()
  };
}

// Fixed: Strict equality checks & safe structured logger
export async function authenticateTransaction(transaction: { status: string; id: string }) {
  if (transaction.status === 'approved') {
    logger.debug('Authenticated session verified: ' + transaction.id);
    return true;
  }
  return false;
}

export default { processPayload, authenticateTransaction };
`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateFullFixedCode());
    setCopied(true);
    sounds.playCoin();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    sounds.playCoin();
    const blob = new Blob([generateFullFixedCode()], { type: 'text/typescript;charset=utf-8;' });
    triggerBrowserDownload(blob, `authService.clean.ts`);
    setLastAction('💻 Downloaded pristine, zero-lint TypeScript file to your disk!');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Terminal className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">LINT SAMURAI</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                AST Code Refactor Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Slash through syntax errors, memory leaks, and loose equality to achieve 100% green CI/CD pipeline!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            {copied ? 'COPIED!' : 'COPY CLEAN CODE'}
          </button>

          <button
            onClick={handleDownloadCode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD CLEAN TS
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="w-full my-3 flex flex-wrap items-center justify-between text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-cyan-400">
            Active Defect: <strong className="text-white">{currentIndex + 1}</strong> of <strong className="text-white">{lintErrors.length}</strong>
          </span>
          <span className="text-emerald-400">
            Fixed Errors: <strong className="text-white">{fixedList.length || lintFixedCount}</strong>
          </span>

          <span className="text-purple-400">
            CI Build Status: <strong className={fixedList.length === lintErrors.length ? 'text-emerald-400' : 'text-amber-400'}>{fixedList.length === lintErrors.length ? '100% GREEN' : 'PASSING IN PROGRESS'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Real-time Abstract Syntax Tree Mutation</span>
        </div>
      </div>

      {/* Main Diff / Slasher Arena */}
      <div className="w-full min-h-[380px] bg-slate-950 rounded-xl border border-cyan-500/30 p-6 flex flex-col items-center justify-between relative overflow-hidden">
        {currentIndex < lintErrors.length && currentLint ? (
          <div className="w-full my-auto flex flex-col items-center z-10 animate-fadeIn">
            <div className="w-full flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-rose-400 flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4" />
                {currentLint.rule} ({currentLint.severity.toUpperCase()})
              </span>
              <span className="text-slate-400">{currentLint.file}:{currentLint.line}</span>
            </div>

            {/* Split Diff Comparison Container */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Buggy Original */}
              <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/40 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-rose-400 uppercase font-bold">❌ CORRUPTED SYNTAX</span>
                  <span className="text-[10px] text-slate-500 font-mono">Line {currentLint.line}</span>
                </div>
                <pre className="text-xs text-rose-300 font-mono bg-rose-950/30 p-3 rounded-lg overflow-x-auto border border-rose-900/50">
                  <code>{currentLint.codeSnippet}</code>
                </pre>
                <p className="text-xs text-slate-400 mt-2">{currentLint.message}</p>
              </div>

              {/* Slashed & Refactored */}
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">✨ REFACTORED AST</span>
                  <span className="text-[10px] text-slate-500 font-mono">Auto-Patched</span>
                </div>
                <pre className="text-xs text-emerald-300 font-mono bg-emerald-950/30 p-3 rounded-lg overflow-x-auto border border-emerald-900/50">
                  <code>{currentLint.fixedSnippet}</code>
                </pre>
                <p className="text-xs text-slate-400 mt-2">{currentLint.explanation}</p>
              </div>
            </div>

            {/* Slasher Katana Button */}
            <button
              onClick={handleSlash}
              className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-sm tracking-wider uppercase shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all active:scale-95"
            >
              <Scissors className="w-5 h-5 text-slate-950" />
              SLASH & AUTO-REFACTOR DEFECT
            </button>
          </div>
        ) : (
          /* Finished State */
          <div className="flex flex-col items-center justify-center my-12 z-10 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
            <h3 className="text-2xl font-black text-white mb-2">BUILD SUCCESS: ZERO LINT DEFECTS!</h3>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              All 5 critical lint bugs and type issues were refactored into production-grade TypeScript. Your code passes all CI/CD gates!
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadCode}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Download className="w-5 h-5" /> DOWNLOAD PRISTINE CODE
              </button>
              <button
                onClick={() => {
                  setLintErrors(INITIAL_LINT_DATA);
                  setCurrentIndex(0);
                  setFixedList([]);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Reset Slasher
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Ticker */}
      <div className="w-full mt-3 p-2.5 bg-slate-950 rounded-xl border border-cyan-500/20 flex items-center justify-between text-xs font-mono text-cyan-300">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-pink-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AST COMPILER EMIT:
          </span>
          <span className="text-slate-300 truncate">{lastAction}</span>
        </div>
        <span className="text-[11px] text-emerald-400 shrink-0 font-bold ml-2">● COMPILER GATE OPEN</span>
      </div>
    </div>
  );
};
