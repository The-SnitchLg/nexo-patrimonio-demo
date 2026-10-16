import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';

export const FileDropzone: React.FC = () => {
  const { addDocument } = useFinance();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      addDocument({
        name: file.name,
        date: new Date().toLocaleDateString('es-CO'),
        details: `Archivo cargado (${(file.size / 1024).toFixed(0)} KB) · Verificación lista`,
        status: 'pending',
        statusLabel: 'Pendiente de procesar',
      });
    }
  };

  return (
    <div className="relative rounded-md border border-[var(--stroke)] bg-[var(--card)] p-5">
      <span className="absolute left-0 top-0 h-[1px] w-8 bg-[var(--signal)]" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-[var(--text)]">Cargar extracto o comprobante</h3>
        <span className="rounded border border-[#714531] bg-[#2c1d15] px-2 py-0.5 font-mono text-[9px] text-[var(--gold)]">
          PDF / CSV / Imágenes
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center rounded border border-dashed p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[var(--signal)] bg-[#ff7849]/5'
            : 'border-[#77736d] hover:border-[var(--signal)] hover:bg-[#ff7849]/5'
        }`}
      >
        <UploadCloud className="h-10 w-10 text-[var(--signal)] mb-3" />
        <strong className="text-xs font-semibold text-[var(--text)]">
          Arrastra un extracto aquí o haz clic para explorar
        </strong>
        <small className="mt-1 font-mono text-[10px] text-[var(--muted)]">
          Formatos soportados: PDF, CSV, XLSX, PNG o JPG · Procesamiento local y privado
        </small>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <p className="mt-4 text-[10px] leading-relaxed text-[var(--muted)]">
        Pipeline seguro: Extracción local → normalización → detección de duplicados → confirmación explícita → persistencia patrimonial. No se integran movimientos sin confirmación.
      </p>
    </div>
  );
};
