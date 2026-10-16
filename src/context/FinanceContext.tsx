import React, { useState, useEffect } from 'react';
import type { Currency, AccountSource, PendingMovement, DocumentRecord, Holding } from '@/types/finance';
import { INITIAL_HOLDINGS, calculateTotals } from '@/domain/calculations';
import { FinanceContext } from './finance-context-definition';

const STORAGE_KEY = 'nexo_patrimonio_state_v1';

const INITIAL_MOVEMENTS: PendingMovement[] = [
  { id: 'm1', date: '16 oct 2026 · 12:11', amountUSD: 45, origin: 'Captura adjunta', description: 'Depósito por conciliar', status: 'pending' },
  { id: 'm2', date: '14 oct 2026 · 08:41', amountUSD: 30, origin: 'Captura adjunta', description: 'Depósito por conciliar', status: 'pending' },
  { id: 'm3', date: '07 oct 2026 · 11:21', amountUSD: 225, origin: 'Captura adjunta', description: 'Depósito por conciliar', status: 'pending' },
];

const INITIAL_DOCS: DocumentRecord[] = [
  { id: 'd1', name: 'Extracto Hapi / Apex · septiembre 2026', date: '30 sep 2026', details: 'PDF original · 25 posiciones · corte 30 sep', status: 'processed', statusLabel: 'Procesado' },
  { id: 'd2', name: 'Captura de depósitos · octubre 2026', date: '16 oct 2026', details: '3 movimientos por US$ 300 · sin vinculación confirmada', status: 'pending', statusLabel: 'Por conciliar' },
];

function getInitialStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return null;
}

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = getInitialStorage();

  const [displayCurrency, setDisplayCurrency] = useState<Currency>(initial?.displayCurrency || 'USD');
  const [fxRate, setFxRateState] = useState<number>(initial?.fxRate || 4200);
  const [theme, setTheme] = useState<'dark' | 'light'>(initial?.theme || 'dark');
  const [isPrivacyMasked, setIsPrivacyMasked] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<AccountSource[]>(initial?.accounts || []);
  const [holdings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [movements, setMovements] = useState<PendingMovement[]>(INITIAL_MOVEMENTS);
  const [documents, setDocuments] = useState<DocumentRecord[]>(initial?.documents || INITIAL_DOCS);
  const [activeView, setActiveView] = useState<string>('dashboard');

  // Sync theme attribute with document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          displayCurrency,
          fxRate,
          theme,
          accounts,
          documents,
        })
      );
    } catch {
      // Ignorar cuota
    }
  }, [displayCurrency, fxRate, theme, accounts, documents]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const togglePrivacyMask = () => setIsPrivacyMasked((prev) => !prev);

  const setFxRate = (rate: number) => {
    if (rate > 0 && Number.isFinite(rate)) {
      setFxRateState(rate);
    }
  };

  const addAccount = (acc: Omit<AccountSource, 'id'>) => {
    const newAcc: AccountSource = {
      ...acc,
      id: 'acc_' + Date.now(),
    };
    setAccounts((prev) => [...prev, newAcc]);
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const reconcileMovement = (id: string) => {
    setMovements((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'reconciled' } : m))
    );
  };

  const addDocument = (doc: Omit<DocumentRecord, 'id'>) => {
    const newDoc: DocumentRecord = {
      ...doc,
      id: 'doc_' + Date.now(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const totals = calculateTotals(accounts, fxRate);

  return (
    <FinanceContext.Provider
      value={{
        displayCurrency,
        setDisplayCurrency,
        fxRate,
        setFxRate,
        theme,
        toggleTheme,
        isPrivacyMasked,
        togglePrivacyMask,
        accounts,
        addAccount,
        deleteAccount,
        holdings,
        movements,
        reconcileMovement,
        documents,
        addDocument,
        activeView,
        setActiveView,
        totals,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
