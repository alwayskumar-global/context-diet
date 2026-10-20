---
doc: prd
status: approved
---

# ContextDiet — Product Requirements

A single-screen visual linter and "Nutrition Facts" label for LLM system prompts and agent instruction files (`SKILL.md`, `CLAUDE.md`), designed for developers and AI engineers to eliminate token bloat without breaking behavioral constraints.

*Source: `scope.md > One line: what this is`, `scope.md > Who It's For`*

## The Core Journey
1. **Arrival & Input:** The user arrives on a clean, single-screen dashboard. They can paste their own raw prompt into an input area or select one of 3 built-in bloated presets.
2. **Analysis Execution:** The user clicks **"Analyze Prompt"** (or selecting a preset auto-populates and parses). A structured pass breaks down the prompt into classified clause spans.
3. **Heatmap Inspection:** The prompt renders in an interactive, color-coded clause heatmap:
   - **Red (Fluff):** Polite conversational filler, apologies, and sycophantic padding.
   - **Amber (Duplicates):** Redundant, circular, or repeated rules.
   - **Blue (Verbose Prose):** Wordy narrative text compressible into compact directives.
   - **Green (Hard Constraints):** Non-negotiable boundaries, schema definitions, and invariants.
4. **Interactive Triage:** The user inspects highlighted spans. Each span can be toggled between **Keep** and **Trim**:
   - Trimming **Red** strips the span completely.
   - Trimming **Amber** strips duplicate occurrences, preserving the canonical rule.
   - Trimming **Blue** replaces the wordy text with a pre-computed concise 1-line distillation.
   - Trimming **Green** is permitted, but immediately flags the Constraint Lock.
5. **Constraint Lock Verification:** The sidebar's **Constraint Lock** indicator monitors Green constraints. If all remain kept, it displays a solid green badge (*100% Constraints Locked*). If any Green constraint is trimmed, it flips to an immediate high-contrast alert badge (*⚠️ Constraint Lock Broken: X% Preserved*).
6. **Nutrition Review & Cost Projection:** The user reviews the FDA-style **Prompt Nutrition Facts** panel, observing original tokens, diet tokens, and percentage reduction. Moving a **Requests per Day** slider updates projected monthly dollar savings in real time.
7. **Export:** The user clicks **"Copy Diet Prompt"**, copying the optimized, trimmed prompt directly to their clipboard with instant visual confirmation.

*Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`*

## Screens and Layout
A unified single-screen responsive view structured into two primary zones:
- **Top Bar:** Product branding ("ContextDiet"), tagline, and a preset selector toolbar containing buttons for the 3 presets:
  - *"The Polite Customer Bot"*
  - *"The Rule-Creep Coding Assistant"*
  - *"The Verbose Tool Dispatcher"*
  - Plus a *"Custom Prompt"* / *"Clear"* button.
- **Main Left Canvas (Analysis & Heatmap):**
  - Mode toggle: **Heatmap Triage View** vs. **Raw Editor View**.
  - In Heatmap view: clauses render inline with colored badges and click-to-toggle tags ([TRIM] / [KEEP]).
  - Clause filter chips above the canvas allowing users to highlight or isolate specific categories (Fluff, Duplicates, Verbose, Constraints).
- **Right Sidebar (The Nutrition Card):**
  - **Prompt Nutrition Facts Card:** Authentic FDA packaging aesthetic (black & white, heavy borders, bold horizontal rules, monospace metrics).
  - **Metrics Included:**
    - Serving Size: 1 System Prompt
    - Original Tokens (Gross Tokens)
    - Diet Tokens (Net Tokens)
    - Token Reduction (% Savings)
    - Daily Volume Slider (e.g., 100 to 1,000,000 requests/day)
    - Monthly Projected Savings (in USD based on standard LLM token pricing)
  - **Constraint Lock Status Badge:** High-visibility safety indicator (100% Green vs. ⚠️ Broken Alert).
  - **Action Button:** Sticky, high-contrast **"Copy Diet Prompt"** button.

*Source: `scope.md > Inspiration & Identity`, `scope.md > The POC Boundary`*

## Look and Feel
- **Visual Aesthetic:** High-density technical developer utility fused with classic FDA Nutrition Facts packaging.
- **Typography:** Inter / system sans-serif for interface controls; JetBrains Mono / monospace for prompt text, token counts, and cost values; authentic bold grotesque sans (Franklin Gothic / Helvetica Heavy style) for the Nutrition Facts title and calorie-style token callouts.
- **Color Palette:**
  - Background: Crisp dark or clean light neutral surface.
  - Heatmap Highlights:
    - Red (`#EF4444` / soft red tint background): Fluff / Conversational bloat.
    - Amber (`#F59E0B` / soft amber tint background): Duplicates / Overlapping rules.
    - Blue (`#3B82F6` / soft blue tint background): Verbose prose.
    - Green (`#10B981` / soft emerald tint background): Hard constraints.
  - Nutrition Label: High-contrast monochromatic black/white card with thick black borders (3px - 6px) and clean micro-lines.

*Source: `scope.md > Inspiration & Identity`*

## Features and Behavior

### 1. Preset Loading & Clause Decomposition
- Clicking any of the 3 presets instantly populates the prompt and classification data without requiring manual input.
- Preset 1: **"The Polite Customer Bot"** — Loaded with customer support sycophancy, pleasantries, and triple apologies.
- Preset 2: **"The Rule-Creep Coding Assistant"** — Contains 15+ overlapping, circular rules accumulated over months of bug fixes (`CLAUDE.md` style).
- Preset 3: **"The Verbose Tool Dispatcher"** — Paragraph-long instructions for tool arguments and workflows (`SKILL.md` style).
- Custom input allows any user-pasted text to be analyzed.

- As a developer, I want preloaded real-world presets so that I can see the linter in action with zero setup.
  - [ ] Clicking a preset loads the prompt and categorized clause spans immediately.
  - [ ] Presets accurately demonstrate all four classification colors.

### 2. Interactive Heatmap & Triage
- Clauses are highlighted according to their classification.
- Clicking any clause toggles its status between **Keep** and **Trim**.
- When set to **Trim**:
  - Red clauses are omitted completely from the diet output.
  - Amber clauses are omitted, retaining only the primary canonical rule.
  - Blue clauses show a strike-through of the verbose text and preview the concise 1-line distillation replacement that will appear in the diet prompt.
- Live token counts update dynamically as clauses are toggled.

- As a developer, I want to selectively keep or trim clauses so that I control prompt optimization decisions.
  - [ ] Clicking a clause toggles its Keep/Trim state.
  - [ ] Trimming Red drops the clause; trimming Amber removes duplicates; trimming Blue substitutes concise 1-line text.
  - [ ] Diet token count recalculates immediately on each click.

### 3. Constraint Lock Safety Verification
- All Green clauses are indexed in the Constraint Lock engine.
- If all Green clauses are marked **Keep**, the Constraint Lock displays **"100% Constraints Locked"** with a green shield/badge.
- If a user marks any Green clause as **Trim**, the lock flips to an alert state: **"⚠️ Constraint Lock Broken: [X]% Preserved"**, displaying the specific broken constraint in a hazard box.

- As an AI engineer, I want visible warnings when trimming hard constraints so that I never introduce prompt behavioral regressions.
  - [ ] Toggling a Green clause to Trim instantly changes the lock status to an alert state with the exact percentage preserved.
  - [ ] Restoring the Green clause to Keep returns the status to 100% Locked.

### 4. Prompt Nutrition Facts & Monthly Dollar Savings
- Displays an authentic Nutrition Facts card with gross tokens, net diet tokens, and percentage reduction.
- Includes a **Requests / Day** slider (range: 100 to 500,000 req/day, logarithmic or stepped increments).
- Computes estimated monthly dollar savings using standard input token rates (e.g., \$3.00 / 1M input tokens baseline, with optional model tier selection: Haiku/Flash tier vs. Sonnet/Pro tier vs. Opus tier).

- As a team lead, I want to see token savings translated into monthly dollar cost reductions so that I can justify prompt refactoring.
  - [ ] Moving the volume slider dynamically updates monthly dollar savings.
  - [ ] Calculations accurately reflect `(Gross Tokens - Diet Tokens) * Requests/Day * 30 * Cost/Token`.

### 5. Diet Prompt Export
- A prominent button copies the compiled Diet Prompt to clipboard.
- The compiled output cleanly formats the remaining kept text and compressed blue replacements without leftover markup or annotations.
- Displays a brief toast or checkmark confirmation ("Copied to clipboard!").

- As a developer, I want a clean copy of the optimized prompt so that I can immediately paste it into my codebase or config.
  - [ ] Clicking Copy copies the exact text of kept clauses and compressed substitutions.
  - [ ] Shows instant visual copy feedback.

## States and Boundaries
- **Initial/Empty State:** App opens with preset buttons visible, an empty prompt canvas, and a placeholder message inviting the user to pick a preset or paste a prompt.
- **Preset/Analyzed State:** Full heatmap rendered, all initial trims pre-applied (e.g., Red and Amber pre-flagged as Trim, Blue flagged as Trim with distillation, Green locked as Keep), Nutrition Facts showing baseline savings.
- **Constraint Broken State:** At least one Green clause toggled to Trim; warning banner active in the Nutrition card.
- **Deterministic Offline Fallback:** If no live LLM API key is provided, the 3 built-in presets operate with comprehensive pre-computed classification models, guaranteeing 100% functionality offline and during live demo review.
- **Persistence Boundary:** State lives in the active browser session; refreshing resets to default preset. No local database or remote backend required.

## Product Decisions
- **Allowing Green Clause Trimming:** Developer agency is preserved—rather than hard-blocking edits, the UI provides an unambiguous high-contrast warning ("Constraint Lock Broken"). This respects expert users while preventing accidental regression.
- **Distillation instead of Deletion for Blue Clauses:** Verbose prose is replaced with a concise 1-liner rather than removed, proving intelligent prompt compression rather than crude truncation.
- **Pre-computed Presets with Deterministic Engine:** Ensures the app is instantly usable, robust, and dependable in evaluation and demo environments without requiring API key entry.

## What We're Building (PoC Target)
- Single-screen application with top preset bar, interactive heatmap canvas, and right-hand Nutrition Facts card.
- 3 realistic bloated presets covering customer support, coding assistant, and skill workflows.
- Interactive 4-category clause heatmap with Keep/Trim toggles and Blue concise replacement.
- Live Constraint Lock checklist and alert state.
- FDA-style Nutrition Facts card with dynamic volume slider and monthly USD savings calculator.
- Clean Diet Prompt clipboard export.

## Deferred From the POC
- Multi-file batch linter.
- GitHub Actions CI/CD check.
- Custom user-configured regex rules.
- Direct API testing of prompt outputs against LLM endpoints.

## Possible Later Enhancements
- VS Code and Cursor extension for real-time prompt linting directly inside `.md` and `.ts` files.
- Diff view showing original vs. diet prompt side-by-side.

## Non-Goals
- User authentication or accounts (zero login barrier).
- Database storage or saved history.
- Live multi-turn model chat playground.

## Open Questions
*None remaining for PRD.* Ready for technical spec (`4-spec`).
