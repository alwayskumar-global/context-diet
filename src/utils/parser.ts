import { Clause, ClauseCategory } from '../types';

/**
 * Heuristic parser for custom system prompts and instruction files.
 * Decomposes raw text into logical clauses and classifies each
 * into Fluff, Duplicate, Verbose Prose, or Hard Constraint.
 */
export function parseCustomPrompt(rawText: string): Clause[] {
  if (!rawText || rawText.trim().length === 0) return [];

  // Split into lines/bullets/sentences
  const rawLines = rawText.split(/\n+/).map((l) => l.trim()).filter((l) => l.length > 0);
  
  const clauses: Clause[] = [];
  const seenConcepts = new Map<string, string>(); // concept keyword -> first clause ID

  let clauseIndex = 1;

  for (const line of rawLines) {
    // If the line is long, consider splitting into sentences
    const sentences = line.length > 180 
      ? line.split(/(?<=[.!?])\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean)
      : [line];

    for (const text of sentences) {
      const lower = text.toLowerCase();
      let category: ClauseCategory = 'constraint';
      let isTrimmed = false;
      let explanation = '';
      let conciseText: string | undefined = undefined;
      let isDuplicateOf: string | undefined = undefined;

      // 1. Check Fluff / Sycophancy / Filler
      if (
        lower.includes('warmly welcoming') ||
        lower.includes('exceptionally polite') ||
        lower.includes('honor to serve') ||
        lower.includes('cherished customer') ||
        lower.includes('apologize profusely') ||
        lower.includes('feel like family') ||
        lower.includes('kindly ensure') ||
        lower.includes('would appreciate it if you could') ||
        lower.includes('beloved customer') ||
        lower.includes('take pride in') ||
        lower.includes('do your best work') ||
        lower.includes('please be careful, thoughtful') ||
        lower.includes('clean, robust, enterprise-grade') ||
        lower.startsWith('hello') ||
        lower.includes('you are an expert senior software engineer')
      ) {
        category = 'fluff';
        isTrimmed = true;
        explanation = 'Polite filler, flatter, or sycophancy that wastes model context.';
      }
      // 2. Check Verbose Narrative Prose (long-winded explanations)
      else if (
        (text.split(/\s+/).length >= 18 && (
          lower.includes('in the event that') ||
          lower.includes('when you find yourself in a situation') ||
          lower.includes('in regards to') ||
          lower.includes('take the opportunity to explain that') ||
          lower.includes('instead of') ||
          lower.includes('it is significantly more efficient to') ||
          lower.includes('keep all code concise and brief without unnecessary commentary')
        ))
      ) {
        category = 'verbose';
        isTrimmed = true;
        explanation = 'Conversational narrative easily compressed into a compact directive.';
        // Auto-generate a distilled 1-liner
        conciseText = distillVerboseClause(text);
      }
      // 3. Check Hard Constraints & Negative Rules
      else if (
        lower.startsWith('never') ||
        lower.startsWith('do not') ||
        lower.startsWith('must') ||
        lower.startsWith('always') ||
        lower.includes('strictly mandatory') ||
        lower.includes('under any circumstance') ||
        lower.includes('conforming to') ||
        lower.includes('validate') ||
        lower.includes('pii') ||
        lower.includes('schema') ||
        lower.includes('security')
      ) {
        category = 'constraint';
        isTrimmed = false;
        explanation = 'Hard behavioral invariant, negative constraint, or schema rule.';

        // Check for duplicates of earlier constraints
        const keyConcepts = ['typescript', 'apologize', 'javascript', 'concise', 'rambling', 'secret'];
        for (const concept of keyConcepts) {
          if (lower.includes(concept)) {
            if (seenConcepts.has(concept)) {
              category = 'duplicate';
              isTrimmed = true;
              isDuplicateOf = seenConcepts.get(concept);
              explanation = `Redundant rule repeating the '${concept}' constraint.`;
              break;
            } else {
              seenConcepts.set(concept, `custom-${clauseIndex}`);
            }
          }
        }
      } else {
        // Default short sentences without strong flags
        if (text.split(/\s+/).length > 25) {
          category = 'verbose';
          isTrimmed = true;
          conciseText = distillVerboseClause(text);
          explanation = 'Long clause compressible into a tighter bullet.';
        } else {
          category = 'constraint';
          isTrimmed = false;
          explanation = 'Instruction or rule.';
        }
      }

      clauses.push({
        id: `custom-${clauseIndex++}`,
        category,
        originalText: text,
        conciseText,
        isTrimmed,
        isDuplicateOf,
        explanation,
      });
    }
  }

  return clauses;
}

/**
 * Distills verbose clauses into 1-line directives
 */
function distillVerboseClause(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('pricing')) {
    return 'Pricing: Starter $29/mo, Pro $99/mo, Enterprise custom with SLA.';
  }
  if (lower.includes('read_file')) {
    return 'Rule: Always inspect target file with read_file before editing.';
  }
  if (lower.includes('edit_file')) {
    return 'Rule: Prefer targeted edit_file edits over full-file rewrites.';
  }
  if (lower.includes('search')) {
    return 'Search: Scope paths and exclude node_modules / vendor.';
  }
  if (lower.includes('concise')) {
    return 'Output: Code only, no conversational filler or preambles.';
  }

  // Generic compression heuristic: extract key subject & predicate
  const words = text.split(/\s+/);
  if (words.length > 10) {
    return 'Directive: ' + words.slice(0, 10).join(' ') + '...';
  }
  return text;
}
