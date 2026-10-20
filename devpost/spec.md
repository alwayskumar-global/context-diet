---
doc: spec
status: approved
---

# ContextDiet — Technical Spec

## How This Works, In Plain Language
ContextDiet is a client-side single-page application built with React, TypeScript, and Tailwind CSS. The app ingests a raw system prompt or loads one of 3 pre-engineered bloated presets. It parses the prompt into discrete semantic clauses and classifies each clause into one of four categories: Red (conversational fluff), Amber (duplicate/redundant rules), Blue (verbose prose), or Green (hard behavioral constraints).

The user interacts with a 4-color visual heatmap, clicking any clause span to toggle between **Keep** and **Trim**. Trimming Red strips the filler entirely; trimming Amber removes duplicate instructions; trimming Blue substitutes a pre-computed or generated concise 1-line directive. 

Throughout triage, two synchronized reactive systems calculate the impact:
1. **The Constraint Lock Engine:** Monitors Green constraint clauses. If all Green clauses are kept, a green shield displays "100% Constraints Locked". If any Green clause is trimmed, it flips immediately to an alert state with the exact retention percentage and an inline regression risk notice.
2. **The Prompt Nutrition Facts Engine:** Recalculates gross input tokens, net diet tokens, percentage reduction, and projected monthly USD cost savings based on an interactive "Requests per Day" slider.

A single-click button extracts all kept clauses and compressed substitutions into a clean, ready-to-paste optimized prompt copied to the user's clipboard.

## The Core Journey Through the System
*Implements `prd.md > The Core Journey`*

1. **Step 1 (Arrival & Preset Loading):** User opens the web app. Top header renders preset buttons (`Header.tsx`). Clicking a preset loads the prompt text and pre-classified clause models into reactive state (`App.tsx`).
2. **Step 2 (Heatmap Render):** `HeatmapViewer.tsx` renders the text as inline, categorized badges with click handlers and inline action cues (`[TRIM]` / `[KEEP]`). Filter chips in `HeatmapToolbar.tsx` allow toggling visibility per category.
3. **Step 3 (Triage & Toggling):** Clicking a clause invokes `toggleClauseTrim(id)`. State updates immutably.
   - For Blue clauses, the UI previews strike-through verbose text and the concise replacement directive.
4. **Step 4 (Constraint Lock Verification):** `ConstraintLockBadge.tsx` calculates `keptConstraints / totalConstraints`. If `< 1.0`, it switches from green locked state to high-contrast red alert state.
5. **Step 5 (Nutrition & Savings Calculation):** `NutritionFactsCard.tsx` consumes the current `PromptMetrics` and the slider value (`requestsPerDay`), dynamically rendering token savings and monthly dollar cost reduction.
6. **Step 6 (Export):** Clicking "Copy Diet Prompt" in `ExportAction.tsx` compiles the trimmed prompt text, copies to `navigator.clipboard`, and triggers visual toast confirmation.

## Stack
- **Framework:** React 19 (modern functional components, hooks).
  - *Documentation:* [https://react.dev/](https://react.dev/)
- **Build Tool / Bundler:** Vite 6.
  - *Documentation:* [https://vitejs.dev/](https://vitejs.dev/)
- **Language:** TypeScript 5.
  - *Documentation:* [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Styling:** Tailwind CSS 3/4 with custom typography and borders for authentic FDA label styling.
  - *Documentation:* [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Icons:** `lucide-react` (high-density modern developer icons).
  - *Documentation:* [https://lucide.dev/](https://lucide.dev/)
- **Token Estimation Engine:** Fast client-side BPE tokenizer approximation (~4 characters per token adjusted for punctuation/whitespace ratios).
  - *Rationale:* Zero network latency, instant recalculation on every click, zero API billing requirements.

## Where It Runs and How Someone Tries It
- **Runtime:** 100% Client-side browser execution.
- **Local Dev Server Command:**
  ```bash
  npm install
  npm run dev
  ```
- **URL to Open:** `http://localhost:5173`
- **Submission Demo:** Video recording captures the single-screen dashboard running locally, demonstrating preset loading, interactive clause toggling, the Constraint Lock alert trigger, slider updates on the Nutrition label, and prompt copying.

## Look and Feel
*Implements `prd.md > Look and Feel`, `scope.md > Inspiration & Identity`*
- **Aesthetic:** High-density technical developer linter fused with authentic black-and-white FDA Nutrition Facts packaging.
- **Typography:**
  - UI labels: Inter / System Sans-serif (`font-sans`).
  - Code & Prompt text: JetBrains Mono / Monospace (`font-mono`).
  - Nutrition Header: Heavy Bold Grotesque Sans (`font-black tracking-tight`).
- **Semantic Colors:**
  - Red: `text-red-600 bg-red-500/10 border-red-500/30` (Fluff / Sycophancy).
  - Amber: `text-amber-600 bg-amber-500/10 border-amber-500/30` (Duplicate rules).
  - Blue: `text-blue-600 bg-blue-500/10 border-blue-500/30` (Verbose prose).
  - Green: `text-emerald-600 bg-emerald-500/10 border-emerald-500/30` (Hard constraints).
- **Nutrition Facts Card:** Monochromatic white card with thick 4px-8px black borders, crisp 1px dividing lines, and bold monospace values.

## Components

### Header (`src/components/Header.tsx`)
*Implements `prd.md > Screens and Layout`, `prd.md > 1. Preset Loading & Clause Decomposition`*
Renders application title, subtitle, GitHub link, and the preset selector buttons:
- "The Polite Customer Bot"
- "The Rule-Creep Coding Assistant"
- "The Verbose Tool Dispatcher"
- "Custom Prompt" / "Reset" button.

### HeatmapToolbar (`src/components/HeatmapToolbar.tsx`)
*Implements `prd.md > 2. Interactive Heatmap & Triage`*
Provides quick controls above the prompt canvas:
- Filter chips for toggling display of Red, Amber, Blue, and Green clauses.
- View switcher: "Heatmap Triage View" vs "Raw Text Editor View".
- "Select All Trim" and "Reset All Keep" quick actions.

### HeatmapViewer (`src/components/HeatmapViewer.tsx`)
*Implements `prd.md > 2. Interactive Heatmap & Triage`*
Renders the full prompt with inline highlights:
- Individual clickable clause spans with category pill badges.
- Visual state: Trimmed clauses have line-through styling or dimmed appearance.
- For Blue clauses: shows original wordy text struck through and reveals the green/blue distilled 1-line replacement tag.

### RawEditor (`src/components/RawEditor.tsx`)
*Implements `prd.md > 1. Preset Loading & Clause Decomposition`*
Textarea allowing users to paste their own custom prompts and click "Analyze Prompt" to run heuristic parsing.

### ConstraintLockBadge (`src/components/ConstraintLockBadge.tsx`)
*Implements `prd.md > 3. Constraint Lock Safety Verification`*
Visual safety meter tracking Green constraint retention:
- **Locked State (100%):** Solid emerald border & badge with ShieldCheck icon: `100% Constraints Locked`.
- **Broken State (< 100%):** High-contrast red/amber hazard banner with AlertTriangle icon: `⚠️ Constraint Lock Broken: [X]% Preserved`, listing the specific broken rules.

### NutritionFactsCard (`src/components/NutritionFactsCard.tsx`)
*Implements `prd.md > 4. Prompt Nutrition Facts & Monthly Dollar Savings`*
Authentic FDA Nutrition Facts layout:
- Serving Size: 1 System Prompt
- Calories equivalent: **Original Tokens** vs **Diet Tokens** (large bold text)
- % Daily Value equivalent: **Token Reduction %**
- Interactive **Requests / Day** slider (100 to 500,000 req/day).
- **Monthly Dollar Savings** calculated via standard token pricing ($3.00/1M input tokens baseline).

### ExportAction (`src/components/ExportAction.tsx`)
*Implements `prd.md > 5. Diet Prompt Export`*
Sticky high-contrast button: "Copy Diet Prompt". Compiles surviving clauses and concise substitutions, writes to clipboard, and triggers an animated "Copied to Clipboard!" state.

## Data Model

```typescript
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
```

## File Structure

```
context-diet/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── devpost/                  # Hackathon planning artifacts
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   └── spec.md
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types.ts              # Clause, PromptMetrics, PresetPrompt types
│   ├── data/
│   │   └── presets.ts        # Built-in data for the 3 bloated presets
│   ├── utils/
│   │   ├── tokenizer.ts      # Client-side token estimation engine
│   │   ├── parser.ts         # Heuristic prompt clause parser for custom input
│   │   └── compiler.ts       # Compiles kept clauses into clean output prompt
│   └── components/
│       ├── Header.tsx
│       ├── HeatmapToolbar.tsx
│       ├── HeatmapViewer.tsx
│       ├── RawEditor.tsx
│       ├── ConstraintLockBadge.tsx
│       ├── NutritionFactsCard.tsx
│       └── ExportAction.tsx
└── public/
```

## External Services and Dependencies
- **Zero External API Keys Required:** All analysis, parsing, and presets run 100% in-browser.
- **Zero Remote Databases:** State is maintained in React state memory.
- **Packages:**
  - `react`, `react-dom` (^19.0.0)
  - `lucide-react` (^1.0.0)
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `vite`, `typescript`

## Important Failure Modes
1. **Empty / Whitespace Input:**
   - *Fallback:* Heatmap displays an empty state placeholder instructing user to paste text or select a preset; Analyze button is disabled.
2. **All Clauses Trimmed:**
   - *Fallback:* Diet prompt displays empty warning; Copy button disabled or copies placeholder; Nutrition facts displays 100% reduction warning.
3. **Clipboard Permission Blocked in Browser:**
   - *Fallback:* Falls back to `document.execCommand('copy')` or reveals a select-all fallback text modal.

## What Was Simplified and Why
- **Heuristic Client-Side Parsing instead of Live Backend LLM API:** Guarantees zero latency, zero API rate limits, zero setup friction, and 100% offline reliability for demo recording and reviewer evaluation.
- **Single-Screen State instead of Redux/Zustand:** Standard React `useState` / `useMemo` is sufficient for a single-screen utility, eliminating unnecessary state management boilerplate.

## Decisions and Open Issues
- **Preserved Constraint Warning vs. Hard Lock:** Allowing Green clauses to be trimmed while triggering a high-visibility `⚠️ Constraint Lock Broken` alert badge gives full developer control while preventing accidental regressions.
- **Blue Verbose Replacement:** Confirmed pre-computed 1-line distillations replace verbose paragraphs when trimmed, demonstrating smart compression.
- **Learner Uncertainties:** None identified; technical plan is fully resolved and agreed.
