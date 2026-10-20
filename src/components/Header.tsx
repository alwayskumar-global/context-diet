import React from 'react';
import { Sparkles, Scissors, Bot, Code2, Wrench, RefreshCw } from 'lucide-react';
import { PresetPrompt } from '../types';

interface HeaderProps {
  presets: PresetPrompt[];
  activePresetId: string | null;
  onSelectPreset: (preset: PresetPrompt) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  presets,
  activePresetId,
  onSelectPreset,
  onReset,
}) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner">
            <Scissors className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                ContextDiet
                <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Linter v1.0
                </span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Visual token linter & FDA-style nutrition facts for LLM prompts & SKILL.md
            </p>
          </div>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          {presets.map((preset) => {
            const isActive = activePresetId === preset.id;
            const Icon = preset.id === 'customer-support' ? Bot : preset.id === 'coding-assistant' ? Code2 : Wrench;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow font-semibold'
                    : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-750 hover:text-white hover:border-zinc-600'
                }`}
                title={preset.description}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{preset.title}</span>
              </button>
            );
          })}

          <button
            onClick={onReset}
            className="px-2.5 py-1.5 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 flex items-center gap-1"
            title="Reset to default triage state"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
