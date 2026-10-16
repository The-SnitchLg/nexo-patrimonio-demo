import React from 'react';
import { Plus } from 'lucide-react';
import { AccountSourcesList } from '@/components/finance/AccountSourcesList';
import { useFinance } from '@/hooks/useFinance';
import { formatCOP } from '@/domain/calculations';

interface SavingsCopViewProps {
  onOpenAddModal: () => void;
}

export const SavingsCopView: React.FC<SavingsCopViewProps> = ({ onOpenAddModal }) => {
  const { totals, isPrivacyMasked, accounts } = useFinance();
  const copAccounts = accounts.filter((a) => a.type === 'cop');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--signal)] mb-2">
            ✳ 02 / Ahorro local
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text)]">
            Ahorros en pesos
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Cuentas de ahorro, bolsillos, CDT y fondos disponibles en COP.
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
            <span className="text-xs text-[var(--muted)]">Ahorros registrados en COP</span>
            <div className="my-2 font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[var(--text)] data-number">
              {formatCOP(totals.copTotalCOP, isPrivacyMasked)}
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              {copAccounts.length === 0
                ? 'Estado: SIN CUENTAS REGISTRADAS (no confundir con patrimonio cero)'
                : `${copAccounts.length} cuenta(s) consolidada(s)`}
            </div>
          </div>

          <div className="rounded border border-[var(--stroke)] px-3 py-1.5 font-mono text-xs text-[var(--muted)] self-start sm:self-auto">
            COP · Moneda original
          </div>
        </div>
      </div>

      {/* Sources List */}
      <AccountSourcesList
        type="cop"
        title="Mis fuentes de ahorro en pesos"
        onOpenAddModal={() => onOpenAddModal()}
      />
    </div>
  );
};
