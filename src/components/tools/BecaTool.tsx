import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatNumber } from '@/lib/utils/format';

interface UmbralResult {
  label: string;
  umbral: number;
  cumple: boolean;
  falta: number;
}

export default function BecaTool() {
  const [nota, setNota] = useState('');
  const [resultado, setResultado] = useState<UmbralResult[] | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    const n = parseFloat(nota.replace(',', '.'));
    if (isNaN(n) || n < 0 || n > 10) {
      setError('Introduce una nota válida entre 0 y 10.');
      setResultado(null);
      return;
    }

    const umbrales: Array<{ label: string; umbral: number }> = [
      { label: 'Beca general', umbral: 5.0 },
      { label: 'Cuantía fija ligada al rendimiento', umbral: 6.5 },
      { label: 'Beca de excelencia', umbral: 8.0 },
    ];

    setResultado(
      umbrales.map(({ label, umbral }) => ({
        label,
        umbral,
        cumple: n >= umbral,
        falta: Math.max(0, umbral - n),
      }))
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Nota media del expediente (0–10)
        </label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.01"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Ej. 7.25"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          onKeyDown={(e) => e.key === 'Enter' && calcular()}
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Comprobar umbrales
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado && (
        <div className="space-y-3">
          {resultado.map((r) => (
            <div
              key={r.label}
              className="rounded-xl bg-[var(--color-calcs-bg)] p-4 flex items-start gap-3"
            >
              {r.cumple ? (
                <CheckCircle className="mt-0.5 shrink-0 text-green-600" size={18} />
              ) : (
                <XCircle className="mt-0.5 shrink-0 text-red-500" size={18} />
              )}
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {r.label}{' '}
                  <span className="font-normal text-[var(--color-text-secondary)]">
                    (umbral: {formatNumber(r.umbral, 2)})
                  </span>
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                  {r.cumple
                    ? 'Cumple el umbral de nota'
                    : `No cumple (necesitas ${formatNumber(r.falta, 2)} puntos más)`}
                </p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-[var(--color-border)] p-4 flex items-start gap-2">
            <AlertCircle className="mt-0.5 shrink-0 text-[var(--color-text-muted)]" size={16} />
            <p className="text-xs text-[var(--color-text-secondary)]">
              Criterio de nota. Para la beca también aplican criterios económicos y de matriculación.
              Consulta la convocatoria oficial del Ministerio de Educación antes de presentarte.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
