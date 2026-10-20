import React from 'react';
import { Clause, ClauseCategory } from '../types';
import { Scissors, ShieldCheck, AlertTriangle, ArrowRight, Check, Ban } from 'lucide-react';

interface HeatmapViewerProps {
  clauses: Clause[];
  filter: ClauseCategory | 'all';
  onToggleClause: (id: string) => void;
}

export const HeatmapViewer: React.FC<HeatmapViewerProps> = ({
  clauses,
  filter,
  onToggleClause,
}) => {
  const visibleClauses = filter === 'all' 
    ? clauses 
    : clauses.filter((c) => c.category === filter);

  const getCategoryStyles = (category: ClauseCategory, isTrimmed: boolean) => {
    switch (category) {
      case 'fluff':
        return isTrimmed
          ? 'bg-red-950/20 text-red-400/50 border-red-900/30 line-through decoration-red-500/60'
          : 'bg-red-500/15 text-red-200 border-red-500/40 hover:bg-red-500/25';
      case 'duplicate':
        return isTrimmed
          ? 'bg-amber-950/20 text-amber-400/50 border-amber-900/30 line-through decoration-amber-500/60'
          : 'bg-amber-500/15 text-amber-200 border-amber-500/40 hover:bg-amber-500/25';
      case 'verbose':
        return isTrimmed
          ? 'bg-blue-950/30 text-blue-300 border-blue-500/40'
          : 'bg-blue-500/15 text-blue-200 border-blue-500/40 hover:bg-blue-500/25';
      case 'constraint':
        return isTrimmed
          ? 'bg-red-950/40 text-red-300 border-red-500/70 shadow-sm'
          : 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40 hover:bg-emerald-500/25';
    }
  };

  const getBadge = (category: ClauseCategory, isTrimmed: boolean) => {
    switch (category) {
      case 'fluff':
        return isTrimmed ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-800">
            <Scissors className="w-2.5 h-2.5" /> Trimmed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
            <Ban className="w-2.5 h-2.5" /> Fluff
          </span>
        );
      case 'duplicate':
        return isTrimmed ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-800">
            <Scissors className="w-2.5 h-2.5" /> Duplicate Cut
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Duplicate
          </span>
        );
      case 'verbose':
        return isTrimmed ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400">
            Distilled 1-liner
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Verbose Prose
          </span>
        );
      case 'constraint':
        return isTrimmed ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
            <AlertTriangle className="w-2.5 h-2.5" /> Dropped Constraint!
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <ShieldCheck className="w-2.5 h-2.5" /> Hard Constraint
          </span>
        );
    }
  };

  return (
    <div className="space-y-3 font-mono text-sm leading-relaxed">
      <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
        <span>Click any clause span to toggle Keep / Trim:</span>
        <span className="text-[11px] text-zinc-500 font-sans">
          Showing {visibleClauses.length} of {clauses.length} clauses
        </span>
      </div>

      <div className="space-y-2">
        {visibleClauses.map((clause) => {
          const isTrimmed = clause.isTrimmed;
          const styles = getCategoryStyles(clause.category, isTrimmed);

          return (
            <div
              key={clause.id}
              onClick={() => onToggleClause(clause.id)}
              className={`group cursor-pointer p-3 rounded-lg border transition-all select-none relative ${styles}`}
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2">
                  {getBadge(clause.category, isTrimmed)}
                  {clause.explanation && (
                    <span className="text-[11px] text-zinc-400 font-sans hidden sm:inline">
                      — {clause.explanation}
                    </span>
                  )}
                </div>

                <div className="opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-sans font-semibold">
                  {isTrimmed ? (
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Click to Keep
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1">
                      <Scissors className="w-3 h-3 text-red-400" /> Click to Trim
                    </span>
                  )}
                </div>
              </div>

              {/* Text rendering */}
              {clause.category === 'verbose' && isTrimmed && clause.conciseText ? (
                <div className="space-y-2">
                  <div className="line-through opacity-50 text-xs text-zinc-400">
                    {clause.originalText}
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded bg-blue-950/50 border border-blue-500/40 text-blue-100 text-xs font-semibold">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block font-bold">
                        Optimized Replacement Directive:
                      </span>
                      {clause.conciseText}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-zinc-200">
                  {clause.originalText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
