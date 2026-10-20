---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [ ] **1. Scaffold project, preset definitions, and interactive 4-color heatmap viewer**
  Becomes usable: A running React + Vite app with the top header, 3 built-in bloated presets selectable, rendering the prompt with interactive 4-color highlighted clause spans and click-to-toggle Keep/Trim state.
  Why now: Bootstraps the project, sets up dependencies, and proves the visual kernel and core triage interaction on slice one.
  PRD ref: `prd.md > The Core Journey` (steps 1-4), `prd.md > 1. Preset Loading & Clause Decomposition`, `prd.md > 2. Interactive Heatmap & Triage`
  Spec ref: `spec.md > Components > Header`, `spec.md > Components > HeatmapViewer`, `spec.md > Data Model`
  Build: Initialize Vite React+TS+Tailwind, create data types, build `presets.ts` (3 realistic bloated prompts with categorized clauses and blue distillations), implement `Header.tsx`, `HeatmapToolbar.tsx`, `HeatmapViewer.tsx`.
  Verify (mechanical): Run `npm run build` and confirm compilation passes with zero TypeScript or styling errors; test component render and preset switching.
  Learner check: Open `http://localhost:5173`, switch between presets, click spans to toggle Keep/Trim.
  Commit: `Scaffold app and interactive 4-color heatmap viewer`

- [ ] **2. Constraint Lock engine and real-time safety alert banner**
  Becomes usable: Constraint Lock badge in the sidebar actively tracking Green constraints; if any Green rule is toggled to Trim, triggers the high-contrast `⚠️ Constraint Lock Broken: X% Preserved` alert banner with rule listing.
  Why now: The unique safety kernel of ContextDiet that prevents prompt behavioral regressions.
  PRD ref: `prd.md > 3. Constraint Lock Safety Verification`
  Spec ref: `spec.md > Components > ConstraintLockBadge`, `spec.md > Data Model`
  Build: Implement `ConstraintLockBadge.tsx` and reactive constraint metrics calculator in `App.tsx`.
  Verify (mechanical): Toggle a Green constraint to Trim and assert badge switches to broken alert state; restore it and assert 100% Locked badge returns.
  Learner check: Toggle a Green hard constraint in the heatmap and confirm the high-contrast alert banner fires immediately.
  Commit: `Implement Constraint Lock safety verification`

- [ ] **3. Prompt Nutrition Facts card with token savings and dynamic monthly USD cost slider**
  Becomes usable: FDA-style Nutrition Facts card displaying original tokens, diet tokens, % reduction, an interactive requests-per-day slider, and live monthly USD dollar savings.
  Why now: Completes the core value proposition: translating prompt diet into measurable developer ROI and token reduction.
  PRD ref: `prd.md > 4. Prompt Nutrition Facts & Monthly Dollar Savings`
  Spec ref: `spec.md > Components > NutritionFactsCard`, `spec.md > utils/tokenizer.ts`
  Build: Implement `tokenizer.ts`, `NutritionFactsCard.tsx`, and volume calculation formulas.
  Verify (mechanical): Verify token counts match expected ranges; slider smoothly calculates `(Gross - Diet) * req * 30 * cost`.
  Learner check: Drag the requests/day slider and watch monthly dollar savings adjust in real-time.
  Commit: `Add FDA-style Prompt Nutrition Facts card and cost calculator`

- [ ] **4. Custom prompt parsing, diet prompt compiler, and 1-click clipboard export**
  Becomes usable: Users can paste custom prompts into `RawEditor.tsx`, analyze them with heuristic regex/clause parsing, and click "Copy Diet Prompt" to copy clean, compiled output to clipboard with visual toast feedback.
  Why now: Closes the complete end-to-end user loop from custom input to ready-to-use production prompt export.
  PRD ref: `prd.md > 1. Preset Loading & Clause Decomposition`, `prd.md > 5. Diet Prompt Export`
  Spec ref: `spec.md > Components > RawEditor`, `spec.md > Components > ExportAction`, `spec.md > utils/compiler.ts`, `spec.md > utils/parser.ts`
  Build: Implement `compiler.ts` (merging kept clauses and Blue concise substitutions), `parser.ts` (custom prompt heuristics), `RawEditor.tsx`, `ExportAction.tsx`.
  Verify (mechanical): Test clipboard copy output containing only kept clauses and Blue distillations; test custom prompt parsing.
  Learner check: Paste a custom prompt or edit a preset, click "Copy Diet Prompt", and paste into a scratch file to verify output quality.
  Commit: `Add custom prompt parser, compiler, and 1-click export`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — Slice 2 (interactive heatmap & constraint lock alert)
- [ ] Final kick-the-tires exploration and feedback completed — Slice 4 (complete end-to-end app)

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [focused alternative]

## Revisions
