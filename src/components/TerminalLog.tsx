import React, { useState } from 'react';
import type { ExecutionLogEntry } from '../types';
import { Terminal, ChevronUp, ChevronDown, Trash2, ShieldCheck } from 'lucide-react';


interface TerminalLogProps {
  logs: ExecutionLogEntry[];
  onClearLogs: () => void;
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs, onClearLogs }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  const filteredLogs = filter === 'all' ? logs : logs.filter(l => l.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-6">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold ml-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>BACKGROUND CHORE DAEMON [WORKER-01 // REAL EXECUTION STREAM]</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter pills */}
            <div className="hidden sm:flex items-center gap-1 text-[11px]">
              {['all', 'email', 'filesystem', 'finance', 'code'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-0.5 rounded capitalize transition-all ${
                    filter === f ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={onClearLogs}
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors ml-2"
              title="Clear Terminal Output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        {isExpanded && (
          <div className="p-4 max-h-64 overflow-y-auto space-y-2 text-xs font-mono bg-black/90 selection:bg-cyan-500/30 selection:text-cyan-200">
            {filteredLogs.length === 0 ? (
              <div className="text-slate-500 py-4 text-center">
                [SYSTEM READY] No background execution commands logged yet. Play an arcade game or make story choices to trigger automated chores!
              </div>
            ) : (
              filteredLogs.slice().reverse().map(log => (
                <div key={log.id} className="flex flex-col border-b border-slate-900 pb-2">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-500">{log.timestamp}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                      log.category === 'Email' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                      log.category === 'Filesystem' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                      log.category === 'Finance' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      'bg-pink-950 text-pink-400 border border-pink-800'
                    }`}>
                      {log.category}
                    </span>
                    <span className="text-white font-bold">{log.action}</span>
                    <span className="text-emerald-400/90 ml-auto flex items-center gap-1 text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> EXECUTED
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs mt-1 ml-4">{log.details}</p>

                  <div className="mt-1 ml-4 text-[11px] text-cyan-400/80 bg-slate-950 p-1.5 rounded border border-slate-900 overflow-x-auto">
                    <code>$ {log.rawCommand}</code>
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center gap-2 text-emerald-400 pt-2 text-[11px]">
              <span className="animate-pulse">▶</span>
              <span className="text-slate-400">worker@chore-slayer-daemon:~$</span>
              <span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
