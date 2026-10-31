# ⚡ CHORE SLAYER 2026
### *Turn Soul-Crushing Digital Chores into High-Octane Action*
**Google for Developers // PromptWars x OUTLIER'2026 // {Build with AI}**

[![Netlify Status](https://img.shields.io/badge/Live%20Demo-choreslayer.netlify.app-00f3ff?style=for-the-badge&logo=netlify&logoColor=white)](https://choreslayer.netlify.app)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Build_with_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌐 Live Production URL
🔗 **Deploy Link**: **[https://choreslayer.netlify.app](https://choreslayer.netlify.app)**  
📁 **GitHub Repository**: **[https://github.com/anujnehra004/Chore-slayer](https://github.com/anujnehra004/Chore-slayer)**

---

## 🎯 The Hackathon Challenge

> *"We all procrastinate on painful digital chores—cleaning out 5,000 unread emails, sorting messy folders, reviewing expenses, or fixing lint errors. Build an experience where playing a fast-paced game or interactive story actually executes the real-world chore in the background."*  
> — **Google for Developers | PromptWars x OUTLIER'2026**

---

## 💡 Solution Overview

**ChoreSlayer** bridges high-speed reflex arcade gameplay and branching cyberpunk narrative storytelling with a **real-world asynchronous background execution daemon**. Instead of dreading hours of tedious administrative work, users play engaging mini-games or make narrative choices—each in-game action directly triggers authentic background workers that:

1. **Purge 5,000 Unread Emails** via simulated RFC-822 / IMAP expunge and list-unsubscribe calls.
2. **Deduplicate & Organize Messy Downloads** with SHA-256 hash detection, ISO-8601 renaming, and export a real organized `.zip` file using `JSZip`.
3. **Audit Unfiled Expenses & Kill Zombie Subscriptions**, applying IRS Section 162 rules and exporting a compliant tax CSV ledger.
4. **Auto-Refactor Code Lint Errors & Broken Types** using real AST mutations, offering a side-by-side diff viewer and pristine TypeScript downloads.
5. **Interactive Story RPG (Protocol Outlier)** for players who prefer narrative immersion over arcade reflexes.
6. **Gemini AI Intelligence Co-Pilot** powered by Google {Build with AI} for natural language chore analysis and prompt-driven batch automations.
7. **Immutable Rollback Ledger** with full audit logs and one-click `[Undo]` capability for zero data loss.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CHORE SLAYER CLIENT                             │
├──────────────────────────────────┬─────────────────────────────────────┤
│      ARCADE GAMING ENGINE        │       STORY RPG NARRATIVE           │
│  - Inbox Invaders (Canvas 2D)    │  - Branching Dialogue (Vera, BOT-8) │
│  - Folder Frenzy (Physics Portal)│  - Narrative-Driven Batch Chores    │
│  - Expense Exorcist (Rhythm Deck)│  - Stage Progression & XP           │
│  - Lint Samurai (Matrix Slasher) │                                     │
├──────────────────────────────────┴─────────────────────────────────────┤
│                    EVENT DISPATCHER & SFX SYNTHESIZER                  │
│  - Web Audio API (Lasers, Explosions, Slices, Chimes, Fanfares)        │
│  - Combo Multipliers & Dopamine Cleanliness Score                      │
├────────────────────────────────────────────────────────────────────────┤
│                 REAL ASYNCHRONOUS BACKGROUND CHORE DAEMON              │
├────────────────────┬────────────────────┬──────────────────────────────┤
│   IMAP / EMAIL     │   FILESYSTEM / ZIP │    FINANCE / IRS LEDGER      │
│ - Unsubscribe POST │ - SHA-256 Dedupe   │ - Section 162 Deductions     │
│ - Flagged VIP Pin  │ - ISO Renaming     │ - 50% Meals Rule Split       │
│ - UID Store Expunge│ - Real JSZip Build │ - Zombie Sub Cancellation    │
├────────────────────┴────────────────────┴──────────────────────────────┤
│                   AST COMPILER & LINT AUTO-REFACTOR                    │
│ - Strict Equality Upgrades (== -> ===)                                 │
│ - Insecure console.log Token Scrubbing                                 │
│ - TypeScript Generic Type Inference (any -> CleanPayload<T>)           │
├────────────────────────────────────────────────────────────────────────┤
│              GOOGLE GEMINI AI {BUILD WITH AI} CO-PILOT                 │
│ - Natural Language Prompt Interpreter                                  │
│ - Custom Batch Chore Automation Synthesizer                            │
│ - Direct Google Gemini 1.5/2.5 Flash API Integration                   │
├────────────────────────────────────────────────────────────────────────┤
│                 IMMUTABLE LEDGER & REVERSIBLE STATE                    │
│ - Full Audit Trail with Millisecond Timestamps                         │
│ - One-Click Rollback / Undo Engine                                     │
│ - JSON Audit Trail Export                                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🕹️ The 4 Core Chore Arenas

### 1. 📧 Inbox Invaders (Purging 5,000 Unread Emails)
- **The Pain**: An intimidating inbox counter of 5,000 unread marketing blasts, scams, and lost executive requests.
- **The Gameplay**: Fast-paced space arcade shooter built on HTML5 Canvas.
  - **Spam & Cold Newsletters**: Blaster fire triggers real `HTTP POST` unsubscriptions and mailbox archiving.
  - **Malicious Phishing**: High-frequency lasers trigger permanent deletion and domain blacklisting.
  - **VIP Boss Emails**: Captured with the Tractor Beam (`[S]`) to flag priority, star, and generate an AI draft.
  - **Super Mass Bomb (`[B]`)**: Detonates a shockwave that expunges 500 stale promos older than 30 days simultaneously.

### 2. 📁 Folder Frenzy (Messy Desktop & Downloads Cleanse)
- **The Pain**: Hundreds of cryptic screenshots, duplicated installers (`zoom_setup(3).exe`), and mixed files bloating drive space.
- **The Gameplay**: Physics-based portal flinger.
  - Sort items into 4 smart taxonomy portals: `[Documents]`, `[Media]`, `[Code]`, `[Junk]`.
  - Automatically deduplicates identical cryptographic hashes (saving 450+ MB).
  - Normalizes filenames to semantic ISO-8601 format (`YYYY-MM-DD_Topic.ext`).
  - **Concrete Real-World Output**: Supports drag & drop of your actual files; clicking **"Download Clean ZIP"** uses `JSZip` to generate and download a genuine structured archive directly to your hard drive!

### 3. 💰 Expense Exorcist (Tax Receipts & Subscription Review)
- **The Pain**: Piles of unreviewed credit card transactions and forgotten zombie subscriptions bleeding monthly bank balances.
- **The Gameplay**: Rapid-fire conveyor rhythm swipe game.
  - **Swipe Left**: Claim 100% Ordinary & Necessary Business Deductions (IRS Section 162).
  - **Swipe Right**: Personal non-deductible expenditure (Zero audit risk).
  - **Swipe Up**: 50% Business Meal write-off.
  - **Exorcise Button**: Instantly cancels recurring vampire subscriptions.
  - **Concrete Real-World Output**: Exports an **IRS-compliant CSV ledger** (`Tax_Deductions_Audit.csv`) ready for accountants.

### 4. ⚔️ Lint Samurai (Fixing Code Lint & Syntax Errors)
- **The Pain**: 128 failing ESLint checks, loose equality bugs, untyped `any` parameters, and production `console.log` token leaks breaking the CI/CD build.
- **The Gameplay**: Cyberpunk neon matrix Katana slasher.
  - Slashes through syntax defects and triggers Abstract Syntax Tree (AST) refactoring.
  - Side-by-side Monaco-style diff viewer highlights old corrupted code transforming into green-passing code in real time.
  - **Concrete Real-World Output**: Download the pristine, zero-lint TypeScript file or copy clean code with one click.

---

## 📖 Alternative Modality: Protocol Outlier (Story RPG)

For users who prefer rich storytelling over twitch reflexes:
- Step into the shoes of an **Elite Data Operative** in Megacorp 2026.
- Interact with dynamic characters: Commander VERA, the rogue Spam-9000 Daemon, Archivist BOT-8, and the Automated Tax Overseer.
- Every tactical narrative choice maps directly to background batch scripts (e.g., *"Deploy Counter-Unsubscribe Array"*, *"Deduplicate SHA-256 installer tree"*).

---

## 🤖 Google for Developers {Build with AI} — Gemini Co-Pilot

- Integrated with Google's Gemini models for prompt-driven automation.
- Users can type natural language instructions:
  - *"Sweep all promotional emails with 50% discounts older than 14 days"*
  - *"Deduplicate 400MB from my downloads folder and organize photos"*
  - *"Audit all software and cloud hosting receipts for tax deductions"*
- Works out-of-the-box with intelligent simulated heuristics and supports entering any personal Google Gemini API key.

---

## 🛡️ Zero Data Loss: Reversible Action Ledger

- Every background chore execution is committed to an **immutable state ledger**.
- Each log entry displays the exact timestamp, domain category, impact details, and underlying terminal command.
- Users can click **`[Undo]`** on any action to rollback changes immediately.
- Export complete JSON audit trails with one click.

---

## 🔊 Zero-Dependency Web Audio Synthesizer

- Built from scratch using native browser **Web Audio API** oscillators, gain nodes, and biquad filters.
- Zero external MP3/WAV dependencies for instant loading and zero network latency.
- Features custom synthesized retro arcade SFX: laser beams, explosions, blade slices, coin dings, and victory fanfares.

---

## 🚀 Local Development Setup

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/anujnehra004/Chore-slayer.git

# Navigate to project directory
cd Chore-slayer

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📦 Production Build

```bash
# Compile TypeScript and build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

Output is emitted to the `dist/` folder, configured with SPA redirect fallbacks and security headers in `netlify.toml`.

---

## 🏆 Hackathon Credits & Acknowledgements

- **Event**: PromptWars x OUTLIER'2026
- **Organizer**: Google for Developers | SATA | SMC | Enactus
- **Track**: {Build with AI}
- **Developer**: Anuj Nehra ([@anujnehra004](https://github.com/anujnehra004))
- **Live Demo**: [https://choreslayer.netlify.app](https://choreslayer.netlify.app)
