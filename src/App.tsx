import React, { useState } from 'react';
import type { GameMode, ExecutionLogEntry, PlayerStats } from './types';

import { INITIAL_PLAYER_STATS, INITIAL_EMAILS_COUNT } from './engine/choreEngine';
import { sounds } from './audio/soundEffects';

// Components
import { Navbar } from './components/Navbar';
import { StatsBar } from './components/StatsBar';
import { TerminalLog } from './components/TerminalLog';
import { ActionLedger } from './components/ActionLedgerModal';
import { GeminiAiModal } from './components/GeminiAiModal';

// Games & Story
import { InboxInvaders } from './games/InboxInvaders';
import { FolderFrenzy } from './games/FolderFrenzy';
import { ExpenseExorcist } from './games/ExpenseExorcist';
import { LintSamurai } from './games/LintSamurai';
import { StoryMode } from './story/StoryMode';

export const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('inbox');
  const [stats, setStats] = useState<PlayerStats>(INITIAL_PLAYER_STATS);
  const [emailsRemaining, setEmailsRemaining] = useState<number>(INITIAL_EMAILS_COUNT);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [logs, setLogs] = useState<ExecutionLogEntry[]>([]);

  // Toggle sound
  const handleToggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playLaser();
    }
  };

  // Score gain handler
  const handleScoreGain = (points: number, comboIncrement: boolean = false) => {
    setStats(prev => {
      const nextCombo = comboIncrement ? prev.combo + 1 : 1;
      const multiplier = Math.max(1, Math.floor(nextCombo / 3) + 1);
      return {
        ...prev,
        score: prev.score + points * multiplier,
        combo: nextCombo,
        maxCombo: Math.max(prev.maxCombo, nextCombo)
      };
    });
  };

  // Add chore execution log entry
  const handleChoreExecuted = (entryData: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => {
    const newEntry: ExecutionLogEntry = {
      ...entryData,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      undone: false
    };

    setLogs(prev => [newEntry, ...prev]);
    setStats(prev => ({
      ...prev,
      choresExecutedCount: prev.choresExecutedCount + 1
    }));
  };

  // Rollback / Undo handler
  const handleUndoLog = (logId: string) => {
    setLogs(prev =>
      prev.map(l => {
        if (l.id === logId) {
          return { ...l, undone: true };
        }
        return l;
      })
    );
  };

  // State modifiers
  const handleAddBytesCleaned = (bytes: number) => {
    setStats(prev => ({ ...prev, bytesCleaned: prev.bytesCleaned + bytes }));
  };

  const handleAddTaxSavings = (amount: number) => {
    setStats(prev => ({ ...prev, taxDeductionsClaimed: prev.taxDeductionsClaimed + amount }));
  };

  const handleAddLintFixed = () => {
    setStats(prev => ({ ...prev, lintErrorsFixed: prev.lintErrorsFixed + 1 }));
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Bar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        score={stats.score}
        combo={stats.combo}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        totalChoresExecuted={stats.choresExecutedCount}
      />

      {/* Global Real-World Stats Dashboard */}
      <StatsBar stats={stats} emailsRemaining={emailsRemaining} />

      {/* Main Game / Activity Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-start">
        {currentMode === 'inbox' && (
          <InboxInvaders
            onChoreExecuted={handleChoreExecuted}
            onScoreGain={handleScoreGain}
            emailsRemaining={emailsRemaining}
            onUpdateEmailsRemaining={setEmailsRemaining}
          />
        )}

        {currentMode === 'folders' && (
          <FolderFrenzy
            onChoreExecuted={handleChoreExecuted}
            onScoreGain={handleScoreGain}
            bytesCleaned={stats.bytesCleaned}
            onAddBytesCleaned={handleAddBytesCleaned}
          />
        )}

        {currentMode === 'expenses' && (
          <ExpenseExorcist
            onChoreExecuted={handleChoreExecuted}
            onScoreGain={handleScoreGain}
            taxSavingsClaimed={stats.taxDeductionsClaimed}
            onAddTaxSavings={handleAddTaxSavings}
          />
        )}

        {currentMode === 'lint' && (
          <LintSamurai
            onChoreExecuted={handleChoreExecuted}
            onScoreGain={handleScoreGain}
            lintFixedCount={stats.lintErrorsFixed}
            onAddLintFixed={handleAddLintFixed}
          />
        )}

        {currentMode === 'story' && (
          <StoryMode
            onChoreExecuted={handleChoreExecuted}
            onScoreGain={handleScoreGain}
            onUpdateEmailsRemaining={reducer => setEmailsRemaining(curr => reducer(curr))}
            onAddBytesCleaned={handleAddBytesCleaned}
            onAddTaxSavings={handleAddTaxSavings}
            onAddLintFixed={handleAddLintFixed}
          />
        )}

        {currentMode === 'ledger' && (
          <ActionLedger logs={logs} onUndoLog={handleUndoLog} />
        )}

        {currentMode === 'ai' && (
          <GeminiAiModal
            onChoreExecuted={handleChoreExecuted}
            onScoreGain={handleScoreGain}
            onUpdateEmailsRemaining={reducer => setEmailsRemaining(curr => reducer(curr))}
            onAddBytesCleaned={handleAddBytesCleaned}
            onAddTaxSavings={handleAddTaxSavings}
            onAddLintFixed={handleAddLintFixed}
          />
        )}
      </main>

      {/* Live Background Daemon Execution Terminal (Collapsible PIP) */}
      <TerminalLog logs={logs} onClearLogs={() => setLogs([])} />

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">CHORE SLAYER 2026</span>
            <span>—</span>
            <span>Built for Google for Developers PromptWars x OUTLIER'2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Real Background Execution Engine</span>
            <span>•</span>
            <span>Zero Data Loss Protocol</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">Gemini AI Enhanced</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
