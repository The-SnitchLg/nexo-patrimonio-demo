import React from 'react';
import { Download } from 'lucide-react';
import { FileDropzone } from '@/components/documents/FileDropzone';
import { DocumentsList } from '@/components/documents/DocumentsList';
import { useFinance } from '@/hooks/useFinance';

export const DocumentsView: React.FC = () => {
  const { accounts, documents, fxRate } = useFinance();

  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      base: {
        platform: 'Hapi / Apex Clearing',
        date: '2026-09-30',
        totalUSD: 2308.53,
        securitiesUSD: 2041.43,
        cashUSD: 267.1,
      },
      fxRate,
      accounts,
      documents,
      note: 'Copia de seguridad local - Nexo Patrimonio',
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexo-patrimonio-respaldo-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--signal)] mb-2">
            ✳ 04 / Evidencia y trazabilidad
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--text)]">
            Mis documentos
          </h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Trazabilidad, extractos bancarios, comprobantes y validación patrimonial.
          </p>
        </div>

        <button
          onClick={handleExportBackup}
          className="inline-flex items-center justify-center gap-1.5 rounded border border-[var(--stroke)] bg-[var(--card)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text)] hover:bg-[var(--hover)] hover:border-[var(--muted)] transition-all shrink-0"
        >
          <Download className="h-3.5 w-3.5" />
          Exportar copia JSON
        </button>
      </div>

      {/* Upload Dropzone */}
      <FileDropzone />

      {/* Documents Registry */}
      <DocumentsList />
    </div>
  );
};
