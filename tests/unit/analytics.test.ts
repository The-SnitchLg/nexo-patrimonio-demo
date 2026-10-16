import { describe, it, expect } from 'vitest';
import { WealthAnalyticsEngine } from '@/domain/analytics';
import { INITIAL_HOLDINGS } from '@/domain/calculations';

describe('Motor de Analítica Patrimonial (WealthAnalyticsEngine)', () => {
  it('calcula la concentración tecnológica con precisión decimal', () => {
    const tech = WealthAnalyticsEngine.calculateTechConcentration(INITIAL_HOLDINGS, 2308.53);
    expect(tech.percentage).toBeGreaterThan(30);
    expect(tech.sumUSD).toBeGreaterThan(700);
  });

  it('genera advertencias de fuentes faltantes cuando no hay cuentas registradas', () => {
    const insights = WealthAnalyticsEngine.generateInsights([], INITIAL_HOLDINGS, [], 4200);
    const missing = insights.find((i) => i.id === 'missing-accounts');
    expect(missing).toBeDefined();
    expect(missing?.severity).toBe('warning');
  });

  it('genera alerta explícita para depósitos por conciliar', () => {
    const movements = [
      { id: '1', date: '16 oct', amountUSD: 45, origin: 'Captura', description: 'Depósito', status: 'pending' as const },
      { id: '2', date: '14 oct', amountUSD: 30, origin: 'Captura', description: 'Depósito', status: 'pending' as const },
      { id: '3', date: '07 oct', amountUSD: 225, origin: 'Captura', description: 'Depósito', status: 'pending' as const },
    ];
    const insights = WealthAnalyticsEngine.generateInsights([], INITIAL_HOLDINGS, movements, 4200);
    const depositAlert = insights.find((i) => i.id === 'unreconciled-deposits');
    expect(depositAlert).toBeDefined();
    expect(depositAlert?.metricValue).toBe('US$ 300.00');
  });
});
