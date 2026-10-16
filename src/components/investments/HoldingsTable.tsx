import React, { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';

export const HoldingsTable: React.FC = () => {
  const { holdings, isPrivacyMasked } = useFinance();
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = holdings
    .filter(
      (h) =>
        h.symbol.toLowerCase().includes(search.toLowerCase()) ||
        h.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.marketValueUSD - b.marketValueUSD : b.marketValueUSD - a.marketValueUSD));

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-[var(--text)]">Detalle de activos Hapi</h3>
          <span className="rounded border border-[var(--stroke)] bg-[#252421] px-2 py-0.5 font-mono text-[9px] text-[var(--text)]">
            25 posiciones
          </span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ticker o empresa..."
            className="w-full rounded border border-[var(--stroke)] bg-[var(--card-2)] py-2 pl-9 pr-3 font-mono text-xs text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--signal)] focus:outline-hidden"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--stroke)] font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">
              <th className="py-3 px-3">Activo</th>
              <th className="py-3 px-3 text-right">Cantidad</th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => setSortAsc(!sortAsc)}
                  className="inline-flex items-center gap-1 hover:text-[var(--text)]"
                >
                  Valor USD
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">% del portafolio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--stroke)] font-mono text-xs">
            {filtered.map((h) => {
              const pct = ((h.marketValueUSD / 2308.53) * 100).toFixed(2).replace('.', ',');
              return (
                <tr key={h.symbol} className="hover:bg-[var(--hover)] transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold tracking-tight text-[var(--text)]">{h.symbol}</span>
                    <span className="block font-sans text-[10px] text-[var(--muted)]">{h.name}</span>
                  </td>
                  <td className="py-3 px-3 text-right text-[var(--muted)] data-number">
                    {new Intl.NumberFormat('es-CO', { maximumFractionDigits: 5 }).format(h.quantity)}
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-[var(--text)] data-number">
                    {formatUSD(h.marketValueUSD, isPrivacyMasked)}
                  </td>
                  <td className="py-3 px-3 text-right text-[var(--muted)] data-number">
                    {pct}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-[10px] text-[var(--muted)] leading-relaxed">
        Fuente: Extracto oficial Hapi / Apex Clearing al 30 de septiembre de 2026.
      </div>
    </div>
  );
};
