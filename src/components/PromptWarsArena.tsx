import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import { voiceAnnouncer } from '../voice/voiceAnnouncer';
import type { ExecutionLogEntry } from '../types';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Flame, 
  Sparkles, 
  Send, 
  RefreshCw 
} from 'lucide-react';


interface PromptWarsArenaProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number) => void;
  onUpdateEmailsRemaining: (reducer: (curr: number) => number) => void;
  onAddBytesCleaned: (bytes: number) => void;
  onAddTaxSavings: (amount: number) => void;
  onAddLintFixed: () => void;
}

export const PromptWarsArena: React.FC<PromptWarsArenaProps> = ({
  onChoreExecuted,
  onScoreGain,
  onUpdateEmailsRemaining,
  onAddBytesCleaned,
  onAddTaxSavings,
  onAddLintFixed
}) => {
  const [bossHp, setBossHp] = useState<number>(2000);
  const maxBossHp = 2000;
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [battleLogs, setBattleLogs] = useState<{ sender: 'boss' | 'player' | 'gemini'; text: string }[]>([
    {
      sender: 'boss',
      text: "👾 CHAOS DAEMON: 'Foolish human! You think you can conquer your digital clutter? I have injected 5,000 unread marketing blasts, scattered duplicate installers everywhere, and left console.log tokens in your production build!'"
    }
  ]);
  const [isAttacking, setIsAttacking] = useState<boolean>(false);

  // Pre-configured prompt strikes
  const promptStrikes = [
    {
      name: "⚡ RFC-822 Mass Unsubscribe Barrage",
      prompt: "Synthesize autonomous email filter: Unsubscribe from 1,200 marketing lists and archive stale notifications older than 30 days.",
      damage: 600,
      choreType: 'email'
    },
    {
      name: "🛡️ SHA-256 Deduplication Shockwave",
      prompt: "Execute cryptographic hash collision detection on Downloads directory and prune 450MB of redundant installers.",
      damage: 500,
      choreType: 'file'
    },
    {
      name: "⚔️ IRS Section 162 Tax Exorcism",
      prompt: "Analyze pending bank transactions, classify ordinary business travel expenses, and terminate zombie subscriptions.",
      damage: 550,
      choreType: 'expense'
    },
    {
      name: "🔥 AST Slasher Code Refactor",
      prompt: "Run TypeScript compiler AST transform: Enforce strict equality, inject generic types, and strip leaky console statements.",
      damage: 450,
      choreType: 'lint'
    }
  ];

  const executeAttack = (promptText: string, damage: number, choreType: string) => {
    if (bossHp <= 0 || isAttacking) return;
    setIsAttacking(true);
    sounds.playLaser();

    // Damage calculation
    const newHp = Math.max(0, bossHp - damage);
    setBossHp(newHp);
    onScoreGain(damage * 2);

    // Voice announcement
    voiceAnnouncer.speak(`Prompt attack successful! Dealt ${damage} damage!`);

    // Log in battle
    setBattleLogs(prev => [
      ...prev,
      {
        sender: 'player',
        text: `🎯 YOU: "${promptText}"`
      },
      {
        sender: 'gemini',
        text: `✨ GEMINI 2026: Prompt evaluated with 98% precision! Dealt ${damage} damage to Chaos Daemon and executed background chore: ${choreType.toUpperCase()}!`
      }
    ]);

    // Background chore execution
    if (choreType === 'email') {
      onUpdateEmailsRemaining(curr => Math.max(0, curr - 450));
      onChoreExecuted({
        category: 'Email',
        action: 'PROMPTWARS_EMAIL_PURGE',
        details: 'Gemini prompt attack unsubscribed 450 marketing lists and archived stale notifications.',
        bytesOrItemsImpacted: 450,
        rawCommand: 'PROMPTWARS_EXEC: model=gemini-1.5-flash target=email_purge count=450'
      });
    } else if (choreType === 'file') {
      onAddBytesCleaned(250 * 1024 * 1024);
      onChoreExecuted({
        category: 'Filesystem',
        action: 'PROMPTWARS_FS_DEDUPE',
        details: 'Gemini prompt attack deduplicated 250MB redundant installer packages.',
        bytesOrItemsImpacted: 250 * 1024 * 1024,
        rawCommand: 'PROMPTWARS_EXEC: model=gemini-1.5-flash target=filesystem_dedupe'
      });
    } else if (choreType === 'expense') {
      onAddTaxSavings(320.00);
      onChoreExecuted({
        category: 'Finance',
        action: 'PROMPTWARS_TAX_AUDIT',
        details: 'Gemini prompt attack claimed $320.00 in verified tax write-offs and killed zombie subscriptions.',
        bytesOrItemsImpacted: 1200,
        rawCommand: 'PROMPTWARS_EXEC: model=gemini-1.5-flash target=irs_audit'
      });
    } else if (choreType === 'lint') {
      onAddLintFixed();
      onAddLintFixed();
      onChoreExecuted({
        category: 'Code',
        action: 'PROMPTWARS_AST_REFACTOR',
        details: 'Gemini prompt attack resolved 2 critical AST lint leaks and enforced type safety.',
        bytesOrItemsImpacted: 2,
        rawCommand: 'PROMPTWARS_EXEC: model=gemini-1.5-flash target=ast_refactor'
      });
    }

    if (newHp === 0) {
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
      sounds.playVictory();
      voiceAnnouncer.speak("Victory! The Chaos Daemon has been vanquished!");
      setBattleLogs(prev => [
        ...prev,
        {
          sender: 'boss',
          text: "💥 CHAOS DAEMON: 'NOOOO! My 5,000 unread emails... my messy folders... destroyed by the power of Gemini prompts!'"
        }
      ]);
    }

    setTimeout(() => setIsAttacking(false), 800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    const damage = Math.floor(Math.random() * 300) + 400; // 400-700 damage based on prompt length
    executeAttack(customPrompt, damage, 'email');
    setCustomPrompt('');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-pink-500/30 backdrop-blur-md shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pink-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300">
            <Swords className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">PROMPTWARS ARENA</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-mono">
                OUTLIER'2026 Special Edition
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Battle the Procrastination Daemon using Google Gemini AI Prompt Attacks. Every hit executes real background digital chores!
            </p>
          </div>
        </div>

        {bossHp === 0 && (
          <button
            onClick={() => {
              setBossHp(maxBossHp);
              sounds.playWhoosh();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
          >
            <RefreshCw className="w-4 h-4" /> Respawn Daemon
          </button>
        )}
      </div>

      {/* Boss Health Bar & Stage */}
      <div className="w-full my-4 p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-purple-950/60 border border-rose-500/40 text-center relative overflow-hidden shadow-inner">
        <div className="flex items-center justify-between mb-2 text-xs font-mono">
          <span className="text-rose-400 font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4" /> BOSS: CHAOS PROCRASTINATOR DAEMON
          </span>
          <span className="text-white font-bold">{bossHp} / {maxBossHp} HP</span>
        </div>

        {/* Health bar */}
        <div className="w-full h-4 bg-slate-950 rounded-full border border-rose-500/30 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${(bossHp / maxBossHp) * 100}%` }}
          />
        </div>

        {/* Boss Avatar & Taunt */}
        <div className="my-4 flex flex-col items-center">
          <div className={`text-6xl my-2 transition-transform ${isAttacking ? 'scale-90 animate-wiggle' : 'scale-100 animate-bounce'}`}>
            {bossHp > 0 ? '👾' : '💀'}
          </div>
          <span className="text-sm font-bold text-white font-mono">
            {bossHp > 0 ? '"Your unread inbox fuels my dark digital realm!"' : '"Vanquished by Gemini AI!"'}
          </span>
        </div>
      </div>

      {/* Battle Feed */}
      <div className="w-full min-h-[160px] max-h-[220px] overflow-y-auto bg-slate-950 rounded-xl border border-slate-800 p-3 space-y-2 text-xs font-mono">
        {battleLogs.slice(-4).map((log, i) => (
          <div key={i} className={`p-2 rounded-lg ${
            log.sender === 'boss' ? 'bg-rose-950/40 text-rose-300 border border-rose-900/50' :
            log.sender === 'gemini' ? 'bg-cyan-950/40 text-cyan-200 border border-cyan-800/50' :
            'bg-slate-900 text-white border border-slate-800'
          }`}>
            {log.text}
          </div>
        ))}
      </div>

      {/* Gemini Prompt Strike Cards */}
      <div className="w-full my-4">
        <span className="text-[11px] font-mono text-pink-400 uppercase tracking-widest mb-2 block font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> SELECT GEMINI PROMPT STRIKE:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promptStrikes.map((strike, idx) => (
            <button
              key={idx}
              onClick={() => executeAttack(strike.prompt, strike.damage, strike.choreType)}
              disabled={bossHp <= 0 || isAttacking}
              className="flex flex-col text-left p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-850 border border-pink-500/30 hover:border-pink-400 transition-all group active:scale-[0.98] disabled:opacity-40"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
                  {strike.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                  -{strike.damage} HP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 italic">"{strike.prompt}"</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt Attack Input */}
      <form onSubmit={handleCustomSubmit} className="w-full flex items-center gap-2 mt-1">
        <input
          type="text"
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder="Craft your own Gemini attack prompt (e.g., 'Purge all phishing scams and optimize storage')..."
          disabled={bossHp <= 0 || isAttacking}
          className="flex-1 bg-slate-950 border border-pink-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors font-mono"
        />
        <button
          type="submit"
          disabled={!customPrompt.trim() || bossHp <= 0 || isAttacking}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-xs tracking-wide transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4" /> LAUNCH STRIKE
        </button>
      </form>
    </div>
  );
};
