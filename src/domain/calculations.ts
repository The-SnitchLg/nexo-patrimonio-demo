import Decimal from 'decimal.js';
import type { Currency, AccountSource, Holding } from '@/types/finance';

// Base Hapi data documentada al 30/09/2026
export const HAPI_SECURITIES_USD = new Decimal('2041.43');
export const HAPI_INTERNAL_CASH_USD = new Decimal('267.10');
export const HAPI_TOTAL_USD = new Decimal('2308.53'); // 2041.43 + 267.10

export const INITIAL_HOLDINGS: Holding[] = [
  { symbol: 'AMZN', name: 'Amazon', quantity: 0.55691, marketValueUSD: 138.75 },
  { symbol: 'GOOGL', name: 'Alphabet', quantity: 0.16469, marketValueUSD: 56.67 },
  { symbol: 'CVSA', name: 'Covista', quantity: 0.46946, marketValueUSD: 57.37 },
  { symbol: 'CIFR', name: 'Cipher Digital', quantity: 1.55714, marketValueUSD: 24.64 },
  { symbol: 'META', name: 'Meta Platforms', quantity: 0.16505, marketValueUSD: 119.69 },
  { symbol: 'IVV', name: 'iShares Core S&P 500 ETF', quantity: 0.26172, marketValueUSD: 200.44 },
  { symbol: 'IEMG', name: 'iShares Core Emerging Markets ETF', quantity: 1.30326, marketValueUSD: 105.77 },
  { symbol: 'IAU', name: 'iShares Gold Trust', quantity: 0.40173, marketValueUSD: 31.38 },
  { symbol: 'IREN', name: 'IREN', quantity: 0.58493, marketValueUSD: 23.91 },
  { symbol: 'LPTH', name: 'LightPath Technologies', quantity: 1.16776, marketValueUSD: 12.04 },
  { symbol: 'MSTR', name: 'Strategy', quantity: 0.19311, marketValueUSD: 29.56 },
  { symbol: 'NVDA', name: 'Nvidia', quantity: 0.85018, marketValueUSD: 194.16 },
  { symbol: 'NU', name: 'Nu Holdings', quantity: 10.65879, marketValueUSD: 134.94 },
  { symbol: 'ORCL', name: 'Oracle', quantity: 0.19572, marketValueUSD: 26.87 },
  { symbol: 'RBLX', name: 'Roblox', quantity: 0.34826, marketValueUSD: 14.76 },
  { symbol: 'RKLB', name: 'Rocket Lab', quantity: 0.34835, marketValueUSD: 24.27 },
  { symbol: 'SSYS', name: 'Stratasys', quantity: 1.34168, marketValueUSD: 11.15 },
  { symbol: 'TTWO', name: 'Take-Two Interactive', quantity: 0.11318, marketValueUSD: 23.48 },
  { symbol: 'VGT', name: 'Vanguard Information Technology ETF', quantity: 2.68696, marketValueUSD: 337.67 },
  { symbol: 'V', name: 'Visa', quantity: 0.11026, marketValueUSD: 39.62 },
  { symbol: 'SMH', name: 'VanEck Semiconductor ETF', quantity: 0.52087, marketValueUSD: 317.21 },
  { symbol: 'NBIS', name: 'Nebius', quantity: 0.26601, marketValueUSD: 62.75 },
  { symbol: 'ZETA', name: 'Zeta Global', quantity: 1.15925, marketValueUSD: 36.60 },
  { symbol: 'EOSE', name: 'Eos Energy', quantity: 1.0, marketValueUSD: 3.07 },
  { symbol: 'ONDS', name: 'Ondas', quantity: 2.0, marketValueUSD: 14.66 },
];

export function formatUSD(amount: number | Decimal, masked = false): string {
  if (masked) return 'US$ ••••••';
  const val = amount instanceof Decimal ? amount.toNumber() : amount;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val).replace('US$', 'US$ ');
}

export function formatCOP(amount: number | Decimal, masked = false): string {
  if (masked) return '$ •••••• COP';
  const val = amount instanceof Decimal ? amount.toNumber() : amount;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatMoney(amount: number | Decimal, currency: Currency, masked = false): string {
  return currency === 'USD' ? formatUSD(amount, masked) : formatCOP(amount, masked);
}

export function calculateTotals(accounts: AccountSource[], fxRate: number) {
  const fx = new Decimal(fxRate > 0 ? fxRate : 4200);

  // Inversiones: base Hapi + cuentas adicionales de inversión
  let investTotal = new Decimal(HAPI_TOTAL_USD);
  for (const acc of accounts) {
    if (acc.type === 'investments') {
      investTotal = investTotal.plus(new Decimal(acc.amount));
    }
  }

  // Ahorros COP
  let copTotal = new Decimal(0);
  for (const acc of accounts) {
    if (acc.type === 'cop') {
      copTotal = copTotal.plus(new Decimal(acc.amount));
    }
  }

  // Ahorros USD independientes (sin duplicar efectivo interno de Hapi)
  let usdTotal = new Decimal(0);
  for (const acc of accounts) {
    if (acc.type === 'usd') {
      usdTotal = usdTotal.plus(new Decimal(acc.amount));
    }
  }

  // Consolidado total en USD: Inversiones + USD independiente + (COP / FX)
  const copInUSD = copTotal.dividedBy(fx);
  const grandTotalUSD = investTotal.plus(usdTotal).plus(copInUSD);
  const grandTotalCOP = grandTotalUSD.times(fx);

  return {
    investTotalUSD: investTotal,
    copTotalCOP: copTotal,
    copInUSD,
    usdSavingsTotalUSD: usdTotal,
    grandTotalUSD,
    grandTotalCOP,
  };
}
