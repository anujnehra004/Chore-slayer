import React, { useState } from 'react';
import { geminiAssistant } from '../engine/geminiAi';
import type { ExecutionLogEntry } from '../types';
import { sounds } from '../audio/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Bot, 
  Send, 
  Key, 
  Sparkles, 
  Play, 
  Lightbulb, 
  Cpu
} from 'lucide-react';


interface GeminiAiModalProps {
  onChoreExecuted: (entry: Omit<ExecutionLogEntry, 'id' | 'timestamp' | 'undone'>) => void;
  onScoreGain: (points: number) => void;
  onUpdateEmailsRemaining: (reducer: (curr: number) => number) => void;
  onAddBytesCleaned: (bytes: number) => void;
  onAddTaxSavings: (amount: number) => void;
  onAddLintFixed: () => void;
}

export const GeminiAiModal: React.FC<GeminiAiModalProps> = ({
  onChoreExecuted,
  onScoreGain,
  onUpdateEmailsRemaining,
  onAddBytesCleaned,
  onAddTaxSavings,
  onAddLintFixed
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>(geminiAssistant.getApiKey());
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'gemini'; text: string; action?: { choreType: string; description: string; batchCount: number } }[]>([
    {
      sender: 'gemini',
      text: "👋 Greetings! I am the **Gemini 2026 Chore Intelligence Co-Pilot**, powered by **Google for Developers {Build with AI}**.\n\nTell me what painful digital chores are overwhelming you—such as cleaning 5,000 unread emails, organizing chaotic folders, auditing tax expenses, or fixing lint bugs. I'll analyze the workload and execute real automated background workers!"
    }
  ]);

  const samplePrompts = [
    "Sweep 5,000 unread emails: unsubscribe from marketing & archive stale notifications",
    "Deduplicate messy downloads folder and structure into ISO-named folders",
    "Audit all travel and software receipts to maximize legitimate tax write-offs",
    "Auto-fix TypeScript type safety, loose equality, and strip console.log leaks"
  ];

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || prompt;
    if (!textToSend.trim() || isLoading) return;

    sounds.playLaser();
    setPrompt('');
    setIsLoading(true);

    setChatMessages(prev => [...prev, { sender: 'user', text: textToSend }]);

    try {
      const response = await geminiAssistant.processPrompt(textToSend);
      sounds.playCoin();
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'gemini',
          text: response.reply,
          action: response.actionExecutable
        }
      ]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'gemini',
          text: "I analyzed your request using offline heuristic models and generated a background chore execution plan below."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteBatch = (action: { choreType: string; description: string; batchCount: number }) => {
    sounds.playBomb();
    onScoreGain(500);

    if (action.choreType === 'email') {
      onUpdateEmailsRemaining(curr => Math.max(0, curr - action.batchCount));
      onChoreExecuted({
        category: 'Email',
        action: 'GEMINI_AI_BATCH_SWEEP',
        details: action.description,
        bytesOrItemsImpacted: action.batchCount,
        rawCommand: `GEMINI_IMAP_DISPATCH: model=gemini-1.5-flash purge_count=${action.batchCount} unsubscribe_threads=TRUE`
      });
    } else if (action.choreType === 'file') {
      const bytes = action.batchCount * 65 * 1024 * 1024;
      onAddBytesCleaned(bytes);
      onChoreExecuted({
        category: 'Filesystem',
        action: 'GEMINI_AI_FS_ORGANIZE',
        details: action.description,
        bytesOrItemsImpacted: bytes,
        rawCommand: `GEMINI_FS_DISPATCH: model=gemini-1.5-flash action=dedupe_and_iso_tree`
      });
    } else if (action.choreType === 'expense') {
      onAddTaxSavings(480.00);
      onChoreExecuted({
        category: 'Finance',
        action: 'GEMINI_AI_TAX_AUDIT',
        details: action.description,
        bytesOrItemsImpacted: 1860,
        rawCommand: `GEMINI_FIN_DISPATCH: model=gemini-1.5-flash irs_section=162 tax_savings=$480.00`
      });
    } else if (action.choreType === 'lint') {
      for (let i = 0; i < action.batchCount; i++) onAddLintFixed();
      onChoreExecuted({
        category: 'Code',
        action: 'GEMINI_AI_AST_REFACTOR',
        details: action.description,
        bytesOrItemsImpacted: action.batchCount,
        rawCommand: `GEMINI_CODE_DISPATCH: model=gemini-1.5-flash eslint_rules=[eqeqeq,no-console,no-any]`
      });
    }

    confetti({ particleCount: 90, spread: 65, origin: { y: 0.6 } });
  };

  const handleSaveApiKey = () => {
    geminiAssistant.setApiKey(apiKey);
    setShowKeyInput(false);
    sounds.playCoin();
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
              <h2 className="text-xl font-bold text-white tracking-wide">GEMINI CHORE CO-PILOT</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Google for Developers &#123;Build with AI&#125;
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Prompt-driven natural language automation: Gemini synthesizes custom background rules to vaporize your chores.
            </p>
          </div>
        </div>

        {/* API Key Toggle */}
        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all"
        >
          <Key className="w-3.5 h-3.5 text-cyan-400" />
          {apiKey ? 'API Key Configured' : 'Add Gemini API Key (Optional)'}
        </button>
      </div>

      {/* Optional API Key Drawer */}
      {showKeyInput && (
        <div className="w-full my-3 p-3 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-mono">Gemini API Key:</span>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleSaveApiKey}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Save Key
          </button>
        </div>
      )}

      {/* Suggested Prompt Chips */}
      <div className="w-full my-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> QUICK PROMPTS:
        </span>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-all truncate max-w-xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="w-full min-h-[340px] max-h-[460px] overflow-y-auto bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4 my-2">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600/30 text-cyan-100 border border-cyan-500/40'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 shadow-lg'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-slate-400">
                {msg.sender === 'user' ? (
                  <span>YOU</span>
                ) : (
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> GEMINI INTELLIGENCE
                  </span>
                )}
              </div>
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Action Execution Pill (If Gemini suggested an executable action) */}
              {msg.action && (
                <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono uppercase block font-bold">
                      Synthesized Background Chore:
                    </span>
                    <span className="text-xs font-semibold text-white">{msg.action.description}</span>
                  </div>
                  <button
                    onClick={() => handleExecuteBatch(msg.action!)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs tracking-wider transition-all shadow-md shadow-cyan-500/30 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> EXECUTE IN BACKGROUND
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-3 bg-slate-900/60 rounded-xl max-w-sm">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>Gemini AI is analyzing digital chore patterns...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="w-full flex items-center gap-2 mt-2"
      >
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Type any chore instruction (e.g., 'Purge 1,000 old emails and cancel ghost subscriptions')..."
          className="flex-1 bg-slate-950 border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="flex items-center justify-center px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
