import React from 'react';
import { ShieldCheck, AlertTriangle, Undo2, Lock } from 'lucide-react';
import { Clause } from '../types';

interface ConstraintLockBadgeProps {
  totalConstraints: number;
  preservedConstraints: number;
  brokenConstraints: Clause[];
  allConstraints: Clause[];
  onRestoreConstraint: (id: string) => void;
}

export const ConstraintLockBadge: React.FC<ConstraintLockBadgeProps> = ({
  totalConstraints,
  preservedConstraints,
  brokenConstraints,
  allConstraints,
  onRestoreConstraint,
}) => {
  const isLocked = totalConstraints > 0 && preservedConstraints === totalConstraints;
  const percentage = totalConstraints > 0 
    ? Math.round((preservedConstraints / totalConstraints) * 100) 
    : 100;

  return (
    <div
      className={`rounded-xl border transition-all duration-300 p-4 shadow-lg ${
        isLocked
          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100 shadow-emerald-950/20'
          : 'bg-red-950/30 border-red-500/70 text-red-100 shadow-red-950/30 animate-pulse-subtle'
      }`}
    >
      {/* Status Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold shrink-0 border ${
              isLocked
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-red-500/20 border-red-500/60 text-red-400'
            }`}
          >
            {isLocked ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Safety Invariant
              </span>
            </div>
            <h3 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
              {isLocked ? (
                <span className="text-emerald-300">100% Constraints Locked</span>
              ) : (
                <span className="text-red-400">⚠️ Lock Broken: {percentage}% Preserved</span>
              )}
            </h3>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase border ${
            isLocked
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-red-600 text-white border-red-700'
          }`}
        >
          {preservedConstraints}/{totalConstraints} Active
        </span>
      </div>

      {/* Description / Alert Message */}
      {isLocked ? (
        <p className="text-xs text-emerald-200/80 leading-relaxed font-sans mb-3">
          Zero regression risk detected. All non-negotiable negative constraints, schema rules, and security boundaries will survive the prompt diet intact.
        </p>
      ) : (
        <div className="p-2.5 rounded-lg bg-red-900/30 border border-red-500/50 text-xs text-red-200 font-sans space-y-2 mb-3">
          <p className="font-semibold text-red-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-400" />
            High Regression Risk: Hard Invariant Stripped
          </p>
          <p className="text-[11px] text-red-200/90 leading-tight">
            Trimming these critical constraints may cause model jailbreaks, PII leakage, or schema contract violations in production.
          </p>
        </div>
      )}

      {/* Broken constraints triage list */}
      {!isLocked && brokenConstraints.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-red-500/30">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-300 block">
            Broken Constraints ({brokenConstraints.length}):
          </span>
          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {brokenConstraints.map((c) => (
              <div
                key={c.id}
                className="p-2 rounded bg-zinc-900/90 border border-red-500/40 text-xs flex items-start justify-between gap-2"
              >
                <div className="font-mono text-xs text-red-300 line-through opacity-80">
                  {c.originalText}
                </div>
                <button
                  onClick={() => onRestoreConstraint(c.id)}
                  className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-semibold shrink-0 flex items-center gap-1 transition"
                  title="Restore this constraint to Keep"
                >
                  <Undo2 className="w-3 h-3" /> Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Intact constraints mini-list */}
      {isLocked && allConstraints.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-emerald-500/20">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 block font-semibold">
            Locked Guardrails ({allConstraints.length}):
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono text-emerald-300/90 max-h-48 overflow-y-auto pr-1">
            {allConstraints.map((c) => (
              <li key={c.id} className="flex items-start gap-1.5 leading-snug">
                <span className="text-emerald-400 shrink-0 font-bold mt-0.5">✓</span>
                <span className="line-clamp-2 text-zinc-300">{c.originalText}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
