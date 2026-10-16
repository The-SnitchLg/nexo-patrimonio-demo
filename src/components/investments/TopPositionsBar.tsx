import React from 'react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';

export const TopPositionsBar: React.FC = () => {
  const { holdings, isPrivacyMasked } = useFinance();

  const top5 = [...holdings]
    .sort((a, b) => b.marketValueUSD - a.marketValueUSD)
    .slice(0, 5);

  const maxVal = top5[0]?.marketValueUSD || 1;

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Mayores posiciones</h3>
        <span className="font-mono text-[10px] text-[var(--muted)]">Hapi · 30 sep 2026</span>
      </div>

      <div className="space-y-3.5">
        {top5.map((h) => {
          const pct = ((h.marketValueUSD / 2308.53) * 100).toFixed(1);
          const barWidth = ((h.marketValueUSD / maxVal) * 100).toFixed(1);

          return (
            <div key={h.symbol} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[var(--text)]">{h.symbol}</span>
                <span className="font-mono text-[11px] text-[var(--muted)]">
                  {formatUSD(h.marketValueUSD, isPrivacyMasked)} · {pct}%
                </span>
              </div>
              <div className="h-1 w-full bg-[var(--card-2)] overflow-hidden">
                <div
                  className="h-full bg-[var(--signal)] transition-all duration-300"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
