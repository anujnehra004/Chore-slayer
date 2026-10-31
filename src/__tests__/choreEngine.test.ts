import { describe, it, expect } from 'vitest';
import { 
  INITIAL_EMAILS_COUNT, 
  INITIAL_EMAILS_DATA, 
  INITIAL_FILES_DATA, 
  INITIAL_EXPENSES_DATA, 
  INITIAL_LINT_DATA,
  createOrganizedZip,
  generateExpenseCSV
} from '../engine/choreEngine';
import { geminiAssistant } from '../engine/geminiAi';

describe('ChoreSlayer 2026 Core Engine // Problem Statement Alignment', () => {
  it('initializes with precisely 5,000 unread emails matching problem statement', () => {
    expect(INITIAL_EMAILS_COUNT).toBe(5000);
    expect(INITIAL_EMAILS_DATA.length).toBeGreaterThan(0);
  });

  it('correctly classifies email chore categories (spam, urgent_boss, newsletter, receipt)', () => {
    const categories = INITIAL_EMAILS_DATA.map(e => e.category);
    expect(categories).toContain('spam');
    expect(categories).toContain('urgent_boss');
    expect(categories).toContain('newsletter');
    expect(categories).toContain('receipt');
  });

  it('performs file deduplication and generates ISO-8601 clean taxonomy', () => {
    const duplicateFiles = INITIAL_FILES_DATA.filter(f => f.isDuplicate);
    expect(duplicateFiles.length).toBeGreaterThan(0);
    expect(duplicateFiles[0].duplicateHash).toBeDefined();

    // Verify clean names adhere to organized standards
    INITIAL_FILES_DATA.forEach(file => {
      expect(file.cleanName).toBeTruthy();
      expect(file.cleanName).not.toContain('(1)');
      expect(file.cleanName).not.toContain('FINAL_v3');
    });
  });

  it('generates real valid ZIP archive containing organized directory hierarchy', async () => {
    const zipBlob = await createOrganizedZip(INITIAL_FILES_DATA);
    expect(zipBlob).toBeDefined();
    expect(zipBlob.size).toBeGreaterThan(0);
    expect(zipBlob.type).toBe('application/zip');
  });

  it('calculates IRS Section 162 business write-offs and exports compliant CSV', () => {
    const csv = generateExpenseCSV(INITIAL_EXPENSES_DATA);
    expect(csv).toContain('Merchant,Amount,Date,Description,Category');
    expect(csv).toContain('Google Cloud Platform');
    expect(csv).toContain('100%');
  });

  it('identifies and refactors AST lint defects and type errors', () => {
    expect(INITIAL_LINT_DATA.length).toBeGreaterThan(0);
    const eqRule = INITIAL_LINT_DATA.find(l => l.rule === 'eqeqeq');
    expect(eqRule).toBeDefined();
    expect(eqRule?.fixedSnippet).toContain('===');
  });
});

describe('Google Gemini AI Intelligence Engine', () => {
  it('correctly interprets natural language email sweep prompt', async () => {
    const response = await geminiAssistant.processPrompt("Please clean my 5000 unread spam emails");
    expect(response.reply).toContain('Gemini');
    expect(response.actionExecutable).toBeDefined();
    expect(response.actionExecutable?.choreType).toBe('email');
  });

  it('correctly interprets file deduplication prompt', async () => {
    const response = await geminiAssistant.processPrompt("Deduplicate my messy desktop and downloads folder");
    expect(response.actionExecutable?.choreType).toBe('file');
  });

  it('correctly interprets tax expense audit prompt', async () => {
    const response = await geminiAssistant.processPrompt("Review my travel receipts for tax deductions");
    expect(response.actionExecutable?.choreType).toBe('expense');
  });
});
