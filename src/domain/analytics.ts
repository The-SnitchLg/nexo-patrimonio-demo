import Decimal from 'decimal.js';
import type { Holding, AccountSource, PendingMovement } from '@/types/finance';

export interface WealthInsight {
  id: string;
  category: 'concentration' | 'unreconciled' | 'missing_data' | 'currency' | 'diversification';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'alert';
  metricValue?: string;
}

export const WealthAnalyticsEngine = {
  // 1. Análisis de concentración tecnológica
  calculateTechConcentration(holdings: Holding[], totalPortfolioUSD: number): { percentage: number; sumUSD: number } {
    const techSymbols = ['VGT', 'SMH', 'NVDA', 'AMZN', 'GOOGL', 'META', 'ORCL'];
    const techHoldings = holdings.filter((h) => techSymbols.includes(h.symbol));
    const sum = techHoldings.reduce((acc, h) => acc + h.marketValueUSD, 0);
    const pct = totalPortfolioUSD > 0 ? new Decimal(sum).dividedBy(new Decimal(totalPortfolioUSD)).times(100).toNumber() : 0;
    return {
      percentage: Number(pct.toFixed(1)),
      sumUSD: sum,
    };
  },

  // 2. Generación dinámica de insights auditables
  generateInsights(
    accounts: AccountSource[],
    holdings: Holding[],
    movements: PendingMovement[],
    fxRate: number,
    totalPortfolioUSD = 2308.53
  ): WealthInsight[] {
    const insights: WealthInsight[] = [];

    // Verificación de fuentes faltantes
    const hasCop = accounts.some((a) => a.type === 'cop');
    const hasUsd = accounts.some((a) => a.type === 'usd');

    if (!hasCop || !hasUsd) {
      insights.push({
        id: 'missing-accounts',
        category: 'missing_data',
        title: 'Fuentes pendientes de registro',
        description: `Faltan tus saldos en ${!hasCop && !hasUsd ? 'pesos colombianos y cuentas USD externas' : !hasCop ? 'pesos colombianos' : 'cuentas USD externas'}. El patrimonio mostrado refleja únicamente fuentes documentadas.`,
        severity: 'warning',
      });
    }

    // Concentración tecnológica en Hapi
    const tech = this.calculateTechConcentration(holdings, totalPortfolioUSD);
    if (tech.percentage > 25) {
      insights.push({
        id: 'tech-concentration',
        category: 'concentration',
        title: `Alta concentración tecnológica (${tech.percentage}%)`,
        description: `Los instrumentos tecnológicos y de semiconductores suman US$ ${tech.sumUSD.toFixed(2)}. Verifica el solapamiento entre fondos indexados como VGT y SMH.`,
        severity: 'info',
        metricValue: `${tech.percentage}%`,
      });
    }

    // Depósitos pendientes de conciliar
    const pendingMovements = movements.filter((m) => m.status === 'pending');
    if (pendingMovements.length > 0) {
      const pendingTotal = pendingMovements.reduce((acc, m) => acc + m.amountUSD, 0);
      insights.push({
        id: 'unreconciled-deposits',
        category: 'unreconciled',
        title: `US$ ${pendingTotal.toFixed(2)} pendientes por conciliar`,
        description: `Existen ${pendingMovements.length} depósitos registrados en capturas que no se han acreditado en el balance consolidado para evitar duplicaciones.`,
        severity: 'alert',
        metricValue: `US$ ${pendingTotal.toFixed(2)}`,
      });
    }

    // Sensibilidad TRM
    insights.push({
      id: 'currency-trm',
      category: 'currency',
      title: 'Conversión TRM configurable',
      description: `Tasa aplicada: $${new Intl.NumberFormat('es-CO').format(fxRate)} COP por 1 USD. Puedes modificarla en Preferencias para simular escenarios cambiarios.`,
      severity: 'info',
    });

    return insights;
  },
};
