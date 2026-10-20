import React, { useState } from 'react';
import { PromptMetrics } from '../types';
import { DollarSign, Sliders } from 'lucide-react';

interface NutritionFactsCardProps {
  metrics: PromptMetrics;
  requestsPerDay: number;
  onRequestsPerDayChange: (val: number) => void;
  fluffCount: number;
  fluffTrimmed: number;
  duplicateCount: number;
  duplicateTrimmed: number;
  verboseCount: number;
  verboseTrimmed: number;
}

export const NutritionFactsCard: React.FC<NutritionFactsCardProps> = ({
  metrics,
  requestsPerDay,
  onRequestsPerDayChange,
  fluffCount,
  fluffTrimmed,
  duplicateCount,
  duplicateTrimmed,
  verboseCount,
  verboseTrimmed,
}) => {
  const [modelTier, setModelTier] = useState<number>(3.00); // $3.00 per 1M default

  const monthlyTokensSaved = metrics.tokensSaved * requestsPerDay * 30;
  const monthlyCostSavings = (monthlyTokensSaved / 1_000_000) * modelTier;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: amount > 100 ? 0 : 2,
    }).format(amount);
  };

  return (
    <div className="bg-white text-zinc-950 p-5 rounded-sm border-[6px] border-zinc-950 font-sans shadow-2xl space-y-3">
      {/* FDA Header */}
      <div className="border-b-[10px] border-zinc-950 pb-1">
        <h2 className="text-2xl font-black tracking-tighter uppercase leading-none font-sans">
          Prompt Nutrition Facts
        </h2>
        <div className="flex justify-between items-baseline text-xs font-semibold pt-1 text-zinc-700">
          <span>Serving Size</span>
          <span className="font-mono font-bold">1 System Prompt</span>
        </div>
      </div>

      {/* Main Token Metric (Calorie equivalent) */}
      <div className="border-b-[6px] border-zinc-950 py-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-zinc-600">
              Amount Per Request
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black font-mono tracking-tight text-zinc-950">
                {metrics.dietTokens}
              </span>
              <span className="text-xs font-bold uppercase text-zinc-600">
                Diet Tokens
              </span>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              Original: <span className="line-through">{metrics.originalTokens} tokens</span>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block bg-emerald-600 text-white font-mono font-black text-sm px-2.5 py-1 rounded">
              -{metrics.percentSaved}% Tokens
            </span>
            <div className="text-[10px] font-mono font-bold text-emerald-700 mt-1">
              {metrics.tokensSaved} tokens saved/req
            </div>
          </div>
        </div>
      </div>

      {/* Nutrient / Bloat Breakdown */}
      <div className="text-xs space-y-1 py-1 border-b-[4px] border-zinc-950 font-sans">
        <div className="flex justify-between font-bold pb-1 text-[11px] uppercase tracking-wider border-b border-zinc-900 text-zinc-700">
          <span>Clause Composition</span>
          <span>Diet Impact</span>
        </div>

        <div className="flex justify-between py-0.5 border-b border-zinc-200">
          <span className="font-medium text-zinc-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Polite Sycophancy / Fluff
          </span>
          <span className="font-mono font-bold text-red-600">
            {fluffTrimmed === fluffCount && fluffCount > 0 ? '0g (100% Trimmed)' : `${fluffCount - fluffTrimmed} left`}
          </span>
        </div>

        <div className="flex justify-between py-0.5 border-b border-zinc-200">
          <span className="font-medium text-zinc-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Duplicate / Overlapping Rules
          </span>
          <span className="font-mono font-bold text-amber-600">
            {duplicateTrimmed === duplicateCount && duplicateCount > 0 ? '0g (100% Trimmed)' : `${duplicateCount - duplicateTrimmed} left`}
          </span>
        </div>

        <div className="flex justify-between py-0.5 border-b border-zinc-200">
          <span className="font-medium text-zinc-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Verbose Prose Distillations
          </span>
          <span className="font-mono font-bold text-blue-600">
            {verboseTrimmed > 0 ? `${verboseTrimmed}/${verboseCount} compressed` : `0/${verboseCount} compressed`}
          </span>
        </div>

        <div className="flex justify-between py-0.5">
          <span className="font-bold text-zinc-950 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hard Constraints Preserved
          </span>
          <span className="font-mono font-bold text-emerald-700">
            {metrics.constraintLockPercent}%
          </span>
        </div>
      </div>

      {/* Interactive Volume & Dollar Savings Slider */}
      <div className="pt-2 space-y-3 bg-zinc-50 p-3 rounded border border-zinc-200">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="volume-slider" className="font-bold text-zinc-800 flex items-center gap-1 text-[11px] uppercase tracking-wide">
            <Sliders className="w-3.5 h-3.5 text-zinc-600" /> Daily Request Volume
          </label>
          <span className="font-mono font-black text-zinc-950 bg-white px-2 py-0.5 rounded border border-zinc-300">
            {requestsPerDay.toLocaleString()} req/day
          </span>
        </div>

        <input
          id="volume-slider"
          type="range"
          min="1000"
          max="200000"
          step="5000"
          value={requestsPerDay}
          onChange={(e) => onRequestsPerDayChange(Number(e.target.value))}
          className="w-full accent-zinc-950 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>1k req/day</span>
          <span>50k</span>
          <span>100k</span>
          <span>200k req/day</span>
        </div>

        {/* Model Tier Selector */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-200 text-xs">
          <span className="text-[11px] text-zinc-600 font-medium">Model Tier:</span>
          <select
            value={modelTier}
            onChange={(e) => setModelTier(Number(e.target.value))}
            className="text-xs bg-white text-zinc-900 border border-zinc-300 rounded px-2 py-1 font-mono font-semibold"
          >
            <option value={3.00}>Sonnet / GPT-4o ($3.00/1M)</option>
            <option value={0.25}>Haiku / 4o-mini ($0.25/1M)</option>
            <option value={15.00}>Opus / Frontier ($15.00/1M)</option>
          </select>
        </div>

        {/* Monthly Cost Savings Callout */}
        <div className="p-2.5 rounded bg-zinc-950 text-white flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                Projected Monthly Savings
              </span>
              <span className="text-lg font-black font-mono text-emerald-400">
                {formatCurrency(monthlyCostSavings)}
                <span className="text-xs font-normal text-zinc-400">/mo</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">
              {(monthlyTokensSaved / 1_000_000).toFixed(1)}M tokens/mo
            </span>
          </div>
        </div>
      </div>

      {/* FDA Fineprint */}
      <p className="text-[9px] text-zinc-500 leading-tight pt-1 font-sans">
        * Token calculations based on client-side BPE tokenizer estimation. Monthly savings assume continuous 30-day runtime volume at stated model API input pricing.
      </p>
    </div>
  );
};
