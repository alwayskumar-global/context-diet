---
doc: scope
status: approved
---

# ContextDiet

A single-screen visual linter and "Nutrition Facts" label for LLM system prompts and agent instruction files (`SKILL.md`, `CLAUDE.md`).

## The Unique Kernel
Treating prompt optimization like nutritional analysis: combining a 4-color interactive clause heatmap with a strict **Constraint Lock** checklist that guarantees 100% of non-negotiable behavioral rules survive trimming, paired with an FDA-style black-and-white "Prompt Nutrition Facts" label calculating real-world token and dollar savings.

## Who It's For
AI engineers and developers maintaining agent workflows, developer tools, or production chatbots whose system instructions have suffered from "prompt creep"—accumulating repetitive rules, conversational filler, and verbose guardrails over months. Today, they either fear editing prompts (dreading regression) or manually guess what can be safely trimmed.

## The Core Loop
1. **Load/Paste:** User pastes a system prompt or clicks one of 3 bloated real-world presets (e.g., Overly Polite Customer Support Bot, Repetitive Coding Assistant, Bloated Skill Definition).
2. **Analyze:** One structured LLM pass decomposes the prompt into categorized clauses.
3. **Interactive Heatmap:** The prompt is rendered with color-coded highlights:
   - **Red (Fluff):** Sycophancy, polite conversational filler, redundant conversational padding.
   - **Amber (Duplicates):** Rules or instructions stated multiple times in different words.
   - **Blue (Verbose Prose):** Wordy instructions that can be stated with tighter syntax or markdown bullets.
   - **Green (Hard Constraints):** Non-negotiable boundaries, schema definitions, and negative constraints.
4. **Triage & Safety:** User clicks any span to toggle Keep/Trim. The **Constraint Lock** panel tracks green clauses, verifying that 100% of hard constraints remain intact.
5. **Nutrition & Export:** The live **Prompt Nutrition Facts** panel tallies input vs. diet token count, % reduction, and estimated monthly cost savings (adjusted via a requests/day slider), ending with a 1-click **Copy Diet Prompt**.

## Inspiration & Identity
- **Visual Aesthetic:** High-density developer utility meets classic FDA Nutrition Facts packaging—stark black-and-white data card typography (Helvetica / Inter + crisp Monospace numbers) paired with precise inline diff highlights.
- **Tone:** Technical, deterministic, zero-fuss, and tactile.

## Why This Matters to the Learner
Solves the real developer pain of runaway context costs and degraded model attention caused by bloated prompts, providing confidence that aggressive token diet will never strip critical behavioral invariants.

## What "Working" Looks Like
A responsive single-screen web app where clicking an included preset loads instant sample text, triggers structured classification into the 4 color-coded categories, allows interactive toggling of trimmed spans with live token/cost recalculations on the Nutrition label, flags constraint lock verification, and outputs a clean minimized prompt to clipboard.

## The POC Boundary
- **Included in PoC:**
  - Single-screen responsive layout.
  - 3 built-in bloated prompt presets.
  - Structured prompt parsing & clause classification pass.
  - Interactive 4-color heatmap with inline Keep/Trim toggles.
  - Constraint Lock status checklist (ensuring all Green rules survive).
  - B&W Prompt Nutrition Facts panel with dynamic token counters and requests/day cost savings slider.
  - 1-click Copy Diet Prompt.
- **Later (Post-Hackathon):**
  - Batch multi-file linter CLI / GitHub Action for CI/CD.
  - IDE extension (VS Code / Cursor).
  - Custom user-defined rule patterns & regex overrides.
  - Automated AST / diff comparison between prompt revisions.
- **Explicitly Cut:**
  - **User accounts & authentication:** Adds friction and overhead unnecessary for a local client utility.
  - **Database & saved prompt history:** Browser memory / local state is sufficient for PoC.
  - **Multi-page navigation:** Distracts from a focused, single-screen utility.
  - **Live multi-model chat test playground:** Severe scope creep that shifts the product from a prompt linter to an evaluation platform.
