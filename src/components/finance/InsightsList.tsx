import React from 'react';
import { AlertCircle, Target, ArrowDownRight, Layers } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { WealthAnalyticsEngine } from '@/domain/analytics';

export const InsightsList: React.FC = () => {
  const { fxRate, accounts, holdings, movements } = useFinance();

  const insights = WealthAnalyticsEngine.generateInsights(accounts, holdings, movements, fxRate);

  const getIcon = (category: string) => {
    switch (category) {
      case 'missing_data':
        return <AlertCircle className="h-3.5 w-3.5 text-[var(--signal)]" />;
      case 'concentration':
        return <Target className="h-3.5 w-3.5 text-[var(--signal)]" />;
      case 'unreconciled':
        return <ArrowDownRight className="h-3.5 w-3.5 text-[var(--signal)]" />;
      default:
        return <Layers className="h-3.5 w-3.5 text-[var(--signal)]" />;
    }
  };

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Insights patrimoniales</h3>
        <span className="rounded border border-[var(--stroke)] bg-[#252421] px-2 py-0.5 font-mono text-[9px] text-[var(--text)]">
          Auditables
        </span>
      </div>

      <div className="divide-y divide-[var(--stroke)]">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-3 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#4c4339] bg-[#262320]">
              {getIcon(insight.category)}
            </div>
            <div className="space-y-0.5">
              <strong className="block text-xs font-medium text-[var(--text)]">
                {insight.title}
              </strong>
              <p className="text-xs leading-relaxed text-[var(--muted)]">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
