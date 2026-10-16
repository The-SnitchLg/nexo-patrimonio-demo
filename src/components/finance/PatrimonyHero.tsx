import React from 'react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD, formatCOP } from '@/domain/calculations';

interface PatrimonyHeroProps {
  onOpenFxModal: () => void;
}

export const PatrimonyHero: React.FC<PatrimonyHeroProps> = ({ onOpenFxModal }) => {
  const {
    displayCurrency,
    setDisplayCurrency,
    isPrivacyMasked,
    totals,
    accounts,
  } = useFinance();

  const isPartial = accounts.filter((a) => a.type === 'cop' || a.type === 'usd').length === 0;

  const displayValue =
    displayCurrency === 'USD'
      ? formatUSD(totals.grandTotalUSD, isPrivacyMasked)
      : formatCOP(totals.grandTotalCOP, isPrivacyMasked);

  return (
    <div className="relative overflow-hidden rounded-md border border-[#45423d] bg-gradient-to-r from-[#171615] via-[#101010] to-[#171410] p-6 sm:p-8 transition-all">
      {/* Background radial grid */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-12 h-80 w-96 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1.2px)',
          backgroundSize: '14px 14px',
          maskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />
      <span className="absolute bottom-4 right-6 font-mono text-[9px] tracking-widest text-[#817c75] hidden sm:block">
        PORTFOLIO / 001
      </span>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span>Patrimonio registrado</span>
            {isPartial && (
              <span className="rounded border border-[#64594c] px-1.5 py-0.5 font-mono text-[9px] text-[var(--signal)]">
                PARCIAL
              </span>
            )}
          </div>

          <div className="my-2 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text)] data-number">
            {displayValue}
          </div>

          <div className="text-[11px] text-[var(--muted)] max-w-lg leading-relaxed">
            Incluye únicamente fuentes documentadas · No es una cotización en vivo de mercado
          </div>
        </div>

        {/* Currency Switch and Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded border border-[#44413b] bg-[#171717] p-1">
            <button
              onClick={() => setDisplayCurrency('USD')}
              className={`rounded px-3 py-1.5 font-mono text-[10px] font-semibold transition-all ${
                displayCurrency === 'USD'
                  ? 'bg-[#f1eee8] text-[#111]'
                  : 'text-[#a19d95] hover:text-white'
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setDisplayCurrency('COP')}
              className={`rounded px-3 py-1.5 font-mono text-[10px] font-semibold transition-all ${
                displayCurrency === 'COP'
                  ? 'bg-[#f1eee8] text-[#111]'
                  : 'text-[#a19d95] hover:text-white'
              }`}
            >
              COP
            </button>
          </div>

          <button
            onClick={onOpenFxModal}
            className="rounded border border-[#55514b] bg-[#131313]/70 px-3 py-2 text-[11px] font-medium text-[var(--text)] hover:border-[var(--muted)] hover:bg-[var(--hover)] transition-all"
          >
            Editar tasa de cambio →
          </button>
        </div>
      </div>
    </div>
  );
};
