import React from 'react';
import type { PlayerStats } from '../types';

import { Mail, HardDrive, DollarSign, Terminal, Clock, Trophy } from 'lucide-react';

interface StatsBarProps {
  stats: PlayerStats;
  emailsRemaining: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, emailsRemaining }) => {
  const emailProgress = Math.min(100, Math.round(((5000 - emailsRemaining) / 5000) * 100));
  const storageMB = (stats.bytesCleaned / 1024 / 1024).toFixed(1);
  const hoursSaved = (
    ((5000 - emailsRemaining) * 0.008) + // ~30 secs per 60 emails
    (parseFloat(storageMB) * 0.002) +
    (stats.taxDeductionsClaimed * 0.005) +
    (stats.lintErrorsFixed * 0.25)
  ).toFixed(1);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Metric 1: Emails Cleaned */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">5,000 Inbox Purge</span>
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-white font-mono">{emailsRemaining.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500">remaining</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${emailProgress}%` }}
            />
          </div>
          <span className="text-[10px] text-cyan-300/80 font-mono mt-1 block font-semibold">{emailProgress}% Purged</span>
        </div>

        {/* Metric 2: Storage Freed */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Storage Reclaimed</span>
            <HardDrive className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-purple-300 font-mono">{storageMB}</span>
            <span className="text-xs text-purple-400/80 font-bold">MB</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-2 block">Deduplicated & ISO-Sorted</span>
        </div>

        {/* Metric 3: Tax Savings */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Tax Savings Found</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-emerald-300 font-mono">${stats.taxDeductionsClaimed.toFixed(2)}</span>
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-2 block font-semibold">100% IRS-Compliant</span>
        </div>

        {/* Metric 4: Lint Bugs Slashed */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-pink-500/40 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Lint Bugs Slashed</span>
            <Terminal className="w-4 h-4 text-pink-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-pink-300 font-mono">{stats.lintErrorsFixed}</span>
            <span className="text-xs text-slate-500">defects</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-2 block">Abstract Syntax Tree Clean</span>
        </div>

        {/* Metric 5: Procrastination Hours Saved */}
        <div className="col-span-2 md:col-span-1 p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-pink-950/40 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider font-semibold">Procrastination Crushed</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-amber-300 font-mono">~{hoursSaved}</span>
            <span className="text-xs text-amber-400/80 font-bold">Hours</span>
          </div>
          <span className="text-[10px] text-slate-300 font-mono mt-2 block font-semibold flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-400" /> Mind-Numbing Chores Vanquished!
          </span>
        </div>
      </div>
    </div>
  );
};
