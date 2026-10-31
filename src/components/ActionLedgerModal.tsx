import React from 'react';
import type { ExecutionLogEntry } from '../types';
import { sounds } from '../audio/soundEffects';
import { triggerBrowserDownload } from '../engine/choreEngine';
import { 
  ListOrdered, 
  RotateCcw, 
  Download, 
  CheckCircle, 
  Shield, 
  XCircle 
} from 'lucide-react';


interface ActionLedgerProps {
  logs: ExecutionLogEntry[];
  onUndoLog: (logId: string) => void;
}

export const ActionLedger: React.FC<ActionLedgerProps> = ({ logs, onUndoLog }) => {
  const handleUndo = (log: ExecutionLogEntry) => {
    sounds.playWhoosh();
    onUndoLog(log.id);
  };

  const handleExportAuditJson = () => {
    sounds.playCoin();
    const dataStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    triggerBrowserDownload(blob, `ChoreSlayer_AuditLedger_${new Date().toISOString().slice(0, 10)}.json`);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-md shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-300">
            <ListOrdered className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">CHORE EXECUTION LEDGER</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Audited & Reversible
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Immutable ledger of all digital chore actions executed through gameplay. Click 'Undo' to roll back any execution.
            </p>
          </div>
        </div>

        {/* Export Ledger Button */}
        <button
          onClick={handleExportAuditJson}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          EXPORT AUDIT LEDGER (JSON)
        </button>
      </div>

      {/* Ledger Table */}
      <div className="w-full my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">TIMESTAMP</th>
              <th className="p-3">DOMAIN</th>
              <th className="p-3">OPERATION</th>
              <th className="p-3">IMPACT DETAILS</th>
              <th className="p-3">STATUS</th>
              <th className="p-3 text-right">ROLLBACK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-slate-300">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No chores have been executed yet. Start playing Inbox Invaders, Folder Frenzy, Expense Exorcist, or Story Mode to record entries!
                </td>
              </tr>
            ) : (
              logs.slice().reverse().map(entry => (
                <tr key={entry.id} className={entry.undone ? 'opacity-40 bg-slate-950/40' : 'hover:bg-slate-900/40'}>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{entry.timestamp}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      entry.category === 'Email' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                      entry.category === 'Filesystem' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                      entry.category === 'Finance' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      'bg-pink-950 text-pink-300 border border-pink-800'
                    }`}>
                      {entry.category}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-white whitespace-nowrap">{entry.action}</td>
                  <td className="p-3 max-w-md truncate text-slate-300" title={entry.details}>
                    {entry.details}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {entry.undone ? (
                      <span className="flex items-center gap-1 text-rose-400 font-bold">
                        <XCircle className="w-3.5 h-3.5" /> REVERTED
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> EXECUTED
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {!entry.undone && (
                      <button
                        onClick={() => handleUndo(entry)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-700/60 border border-slate-700 text-slate-300 text-[11px] transition-all ml-auto"
                        title="Rollback this chore"
                      >
                        <RotateCcw className="w-3 h-3" /> Undo
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Safety Guarantee Footer */}
      <div className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Zero-Data Loss Architecture: All automated actions maintain snapshots for instant rollback.</span>
        </div>
        <span className="font-mono text-cyan-400 font-bold">Total Operations: {logs.length}</span>
      </div>
    </div>
  );
};
