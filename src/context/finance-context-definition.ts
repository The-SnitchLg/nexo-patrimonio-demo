import { createContext } from 'react';
import type { Currency, AccountSource, PendingMovement, DocumentRecord, Holding } from '@/types/finance';
import { calculateTotals } from '@/domain/calculations';

export interface FinanceContextType {
  displayCurrency: Currency;
  setDisplayCurrency: (c: Currency) => void;
  fxRate: number;
  setFxRate: (rate: number) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isPrivacyMasked: boolean;
  togglePrivacyMask: () => void;
  accounts: AccountSource[];
  addAccount: (acc: Omit<AccountSource, 'id'>) => void;
  deleteAccount: (id: string) => void;
  holdings: Holding[];
  movements: PendingMovement[];
  reconcileMovement: (id: string) => void;
  documents: DocumentRecord[];
  addDocument: (doc: Omit<DocumentRecord, 'id'>) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  totals: ReturnType<typeof calculateTotals>;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);
