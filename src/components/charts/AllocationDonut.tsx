import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';

export const AllocationDonut: React.FC = () => {
  const { totals, isPrivacyMasked } = useFinance();

  const totalUSD = totals.grandTotalUSD.toNumber();
  const investUSD = totals.investTotalUSD.toNumber();
  const copUSD = totals.copInUSD.toNumber();
  const usdSavings = totals.usdSavingsTotalUSD.toNumber();

  const data = [
    { name: 'Inversiones', value: investUSD, color: '#eee9de' },
    { name: 'Ahorros COP', value: copUSD, color: '#77746e' },
    { name: 'Ahorros USD', value: usdSavings, color: '#ff7849' },
  ].filter((d) => d.value > 0);

  const displayData = data.length > 0 ? data : [{ name: 'Inversiones', value: 2308.53, color: '#eee9de' }];

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-[var(--text)]">Distribución de tu dinero</h3>
        <span className="font-mono text-[10px] text-[var(--muted)]">Por categoría</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 min-h-[200px]">
        {/* Donut container */}
        <div className="relative h-40 w-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    const pct = totalUSD > 0 ? ((item.value / totalUSD) * 100).toFixed(1) : '100';
                    return (
                      <div className="rounded border border-[var(--stroke)] bg-[var(--card)] p-2 font-mono text-[10px] shadow-lg">
                        <div>{item.name}</div>
                        <div className="font-semibold text-[var(--signal)]">
                          {formatUSD(item.value, isPrivacyMasked)} ({pct}%)
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={displayData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                stroke="var(--card)"
                strokeWidth={2}
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-serif text-xl font-normal text-[var(--text)]">100%</span>
            <span className="font-mono text-[8px] text-[var(--muted)]">registrado</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 min-w-[130px]">
          {displayData.map((item) => {
            const pct = totalUSD > 0 ? ((item.value / totalUSD) * 100).toFixed(1) : '100';
            return (
              <div key={item.name} className="flex items-center gap-2.5 text-xs text-[var(--muted)]">
                <span className="h-2 w-2 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
                <b className="ml-auto font-mono text-[11px] font-medium text-[var(--text)]">{pct}%</b>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-[var(--muted)]">
        La proporción se recalcula automáticamente cuando agregas cuentas o inversiones.
      </p>
    </div>
  );
};
