import React from 'react';
import { ArrowDownLeft } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';

interface PendingMovementsListProps {
  onViewDocuments: () => void;
}

export const PendingMovementsList: React.FC<PendingMovementsListProps> = ({ onViewDocuments }) => {
  const { movements, isPrivacyMasked } = useFinance();

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Movimientos para conciliar</h3>
        <span className="rounded border border-[#63402f] bg-[#2a1d16] px-2 py-0.5 font-mono text-[9px] font-medium text-[var(--gold)]">
          No sumados
        </span>
      </div>

      <div className="divide-y divide-[var(--stroke)]">
        {movements.map((m) => (
          <div key={m.id} className="flex items-center gap-3 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[var(--stroke)] bg-[#1b1a18] text-[var(--text)] font-mono text-sm">
              <ArrowDownLeft className="h-4 w-4 text-[var(--gold)]" />
            </div>

            <div className="min-w-0 flex-1">
              <strong className="block text-xs font-medium text-[var(--text)]">{m.description}</strong>
              <small className="block text-[10px] text-[var(--muted)] truncate">
                {m.date} · origen: {m.origin}
              </small>
            </div>

            <div className="font-mono text-xs font-semibold text-[var(--gold)] shrink-0 data-number">
              +{formatUSD(m.amountUSD, isPrivacyMasked)}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewDocuments}
        className="mt-3 w-full rounded border border-[var(--stroke)] bg-[var(--card)] py-2 text-center text-xs font-medium text-[var(--text)] hover:bg-[var(--hover)] hover:border-[var(--muted)] transition-all"
      >
        Ver documentos y movimientos →
      </button>
    </div>
  );
};
