import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';

interface FxRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FxRateModal: React.FC<FxRateModalProps> = ({ isOpen, onClose }) => {
  const { fxRate, setFxRate } = useFinance();
  const [rate, setRate] = useState(fxRate.toString());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(rate);
    if (!isNaN(num) && num > 0) {
      setFxRate(num);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-md border border-[#666058] bg-[var(--card)] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--stroke)] mb-4">
          <h2 className="font-serif text-2xl font-normal text-[var(--text)]">Tasa de conversión TRM</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-[var(--muted)] hover:bg-[var(--card-2)] hover:text-[var(--text)] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Pesos colombianos (COP) por 1 USD
            </label>
            <input
              type="number"
              step="any"
              min="1"
              required
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded border border-[var(--stroke)] bg-[var(--card-2)] p-2.5 font-mono text-xs text-[var(--text)] focus:border-[var(--signal)] focus:outline-hidden data-number"
            />
          </div>

          <p className="text-[10px] leading-relaxed text-[var(--muted)]">
            Esta tasa permite consolidar tus ahorros en pesos al valor equivalente en dólares. En producción se integrará con el histórico oficial de la Superintendencia Financiera.
          </p>

          <div className="flex justify-end gap-2 pt-3 border-t border-[var(--stroke)]">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-[var(--stroke)] px-4 py-2 font-mono text-xs text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded border border-[var(--text)] bg-[var(--text)] px-4 py-2 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all"
            >
              Guardar tasa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
