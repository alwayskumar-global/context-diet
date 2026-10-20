# ContextDiet ✂️🥗

> **A single-screen visual linter and "Nutrition Facts" label for LLM system prompts and agent instruction files (`SKILL.md`, `CLAUDE.md`).**

Built for the **Devpost Learn: Build With AI Basics** hackathon.

---

## The Problem
As AI projects grow, system prompts suffer from **prompt creep**: accumulating conversational fluff, polite sycophancy, repetitive guardrails, and verbose paragraphs across months of bug fixes. Developers hesitate to refactor them out of fear of breaking critical behavioral invariants or causing regressions.

## The Solution
**ContextDiet** treats prompt optimization like nutritional analysis:
1. **4-Color Interactive Heatmap:**
   - <span style="color:#ef4444;">**Red (Fluff):**</span> Sycophancy, polite conversational filler, redundant apologies.
   - <span style="color:#f59e0b;">**Amber (Duplicates):**</span> Redundant rules stated multiple times in different words.
   - <span style="color:#3b82f6;">**Blue (Verbose Prose):**</span> Wordy paragraphs compressible into compact directives (smart distillation).
   - <span style="color:#10b981;">**Green (Hard Constraints):**</span> Non-negotiable security boundaries, schema invariants, and negative constraints.
2. **Constraint Lock Engine:** Guarantees 100% of hard constraints survive. If any Green rule is trimmed, it triggers an immediate high-contrast `⚠️ Constraint Lock Broken: X% Preserved` alert banner with 1-click restoration.
3. **FDA Prompt Nutrition Facts Label:** Authentic packaging aesthetic calculating original tokens, diet tokens, % reduction, and projected monthly USD cost savings based on an interactive Daily Request Volume slider.
4. **1-Click Diet Prompt Export:** Compiles kept clauses and concise 1-line substitutions into a clean prompt ready for production.

---

## 🚀 Quick Start (Local Run)

### Prerequisites
- Node.js 18+ (tested on Node v25)
- npm

### Installation & Run
```bash
# Clone the repository
git clone <your-repo-url>
cd context-diet

# Install dependencies
npm install

# Start the Vite local development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 🛠️ Tech Stack & Architecture
- **Framework:** React 19 + TypeScript 5
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS + custom typography
- **Icons:** `lucide-react`
- **Tokenizer Engine:** Fast in-browser BPE-approximate tokenizer (100% client-side, zero latency, zero API keys required).
- **Architecture Guide:** See [`devpost/app-map.html`](./devpost/app-map.html) for a full visual architecture walkthrough.

---

## 📋 Hackathon Planning Artifacts
All planning documents developed through the Devpost Learn flipped-interaction workflow are available in `devpost/` and the repository root:
- [`scope.md`](./scope.md) — Unique kernel, PoC boundary, and non-goals.
- [`prd.md`](./prd.md) — Product requirements, core journey, look & feel, and states.
- [`spec.md`](./spec.md) — Technical architecture, component hierarchy, and data schemas.
- [`checklist.md`](./checklist.md) — Slices, verification logs, and hands-on review checkpoints.
- [`devpost/app-map.html`](./devpost/app-map.html) — Interactive standalone architecture map and reusable practices.

---

## 📜 License
MIT
