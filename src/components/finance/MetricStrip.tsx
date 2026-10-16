import React from 'react';
import { TrendingUp, Home, DollarSign } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD, formatCOP } from '@/domain/calculations';

export const MetricStrip: React.FC = () => {
  const { totals, isPrivacyMasked, accounts } = useFinance();

  const hasCopAccounts = accounts.some((a) => a.type === 'cop');
  const hasUsdAccounts = accounts.some((a) => a.type === 'usd');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 overflow-hidden rounded-md border border-[var(--stroke)] bg-[var(--card)]">
      {/* 1. Inversiones */}
      <div className="group relative border-b sm:border-b-0 sm:border-r border-[var(--stroke)] p-5 hover:bg-[var(--hover)] transition-colors">
        <span className="absolute top-4 right-4 h-3.5 w-3.5 rotate-45 border border-[#3e3b36]" />
        <div className="flex items-center gap-2.5 font-mono text-[10px] text-[var(--muted)]">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-[var(--stroke)] text-[var(--text)]">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
          <span>INVERSIONES</span>
        </div>
        <div className="mt-3 font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[var(--text)] data-number">
          {formatUSD(totals.investTotalUSD, isPrivacyMasked)}
        </div>
        <div className="mt-1.5 text-[10px] text-[var(--muted)]">
          Portafolios y activos invertidos (incluye efectivo Hapi)
        </div>
      </div>

      {/* 2. Ahorros en pesos */}
      <div className="group relative border-b sm:border-b-0 lg:border-r border-[var(--stroke)] p-5 hover:bg-[var(--hover)] transition-colors">
        <span className="absolute top-4 right-4 h-3.5 w-3.5 rotate-45 border border-[#3e3b36]" />
        <div className="flex items-center gap-2.5 font-mono text-[10px] text-[var(--muted)]">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-[var(--stroke)] text-[var(--text)]">
            <Home className="h-3.5 w-3.5" />
          </div>
          <span>AHORROS EN PESOS</span>
        </div>
        <div className="mt-3 font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[var(--text)] data-number">
          {formatCOP(totals.copTotalCOP, isPrivacyMasked)}
        </div>
        <div className="mt-1.5 text-[10px] text-[var(--muted)]">
          {hasCopAccounts ? 'Cuentas locales registradas' : 'Pendiente de registrar tus cuentas'}
        </div>
      </div>

      {/* 3. Ahorros en dólares */}
      <div className="group relative sm:col-span-2 lg:col-span-1 p-5 hover:bg-[var(--hover)] transition-colors">
        <span className="absolute top-4 right-4 h-3.5 w-3.5 rotate-45 border border-[#3e3b36]" />
        <div className="flex items-center gap-2.5 font-mono text-[10px] text-[var(--signal)]">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-[var(--stroke)] text-[var(--signal)]">
            <DollarSign className="h-3.5 w-3.5" />
          </div>
          <span>AHORROS EN DÓLARES</span>
        </div>
        <div className="mt-3 font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[var(--text)] data-number">
          {formatUSD(totals.usdSavingsTotalUSD, isPrivacyMasked)}
        </div>
        <div className="mt-1.5 text-[10px] text-[var(--muted)]">
          {hasUsdAccounts ? 'Cuentas internacionales externas' : 'Pendiente de registrar tus cuentas'}
        </div>
      </div>
    </div>
  );
};
