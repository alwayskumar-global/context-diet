export type ClauseCategory = 'fluff' | 'duplicate' | 'verbose' | 'constraint';

export interface Clause {
  id: string;
  category: ClauseCategory;
  originalText: string;
  conciseText?: string;      // 1-line distillation (used when category === 'verbose')
  isTrimmed: boolean;         // true = omitted or substituted in diet output
  isDuplicateOf?: string;     // ID of primary rule for duplicates
  explanation?: string;       // Short explanation of why this was flagged
}

export interface PresetPrompt {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  promptText: string;
  clauses: Clause[];
}

export interface PromptMetrics {
  originalTokens: number;
  dietTokens: number;
  tokensSaved: number;
  percentSaved: number;
  totalConstraints: number;
  preservedConstraints: number;
  constraintLockPercent: number;
  monthlyCostSavings: number;
}
