import React from 'react';
import { FileText } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';

export const DocumentsList: React.FC = () => {
  const { documents } = useFinance();

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Registro documental</h3>
        <span className="font-mono text-[10px] text-[var(--muted)]">{documents.length} archivos</span>
      </div>

      <div className="divide-y divide-[var(--stroke)]">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between gap-4 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[var(--stroke)] bg-[var(--card-2)] text-[var(--text)]">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-semibold text-[var(--text)] truncate">{doc.name}</strong>
                <small className="block text-[10px] text-[var(--muted)] truncate">
                  {doc.details} · {doc.date}
                </small>
              </div>
            </div>

            <span
              className={`shrink-0 rounded px-2.5 py-1 font-mono text-[9px] font-medium border ${
                doc.status === 'processed'
                  ? 'border-[#425b49] bg-[#27372c] text-[var(--positive)]'
                  : 'border-[#63402f] bg-[#2a1d16] text-[var(--gold)]'
              }`}
            >
              {doc.statusLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
