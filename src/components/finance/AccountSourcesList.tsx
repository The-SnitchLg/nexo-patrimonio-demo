import React from 'react';
import { TrendingUp, Wallet, DollarSign, Plus, Trash2 } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD, formatCOP } from '@/domain/calculations';
import type { AccountType } from '@/types/finance';

interface AccountSourcesListProps {
  type: AccountType;
  title: string;
  onOpenAddModal: (type: AccountType) => void;
}

export const AccountSourcesList: React.FC<AccountSourcesListProps> = ({
  type,
  title,
  onOpenAddModal,
}) => {
  const { accounts, deleteAccount, isPrivacyMasked } = useFinance();

  const filtered = accounts.filter((a) => a.type === type);
  const showHapi = type === 'investments';

  const typeLabel =
    type === 'investments'
      ? 'inversiones'
      : type === 'cop'
      ? 'ahorros en pesos'
      : 'ahorros en dólares';

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">{title}</h3>
        <span className="font-mono text-[10px] text-[var(--muted)]">
          {showHapi ? 1 + filtered.length : filtered.length} fuentes
        </span>
      </div>

      <div className="divide-y divide-[var(--stroke)]">
        {/* Base Hapi Account in Investments */}
        {showHapi && (
          <div className="flex items-center gap-3.5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[var(--stroke)] bg-[var(--card-2)] text-[var(--text)]">
              <TrendingUp className="h-5 w-5 text-[var(--signal)]" />
            </div>
            <div className="min-w-0 flex-1">
              <strong className="block text-xs font-semibold text-[var(--text)]">Hapi · Apex Clearing</strong>
              <small className="block text-[10px] text-[var(--muted)] truncate">
                Extracto oficial de septiembre 2026 · 25 activos + efectivo interno
              </small>
            </div>
            <div className="text-right font-mono shrink-0 data-number">
              <div className="text-xs font-semibold text-[var(--text)]">
                {formatUSD(2308.53, isPrivacyMasked)}
              </div>
              <span className="block text-[9px] text-[var(--muted)]">30 sep 2026</span>
            </div>
          </div>
        )}

        {/* User Added Accounts */}
        {filtered.map((acc) => {
          const Icon = acc.type === 'cop' ? Wallet : acc.type === 'usd' ? DollarSign : TrendingUp;
          return (
            <div key={acc.id} className="group flex items-center gap-3.5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[var(--stroke)] bg-[var(--card-2)] text-[var(--text)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <strong className="block text-xs font-semibold text-[var(--text)]">{acc.name}</strong>
                <small className="block text-[10px] text-[var(--muted)] truncate">
                  Saldo manual · {acc.date}
                </small>
              </div>
              <div className="text-right font-mono shrink-0 data-number">
                <div className="text-xs font-semibold text-[var(--text)]">
                  {acc.currency === 'COP'
                    ? formatCOP(acc.amount, isPrivacyMasked)
                    : formatUSD(acc.amount, isPrivacyMasked)}
                </div>
                <span className="block text-[9px] text-[var(--muted)]">Declarado por ti</span>
              </div>
              <button
                onClick={() => deleteAccount(acc.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-[var(--negative)] transition-opacity"
                title="Eliminar cuenta"
                aria-label="Eliminar cuenta"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!showHapi && filtered.length === 0 && (
        <div className="my-6 rounded border border-dashed border-[#4c4842] p-8 text-center">
          <div className="font-serif text-2xl font-normal text-[var(--text)]">
            Aún no tienes {typeLabel} registrados
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Añade una cuenta o bolsillo para reflejar tu saldo y consolidarlo en el dashboard.
          </p>
          <button
            onClick={() => onOpenAddModal(type)}
            className="mt-4 inline-flex items-center gap-1.5 rounded border border-[var(--t)] bg-[var(--text)] px-4 py-2 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            Registrar cuenta
          </button>
        </div>
      )}
    </div>
  );
};
