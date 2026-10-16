import React from 'react';
import { Plus } from 'lucide-react';
import { AccountSourcesList } from '@/components/finance/AccountSourcesList';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';

interface SavingsUsdViewProps {
  onOpenAddModal: () => void;
}

export const SavingsUsdView: React.FC<SavingsUsdViewProps> = ({ onOpenAddModal }) => {
  const { totals, isPrivacyMasked, accounts } = useFinance();
  const usdAccounts = accounts.filter((a) => a.type === 'usd');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--signal)] mb-2">
            ✳ 03 / Ahorro internacional
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text)]">
            Ahorros en dólares
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Saldo disponible en plataformas externas, dólares digitales y cuentas USD independientes.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 rounded border border-[var(--text)] bg-[var(--text)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar cuenta
        </button>
      </div>

      {/* Overview Card */}
      <div className="relative overflow-hidden rounded-md border border-[#45423d] bg-gradient-to-r from-[#171615] via-[#101010] to-[#171410] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs text-[var(--muted)]">Ahorros registrados en USD</span>
            <div className="my-2 font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[var(--text)] data-number">
              {formatUSD(totals.usdSavingsTotalUSD, isPrivacyMasked)}
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              {usdAccounts.length === 0
                ? 'No incluye el efectivo Hapi (US$ 267,10) porque forma parte del saldo total de esa inversión.'
                : `${usdAccounts.length} cuenta(s) externa(s) independiente(s) registrada(s).`}
            </div>
          </div>

          <div className="rounded border border-[var(--stroke)] px-3 py-1.5 font-mono text-xs text-[var(--muted)] self-start sm:self-auto">
            USD · Cuentas externas
          </div>
        </div>
      </div>

      {/* Sources List */}
      <AccountSourcesList
        type="usd"
        title="Mis fuentes de ahorro en dólares"
        onOpenAddModal={() => onOpenAddModal()}
      />
    </div>
  );
};
