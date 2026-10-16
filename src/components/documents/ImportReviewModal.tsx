import React from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatUSD } from '@/domain/calculations';
import {
  StatementReconciliationEngine,
  type ExtractedStatementData,
} from '@/domain/reconciliation';

interface ImportReviewModalProps {
  isOpen: boolean;
  extractedData: ExtractedStatementData | null;
  onClose: () => void;
  onConfirmImport: () => void;
}

export const ImportReviewModal: React.FC<ImportReviewModalProps> = ({
  isOpen,
  extractedData,
  onClose,
  onConfirmImport,
}) => {
  const { holdings, isPrivacyMasked } = useFinance();

  if (!isOpen || !extractedData) return null;

  const comparison = StatementReconciliationEngine.compareStatements(holdings, extractedData);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl rounded-md border border-[#666058] bg-[var(--card)] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--stroke)] mb-4 shrink-0">
          <div>
            <h2 className="font-serif text-2xl font-normal text-[var(--text)]">Revisión de Extracto</h2>
            <span className="font-mono text-[10px] text-[var(--muted)]">
              {extractedData.provider} · Corte al {extractedData.asOfDate}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[var(--muted)] hover:bg-[var(--card-2)] hover:text-[var(--text)] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {comparison.isDuplicate ? (
            <div className="flex items-start gap-3 rounded border border-[#6d3c2a] bg-[#ff7849]/5 p-3.5 text-xs text-[var(--muted)]">
              <AlertTriangle className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--text)] mb-0.5">Extracto Idéntico Detectado</strong>
                Todas las 25 posiciones y el saldo de efectivo coinciden exactamente con los registros actuales. No se duplicará ningún valor.
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 rounded border border-[#425b49] bg-[#27372c] p-3.5 text-xs text-[var(--text)]">
              <CheckCircle2 className="h-4 w-4 text-[var(--positive)] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--positive)] mb-0.5">Nuevos Datos Listos para Conciliar</strong>
                Se actualizarán las posiciones y se registrará un nuevo corte documental oficial.
              </div>
            </div>
          )}

          {/* Totals Summary */}
          <div className="grid grid-cols-3 gap-2 rounded border border-[var(--stroke)] bg-[var(--card-2)] p-3 text-center">
            <div>
              <span className="font-mono text-[9px] uppercase text-[var(--muted)]">Valores</span>
              <div className="font-mono text-xs font-semibold text-[var(--text)] data-number">
                {formatUSD(extractedData.securitiesValue, isPrivacyMasked)}
              </div>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase text-[var(--signal)]">Efectivo Hapi</span>
              <div className="font-mono text-xs font-semibold text-[var(--signal)] data-number">
                {formatUSD(extractedData.cashValue, isPrivacyMasked)}
              </div>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase text-[var(--text)]">Saldo Total</span>
              <div className="font-mono text-xs font-bold text-[var(--text)] data-number">
                {formatUSD(extractedData.totalBalance, isPrivacyMasked)}
              </div>
            </div>
          </div>

          {/* Diffs Table */}
          <div className="border border-[var(--stroke)] rounded overflow-hidden">
            <div className="bg-[var(--card-2)] px-3 py-2 font-mono text-[10px] uppercase text-[var(--muted)] font-semibold border-b border-[var(--stroke)]">
              Comparación por Activo ({extractedData.holdings.length} posiciones)
            </div>
            <div className="max-h-48 overflow-y-auto divide-y divide-[var(--stroke)] font-mono text-xs">
              {comparison.diffs.map((d) => (
                <div key={d.symbol} className="flex items-center justify-between p-2.5 hover:bg-[var(--hover)]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text)]">{d.symbol}</span>
                    <span className="text-[10px] text-[var(--muted)] font-sans truncate max-w-[120px]">
                      {d.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[var(--muted)]">
                      {formatUSD(d.currentValueUSD, isPrivacyMasked)}
                    </span>
                    <ArrowRight className="h-3 w-3 text-[var(--muted)]" />
                    <span className="font-semibold text-[var(--text)]">
                      {formatUSD(d.newValueUSD, isPrivacyMasked)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[var(--muted)] leading-relaxed">
            {comparison.unreconciledDepositsNotice}
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-2 pt-4 border-t border-[var(--stroke)] shrink-0 mt-4">
          <button
            onClick={onClose}
            className="rounded border border-[var(--stroke)] px-4 py-2 font-mono text-xs text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmImport}
            className="rounded border border-[var(--text)] bg-[var(--text)] px-4 py-2 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all"
          >
            Confirmar y actualizar patrimonio
          </button>
        </div>
      </div>
    </div>
  );
};
