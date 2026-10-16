import { useState } from 'react';
import { FinanceProvider } from '@/context/FinanceContext';
import { useFinance } from '@/hooks/useFinance';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardView } from '@/features/dashboard/DashboardView';
import { InvestmentsView } from '@/features/investments/InvestmentsView';
import { SavingsCopView } from '@/features/savings-cop/SavingsCopView';
import { SavingsUsdView } from '@/features/savings-usd/SavingsUsdView';
import { DocumentsView } from '@/features/documents/DocumentsView';
import { SettingsView } from '@/features/settings/SettingsView';
import { AddAccountModal } from '@/components/modals/AddAccountModal';
import { FxRateModal } from '@/components/modals/FxRateModal';
import type { AccountType } from '@/types/finance';

function MainRouter() {
  const { activeView } = useFinance();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<AccountType>('investments');
  const [isFxModalOpen, setIsFxModalOpen] = useState(false);

  const handleOpenAddModal = (type: AccountType = 'investments') => {
    setModalType(type);
    setIsAddModalOpen(true);
  };

  return (
    <AppShell onOpenAddModal={handleOpenAddModal}>
      {activeView === 'dashboard' && (
        <DashboardView
          onOpenAddModal={() => handleOpenAddModal('investments')}
          onOpenFxModal={() => setIsFxModalOpen(true)}
        />
      )}
      {activeView === 'investments' && (
        <InvestmentsView onOpenAddModal={() => handleOpenAddModal('investments')} />
      )}
      {activeView === 'cop' && (
        <SavingsCopView onOpenAddModal={() => handleOpenAddModal('cop')} />
      )}
      {activeView === 'usd' && (
        <SavingsUsdView onOpenAddModal={() => handleOpenAddModal('usd')} />
      )}
      {activeView === 'documents' && <DocumentsView />}
      {activeView === 'settings' && <SettingsView />}

      {/* Modals */}
      <AddAccountModal
        isOpen={isAddModalOpen}
        initialType={modalType}
        onClose={() => setIsAddModalOpen(false)}
      />

      <FxRateModal
        isOpen={isFxModalOpen}
        onClose={() => setIsFxModalOpen(false)}
      />
    </AppShell>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <MainRouter />
    </FinanceProvider>
  );
}
