import React from 'react';
import { Plus } from 'lucide-react';
import { PatrimonyHero } from '@/components/finance/PatrimonyHero';
import { MetricStrip } from '@/components/finance/MetricStrip';
import { SnapshotEvolution } from '@/components/charts/SnapshotEvolution';
import { AllocationDonut } from '@/components/charts/AllocationDonut';
import { PendingMovementsList } from '@/components/finance/PendingMovementsList';
import { InsightsList } from '@/components/finance/InsightsList';
import { useFinance } from '@/hooks/useFinance';

interface DashboardViewProps {
  onOpenAddModal: () => void;
  onOpenFxModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenAddModal,
  onOpenFxModal,
}) => {
  const { setActiveView } = useFinance();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--signal)] mb-2">
            ✳ Tu tranquilidad, en números
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text)]">
            Tu panorama financiero
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Tus inversiones y ahorros, organizados en un solo lugar.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 rounded border border-[var(--text)] bg-[var(--text)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar dinero
        </button>
      </div>

      {/* Patrimony Hero */}
      <PatrimonyHero onOpenFxModal={onOpenFxModal} />

      {/* Metric Strip (3 Columns) */}
      <MetricStrip />

      {/* Visual Analytics Pair */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SnapshotEvolution />
        <AllocationDonut />
      </div>

      {/* Bottom Grid: Movements to reconcile & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PendingMovementsList onViewDocuments={() => setActiveView('documents')} />
        <InsightsList />
      </div>
    </div>
  );
};
