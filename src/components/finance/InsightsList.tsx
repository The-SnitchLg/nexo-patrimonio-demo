import React from 'react';
import { AlertCircle, Target, ArrowDownRight, Layers } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatCOP } from '@/domain/calculations';

export const InsightsList: React.FC = () => {
  const { fxRate, accounts, holdings } = useFinance();

  const techHoldings = holdings.filter((h) => ['VGT', 'SMH', 'NVDA'].includes(h.symbol));
  const techSum = techHoldings.reduce((sum, h) => sum + h.marketValueUSD, 0);
  const techPct = ((techSum / 2308.53) * 100).toFixed(1);

  const missingAccounts = accounts.filter((a) => a.type === 'cop' || a.type === 'usd').length === 0;

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Insights patrimoniales</h3>
        <span className="rounded border border-[var(--stroke)] bg-[#252421] px-2 py-0.5 font-mono text-[9px] text-[var(--text)]">
          Auditables
        </span>
      </div>

      {missingAccounts && (
        <div className="mb-3 rounded border border-[#6d3c2a] bg-[#ff7849]/5 p-3 text-xs leading-relaxed text-[var(--muted)]">
          <strong className="block text-[var(--text)] mb-1 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-[var(--signal)]" />
            Datos por completar
          </strong>
          Faltan tus saldos en pesos o cuentas USD externas. El total mostrado corresponde a las fuentes registradas.
        </div>
      )}

      <div className="divide-y divide-[var(--stroke)]">
        {/* Insight 1: Concentración tecnológica */}
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#4c4339] bg-[#262320] text-[var(--signal)]">
            <Target className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--text)]">{techPct}% del portafolio Hapi</strong> está concentrado en VGT, SMH y NVDA. Su exposición a semiconductores y tecnología presenta solapamiento.
          </p>
        </div>

        {/* Insight 2: Depósitos por conciliar */}
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#4c4339] bg-[#262320] text-[var(--signal)]">
            <ArrowDownRight className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--text)]">US$ 300 por conciliar</strong> en 3 depósitos de octubre. Permanecen fuera del balance hasta confirmar acreditación.
          </p>
        </div>

        {/* Insight 3: Tipo de cambio vigente */}
        <div className="flex items-start gap-3 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#4c4339] bg-[#262320] text-[var(--signal)]">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--text)]">Tasa TRM de conversión:</strong> {formatCOP(fxRate)} por 1 USD (configurable en Ajustes).
          </p>
        </div>
      </div>
    </div>
  );
};
