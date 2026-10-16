import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import type { AccountType } from '@/types/finance';

interface AddAccountModalProps {
  isOpen: boolean;
  initialType?: AccountType;
  onClose: () => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  initialType = 'investments',
  onClose,
}) => {
  const { addAccount } = useFinance();
  const [type, setType] = useState<AccountType>(initialType);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!name.trim() || isNaN(num) || num <= 0) return;

    addAccount({
      name: name.trim(),
      amount: num,
      type,
      currency: type === 'cop' ? 'COP' : 'USD',
      date: new Date().toLocaleDateString('es-CO'),
    });

    setName('');
    setAmount('');
    onClose();
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
      <div className="relative w-full max-w-md rounded-md border border-[#666058] bg-[var(--card)] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--stroke)] mb-4">
          <h2 className="font-serif text-2xl font-normal text-[var(--text)]">Agregar fuente financiera</h2>
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
              ¿Dónde quieres registrarlo?
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AccountType)}
              className="w-full rounded border border-[var(--stroke)] bg-[var(--card-2)] p-2.5 text-xs text-[var(--text)] focus:border-[var(--signal)] focus:outline-hidden"
            >
              <option value="investments">Inversiones</option>
              <option value="cop">Ahorros en COP</option>
              <option value="usd">Ahorros en USD</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Nombre de cuenta o plataforma
            </label>
            <input
              ref={nameInputRef}
              type="text"
              required
              maxLength={48}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej.: Bancolombia Ahorros / Littio / Broker"
              className="w-full rounded border border-[var(--stroke)] bg-[var(--card-2)] p-2.5 text-xs text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--signal)] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
              Saldo actual ({type === 'cop' ? 'en Pesos Colombianos' : 'en Dólares USD'})
            </label>
            <input
              type="number"
              step="any"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded border border-[var(--stroke)] bg-[var(--card-2)] p-2.5 font-mono text-xs text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--signal)] focus:outline-hidden data-number"
            />
          </div>

          <p className="text-[10px] leading-relaxed text-[var(--muted)]">
            El monto se registra como saldo declarado manualmente. No se confunde con rendimiento ni duplica el efectivo interno de otras plataformas.
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
              Guardar fuente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
