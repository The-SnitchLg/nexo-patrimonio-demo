// NEXO PATRIMONIO - Tipos del Dominio Financiero

export type Currency = 'USD' | 'COP';

export type AccountType = 'investments' | 'cop' | 'usd';

export type MovementStatus = 'pending' | 'reconciled' | 'excluded';

export type DocumentStatus = 'processed' | 'pending' | 'rejected';

export interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  marketValueUSD: number;
}

export interface AccountSource {
  id: string;
  name: string;
  type: AccountType;
  currency: Currency;
  amount: number;
  date: string;
  institution?: string;
  isBase?: boolean;
}

export interface PendingMovement {
  id: string;
  date: string;
  amountUSD: number;
  origin: string;
  description: string;
  status: MovementStatus;
}

export interface DocumentRecord {
  id: string;
  name: string;
  date: string;
  details: string;
  status: DocumentStatus;
  statusLabel: string;
}

export interface HistoricalSnapshot {
  date: string;
  label: string;
  balanceUSD: number;
  securitiesUSD: number;
  cashUSD: number;
}

export interface FinanceState {
  displayCurrency: Currency;
  fxRate: number; // COP por 1 USD
  theme: 'dark' | 'light';
  isPrivacyMasked: boolean;
  accounts: AccountSource[];
  holdings: Holding[];
  movements: PendingMovement[];
  documents: DocumentRecord[];
  snapshots: HistoricalSnapshot[];
}
