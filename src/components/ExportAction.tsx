import React, { useState } from 'react';
import { Clause } from '../types';
import { compileDietText } from '../utils/tokenizer';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';

interface ExportActionProps {
  clauses: Clause[];
  tokensSaved: number;
  percentSaved: number;
}

export const ExportAction: React.FC<ExportActionProps> = ({
  clauses,
  tokensSaved,
  percentSaved,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const compiledDietPrompt = compileDietText(clauses);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiledDietPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = compiledDietPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-3">
      {/* 1-Click Copy Diet Prompt Action Button */}
      <button
        onClick={handleCopy}
        className={`w-full py-3.5 px-4 rounded-xl font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl ${
          copied
            ? 'bg-emerald-500 text-zinc-950 shadow-emerald-500/30 scale-[1.01]'
            : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950 hover:shadow-emerald-400/20 active:scale-[0.99]'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5 text-zinc-950 stroke-[3]" />
            <span>Copied Diet Prompt! (-{percentSaved}%)</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5 text-zinc-950" />
            <span>Copy Diet Prompt ({tokensSaved} Tokens Trimmed)</span>
          </>
        )}
      </button>

      {/* Preview Toggle Button */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="hover:text-emerald-400 transition flex items-center gap-1.5"
        >
          {showPreview ? (
            <>
              <EyeOff className="w-3.5 h-3.5" /> Hide Clean Prompt Preview
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Preview Clean Diet Output
            </>
          )}
        </button>
        <span className="text-[11px] text-zinc-500">Ready for production paste</span>
      </div>

      {/* Clean Diet Output Preview Area */}
      {showPreview && (
        <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-700 space-y-2 animate-fadeIn">
          <div className="flex justify-between items-center text-[10px] font-mono uppercase text-zinc-400 pb-1 border-b border-zinc-800">
            <span>Clean Production Prompt</span>
            <span className="text-emerald-400 font-bold">100% Trimmed & Compiled</span>
          </div>
          <pre className="font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto pr-1">
            {compiledDietPrompt}
          </pre>
        </div>
      )}
    </div>
  );
};
