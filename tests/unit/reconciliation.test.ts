import { describe, it, expect } from 'vitest';
import { StatementReconciliationEngine } from '@/domain/reconciliation';
import { INITIAL_HOLDINGS } from '@/domain/calculations';

describe('Motor de Conciliación Documental (ReconciliationEngine)', () => {
  it('detecta correctamente la suma de control aritmética exacta', () => {
    // 2041.43 + 267.10 === 2308.53
    const isValid = StatementReconciliationEngine.verifyArithmeticIntegrity(2041.43, 267.10, 2308.53);
    expect(isValid).toBe(true);

    const isInvalid = StatementReconciliationEngine.verifyArithmeticIntegrity(2041.43, 267.10, 2308.54);
    expect(isInvalid).toBe(false);
  });

  it('detecta un corte idéntico o duplicado sin sobreescribir datos arbitrariamente', () => {
    const extracted = StatementReconciliationEngine.parseHapiStatement('', 'Hapi_Sep2026.pdf');
    const comparison = StatementReconciliationEngine.compareStatements(INITIAL_HOLDINGS, extracted);

    expect(comparison.isDuplicate).toBe(true);
    expect(comparison.totalDifferenceUSD).toBe(0);
    expect(comparison.diffs).toHaveLength(25);
  });

  it('detecta adiciones y actualizaciones en posiciones cuando cambia el valor', () => {
    const customHoldings = INITIAL_HOLDINGS.slice(0, 20); // Cartera previa con solo 20
    const extracted = StatementReconciliationEngine.parseHapiStatement('', 'Hapi_Sep2026.pdf'); // Trae 25
    const comparison = StatementReconciliationEngine.compareStatements(customHoldings, extracted);

    expect(comparison.isDuplicate).toBe(false);
    const additions = comparison.diffs.filter((d) => d.type === 'addition');
    expect(additions).toHaveLength(5);
  });
});
