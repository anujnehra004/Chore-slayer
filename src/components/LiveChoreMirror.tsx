import React from 'react';
import type { GameMode, ExecutionLogEntry } from '../types';
import { 
  Mail, 
  Trash2, 
  Folder, 
  DollarSign, 
  CheckCircle2, 
  Terminal, 
  Split, 
  ShieldCheck
} from 'lucide-react';


interface LiveChoreMirrorProps {
  currentMode: GameMode;
  emailsRemaining: number;
  recentLogs: ExecutionLogEntry[];
  taxSavingsClaimed: number;
  bytesCleaned: number;
  lintFixedCount: number;
}

export const LiveChoreMirror: React.FC<LiveChoreMirrorProps> = ({
  currentMode,
  emailsRemaining,
  recentLogs,
  taxSavingsClaimed,
  bytesCleaned,
  lintFixedCount
}) => {
  return (
    <div className="w-full bg-slate-950/90 rounded-2xl border border-cyan-500/40 p-4 font-mono shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Mirror Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Split className="w-4 h-4 text-cyan-400" />
            HOLO-MIRROR: REAL-WORLD CHORE STATE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          LIVE SYNCHRONIZED
        </div>
      </div>

      {/* Dynamic Mirror View based on Active Game */}
      <div className="mt-3">
        {/* Mode 1: Email View */}
        {currentMode === 'inbox' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Mail className="w-4 h-4 text-cyan-400" /> Gmail / Corporate Mailbox
              </span>
              <span className="text-cyan-300 font-bold">
                Unread: <strong className="text-white">{emailsRemaining.toLocaleString()}</strong> / 5,000
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {recentLogs.filter(l => l.category === 'Email').slice(0, 4).map(log => (
                <div key={log.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2 truncate">
                    <Trash2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="line-through text-slate-500 truncate">{log.details.slice(0, 38)}...</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold shrink-0 ml-2">UNSUBSCRIBED</span>
                </div>
              ))}
              {recentLogs.filter(l => l.category === 'Email').length === 0 && (
                <div className="text-slate-500 text-xs py-6 text-center">
                  Shoot incoming emails in the game to watch your actual inbox purge in real-time!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 2: Folder View */}
        {currentMode === 'folders' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Folder className="w-4 h-4 text-purple-400" /> File Explorer // Clean Tree
              </span>
              <span className="text-purple-300 font-bold">
                Storage Reclaimed: <strong className="text-white">{(bytesCleaned / 1024 / 1024).toFixed(1)} MB</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
                <span className="text-cyan-300 font-bold block mb-1">📂 /Documents</span>
                <span className="text-[10px] text-slate-400">Contracts, Tax, W2s</span>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/40">
                <span className="text-purple-300 font-bold block mb-1">📁 /Media</span>
                <span className="text-[10px] text-slate-400">Screenshots, MP4, PNG</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                <span className="text-emerald-300 font-bold block mb-1">💻 /Code</span>
                <span className="text-[10px] text-slate-400">Scripts, Python, TS</span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 3: Finance Ledger View */}
        {currentMode === 'expenses' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <DollarSign className="w-4 h-4 text-emerald-400" /> IRS Schedule C Tax Ledger
              </span>
              <span className="text-emerald-300 font-bold">
                Write-offs: <strong className="text-white">${taxSavingsClaimed.toFixed(2)}</strong>
              </span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Line 9: Travel & Flights</span>
                <span className="text-emerald-400 font-bold">+$252.00 (Claimed)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Line 18: Office Software/SaaS</span>
                <span className="text-emerald-400 font-bold">+$54.15 (Claimed)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Line 24b: 50% Client Meals</span>
                <span className="text-amber-400 font-bold">+$27.75 (Audited)</span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 4: Code Editor View */}
        {currentMode === 'lint' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Terminal className="w-4 h-4 text-pink-400" /> VS Code // ESLint LSP
              </span>
              <span className="text-pink-300 font-bold">
                Errors Slashed: <strong className="text-white">{lintFixedCount}</strong> / 5
              </span>
            </div>

            <div className="p-2.5 bg-slate-900/70 rounded-xl border border-slate-800 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>authService.ts — All AST rules green. 0 errors.</span>
              </div>
            </div>
          </div>
        )}

        {/* Story or Default */}
        {(currentMode === 'story' || currentMode === 'ledger' || currentMode === 'ai') && (
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Real-world chore daemon active across all 4 vector domains.
            </span>
            <span className="text-cyan-300 font-bold font-mono">100% DISK & CLOUD SYNC</span>
          </div>
        )}
      </div>
    </div>
  );
};
