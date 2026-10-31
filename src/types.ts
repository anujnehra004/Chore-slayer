export type GameMode = 'inbox' | 'folders' | 'expenses' | 'lint' | 'story' | 'promptwars' | 'ledger' | 'ai' | 'business';



export interface ChoreItem {
  id: string;
  type: 'email' | 'file' | 'expense' | 'lint';
  title: string;
  subtitle: string;
  sizeOrAmount?: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  realAction: string;
  timestamp: string;
  status: 'pending' | 'executed' | 'undone';
}

export interface EmailChore {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  category: 'spam' | 'newsletter' | 'urgent_boss' | 'receipt' | 'social';
  receivedDate: string;
  isRead: boolean;
  actionTaken?: 'deleted' | 'unsubscribed_archived' | 'starred_priority' | 'forwarded_finance';
}

export interface FileChore {
  id: string;
  originalName: string;
  cleanName: string;
  extension: string;
  sizeBytes: number;
  category: 'documents' | 'media' | 'code' | 'junk';
  isDuplicate: boolean;
  duplicateHash?: string;
  contentSample?: string;
  targetFolder?: string;
}

export interface ExpenseChore {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  description: string;
  category: 'Travel' | 'Software/SaaS' | 'Meals & Entertainment' | 'Office Supplies' | 'Personal';
  deductiblePercentage: number;
  taxSavingsEst: number;
  flaggedSubscription: boolean;
  verdict?: 'deductible' | 'personal' | 'split' | 'canceled';
}

export interface LintChore {
  id: string;
  file: string;
  line: number;
  rule: string;
  message: string;
  severity: 'error' | 'warning';
  codeSnippet: string;
  fixedSnippet: string;
  explanation: string;
  fixed: boolean;
}

export interface ExecutionLogEntry {
  id: string;
  timestamp: string;
  category: 'Email' | 'Filesystem' | 'Finance' | 'Code' | 'System';
  action: string;
  details: string;
  bytesOrItemsImpacted: number;
  rawCommand: string;
  undone: boolean;
}

export interface PlayerStats {
  score: number;
  combo: number;
  maxCombo: number;
  emailsCleaned: number;
  initialEmails: number;
  bytesCleaned: number;
  taxDeductionsClaimed: number;
  unnecessarySpendCanceled: number;
  lintErrorsFixed: number;
  choresExecutedCount: number;
  procrastinationSecondsSaved: number;
}

export interface StoryNode {
  id: string;
  speaker: string;
  role: string;
  dialogue: string;
  avatar: string;
  backgroundTheme: string;
  options: {
    text: string;
    actionDescription: string;
    choreExecution: {
      type: 'email' | 'file' | 'expense' | 'lint';
      count: number;
      label: string;
      rawApi: string;
    };
    nextNodeId: string;
    scoreGain: number;
  }[];
}
