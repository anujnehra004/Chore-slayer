import JSZip from 'jszip';
import type { EmailChore, FileChore, ExpenseChore, LintChore, PlayerStats } from '../types';


export const INITIAL_EMAILS_COUNT = 5000;

export const INITIAL_EMAILS_DATA: EmailChore[] = [
  {
    id: 'em-1',
    sender: 'deals@hyperpromos.net',
    subject: '🚨 FLASH SALE: 90% OFF Smart toaster you do not need!',
    snippet: 'Hurry, offer expires in 4 minutes! Click here to claim your coupon...',
    category: 'spam',
    receivedDate: '10 mins ago',
    isRead: false
  },
  {
    id: 'em-2',
    sender: 'sarah.vp@acmecorp.com',
    subject: 'URGENT: Client presentation moved to 2 PM today',
    snippet: 'Hey, the CEO wants the updated deck on the enterprise tier before lunch.',
    category: 'urgent_boss',
    receivedDate: '15 mins ago',
    isRead: false
  },
  {
    id: 'em-3',
    sender: 'news@dailytechdigest.io',
    subject: 'Issue #412: 15 New JavaScript Frameworks You Missed While Sleeping',
    snippet: 'Welcome to this weeks roundup of front-end tools, web assembly breakthroughs...',
    category: 'newsletter',
    receivedDate: '2 hours ago',
    isRead: false
  },
  {
    id: 'em-4',
    sender: 'billing@cloudservice.com',
    subject: 'Receipt: Your monthly API invoice for $42.15 is ready',
    snippet: 'Invoice #INV-2026-8891 has been charged to your VISA card ending in 4242.',
    category: 'receipt',
    receivedDate: 'Yesterday',
    isRead: false
  },
  {
    id: 'em-5',
    sender: 'notifications@socialnetwork.com',
    subject: '38 people viewed your profile this week',
    snippet: 'See who is looking at your career milestones and endorsements...',
    category: 'social',
    receivedDate: 'Yesterday',
    isRead: false
  },
  {
    id: 'em-6',
    sender: 'claim@crypto-jackpot-winner.xyz',
    subject: 'Claim 2.5 BTC sent to your wallet address',
    snippet: 'You were randomly selected in the decentralized node distribution...',
    category: 'spam',
    receivedDate: '2 days ago',
    isRead: false
  },
  {
    id: 'em-7',
    sender: 'alex.lead@devteam.org',
    subject: 'PR #104: Production hotfix ready for your code review',
    snippet: 'Can you glance at the token refresh middleware before we deploy?',
    category: 'urgent_boss',
    receivedDate: '3 days ago',
    isRead: false
  },
  {
    id: 'em-8',
    sender: 'hello@productivity-app.co',
    subject: 'Tips to beat procrastination and master your inbox in 2026',
    snippet: 'Step 1: Stop leaving 5,000 unread emails sitting around...',
    category: 'newsletter',
    receivedDate: '3 days ago',
    isRead: false
  },
  {
    id: 'em-9',
    sender: 'receipts@fooddeliveryswift.com',
    subject: 'Your Midnight Ramen order was delivered ($28.40)',
    snippet: 'Thank you for ordering with Swift Delivery. Tips included.',
    category: 'receipt',
    receivedDate: '4 days ago',
    isRead: false
  },
  {
    id: 'em-10',
    sender: 'bot@randommarketinglists.biz',
    subject: 'Exclusive Webinar: How to 10x your B2B synergy in Q4',
    snippet: 'Join our panel of 12 self-proclaimed thought leaders as we dissect...',
    category: 'spam',
    receivedDate: '5 days ago',
    isRead: false
  }
];

export const INITIAL_FILES_DATA: FileChore[] = [
  {
    id: 'f-1',
    originalName: 'Screenshot 2026-10-31 at 10.42.19 AM.png',
    cleanName: '2026-10-31_System-Config_Screenshot.png',
    extension: 'png',
    sizeBytes: 4200000,
    category: 'media',
    isDuplicate: false,
    contentSample: '[PNG Image: System Dashboard]'
  },
  {
    id: 'f-2',
    originalName: 'client_agreement_v2_final_FINAL_v3.docx',
    cleanName: '2026_Client-Agreement-Signed.docx',
    extension: 'docx',
    sizeBytes: 1540000,
    category: 'documents',
    isDuplicate: false,
    contentSample: 'This Master Service Agreement entered into on...'
  },
  {
    id: 'f-3',
    originalName: 'node_modules_backup (copy).tar.gz',
    cleanName: 'node_modules_backup.tar.gz',
    extension: 'tar.gz',
    sizeBytes: 450000000,
    category: 'junk',
    isDuplicate: true,
    duplicateHash: 'sha256:88a719bf'
  },
  {
    id: 'f-4',
    originalName: 'test_script_temp.py',
    cleanName: 'api_crawler_utility.py',
    extension: 'py',
    sizeBytes: 8500,
    category: 'code',
    isDuplicate: false,
    contentSample: 'import requests\n\ndef fetch_data():\n    pass'
  },
  {
    id: 'f-5',
    originalName: 'W2_Tax_Return_2025_Official.pdf',
    cleanName: '2025_IRS_W2_TaxReturn.pdf',
    extension: 'pdf',
    sizeBytes: 2800000,
    category: 'documents',
    isDuplicate: false,
    contentSample: 'Form W-2 Wage and Tax Statement 2025'
  },
  {
    id: 'f-6',
    originalName: 'zoom_installer_v5.4.1 (2).exe',
    cleanName: 'zoom_installer_v5.4.1.exe',
    extension: 'exe',
    sizeBytes: 68000000,
    category: 'junk',
    isDuplicate: true,
    duplicateHash: 'sha256:33bb91c2'
  },
  {
    id: 'f-7',
    originalName: 'funny_dog_wearing_hat.mp4',
    cleanName: 'video_funny_dog_hat.mp4',
    extension: 'mp4',
    sizeBytes: 18500000,
    category: 'media',
    isDuplicate: false,
    contentSample: '[MP4 Video: Golden Retriever in Fedora]'
  },
  {
    id: 'f-8',
    originalName: 'authController.ts',
    cleanName: 'authController.ts',
    extension: 'ts',
    sizeBytes: 12400,
    category: 'code',
    isDuplicate: false,
    contentSample: 'export const verifyUserToken = async () => {}'
  }
];

export const INITIAL_EXPENSES_DATA: ExpenseChore[] = [
  {
    id: 'exp-1',
    merchant: 'Google Cloud Platform',
    amount: 142.50,
    date: '2026-10-28',
    description: 'Vertex AI Model inference & Cloud Storage hosting',
    category: 'Software/SaaS',
    deductiblePercentage: 100,
    taxSavingsEst: 42.75,
    flaggedSubscription: false
  },
  {
    id: 'exp-2',
    merchant: 'Delta Airlines',
    amount: 840.00,
    date: '2026-10-15',
    description: 'Round-trip flight to Outlier 2026 Developer Hackathon',
    category: 'Travel',
    deductiblePercentage: 100,
    taxSavingsEst: 252.00,
    flaggedSubscription: false
  },
  {
    id: 'exp-3',
    merchant: 'Steam Games Store',
    amount: 69.99,
    date: '2026-10-22',
    description: 'Cyberpunk RPG Deluxe Preorder',
    category: 'Personal',
    deductiblePercentage: 0,
    taxSavingsEst: 0,
    flaggedSubscription: false
  },
  {
    id: 'exp-4',
    merchant: 'Nobu Japanese Bistro',
    amount: 185.00,
    date: '2026-10-19',
    description: 'Client dinner with prospective seed investors',
    category: 'Meals & Entertainment',
    deductiblePercentage: 50,
    taxSavingsEst: 27.75,
    flaggedSubscription: false
  },
  {
    id: 'exp-5',
    merchant: 'Ghost Domains Inc (Recurring)',
    amount: 39.00,
    date: '2026-10-01',
    description: 'Auto-renewed domain you bought 3 years ago for an abandoned app',
    category: 'Software/SaaS',
    deductiblePercentage: 0,
    taxSavingsEst: 0,
    flaggedSubscription: true
  },
  {
    id: 'exp-6',
    merchant: 'GitHub Enterprise Copilot',
    amount: 38.00,
    date: '2026-10-14',
    description: 'Team AI coding assistant license',
    category: 'Software/SaaS',
    deductiblePercentage: 100,
    taxSavingsEst: 11.40,
    flaggedSubscription: false
  },
  {
    id: 'exp-7',
    merchant: 'Local 24/7 Gym',
    amount: 55.00,
    date: '2026-10-05',
    description: 'Monthly gym membership (visited once 4 months ago)',
    category: 'Personal',
    deductiblePercentage: 0,
    taxSavingsEst: 0,
    flaggedSubscription: true
  }
];

export const INITIAL_LINT_DATA: LintChore[] = [
  {
    id: 'lint-1',
    file: 'src/services/authService.ts',
    line: 14,
    rule: 'no-unused-vars',
    message: "'secretRecoveryKey' is defined but never used",
    severity: 'error',
    codeSnippet: 'const secretRecoveryKey = generateQuantumSalt();',
    fixedSnippet: '// Unused dead code removed cleanly',
    explanation: 'Removed unused variable which was bloating bundle and leaking memory address references.',
    fixed: false
  },
  {
    id: 'lint-2',
    file: 'src/controllers/paymentController.ts',
    line: 38,
    rule: 'eqeqeq',
    message: "Expected '===' and instead saw '=='",
    severity: 'error',
    codeSnippet: "if (transaction.status == 'approved')",
    fixedSnippet: "if (transaction.status === 'approved')",
    explanation: 'Upgraded loose equality to strict equality to prevent JavaScript type coercion vulnerabilities.',
    fixed: false
  },
  {
    id: 'lint-3',
    file: 'src/utils/logger.ts',
    line: 88,
    rule: 'no-console',
    message: "Unexpected console.log statement in production build",
    severity: 'warning',
    codeSnippet: "console.log('DEBUG: User API Token payload:', authToken);",
    fixedSnippet: "logger.debug('Authenticated session verified');",
    explanation: 'Replaced insecure raw console.log token leak with safe structured logger call.',
    fixed: false
  },
  {
    id: 'lint-4',
    file: 'src/api/routes.ts',
    line: 52,
    rule: '@typescript-eslint/no-explicit-any',
    message: "Unexpected any. Specify a different type",
    severity: 'error',
    codeSnippet: 'export function processPayload(data: any): any {',
    fixedSnippet: 'export function processPayload<T extends RequestPayload>(data: T): CleanPayload<T> {',
    fixed: false,
    explanation: 'Replaced unsafe any with strongly-typed generic constraints and complete type safety.'
  },
  {
    id: 'lint-5',
    file: 'src/components/Dashboard.tsx',
    line: 19,
    rule: 'react-hooks/exhaustive-deps',
    message: "React Hook useEffect has a missing dependency: 'fetchStats'",
    severity: 'warning',
    codeSnippet: 'useEffect(() => { fetchStats(); }, []);',
    fixedSnippet: 'useEffect(() => { fetchStats(); }, [fetchStats]);',
    explanation: 'Included useCallback wrapped fetchStats in dependency array preventing stale state closures.',
    fixed: false
  }
];

export const INITIAL_PLAYER_STATS: PlayerStats = {
  score: 0,
  combo: 0,
  maxCombo: 0,
  emailsCleaned: 0,
  initialEmails: INITIAL_EMAILS_COUNT,
  bytesCleaned: 0,
  taxDeductionsClaimed: 0,
  unnecessarySpendCanceled: 0,
  lintErrorsFixed: 0,
  choresExecutedCount: 0,
  procrastinationSecondsSaved: 0
};

// Real Zip generator utility for organized files
export async function createOrganizedZip(files: FileChore[]): Promise<Blob> {
  const zip = new JSZip();

  const manifest = {
    generatedBy: "ChoreSlayer x PromptWars 2026 Engine",
    timestamp: new Date().toISOString(),
    totalFilesOrganized: files.length,
    structure: {
      "Documents/": "Legal, tax returns, contracts, written records",
      "Media/": "Cleaned photos, screenshots, videos",
      "Code/": "Scripts, source code, repositories",
      "AuditReport.txt": "Summary of cleanup actions"
    }
  };

  zip.file("README_ORGANIZED.json", JSON.stringify(manifest, null, 2));

  files.forEach(file => {
    let folder = 'Other';
    if (file.category === 'documents') folder = 'Documents';
    else if (file.category === 'media') folder = 'Media';
    else if (file.category === 'code') folder = 'Code';
    else if (file.category === 'junk') return; // Do not include junk!

    const sampleContent = file.contentSample || `[Organized file: ${file.cleanName}]\nOriginal name: ${file.originalName}\nSize: ${file.sizeBytes} bytes\nProcessed by ChoreSlayer Real Background Executor.`;
    zip.folder(folder)?.file(file.cleanName, sampleContent);
  });

  return await zip.generateAsync({ type: 'blob' });
}

// Real CSV generator utility for categorized expenses
export function generateExpenseCSV(expenses: ExpenseChore[]): string {
  const headers = ['Merchant', 'Amount', 'Date', 'Description', 'Category', 'Deductible %', 'Est Tax Savings ($)', 'Status'];
  const rows = expenses.map(e => [
    `"${e.merchant.replace(/"/g, '""')}"`,
    e.amount.toFixed(2),
    e.date,
    `"${e.description.replace(/"/g, '""')}"`,
    `"${e.category}"`,
    `${e.deductiblePercentage}%`,
    e.taxSavingsEst.toFixed(2),
    `"${e.verdict || 'pending'}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// Download trigger helper
export function triggerBrowserDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
