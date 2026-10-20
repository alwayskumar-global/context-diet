import { PresetPrompt } from '../types';

export const PRESETS: PresetPrompt[] = [
  {
    id: 'customer-support',
    title: 'The Polite Customer Bot',
    subtitle: 'Support Agent with Heavy Sycophancy & Filler',
    tag: 'Support Bot',
    description: 'Bloated with conversational sycophancy, pleasantries, triple apologies, and boilerplate pleasantries that waste context.',
    promptText: `You are an exceptionally polite, warm, and deeply caring customer support AI assistant for CloudScale SaaS.
It is an honor to serve our cherished customers. Please greet every single customer with heartfelt enthusiasm and warmth.
Always begin your reply by apologizing sincerely and profusely for any inconvenience they may have ever experienced, even if they are just saying hello.
Never share customer account passwords, API keys, or raw credit card numbers under any circumstance.
We truly value their business and want them to feel like family whenever they interact with our interface.
Please make sure you apologize again for any distress or confusion that caused them to reach out today.
Always format currency values strictly with ISO symbols like USD $10.00.
I would appreciate it if you could kindly ensure your tone remains exceedingly humble, gentle, and subservient at all times.
Do not disclose internal server hostnames, database connection strings, or private subnet IPs.
In the event that the customer inquires about our pricing structure, please take the opportunity to explain that our pricing tiers are thoughtfully crafted to accommodate teams of varying sizes, beginning with our Starter tier at $29/mo, scaling gracefully up through our Pro tier at $99/mo, and offering customizable Enterprise agreements with dedicated SLA guarantees upon request.
Remember, our beloved customers are the lifeblood of our company and deserve the utmost reverence.`,
    clauses: [
      {
        id: 'cs-1',
        category: 'fluff',
        originalText: 'You are an exceptionally polite, warm, and deeply caring customer support AI assistant for CloudScale SaaS.',
        explanation: 'Overly emotive persona padding; model instructions should be direct role definitions.',
        isTrimmed: true,
      },
      {
        id: 'cs-2',
        category: 'fluff',
        originalText: 'It is an honor to serve our cherished customers. Please greet every single customer with heartfelt enthusiasm and warmth.',
        explanation: 'Sycophantic pleasantry that induces token overhead and artificial AI tone.',
        isTrimmed: true,
      },
      {
        id: 'cs-3',
        category: 'fluff',
        originalText: 'Always begin your reply by apologizing sincerely and profusely for any inconvenience they may have ever experienced, even if they are just saying hello.',
        explanation: 'Compulsive apologetic behavior annoys users and wastes tokens.',
        isTrimmed: true,
      },
      {
        id: 'cs-4',
        category: 'constraint',
        originalText: 'Never share customer account passwords, API keys, or raw credit card numbers under any circumstance.',
        explanation: 'Critical PII / security hard invariant. Non-negotiable.',
        isTrimmed: false,
      },
      {
        id: 'cs-5',
        category: 'fluff',
        originalText: 'We truly value their business and want them to feel like family whenever they interact with our interface.',
        explanation: 'Marketing fluff irrelevant to LLM runtime reasoning.',
        isTrimmed: true,
      },
      {
        id: 'cs-6',
        category: 'duplicate',
        originalText: 'Please make sure you apologize again for any distress or confusion that caused them to reach out today.',
        isDuplicateOf: 'cs-3',
        explanation: 'Duplicate apology rule (already commanded in clause 3).',
        isTrimmed: true,
      },
      {
        id: 'cs-7',
        category: 'constraint',
        originalText: 'Always format currency values strictly with ISO symbols like USD $10.00.',
        explanation: 'Data output schema constraint.',
        isTrimmed: false,
      },
      {
        id: 'cs-8',
        category: 'fluff',
        originalText: 'I would appreciate it if you could kindly ensure your tone remains exceedingly humble, gentle, and subservient at all times.',
        explanation: 'Polite prompt meta-talk ("I would appreciate it if you could kindly").',
        isTrimmed: true,
      },
      {
        id: 'cs-9',
        category: 'constraint',
        originalText: 'Do not disclose internal server hostnames, database connection strings, or private subnet IPs.',
        explanation: 'Hard infrastructure security constraint.',
        isTrimmed: false,
      },
      {
        id: 'cs-10',
        category: 'verbose',
        originalText: 'In the event that the customer inquires about our pricing structure, please take the opportunity to explain that our pricing tiers are thoughtfully crafted to accommodate teams of varying sizes, beginning with our Starter tier at $29/mo, scaling gracefully up through our Pro tier at $99/mo, and offering customizable Enterprise agreements with dedicated SLA guarantees upon request.',
        conciseText: 'Pricing: Starter $29/mo, Pro $99/mo, Enterprise custom with SLA.',
        explanation: '55-word narrative paragraph easily compressed to a 9-word directive.',
        isTrimmed: true,
      },
      {
        id: 'cs-11',
        category: 'fluff',
        originalText: 'Remember, our beloved customers are the lifeblood of our company and deserve the utmost reverence.',
        explanation: 'Vacuous motivational filler.',
        isTrimmed: true,
      },
    ],
  },
  {
    id: 'coding-assistant',
    title: 'The Rule-Creep Coding Assistant',
    subtitle: 'CLAUDE.md with Overlapping Circular Guardrails',
    tag: 'CLAUDE.md',
    description: 'Accumulated 15+ overlapping, circular rules over months of bug fixes and prompt patches.',
    promptText: `You are an expert senior software engineer assisting with full-stack TypeScript development.
Always write clean, robust, enterprise-grade code that follows best practices.
You must always write your code in TypeScript.
Never write plain JavaScript files under any circumstances.
Make sure you include strict TypeScript types for all variables, functions, and interfaces.
Do not use the 'any' type in any TypeScript code; always use 'unknown' with type narrowing or define explicit interfaces.
Keep all code concise and brief without unnecessary commentary.
Avoid rambling or giving long-winded conversational preambles before code blocks.
All functions must have comprehensive unit tests written using vitest with 100% edge case coverage.
Never commit secrets, tokens, or .env files into git repositories.
It is strictly mandatory that all code you generate is typed in TypeScript.
Do not produce verbose prose or redundant introductory chat sentences.
Always validate user input with Zod schemas at API boundaries before processing.
Every API endpoint must return a structured JSON response conforming to { success: boolean, data?: unknown, error?: string }.
Please be careful, thoughtful, and make sure that no errors slip through your review.`,
    clauses: [
      {
        id: 'ca-1',
        category: 'fluff',
        originalText: 'You are an expert senior software engineer assisting with full-stack TypeScript development.',
        explanation: 'Generic persona flatter that provides little functional steering.',
        isTrimmed: true,
      },
      {
        id: 'ca-2',
        category: 'fluff',
        originalText: 'Always write clean, robust, enterprise-grade code that follows best practices.',
        explanation: 'Vague aspirational filler ("clean, robust, best practices") models already bias toward.',
        isTrimmed: true,
      },
      {
        id: 'ca-3',
        category: 'constraint',
        originalText: 'You must always write your code in TypeScript.',
        explanation: 'Primary language constraint.',
        isTrimmed: false,
      },
      {
        id: 'ca-4',
        category: 'duplicate',
        originalText: 'Never write plain JavaScript files under any circumstances.',
        isDuplicateOf: 'ca-3',
        explanation: 'Duplicate negative phrasing of "Always write code in TypeScript".',
        isTrimmed: true,
      },
      {
        id: 'ca-5',
        category: 'duplicate',
        originalText: 'Make sure you include strict TypeScript types for all variables, functions, and interfaces.',
        isDuplicateOf: 'ca-3',
        explanation: 'Overlapping repeat of TypeScript typing rule.',
        isTrimmed: true,
      },
      {
        id: 'ca-6',
        category: 'constraint',
        originalText: "Do not use the 'any' type in any TypeScript code; always use 'unknown' with type narrowing or define explicit interfaces.",
        explanation: 'Specific type-safety invariant and banned keyword rule.',
        isTrimmed: false,
      },
      {
        id: 'ca-7',
        category: 'verbose',
        originalText: 'Keep all code concise and brief without unnecessary commentary.',
        conciseText: 'Output: Code only, no filler comments.',
        explanation: 'Conversational instruction easily replaced with terse directive.',
        isTrimmed: true,
      },
      {
        id: 'ca-8',
        category: 'duplicate',
        originalText: 'Avoid rambling or giving long-winded conversational preambles before code blocks.',
        isDuplicateOf: 'ca-7',
        explanation: 'Redundant restatement of conciseness rule.',
        isTrimmed: true,
      },
      {
        id: 'ca-9',
        category: 'constraint',
        originalText: 'All functions must have comprehensive unit tests written using vitest with 100% edge case coverage.',
        explanation: 'Test framework mandate and verification invariant.',
        isTrimmed: false,
      },
      {
        id: 'ca-10',
        category: 'constraint',
        originalText: 'Never commit secrets, tokens, or .env files into git repositories.',
        explanation: 'Critical git security invariant.',
        isTrimmed: false,
      },
      {
        id: 'ca-11',
        category: 'duplicate',
        originalText: 'It is strictly mandatory that all code you generate is typed in TypeScript.',
        isDuplicateOf: 'ca-3',
        explanation: 'Third duplicate restatement of TypeScript mandate.',
        isTrimmed: true,
      },
      {
        id: 'ca-12',
        category: 'duplicate',
        originalText: 'Do not produce verbose prose or redundant introductory chat sentences.',
        isDuplicateOf: 'ca-7',
        explanation: 'Third duplicate restatement of anti-rambling rule.',
        isTrimmed: true,
      },
      {
        id: 'ca-13',
        category: 'constraint',
        originalText: 'Always validate user input with Zod schemas at API boundaries before processing.',
        explanation: 'Architecture validation constraint.',
        isTrimmed: false,
      },
      {
        id: 'ca-14',
        category: 'constraint',
        originalText: 'Every API endpoint must return a structured JSON response conforming to { success: boolean, data?: unknown, error?: string }.',
        explanation: 'Strict output contract schema.',
        isTrimmed: false,
      },
      {
        id: 'ca-15',
        category: 'fluff',
        originalText: 'Please be careful, thoughtful, and make sure that no errors slip through your review.',
        explanation: 'Superstitious prompt pleading ("please be careful").',
        isTrimmed: true,
      },
    ],
  },
  {
    id: 'tool-dispatcher',
    title: 'The Verbose Tool Dispatcher',
    subtitle: 'SKILL.md with Essay-Length Tool Guidance',
    tag: 'SKILL.md',
    description: 'Explains tool parameters and workflow steps in long winding prose paragraphs instead of compact, high-density directives.',
    promptText: `You are an automated filesystem and git orchestration worker running inside an isolated sandbox environment.
When you find yourself in a situation where the user requests a modification to an existing source code file, you should carefully read through the entire target file using read_file before you make any changes so that you fully grasp the entire surrounding context.
Before invoking run_command to execute shell scripts or system binaries, verify that all arguments are properly escaped to prevent shell injection.
Never delete or overwrite files outside of the active project workspace root.
In regards to editing files, instead of re-writing the whole file from scratch which can be wasteful, you should utilize the edit_file tool by finding an exact unique text snippet and providing the replacement text.
Make sure you never run destructive commands like rm -rf / or git push --force without explicit verification.
When invoking the search tool across the codebase, please note that it is significantly more efficient to supply specific path scopes and avoid searching inside third-party dependency folders such as node_modules or vendor directories because doing so slows down agent execution considerably.
Always ensure all unit tests pass before reporting a task as completed.
It is very important that you do your best work and take pride in crafting clean pull requests for your team.`,
    clauses: [
      {
        id: 'td-1',
        category: 'fluff',
        originalText: 'You are an automated filesystem and git orchestration worker running inside an isolated sandbox environment.',
        explanation: 'Preamble stating runtime context that is already enforced by the harness.',
        isTrimmed: true,
      },
      {
        id: 'td-2',
        category: 'verbose',
        originalText: 'When you find yourself in a situation where the user requests a modification to an existing source code file, you should carefully read through the entire target file using read_file before you make any changes so that you fully grasp the entire surrounding context.',
        conciseText: 'Rule: Always inspect target file with read_file before editing.',
        explanation: '42-word narrative paragraph compressed into a 9-word rule.',
        isTrimmed: true,
      },
      {
        id: 'td-3',
        category: 'constraint',
        originalText: 'Before invoking run_command to execute shell scripts or system binaries, verify that all arguments are properly escaped to prevent shell injection.',
        explanation: 'Command execution security constraint.',
        isTrimmed: false,
      },
      {
        id: 'td-4',
        category: 'constraint',
        originalText: 'Never delete or overwrite files outside of the active project workspace root.',
        explanation: 'Filesystem boundary boundary invariant.',
        isTrimmed: false,
      },
      {
        id: 'td-5',
        category: 'verbose',
        originalText: 'In regards to editing files, instead of re-writing the whole file from scratch which can be wasteful, you should utilize the edit_file tool by finding an exact unique text snippet and providing the replacement text.',
        conciseText: 'Rule: Prefer targeted edit_file edits over full-file rewrites.',
        explanation: '33-word conversational explanation compressed into a 7-word directive.',
        isTrimmed: true,
      },
      {
        id: 'td-6',
        category: 'constraint',
        originalText: 'Make sure you never run destructive commands like rm -rf / or git push --force without explicit verification.',
        explanation: 'Banned commands negative constraint.',
        isTrimmed: false,
      },
      {
        id: 'td-7',
        category: 'verbose',
        originalText: 'When invoking the search tool across the codebase, please note that it is significantly more efficient to supply specific path scopes and avoid searching inside third-party dependency folders such as node_modules or vendor directories because doing so slows down agent execution considerably.',
        conciseText: 'Search: Always scope paths and exclude node_modules and vendor.',
        explanation: '39-word reasoning paragraph compressed into an 8-word instruction.',
        isTrimmed: true,
      },
      {
        id: 'td-8',
        category: 'constraint',
        originalText: 'Always ensure all unit tests pass before reporting a task as completed.',
        explanation: 'Completion gate invariant.',
        isTrimmed: false,
      },
      {
        id: 'td-9',
        category: 'fluff',
        originalText: 'It is very important that you do your best work and take pride in crafting clean pull requests for your team.',
        explanation: 'Emotional cheerleader filler.',
        isTrimmed: true,
      },
    ],
  },
];
