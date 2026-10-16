import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  DollarSign,
  FileText,
  Settings,
  Sun,
  Moon,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';

interface AppShellProps {
  children: React.ReactNode;
  onOpenAddModal: (type?: 'investments' | 'cop' | 'usd') => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Vista general', icon: LayoutDashboard },
  { id: 'investments', label: 'Inversiones', icon: TrendingUp },
  { id: 'cop', label: 'Ahorros en COP', icon: Wallet },
  { id: 'usd', label: 'Ahorros en USD', icon: DollarSign },
  { id: 'documents', label: 'Mis documentos', icon: FileText },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    activeView,
    setActiveView,
    theme,
    toggleTheme,
    isPrivacyMasked,
    togglePrivacyMask,
  } = useFinance();

  const activeTitle = NAV_ITEMS.find((n) => n.id === activeView)?.label || 'Vista general';

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      {/* Sidebar Desktop (≥951px) y Tablet (651-950px) */}
      <aside className="sticky top-0 h-screen w-[75px] lg:w-[247px] shrink-0 border-r border-[var(--stroke)] bg-[var(--shell)] px-3 py-6 lg:p-6 flex flex-col gap-8 z-30 transition-all duration-200 hidden sm:flex">
        {/* Brand */}
        <div className="flex items-center gap-3 pb-5 border-b border-[var(--stroke)]">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#54524d] bg-[#111] font-serif text-2xl font-normal text-white">
            N
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full border-2 border-[var(--shell)] bg-[var(--signal)]" />
          </div>
          <div className="hidden lg:block leading-tight">
            <strong className="block text-xl font-bold tracking-tight">
              nexo<span className="text-[var(--signal)]">.</span>
            </strong>
            <span className="block font-mono text-[9px] tracking-wider text-[var(--muted)]">
              PATRIMONIO PERSONAL
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <div className="hidden lg:block mb-3 px-3 font-mono text-[9px] font-medium tracking-widest text-[#77736c] uppercase">
            Mi Espacio
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  aria-label={item.label}
                  className={`group relative flex w-full items-center gap-3 rounded p-3 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#242321] text-[var(--text)] border border-[#46433f]'
                      : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-[20%] h-[60%] w-0.5 bg-[var(--signal)]" />
                  )}
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-[var(--signal)]' : 'text-[var(--muted)] group-hover:text-[var(--text)]'
                    }`}
                  />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* System box */}
        <div className="hidden lg:block relative rounded border border-[var(--stroke)] p-4 pt-5">
          <span className="absolute -top-2 left-3 bg-[var(--shell)] px-1.5 font-mono text-[8px] tracking-widest text-[var(--muted)]">
            SISTEMA / PRIVADO
          </span>
          <h4 className="text-xs font-semibold">Espacio Seguro</h4>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
            Aislamiento total RLS. Cifrado y protegido bajo tu usuario.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-14 pb-28 sm:pb-16 max-w-[1700px] mx-auto">
        {/* Topline Técnica (31px) */}
        <div className="flex h-8 items-center justify-between border-b border-[var(--stroke)] font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--signal)]">✳</span>
            <span>NEXO / PATRIMONIO PERSONAL</span>
          </div>
          <span className="text-[#77716c]">TU ESPACIO DE CONTROL · 01</span>
        </div>

        {/* Toolbar (67px) */}
        <header className="flex h-16 items-center justify-between border-b border-[var(--stroke)] mb-8">
          <div className="text-xs text-[var(--muted)]">
            Patrimonio personal <span className="px-2 text-[var(--stroke)]">/</span>
            <strong className="font-semibold text-[var(--text)]">{activeTitle}</strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-sm border border-[var(--stroke)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] shadow-[0_0_0_2px_rgba(255,120,73,0.2)]" />
              Sesión Activa
            </span>

            {/* Privacy Mask Toggle */}
            <button
              onClick={togglePrivacyMask}
              className="flex h-8 w-8 items-center justify-center rounded border border-[var(--stroke)] text-[var(--muted)] hover:border-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors"
              title={isPrivacyMasked ? 'Mostrar importes' : 'Ocultar importes sensibles'}
              aria-label="Alternar privacidad"
            >
              {isPrivacyMasked ? <EyeOff className="h-4 w-4 text-[var(--signal)]" /> : <Eye className="h-4 w-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded border border-[var(--stroke)] text-[var(--muted)] hover:border-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Quick Settings */}
            <button
              onClick={() => setActiveView('settings')}
              className="flex h-8 w-8 items-center justify-center rounded border border-[var(--stroke)] text-[var(--muted)] hover:border-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--text)] transition-colors"
              title="Configuración"
              aria-label="Ir a configuración"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* View Content */}
        {children}

        {/* Footer */}
        <footer className="mt-16 border-t border-[var(--stroke)] pt-5 font-mono text-[9px] uppercase tracking-wider text-[#79756e]">
          NEXO PATRIMONIO · EDICIÓN 2026 · REGISTROS HISTÓRICOS Y TRAZABILIDAD DOCUMENTAL
        </footer>
      </main>

      {/* Mobile Bottom Navigation (≤650px) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden items-center justify-around border-t border-[var(--stroke)] bg-[#101010]/95 backdrop-blur-md px-2 py-2 safe-area-pb">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-1 p-1 font-mono text-[9px] ${
                isActive ? 'text-[var(--signal)]' : 'text-[var(--muted)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
