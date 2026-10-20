import React, { useState } from 'react';
import { PRESETS } from './data/presets';
import { Clause, ClauseCategory, PresetPrompt } from './types';
import { Header } from './components/Header';
import { HeatmapToolbar } from './components/HeatmapToolbar';
import { HeatmapViewer } from './components/HeatmapViewer';
import { ShieldCheck, Info } from 'lucide-react';

export const App: React.FC = () => {
  const [activePreset, setActivePreset] = useState<PresetPrompt>(PRESETS[0]);
  const [clauses, setClauses] = useState<Clause[]>(PRESETS[0].clauses);
  const [categoryFilter, setCategoryFilter] = useState<ClauseCategory | 'all'>('all');

  // Handle preset change
  const handleSelectPreset = (preset: PresetPrompt) => {
    setActivePreset(preset);
    setClauses(preset.clauses.map((c) => ({ ...c })));
    setCategoryFilter('all');
  };

  // Reset to initial preset state
  const handleReset = () => {
    setClauses(activePreset.clauses.map((c) => ({ ...c })));
    setCategoryFilter('all');
  };

  // Toggle single clause
  const handleToggleClause = (id: string) => {
    setClauses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isTrimmed: !c.isTrimmed } : c))
    );
  };

  // Bulk action: trim all fluff and duplicates
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Header
        presets={PRESETS}
        activePresetId={activePreset.id}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Canvas (Heatmap & Triage) */}
        <section className="lg:col-span-8 space-y-4">
          {/* Preset Context Banner */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {activePreset.tag}
                </span>
                <h1 className="text-base font-bold text-white tracking-tight">
                  {activePreset.title}
                </h1>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {activePreset.description}
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 shrink-0 bg-zinc-950/60 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>{clauses.length} clauses detected</span>
            </div>
          </div>

          {/* Interactive Heatmap Canvas Card */}
          <div className="p-4 md:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4">
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
          </div>
        </section>

        {/* Right Sidebar Placeholder (Slices 2 & 3: Constraint Lock & Nutrition Card) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center text-xs text-zinc-500 font-mono">
            <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-emerald-400 opacity-60" />
            <p className="font-semibold text-zinc-400">Sidebar Metrics Area</p>
            <p className="text-[11px] mt-1 text-zinc-500">
              Slice 2: Constraint Lock Engine<br />
              Slice 3: FDA Nutrition Facts Card
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};
