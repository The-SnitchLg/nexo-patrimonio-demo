import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatUSD } from '@/domain/calculations';
import { useFinance } from '@/hooks/useFinance';

const EVOLUTION_DATA = [
  { date: '01 sep', value: 2090.27, label: '01 sep · US$ 2.090,27' },
  { date: '30 sep', value: 2308.53, label: '30 sep · US$ 2.308,53' },
];

export const SnapshotEvolution: React.FC = () => {
  const { isPrivacyMasked } = useFinance();

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Evolución documentada</h3>
        <span className="rounded border border-[var(--stroke)] px-2 py-0.5 font-mono text-[9px] text-[var(--muted)]">
          Septiembre de 2026
        </span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={EVOLUTION_DATA} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" opacity={0.5} vertical={false} />
            <XAxis
              dataKey="date"
              stroke="var(--muted)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'var(--stroke)' }}
              fontFamily="var(--font-data)"
            />
            <YAxis
              stroke="var(--muted)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(v) => (isPrivacyMasked ? '••••' : `$${v}`)}
              fontFamily="var(--font-data)"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded border border-[var(--stroke)] bg-[var(--card)] p-2 font-mono text-[10px] shadow-lg">
                      <div className="text-[var(--muted)]">{data.date}</div>
                      <div className="font-semibold text-[var(--signal)]">
                        {formatUSD(data.value, isPrivacyMasked)}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ede7dc"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#ede7dc', stroke: 'var(--card)', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ff7849', stroke: 'var(--card)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--muted)]">
        <span>01 sep · {formatUSD(2090.27, isPrivacyMasked)}</span>
        <span>30 sep · {formatUSD(2308.53, isPrivacyMasked)}</span>
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-[var(--muted)]">
        Dos cortes reales del extracto Hapi. La variación del saldo incluye aportes; no representa el rendimiento.
      </p>
    </div>
  );
};
