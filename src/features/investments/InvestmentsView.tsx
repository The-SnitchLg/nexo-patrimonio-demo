import React from 'react';
import { Plus } from 'lucide-react';
import { HoldingsTable } from '@/components/investments/HoldingsTable';
import { TopPositionsBar } from '@/components/investments/TopPositionsBar';
import { AccountSourcesList } from '@/components/finance/AccountSourcesList';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';

interface InvestmentsViewProps {
  onOpenAddModal: () => void;
}

export const InvestmentsView: React.FC<InvestmentsViewProps> = ({ onOpenAddModal }) => {
  const { totals, isPrivacyMasked } = useFinance();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--signal)] mb-2">
            ✳ 01 / Inversiones
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text)]">
            Portafolio de inversiones
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Posiciones, efectivo, concentración y fuentes de inversión.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 rounded border border-[var(--text)] bg-[var(--text)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Nueva inversión
        </button>
      </div>

      {/* 3 Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-md border border-[var(--stroke)] bg-[var(--card)]">
        <div className="border-b sm:border-b-0 sm:border-r border-[var(--stroke)] p-5">
          <span className="font-mono text-[10px] text-[var(--muted)] uppercase">Valor Total</span>
          <div className="mt-2 font-serif text-2xl lg:text-3xl font-normal text-[var(--text)] data-number">
            {formatUSD(totals.investTotalUSD, isPrivacyMasked)}
          </div>
          <span className="mt-1 block text-[10px] text-[var(--muted)]">
            Incluye valores y efectivo interno de Hapi
          </span>
        </div>

        <div className="border-b sm:border-b-0 sm:border-r border-[var(--stroke)] p-5">
          <span className="font-mono text-[10px] text-[var(--muted)] uppercase">Valores en Hapi</span>
          <div className="mt-2 font-serif text-2xl lg:text-3xl font-normal text-[var(--text)] data-number">
            {formatUSD(2041.43, isPrivacyMasked)}
          </div>
          <span className="mt-1 block text-[10px] text-[var(--muted)]">
            25 posiciones al corte del 30 sep 2026
          </span>
        </div>

        <div className="p-5">
          <span className="font-mono text-[10px] text-[var(--signal)] uppercase">Efectivo en Hapi</span>
          <div className="mt-2 font-serif text-2xl lg:text-3xl font-normal text-[var(--signal)] data-number">
            {formatUSD(267.1, isPrivacyMasked)}
          </div>
          <span className="mt-1 block text-[10px] text-[var(--muted)]">
            No se duplica como ahorro en dólares
          </span>
        </div>
      </div>

      {/* Platforms and Top Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AccountSourcesList
          type="investments"
          title="Mis plataformas"
          onOpenAddModal={() => onOpenAddModal()}
        />
        <TopPositionsBar />
      </div>

      {/* Full 25 Holdings Table */}
      <HoldingsTable />
    </div>
  );
};
