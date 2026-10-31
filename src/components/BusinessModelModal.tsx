import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';


export const BusinessModelModal: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-900/80 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-2xl relative font-sans">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Briefcase className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-wide">PITCH DECK & BUSINESS MODEL</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                OUTLIER'2026 Commercial Strategy
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Transforming corporate procrastination into quantified enterprise productivity and $48B market opportunity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> B2B SAAS READY
          </span>
        </div>
      </div>

      {/* Grid of Pitch Pillars */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Pillar 1: The Problem & Loss */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">The Hidden $11,200/Year Waste</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Knowledge workers spend an average of <strong>4.2 hours every week</strong> dreading and postponing painful digital chores: cleaning inboxes, tracking down tax receipts, sorting desktop downloads, and resolving lint backlogs.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-rose-400 font-semibold">
            ● 86% of employees admit chronic procrastination
          </div>
        </div>

        {/* Pillar 2: The Solution */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/40 flex flex-col justify-between shadow-lg shadow-cyan-500/10">
          <div>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Gamified Background Execution</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ChoreSlayer swaps dread for dopamine. By wrapping chores in fast-paced arcade minigames and interactive stories powered by <strong>Google Gemini AI</strong>, tasks that take 3 weeks are completed in 3 minutes of gameplay.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-300 font-semibold">
            ● 94% reduction in administrative dread
          </div>
        </div>

        {/* Pillar 3: Market Size */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">$48 Billion Total Addressable Market</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Captures cross-sector demand across Developer Productivity Tooling ($14B), Expense Automation ($8B), and Email / File Management SaaS ($26B).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 font-semibold">
            ● Target: 120M Global Remote Knowledge Workers
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="w-full my-2">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> REVENUE MODEL & PRICING TIERS:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 font-mono font-bold block mb-1">INDIVIDUAL PRO</span>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-white">$12</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li className="flex items-center gap-1.5">✓ Unlimited Email Purges</li>
              <li className="flex items-center gap-1.5">✓ Unlimited ZIP File Sorter</li>
              <li className="flex items-center gap-1.5">✓ IRS Schedule C CSV Export</li>
              <li className="flex items-center gap-1.5">✓ Gemini AI Prompt Attacks</li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="p-5 rounded-xl bg-slate-950 border-2 border-cyan-400/80 relative shadow-xl shadow-cyan-500/10">
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase font-mono">
              MOST POPULAR
            </span>
            <span className="text-xs text-cyan-400 font-mono font-bold block mb-1">TEAM ACCELERATOR</span>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-white">$29</span>
              <span className="text-xs text-slate-500">/seat/month</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li className="flex items-center gap-1.5">✓ All Pro Features Included</li>
              <li className="flex items-center gap-1.5">✓ Corporate Google Workspace Sync</li>
              <li className="flex items-center gap-1.5">✓ GitHub CI/CD Auto-Lint Slasher</li>
              <li className="flex items-center gap-1.5">✓ Central Expense Reconciliation</li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-purple-400 font-mono font-bold block mb-1">ENTERPRISE SCALE</span>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-white">Custom</span>
              <span className="text-xs text-slate-500">/annual</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li className="flex items-center gap-1.5">✓ Dedicated Gemini Vertex AI Pipeline</li>
              <li className="flex items-center gap-1.5">✓ SOC-2 Type II Audit Logging</li>
              <li className="flex items-center gap-1.5">✓ SSO & Okta Integration</li>
              <li className="flex items-center gap-1.5">✓ 99.99% Guaranteed SLA</li>
            </ul>
          </div>
        </div>
      </div>

      {/* GTM & Viral Loop */}
      <div className="w-full mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-slate-300 font-sans">
            <strong>Viral GTM Strategy:</strong> Shareable "Procrastination Slayer Scorecards" posted to LinkedIn & X driving organic, zero-CAC top-of-funnel customer acquisition.
          </span>
        </div>
        <div className="text-cyan-400 font-mono font-bold flex items-center gap-1 shrink-0">
          Google Cloud Run Certified <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
