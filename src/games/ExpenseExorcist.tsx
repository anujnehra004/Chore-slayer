import React, { useState } from 'react';
import { sounds } from '../audio/soundEffects';
import type { ExpenseChore, ExecutionLogEntry } from '../types';
import { INITIAL_EXPENSES_DATA, generateExpenseCSV, triggerBrowserDownload } from '../engine/choreEngine';
import confetti from 'canvas-confetti';
import { 
  DollarSign, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  Flame, 
  CheckCircle, 
  Download, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  FileSpreadsheet,
  RefreshCw
} from 'lucide-react';


interface ExpenseExorcistProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number, comboIncrement?: boolean) => void;
  taxSavingsClaimed: number;
  onAddTaxSavings: (amount: number) => void;
}

export const ExpenseExorcist: React.FC<ExpenseExorcistProps> = ({
  onChoreExecuted,
  onScoreGain,
  taxSavingsClaimed,
  onAddTaxSavings
}) => {
  const [expenses, setExpenses] = useState<ExpenseChore[]>(INITIAL_EXPENSES_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reviewedExpenses, setReviewedExpenses] = useState<ExpenseChore[]>([]);
  const [zombieSpendSaved, setZombieSpendSaved] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>('Review transactions to claim legitimate write-offs and kill zombie subscriptions!');

  const currentExpense = expenses[currentIndex];

  const handleDecision = (verdict: 'deductible' | 'personal' | 'split' | 'canceled') => {
    if (!currentExpense) return;

    const exp = currentExpense;
    let saved = 0;

    if (verdict === 'deductible') {
      saved = exp.taxSavingsEst;
      sounds.playCoin();
      onAddTaxSavings(saved);
      onScoreGain(250, true);
      setLastAction(`💼 TAX DEDUCTION CLAIMED: ${exp.merchant} ($${exp.amount.toFixed(2)}) -> Saved $${saved.toFixed(2)} in taxes!`);

      onChoreExecuted({
        category: 'Finance',
        action: 'CLAIM_TAX_DEDUCTION',
        details: `Categorized $${exp.amount.toFixed(2)} at ${exp.merchant} as 100% ordinary & necessary business expense. Tax write-off: $${saved.toFixed(2)}.`,
        bytesOrItemsImpacted: Math.round(exp.amount),
        rawCommand: `IRS_SECTION_162: POST /ledger/claim amount=${exp.amount} category="${exp.category}"`
      });
    } else if (verdict === 'split') {
      saved = exp.taxSavingsEst * 0.5;
      sounds.playCoin();
      onAddTaxSavings(saved);
      onScoreGain(200, true);
      setLastAction(`🍽️ 50% MEALS DEDUCTION: ${exp.merchant} ($${exp.amount.toFixed(2)}) -> Saved $${saved.toFixed(2)}!`);

      onChoreExecuted({
        category: 'Finance',
        action: 'CLAIM_SPLIT_DEDUCTION',
        details: `Applied IRS 50% client dining rule to ${exp.merchant}. Saved $${saved.toFixed(2)}.`,
        bytesOrItemsImpacted: Math.round(exp.amount),
        rawCommand: `IRS_PUB_463: POST /ledger/claim split_ratio=0.5 amount=${exp.amount}`
      });
    } else if (verdict === 'canceled') {
      sounds.playExplosion();
      setZombieSpendSaved(prev => prev + exp.amount);
      onScoreGain(400, true);
      setLastAction(`⚡ ZOMBIE SUBSCRIPTION EXORCISED: Canceled recurring charge from ${exp.merchant} ($${exp.amount.toFixed(2)}/mo saved!)`);

      onChoreExecuted({
        category: 'Finance',
        action: 'CANCEL_ZOMBIE_SUBSCRIPTION',
        details: `Identified and canceled recurring auto-billing from ${exp.merchant}. Prevented $${(exp.amount * 12).toFixed(2)} annual bleed.`,
        bytesOrItemsImpacted: Math.round(exp.amount),
        rawCommand: `STRIPE_BILLING_API: DELETE /v1/subscriptions/sub_${exp.id} status=CANCELED`
      });
    } else {
      // Personal
      sounds.playWhoosh();
      onScoreGain(100, false);
      setLastAction(`🏷️ PERSONAL EXPENDITURE: ${exp.merchant} ($${exp.amount.toFixed(2)}) -> Marked non-deductible (Audit Risk: 0%)`);

      onChoreExecuted({
        category: 'Finance',
        action: 'MARK_PERSONAL_EXPENSE',
        details: `Excluded ${exp.merchant} from tax write-offs to maintain 100% IRS compliance.`,
        bytesOrItemsImpacted: Math.round(exp.amount),
        rawCommand: `LEDGER_EXCLUDE: id=${exp.id} audit_risk=ZERO`
      });
    }

    setReviewedExpenses(prev => [...prev, { ...exp, verdict }]);

    if (currentIndex < expenses.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
      sounds.playVictory();
    }
  };

  const handleDownloadCSV = () => {
    sounds.playCoin();
    const dataToExport = reviewedExpenses.length > 0 ? reviewedExpenses : expenses;
    const csvContent = generateExpenseCSV(dataToExport);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerBrowserDownload(blob, `Tax_Deductions_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    setLastAction('📊 Exported IRS-compliant CSV expense report to your local machine!');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-emerald-500/30 backdrop-blur-md shadow-2xl relative">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
            <DollarSign className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">EXPENSE EXORCIST</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Tax Review & Zombie Subscriptions
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Rapid-review company charges, unlock hidden tax savings, and exorcise vampire recurring subscriptions!
            </p>
          </div>
        </div>

        {/* Real CSV Export */}
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wider transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
        >
          <FileSpreadsheet className="w-4 h-4" />
          DOWNLOAD TAX CSV
        </button>
      </div>

      {/* Financial Scoreboard */}
      <div className="w-full my-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold block">Total Tax Savings:</span>
          <span className="text-xl font-black text-emerald-400 font-mono">${taxSavingsClaimed.toFixed(2)}</span>
        </div>
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold block">Zombie Subs Killed:</span>
          <span className="text-xl font-black text-rose-400 font-mono">${zombieSpendSaved.toFixed(2)}/mo</span>
        </div>
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold block">Reviewed Queue:</span>
          <span className="text-xl font-black text-cyan-400 font-mono">{reviewedExpenses.length}/{expenses.length}</span>
        </div>
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold block">IRS Audit Safety:</span>
          <span className="text-xl font-black text-teal-400 font-mono">100% SAFE</span>
        </div>
      </div>

      {/* Main Review Conveyor */}
      <div className="w-full min-h-[360px] bg-slate-950 rounded-xl border border-emerald-500/30 p-6 flex flex-col items-center justify-between relative overflow-hidden">
        {currentIndex < expenses.length && currentExpense ? (
          <div className="w-full max-w-lg my-auto flex flex-col items-center z-10 animate-fadeIn">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> PENDING TRANSACTION #{currentIndex + 1}:
            </span>

            {/* Glowing Expense Card */}
            <div className={`w-full p-6 rounded-2xl bg-slate-900 border-2 ${currentExpense.flaggedSubscription ? 'border-rose-500 shadow-rose-500/30' : 'border-emerald-400/50 shadow-emerald-500/20'} shadow-2xl relative text-left`}>
              {currentExpense.flaggedSubscription && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-[10px] font-bold animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" /> ZOMBIE RECURRING SUBSCRIPTION
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">{currentExpense.date}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {currentExpense.category}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-1">{currentExpense.merchant}</h3>
              <p className="text-sm text-slate-300 mb-4">{currentExpense.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Amount:</span>
                  <span className="text-2xl font-black text-white font-mono">${currentExpense.amount.toFixed(2)}</span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-emerald-400 block font-semibold">Estimated Write-Off:</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">+${currentExpense.taxSavingsEst.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Decision Buttons */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
              <button
                onClick={() => handleDecision('deductible')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-200 font-bold text-xs transition-all active:scale-95 shadow-md"
              >
                <div className="flex items-center gap-1 mb-1">
                  <ArrowLeft className="w-4 h-4 text-emerald-400" />
                  <span>100% BUSINESS</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-normal">Claim Tax Write-off</span>
              </button>

              <button
                onClick={() => handleDecision('split')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-500/50 hover:border-amber-400 text-amber-200 font-bold text-xs transition-all active:scale-95 shadow-md"
              >
                <div className="flex items-center gap-1 mb-1">
                  <ArrowUp className="w-4 h-4 text-amber-400" />
                  <span>50% MEALS</span>
                </div>
                <span className="text-[10px] text-amber-400/80 font-normal">Dining / Client Meeting</span>
              </button>

              <button
                onClick={() => handleDecision('personal')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold text-xs transition-all active:scale-95 shadow-md"
              >
                <div className="flex items-center gap-1 mb-1">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span>PERSONAL</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">Non-Deductible</span>
              </button>

              <button
                onClick={() => handleDecision('canceled')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/50 hover:border-rose-400 text-rose-200 font-bold text-xs transition-all active:scale-95 shadow-md"
              >
                <div className="flex items-center gap-1 mb-1 text-rose-400">
                  <Flame className="w-4 h-4" />
                  <span>KILL SUB</span>
                </div>
                <span className="text-[10px] text-rose-300/80 font-normal">Cancel Vampire Fee</span>
              </button>
            </div>
          </div>
        ) : (
          /* Finished State */
          <div className="flex flex-col items-center justify-center my-12 z-10 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
            <h3 className="text-2xl font-black text-white mb-2">TAX AUDIT COMPLETED!</h3>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              You reviewed all expenditures, claimed <strong>${taxSavingsClaimed.toFixed(2)}</strong> in legitimate deductions, and saved <strong>${zombieSpendSaved.toFixed(2)}/mo</strong> in cancelled subscriptions!
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Download className="w-5 h-5" /> DOWNLOAD TAX AUDIT CSV
              </button>
              <button
                onClick={() => {
                  setExpenses(INITIAL_EXPENSES_DATA);
                  setCurrentIndex(0);
                  setReviewedExpenses([]);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Reset Review
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Ticker */}
      <div className="w-full mt-3 p-2.5 bg-slate-950 rounded-xl border border-emerald-500/20 flex items-center justify-between text-xs font-mono text-emerald-300">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-yellow-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> FINANCE LEDGER POST:
          </span>
          <span className="text-slate-300 truncate">{lastAction}</span>
        </div>
        <span className="text-[11px] text-emerald-400 shrink-0 font-bold ml-2">● IRS ENFORCEMENT ENGINE READY</span>
      </div>
    </div>
  );
};
