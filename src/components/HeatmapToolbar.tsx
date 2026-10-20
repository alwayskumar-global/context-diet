import React from 'react';
import { Filter, CheckSquare, XSquare } from 'lucide-react';
import { ClauseCategory } from '../types';

interface HeatmapToolbarProps {
  filter: ClauseCategory | 'all';
  onFilterChange: (category: ClauseCategory | 'all') => void;
  counts: Record<ClauseCategory, number>;
  trimmedCounts: Record<ClauseCategory, number>;
  onTrimAllFluffAndDuplicates: () => void;
  onResetAllKeep: () => void;
}

export const HeatmapToolbar: React.FC<HeatmapToolbarProps> = ({
  filter,
  onFilterChange,
  counts,
  trimmedCounts,
  onTrimAllFluffAndDuplicates,
  onResetAllKeep,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-zinc-500 font-mono text-[11px] uppercase mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>

        <button
          onClick={() => onFilterChange('all')}
          className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border ${
            filter === 'all'
              ? 'bg-zinc-700 text-white border-zinc-500 font-semibold'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
          }`}
        >
          All Clauses
        </button>

        <button
          onClick={() => onFilterChange('fluff')}
          className={`px-2 py-1 rounded-md text-xs font-mono transition-all border flex items-center gap-1.5 ${
            filter === 'fluff'
              ? 'bg-red-500/20 text-red-300 border-red-500/50 font-semibold'
              : 'bg-zinc-900 text-red-400/80 border-zinc-800 hover:border-red-500/30'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
          Fluff ({trimmedCounts.fluff}/{counts.fluff})
        </button>

        <button
          onClick={() => onFilterChange('duplicate')}
          className={`px-2 py-1 rounded-md text-xs font-mono transition-all border flex items-center gap-1.5 ${
            filter === 'duplicate'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold'
              : 'bg-zinc-900 text-amber-400/80 border-zinc-800 hover:border-amber-500/30'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          Duplicates ({trimmedCounts.duplicate}/{counts.duplicate})
        </button>

        <button
          onClick={() => onFilterChange('verbose')}
          className={`px-2 py-1 rounded-md text-xs font-mono transition-all border flex items-center gap-1.5 ${
            filter === 'verbose'
              ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 font-semibold'
              : 'bg-zinc-900 text-blue-400/80 border-zinc-800 hover:border-blue-500/30'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
          Verbose ({trimmedCounts.verbose}/{counts.verbose})
        </button>

        <button
          onClick={() => onFilterChange('constraint')}
          className={`px-2 py-1 rounded-md text-xs font-mono transition-all border flex items-center gap-1.5 ${
            filter === 'constraint'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
              : 'bg-zinc-900 text-emerald-400/80 border-zinc-800 hover:border-emerald-500/30'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          Constraints ({counts.constraint - trimmedCounts.constraint}/{counts.constraint})
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={onTrimAllFluffAndDuplicates}
          className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition border border-zinc-700 flex items-center gap-1"
          title="Auto-trim polite fluff and duplicate rules"
        >
          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Trim Bloat</span>
        </button>
        <button
          onClick={onResetAllKeep}
          className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition border border-zinc-700 flex items-center gap-1"
          title="Reset all clauses to Keep"
        >
          <XSquare className="w-3.5 h-3.5 text-zinc-400" />
          <span>Keep All</span>
        </button>
      </div>
    </div>
  );
};
