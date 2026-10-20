import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, FileText, Sparkles } from 'lucide-react';

interface RawEditorProps {
  initialText: string;
  onAnalyze: (text: string) => void;
  onCancel?: () => void;
  canCancel?: boolean;
}

export const RawEditor: React.FC<RawEditorProps> = ({
  initialText,
  onAnalyze,
  onCancel,
  canCancel = true,
}) => {
  const [text, setText] = useState<string>(initialText);

  // Sync internal state if initialText changes (e.g. on Reset)
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleAnalyze = () => {
    if (text.trim().length === 0) return;
    onAnalyze(text);
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 font-mono text-zinc-300">
          <FileText className="w-4 h-4 text-emerald-400" />
          Paste Custom System Prompt / SKILL.md / CLAUDE.md:
        </span>
        <span className="font-mono text-zinc-500">
          {charCount} chars · {wordCount} words
        </span>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your bloated system prompt, SKILL.md, or CLAUDE.md here to analyze token bloat, conversational fluff, and hard constraints..."
        className="w-full h-80 bg-zinc-950 font-mono text-xs sm:text-sm text-zinc-200 p-4 rounded-lg border border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition leading-relaxed resize-y placeholder:text-zinc-600"
        autoFocus
      />

      <div className="flex items-center justify-between gap-3 pt-2">
        {canCancel && onCancel ? (
          <button
            onClick={onCancel}
            className="px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-750 border border-zinc-700 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Back to Heatmap
          </button>
        ) : (
          <div className="text-xs text-zinc-500 font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Or pick a preset from the top bar
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={text.trim().length === 0}
          className="px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer disabled:pointer-events-none"
        >
          <Play className="w-4 h-4 fill-zinc-950" />
          <span>Analyze & Lint Prompt</span>
        </button>
      </div>
    </div>
  );
};
