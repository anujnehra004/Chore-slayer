import type { StoryNode } from '../types';


export const STORY_NODES: Record<string, StoryNode> = {
  intro: {
    id: 'intro',
    speaker: 'Commander VERA',
    role: 'Chief Cybernetics Officer // Megacorp 2026',
    avatar: '👩‍✈️',
    backgroundTheme: 'from-blue-950 via-slate-900 to-black',
    dialogue: "Agent, welcome to Sector 0. Our central neural mainframe is on the verge of critical meltdown. Decades of unread marketing spam, unfiled travel expenses, corrupted download folders, and sloppy code has bloated our servers to 99.8% capacity. The Board gave us 24 hours before they wipe everything. Will you take the clean-up mission?",
    options: [
      {
        text: "🚨 \"Engage Protocol Outlier. Let's vaporize the digital garbage.\"",
        actionDescription: "Initialize Background Daemon and calibrate anti-procrastination shields",
        choreExecution: {
          type: 'email',
          count: 50,
          label: 'Calibrated worker threads and pruned initial 50 orphan tracking pings',
          rawApi: 'INIT_SYSTEM_SWEEPER: workers=4, rate_limit=unbounded'
        },
        nextNodeId: 'node_email_crisis',
        scoreGain: 150
      },
      {
        text: "⚡ \"Show me the worst offender first. Where is the deepest rot?\"",
        actionDescription: "Run telemetry diagnostics across all 4 digital chore quadrants",
        choreExecution: {
          type: 'lint',
          count: 1,
          label: 'Diagnosed telemetry script and fixed 1 critical syntax leak',
          rawApi: 'TELEMETRY_SCAN: health_score=12%, critical_anomalies=4'
        },
        nextNodeId: 'node_email_crisis',
        scoreGain: 120
      }
    ]
  },

  node_email_crisis: {
    id: 'node_email_crisis',
    speaker: 'Daemon SPAM-9000',
    role: 'Sentient Rogue Newsletter Swarm',
    avatar: '👾',
    backgroundTheme: 'from-purple-950 via-slate-900 to-black',
    dialogue: "Mwahaha! You think you can stop us? There are 5,000 of us clogging the primary mailbox! We have flash sales on vibrating toothbrushes, cryptocurrency giveaways, and webinar invites you will never attend! Surrender to the unread badge counter!",
    options: [
      {
        text: "🔥 \"Deploy Quantum Unsubscribe Array on all cold marketing!\"",
        actionDescription: "Auto-unsubscribe 650 marketing lists and archive 1,200 stale alerts",
        choreExecution: {
          type: 'email',
          count: 1850,
          label: 'Batch unsubscribed from 650 lists & archived 1,200 stale promos older than 30d',
          rawApi: 'IMAP_BATCH: UID EXPUNGE flags=(\\Unsubscribed \\Archived) count=1850'
        },
        nextNodeId: 'node_folder_chaos',
        scoreGain: 500
      },
      {
        text: "🛡️ \"Filter with surgical precision: Star boss emergencies, vaporize scam phishing.\"",
        actionDescription: "Safely isolate VIP messages and incinerate fraudulent domains",
        choreExecution: {
          type: 'email',
          count: 950,
          label: 'Flagged 14 VIP messages with AI drafts & purged 950 malicious phishing bots',
          rawApi: 'AI_FILTER_APPLY: vip_pin=14, blacklist_purge=950'
        },
        nextNodeId: 'node_folder_chaos',
        scoreGain: 450
      }
    ]
  },

  node_folder_chaos: {
    id: 'node_folder_chaos',
    speaker: 'Archivist BOT-8',
    role: 'Distressed File System Supervisor',
    avatar: '🤖',
    backgroundTheme: 'from-amber-950 via-slate-900 to-black',
    dialogue: "Warning! The Downloads sector has collapsed into a singularity! Someone downloaded 'zoom_installer.exe' 14 times, there are 4,000 screenshots named 'Screenshot 2026-04-12...', and the documents are intermingled with cat memes! The storage drives are screaming!",
    options: [
      {
        text: "📂 \"Execute Neural File Sorter: ISO Rename & Deduplicate Hashes!\"",
        actionDescription: "Reorganize messy folders into /Documents, /Media, /Code and free 450MB duplicate storage",
        choreExecution: {
          type: 'file',
          count: 8,
          label: 'Sorted 8 primary archives, purged 450MB duplicate installers, and created structured ZIP',
          rawApi: 'FS_ORGANIZE: dedupe_hash=sha256, target_tree=/Clean_2026/'
        },
        nextNodeId: 'node_expense_audit',
        scoreGain: 600
      },
      {
        text: "🧹 \"Incinerate temporary installer junk and isolate high-value contracts!\"",
        actionDescription: "Safely delete obsolete installers and extract legal agreements",
        choreExecution: {
          type: 'file',
          count: 5,
          label: 'Vaporized 68MB in obsolete installer duplicates and cataloged W2s & contracts',
          rawApi: 'FS_PRUNE: rm -rf *.tmp *.exe(copy), mv *.pdf /LegalDocs/'
        },
        nextNodeId: 'node_expense_audit',
        scoreGain: 480
      }
    ]
  },

  node_expense_audit: {
    id: 'node_expense_audit',
    speaker: 'Accountant AI-CFO',
    role: 'Automated Tax Compliance Overseer',
    avatar: '💰',
    backgroundTheme: 'from-emerald-950 via-slate-900 to-black',
    dialogue: "Halt! The Tax Authority audit drone is scanning our perimeter in 3 minutes! We have unreviewed corporate expenses, receipts lost in Slack screenshots, and ghost SaaS subscriptions auto-charging our company card while developers sleep! Cleanse this ledger, or we face maximum tax penalties!",
    options: [
      {
        text: "💼 \"Authorize 100% compliant business deductions & decapitate ghost subscriptions!\"",
        actionDescription: "Claim $1,860.50 in legitimate travel/tech deductions and cancel recurring vampire charges",
        choreExecution: {
          type: 'expense',
          count: 5,
          label: 'Classified $1,860.50 in tax write-offs (savings: $558.15) and flagged 2 ghost subscriptions for cancellation',
          rawApi: 'TAX_LEDGER_POST: writeoffs=$1860.50, sub_cancel_flag=["Ghost Domains", "Abandoned Gym"]'
        },
        nextNodeId: 'node_code_catastrophe',
        scoreGain: 700
      },
      {
        text: "📊 \"Export full IRS-compliant CSV ledger with full audit trail!\"",
        actionDescription: "Generate categorized expense CSV with receipt cross-referencing",
        choreExecution: {
          type: 'expense',
          count: 4,
          label: 'Generated audited CSV export with 0 audit flags and 100% category match',
          rawApi: 'EXPENSE_EXPORT: format=csv, status=audited_verified'
        },
        nextNodeId: 'node_code_catastrophe',
        scoreGain: 550
      }
    ]
  },

  node_code_catastrophe: {
    id: 'node_code_catastrophe',
    speaker: 'Glitch Entity NULL_PTR',
    role: 'Sentient Build-Breaking Bug',
    avatar: '👾',
    backgroundTheme: 'from-rose-950 via-slate-900 to-black',
    dialogue: "You think you can ship to production? Look at this codebase! 128 lint errors, 'any' types everywhere, loose equality comparisons, and someone left console.log('DEBUG TOKEN: ' + secretKey) right in the authentication gateway! One more keystroke and the build will fail forever!",
    options: [
      {
        text: "⚔️ \"Unsheathe the Lint Katana: Refactor AST, enforce strict types, scrub console.logs!\"",
        actionDescription: "Execute automated Abstract Syntax Tree code repair across source files",
        choreExecution: {
          type: 'lint',
          count: 5,
          label: 'Fixed 5 critical lint & typing errors, hardened token security, and passed all CI/CD gates',
          rawApi: 'AST_REFACTOR: rules=[no-unused-vars, eqeqeq, no-console, no-explicit-any] build_status=GREEN'
        },
        nextNodeId: 'node_victory',
        scoreGain: 850
      },
      {
        text: "🛡️ \"Run Prettier and TypeScript strict mode simultaneously!\"",
        actionDescription: "Format code architecture and inject bulletproof type guards",
        choreExecution: {
          type: 'lint',
          count: 4,
          label: 'Automated code formatting and added generic type constraints',
          rawApi: 'PRETTIER_EXEC: status=clean, bundle_size_reduced=14%'
        },
        nextNodeId: 'node_victory',
        scoreGain: 720
      }
    ]
  },

  node_victory: {
    id: 'node_victory',
    speaker: 'Commander VERA',
    role: 'Chief Cybernetics Officer // Megacorp 2026',
    avatar: '🎉',
    backgroundTheme: 'from-cyan-950 via-blue-900 to-black',
    dialogue: "Mission Accomplished, Agent! Look at the monitors: Inbox count: ZERO. Downloads folder: PRISTINE. Expenses: AUDITED & SAVED $558. Build status: 100% GREEN. By turning procrastination into action, you solved in 3 minutes what would have taken 4 agonizing weeks of mundane digital suffering!",
    options: [
      {
        text: "🏆 \"Download my Real-World Clean Assets (ZIP, CSV, Clean Code)\"",
        actionDescription: "Export the concrete fruits of your digital labor to your computer",
        choreExecution: {
          type: 'file',
          count: 1,
          label: 'Packaged all real-world assets into one-click download bundle',
          rawApi: 'EXPORT_ALL_BUNDLES: zip=ready, csv=ready, code=clean'
        },
        nextNodeId: 'intro',
        scoreGain: 1000
      },
      {
        text: "🔄 \"Re-enter the Arcade Arena for more high-score action!\"",
        actionDescription: "Hop back into the fast-paced minigames to beat your personal best",
        choreExecution: {
          type: 'email',
          count: 0,
          label: 'Session archived with S-Tier Productivity Rank',
          rawApi: 'RANK_UPDATE: title="Grandmaster Chore Slayer 2026"'
        },
        nextNodeId: 'intro',
        scoreGain: 500
      }
    ]
  }
};
