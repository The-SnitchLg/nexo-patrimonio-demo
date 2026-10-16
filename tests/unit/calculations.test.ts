import { describe, it, expect } from 'vitest';
import {
  calculateTotals,
  formatUSD,
  formatCOP,
  HAPI_TOTAL_USD,
  HAPI_SECURITIES_USD,
  HAPI_INTERNAL_CASH_USD,
  INITIAL_HOLDINGS,
} from '@/domain/calculations';
import type { AccountSource } from '@/types/finance';

describe('Cálculos Financieros de Nexo Patrimonio', () => {
  it('garantiza la integridad aritmética del portafolio Hapi al 30/09/2026', () => {
    // Verificación de control: 2041.43 + 267.10 === 2308.53 exactamente
    const calculatedSum = HAPI_SECURITIES_USD.plus(HAPI_INTERNAL_CASH_USD);
    expect(calculatedSum.equals(HAPI_TOTAL_USD)).toBe(true);
    expect(HAPI_TOTAL_USD.toNumber()).toBe(2308.53);
  });

  it('verifica que existen exactamente 25 posiciones documentadas', () => {
    expect(INITIAL_HOLDINGS).toHaveLength(25);
  });

  it('calcula los totales iniciales sin duplicar efectivo en ahorros USD', () => {
    const emptyAccounts: AccountSource[] = [];
    const totals = calculateTotals(emptyAccounts, 4200);

    expect(totals.investTotalUSD.toNumber()).toBe(2308.53);
    expect(totals.copTotalCOP.toNumber()).toBe(0);
    expect(totals.usdSavingsTotalUSD.toNumber()).toBe(0);
    expect(totals.grandTotalUSD.toNumber()).toBe(2308.53);
  });

  it('integra ahorros en COP y USD de forma independiente con conversión TRM', () => {
    const accounts: AccountSource[] = [
      { id: '1', name: 'Cuenta Ahorros Bancolombia', type: 'cop', currency: 'COP', amount: 4200000, date: '16/10/2026' },
      { id: '2', name: 'Bolsillo Dólares Digitales', type: 'usd', currency: 'USD', amount: 500, date: '16/10/2026' },
    ];
    const totals = calculateTotals(accounts, 4200);

    // 4,200,000 COP / 4200 = 1,000 USD
    expect(totals.copInUSD.toNumber()).toBe(1000);
    expect(totals.usdSavingsTotalUSD.toNumber()).toBe(500);
    // Grand Total USD = 2308.53 + 500 + 1000 = 3808.53
    expect(totals.grandTotalUSD.toNumber()).toBe(3808.53);
  });

  it('formatea monedas correctamente para el estándar es-CO y respeta máscara de privacidad', () => {
    expect(formatUSD(2308.53)).toContain('2.308,53');
    expect(formatCOP(4200000)).toContain('4.200.000');
    expect(formatUSD(2308.53, true)).toBe('US$ ••••••');
    expect(formatCOP(4200000, true)).toBe('$ •••••• COP');
  });
});
