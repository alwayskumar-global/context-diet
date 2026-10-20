import { Clause, PromptMetrics } from '../types';

/**
 * Fast client-side token count estimator.
 * Correlates closely with OpenAI cl100k / Anthropic tokenizers:
 * Average ~3.8-4.2 characters per token in technical English text,
 * weighted by whitespace and punctuation splits.
 */
export function estimateTokens(text: string): number {
  if (!text || text.trim().length === 0) return 0;
  
  // Clean whitespace
  const trimmed = text.trim();
  
  // Split into words / punctuation chunks
  const words = trimmed.split(/\s+/);
  const punctuationCount = (trimmed.match(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>\[\]\\|]/g) || []).length;
  
  // Heuristic: words typically average ~1.3 tokens each, plus punctuation marks
  const charBased = Math.ceil(trimmed.length / 3.9);
  const wordBased = Math.ceil(words.length * 1.25 + punctuationCount * 0.4);
  
  // Return balanced estimate
  return Math.max(1, Math.round((charBased + wordBased) / 2));
}

/**
 * Compiles surviving clauses into the diet prompt text
 */
export function compileDietText(clauses: Clause[]): string {
  const activeSegments: string[] = [];

  for (const clause of clauses) {
    if (clause.isTrimmed) {
      // If verbose prose was trimmed, include its concise replacement!
      if (clause.category === 'verbose' && clause.conciseText) {
        activeSegments.push(clause.conciseText.trim());
      }
      // Red fluff and Amber duplicates are dropped
      continue;
    }
    // If kept, include original text
    activeSegments.push(clause.originalText.trim());
  }

  return activeSegments.join('\n');
}

/**
 * Calculates prompt metrics
 */
export function calculateMetrics(
  clauses: Clause[],
  requestsPerDay: number = 25000,
  costPerMillion: number = 3.00
): PromptMetrics {
  const originalText = clauses.map((c) => c.originalText.trim()).join('\n');
  const dietText = compileDietText(clauses);

  const originalTokens = estimateTokens(originalText);
  const dietTokens = estimateTokens(dietText);
  const tokensSaved = Math.max(0, originalTokens - dietTokens);
  const percentSaved = originalTokens > 0 
    ? Math.round((tokensSaved / originalTokens) * 100) 
    : 0;

  const constraintClauses = clauses.filter((c) => c.category === 'constraint');
  const totalConstraints = constraintClauses.length;
  const preservedConstraints = constraintClauses.filter((c) => !c.isTrimmed).length;
  const constraintLockPercent = totalConstraints > 0
    ? Math.round((preservedConstraints / totalConstraints) * 100)
    : 100;

  // Monthly dollar savings = (tokensSaved per request * requestsPerDay * 30 days * costPerMillion / 1,000,000)
  const monthlyTokensSaved = tokensSaved * requestsPerDay * 30;
  const monthlyCostSavings = (monthlyTokensSaved / 1_000_000) * costPerMillion;

  return {
    originalTokens,
    dietTokens,
    tokensSaved,
    percentSaved,
    totalConstraints,
    preservedConstraints,
    constraintLockPercent,
    monthlyCostSavings,
  };
}
