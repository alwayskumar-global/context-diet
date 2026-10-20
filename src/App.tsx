import React, { useState, useMemo } from 'react';
import { PRESETS } from './data/presets';
import { Clause, ClauseCategory, PresetPrompt } from './types';
import { Header } from './components/Header';
import { HeatmapToolbar } from './components/HeatmapToolbar';
import { HeatmapViewer } from './components/HeatmapViewer';
import { RawEditor } from './components/RawEditor';
import { ConstraintLockBadge } from './components/ConstraintLockBadge';
import { NutritionFactsCard } from './components/NutritionFactsCard';
import { ExportAction } from './components/ExportAction';
import { calculateMetrics } from './utils/tokenizer';
import { parseCustomPrompt } from './utils/parser';
import { Info, Code, Eye, Sparkles, Shield, FileText } from 'lucide-react';

export const App: React.FC = () => {
  // Initial load defaults directly to un-analyzed custom prompt input
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<PresetPrompt | null>(null);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [customPromptText, setCustomPromptText] = useState<string>('');
  const [isEditorMode, setIsEditorMode] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<ClauseCategory | 'all'>('all');
  const [requestsPerDay, setRequestsPerDay] = useState<number>(25000);

  // Handle preset selection (instantly transitions to heatmap and reveals metrics)
  const handleSelectPreset = (preset: PresetPrompt) => {
    setActivePreset(preset);
    setClauses(preset.clauses.map((c) => ({ ...c })));
    setCategoryFilter('all');
    setIsEditorMode(false);
    setHasAnalyzed(true);
  };

  // Open custom editor (returns to un-analyzed custom state)
  const handleOpenCustom = () => {
    setActivePreset(null);
    setIsEditorMode(true);
    setHasAnalyzed(false);
  };

  // Analyze custom prompt
  const handleAnalyzeCustom = (text: string) => {
    setCustomPromptText(text);
    const parsedClauses = parseCustomPrompt(text);
    setClauses(parsedClauses);
    setActivePreset(null);
    setIsEditorMode(false);
    setCategoryFilter('all');
    setHasAnalyzed(true);
  };

  // Reset cleanly to un-analyzed custom prompt state
  const handleReset = () => {
    setActivePreset(null);
    setClauses([]);
    setCustomPromptText('');
    setIsEditorMode(true);
    setHasAnalyzed(false);
    setCategoryFilter('all');
  };

  // Toggle single clause Keep/Trim
  const handleToggleClause = (id: string) => {
    setClauses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isTrimmed: !c.isTrimmed } : c))
    );
  };

  // Restore specific constraint
  const handleRestoreConstraint = (id: string) => {
    setClauses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isTrimmed: false } : c))
    );
  };

  // Bulk action: trim all fluff, duplicates, and compress verbose prose
  const handleTrimAllFluffAndDuplicates = () => {
    setClauses((prev) =>
      prev.map((c) => {
        if (c.category === 'fluff' || c.category === 'duplicate' || c.category === 'verbose') {
          return { ...c, isTrimmed: true };
        }
        return c;
      })
    );
  };

  // Bulk action: keep all
  const handleResetAllKeep = () => {
    setClauses((prev) => prev.map((c) => ({ ...c, isTrimmed: false })));
  };

  // Category clause counts
  const counts: Record<ClauseCategory, number> = {
    fluff: clauses.filter((c) => c.category === 'fluff').length,
    duplicate: clauses.filter((c) => c.category === 'duplicate').length,
    verbose: clauses.filter((c) => c.category === 'verbose').length,
    constraint: clauses.filter((c) => c.category === 'constraint').length,
  };

  const trimmedCounts: Record<ClauseCategory, number> = {
    fluff: clauses.filter((c) => c.category === 'fluff' && c.isTrimmed).length,
    duplicate: clauses.filter((c) => c.category === 'duplicate' && c.isTrimmed).length,
    verbose: clauses.filter((c) => c.category === 'verbose' && c.isTrimmed).length,
    constraint: clauses.filter((c) => c.category === 'constraint' && c.isTrimmed).length,
  };

  // Constraint Lock metrics
  const constraintClauses = clauses.filter((c) => c.category === 'constraint');
  const brokenConstraints = constraintClauses.filter((c) => c.isTrimmed);
  const preservedConstraints = constraintClauses.length - brokenConstraints.length;

  // Real-time Token & Cost Metrics (calculated when analyzed)
  const metrics = useMemo(() => {
    if (!hasAnalyzed || clauses.length === 0) {
      return {
        originalTokens: 0,
        dietTokens: 0,
        tokensSaved: 0,
        percentSaved: 0,
        totalConstraints: 0,
        preservedConstraints: 0,
        constraintLockPercent: 100,
        monthlyCostSavings: 0,
      };
    }
    return calculateMetrics(clauses, requestsPerDay);
  }, [hasAnalyzed, clauses, requestsPerDay]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Header
        presets={PRESETS}
        activePresetId={isEditorMode || !hasAnalyzed ? (activePreset ? activePreset.id : 'custom') : activePreset?.id || 'custom'}
        onSelectPreset={handleSelectPreset}
        onOpenCustom={handleOpenCustom}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Canvas (Heatmap & Triage) */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Preset / Mode Context Banner */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {isEditorMode || !hasAnalyzed
                    ? 'Custom Prompt Input'
                    : activePreset
                    ? activePreset.tag
                    : 'Custom Analysis'}
                </span>
                <h1 className="text-base font-bold text-white tracking-tight">
                  {isEditorMode || !hasAnalyzed
                    ? 'Paste & Lint System Prompt'
                    : activePreset
                    ? activePreset.title
                    : 'Custom Analyzed Prompt'}
                </h1>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {isEditorMode || !hasAnalyzed
                  ? 'Paste any raw system instructions, SKILL.md, or CLAUDE.md below, or choose a bloated preset above to run analysis.'
                  : activePreset?.description || 'Custom prompt decomposed into categorized clause spans.'}
              </p>
            </div>

            {hasAnalyzed && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsEditorMode(!isEditorMode)}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 flex items-center gap-1.5 transition"
                >
                  {isEditorMode ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" /> View Heatmap
                    </>
                  ) : (
                    <>
                      <Code className="w-3.5 h-3.5 text-blue-400" /> Edit Raw Prompt
                    </>
                  )}
                </button>

                {!isEditorMode && (
                  <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 bg-zinc-950/60 px-3 py-1.5 rounded-lg border border-zinc-800">
                    <Info className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{clauses.length} clauses</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Canvas: Raw Editor vs. Heatmap Viewer */}
          <div className="p-4 md:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4">
            {isEditorMode || !hasAnalyzed ? (
              <RawEditor
                initialText={customPromptText}
                onAnalyze={handleAnalyzeCustom}
                onCancel={hasAnalyzed ? () => setIsEditorMode(false) : undefined}
                canCancel={hasAnalyzed}
              />
            ) : (
              <>
                <HeatmapToolbar
                  filter={categoryFilter}
                  onFilterChange={setCategoryFilter}
                  counts={counts}
                  trimmedCounts={trimmedCounts}
                  onTrimAllFluffAndDuplicates={handleTrimAllFluffAndDuplicates}
                  onResetAllKeep={handleResetAllKeep}
                />

                <HeatmapViewer
                  clauses={clauses}
                  filter={categoryFilter}
                  onToggleClause={handleToggleClause}
                />
              </>
            )}
          </div>
        </section>

        {/* Right Sidebar: Conditional on hasAnalyzed */}
        <aside className="lg:col-span-5 xl:col-span-4 space-y-4">
          {hasAnalyzed ? (
            <>
              {/* Constraint Lock Engine */}
              <ConstraintLockBadge
                totalConstraints={constraintClauses.length}
                preservedConstraints={preservedConstraints}
                brokenConstraints={brokenConstraints}
                allConstraints={constraintClauses}
                onRestoreConstraint={handleRestoreConstraint}
              />

              {/* FDA Nutrition Facts Card */}
              <NutritionFactsCard
                metrics={metrics}
                requestsPerDay={requestsPerDay}
                onRequestsPerDayChange={setRequestsPerDay}
                fluffCount={counts.fluff}
                fluffTrimmed={trimmedCounts.fluff}
                duplicateCount={counts.duplicate}
                duplicateTrimmed={trimmedCounts.duplicate}
                verboseCount={counts.verbose}
                verboseTrimmed={trimmedCounts.verbose}
              />

              {/* 1-Click Export Action */}
              <ExportAction
                clauses={clauses}
                tokensSaved={metrics.tokensSaved}
                percentSaved={metrics.percentSaved}
              />
            </>
          ) : (
            /* Awaiting Analysis Placeholder Panel */
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mx-auto text-emerald-400 shadow-inner">
                <FileText className="w-7 h-7 text-emerald-400 opacity-80" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-zinc-200 tracking-tight flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Awaiting Analysis
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Paste a prompt and click <span className="text-emerald-400 font-mono font-bold">Analyze & Lint</span>, or click any of the 3 presets above.
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 text-left space-y-2 text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Shield className="w-4 h-4 text-emerald-500/70 shrink-0" />
                  <span>Constraint Lock will verify 100% hard rules</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-4 h-4 rounded-sm border border-zinc-600 text-zinc-400 flex items-center justify-center text-[10px] font-black shrink-0">
                    NF
                  </span>
                  <span>Nutrition Facts will project $ & token savings</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};
