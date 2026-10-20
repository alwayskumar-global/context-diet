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
import { Info, Code, Eye } from 'lucide-react';

export const App: React.FC = () => {
  const [activePreset, setActivePreset] = useState<PresetPrompt | null>(PRESETS[0]);
  const [clauses, setClauses] = useState<Clause[]>(PRESETS[0].clauses);
  const [categoryFilter, setCategoryFilter] = useState<ClauseCategory | 'all'>('all');
  const [requestsPerDay, setRequestsPerDay] = useState<number>(25000);
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

  // Handle preset change
  const handleSelectPreset = (preset: PresetPrompt) => {
    setActivePreset(preset);
    setClauses(preset.clauses.map((c) => ({ ...c })));
    setCategoryFilter('all');
    setIsEditorMode(false);
  };

  // Open custom editor
  const handleOpenCustom = () => {
    setActivePreset(null);
    setIsEditorMode(true);
  };

  // Analyze custom prompt
  const handleAnalyzeCustom = (text: string) => {
    const parsedClauses = parseCustomPrompt(text);
    setClauses(parsedClauses);
    setIsEditorMode(false);
    setCategoryFilter('all');
  };

  // Reset to initial preset state
  const handleReset = () => {
    if (activePreset) {
      setClauses(activePreset.clauses.map((c) => ({ ...c })));
    }
    setCategoryFilter('all');
  };

  // Toggle single clause
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

  // Real-time Token & Cost Metrics
  const metrics = useMemo(() => {
    return calculateMetrics(clauses, requestsPerDay);
  }, [clauses, requestsPerDay]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Header
        presets={PRESETS}
        activePresetId={isEditorMode ? 'custom' : activePreset?.id || null}
        onSelectPreset={handleSelectPreset}
        onOpenCustom={handleOpenCustom}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Canvas (Heatmap & Triage) */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Preset Context Banner */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {isEditorMode ? 'Custom Mode' : activePreset ? activePreset.tag : 'Custom Analysis'}
                </span>
                <h1 className="text-base font-bold text-white tracking-tight">
                  {isEditorMode ? 'Paste & Analyze Custom Prompt' : activePreset ? activePreset.title : 'Custom Analyzed Prompt'}
                </h1>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {isEditorMode 
                  ? 'Paste raw system instructions, SKILL.md, or CLAUDE.md to decompose into categorized clause heatmaps.'
                  : activePreset?.description || 'Custom prompt decomposed into categorized clauses.'}
              </p>
            </div>
            
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
          </div>

          {/* Interactive Heatmap or Raw Editor Canvas */}
          <div className="p-4 md:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4">
            {isEditorMode ? (
              <RawEditor
                initialText={activePreset ? activePreset.promptText : clauses.map((c) => c.originalText).join('\n')}
                onAnalyze={handleAnalyzeCustom}
                onCancel={() => setIsEditorMode(false)}
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

        {/* Right Sidebar (Constraint Lock, Nutrition Facts, & 1-Click Export) */}
        <aside className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Slice 2: Constraint Lock Engine */}
          <ConstraintLockBadge
            totalConstraints={constraintClauses.length}
            preservedConstraints={preservedConstraints}
            brokenConstraints={brokenConstraints}
            allConstraints={constraintClauses}
            onRestoreConstraint={handleRestoreConstraint}
          />

          {/* Slice 3: FDA Nutrition Facts Card */}
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

          {/* Slice 4: 1-Click Export Action */}
          <ExportAction
            clauses={clauses}
            tokensSaved={metrics.tokensSaved}
            percentSaved={metrics.percentSaved}
          />
        </aside>
      </main>
    </div>
  );
};
