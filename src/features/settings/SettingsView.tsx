import React, { useState } from 'react';
import { ShieldCheck, RotateCcw } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
import { formatCOP } from '@/domain/calculations';

export const SettingsView: React.FC = () => {
  const { fxRate, setFxRate } = useFinance();
  const [tempFx, setTempFx] = useState(fxRate.toString());
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveFx = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(tempFx);
    if (!isNaN(num) && num > 0) {
      setFxRate(num);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    }
  };

  const handleResetData = () => {
    if (confirm('¿Restablecer las cuentas y documentos ingresados a los valores iniciales de demostración?')) {
      localStorage.removeItem('nexo_patrimonio_state_v1');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Heading */}
      <div>
        <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--signal)] mb-2">
          ✳ 05 / Preferencias
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text)]">
          Configuración
        </h1>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Administración de conversión monetaria, privacidad de datos y seguridad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Currency Conversion Card */}
        <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
          <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-[var(--text)]">Conversión de moneda (TRM)</h3>
            <span className="rounded border border-[#63402f] bg-[#2a1d16] px-2 py-0.5 font-mono text-[9px] text-[var(--gold)]">
              Manual / Configurable
            </span>
          </div>

          <form onSubmit={handleSaveFx} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1.5">
                Pesos colombianos (COP) por 1 USD
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="any"
                  min="1"
                  value={tempFx}
                  onChange={(e) => setTempFx(e.target.value)}
                  className="w-full rounded border border-[var(--stroke)] bg-[var(--card-2)] p-2.5 font-mono text-xs text-[var(--text)] focus:border-[var(--signal)] focus:outline-hidden data-number"
                />
                <button
                  type="submit"
                  className="rounded border border-[var(--text)] bg-[var(--text)] px-4 py-2 font-mono text-xs font-semibold text-[var(--bg)] hover:bg-[var(--signal)] hover:border-[var(--signal)] hover:text-[#100a08] transition-all shrink-0"
                >
                  Guardar
                </button>
              </div>
            </div>

            {savedNotice && (
              <span className="inline-block text-[11px] text-[var(--positive)] font-mono">
                ✓ Tasa actualizada: {formatCOP(parseFloat(tempFx))}
              </span>
            )}

            <p className="text-[10px] leading-relaxed text-[var(--muted)]">
              Esta tasa se utiliza para calcular la equivalencia consolidada de tus activos en COP y USD.
            </p>
          </form>
        </div>

        {/* Security & User Session Card */}
        <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
          <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-[var(--text)]">Acceso y Privacidad</h3>
            <span className="rounded border border-[#425b49] bg-[#27372c] px-2 py-0.5 font-mono text-[9px] text-[var(--positive)]">
              Seguro
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded border border-[var(--stroke)] bg-[var(--card-2)] p-3">
              <ShieldCheck className="h-5 w-5 text-[var(--positive)] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs text-[var(--text)]">Usuario Propietario</strong>
                <span className="block font-mono text-[11px] text-[var(--muted)]">
                  larrygomezg@gmail.com
                </span>
                <span className="mt-1 block text-[10px] text-[var(--muted)]">
                  Segregación criptográfica mediante Supabase Auth y RLS.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetData}
                className="inline-flex items-center gap-1.5 rounded border border-[#6d3c2a] bg-[#ff7849]/5 px-3 py-2 font-mono text-xs text-[var(--negative)] hover:bg-[#ff7849]/15 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restablecer datos locales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Accounting Architecture */}
      <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
        <h3 className="text-xs font-semibold text-[var(--text)] mb-2">Modelo contable auditado</h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Proveedor → moneda original → saldos fechados → operaciones → posiciones → documento soporte → estado de conciliación. El portafolio Hapi se modela como una sola fuente patrimonial con activos y efectivo interno. Los depósitos posteriores de octubre se conservan como movimientos no conciliados fuera del balance activo.
        </p>
      </div>
    </div>
  );
};
