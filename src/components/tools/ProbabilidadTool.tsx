import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface ResultadoProbabilidad {
  fraccion: string;
  decimal: number;
  porcentaje: number;
  complemento: number;
}

export default function ProbabilidadTool() {
  const [favorables, setFavorables] = useState('');
  const [totales, setTotales] = useState('');
  const [result, setResult] = useState<ResultadoProbabilidad | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      setResult(null);
      const f = parseFloat(favorables.replace(',', '.'));
      const t = parseFloat(totales.replace(',', '.'));

      if (isNaN(f) || isNaN(t)) throw new Error('Introduce valores numéricos válidos en ambos campos.');
      if (f < 0) throw new Error('Los casos favorables no pueden ser negativos.');
      if (t <= 0) throw new Error('Los casos totales deben ser mayores que cero.');
      if (f > t) throw new Error('Los casos favorables no pueden superar los casos totales.');

      const decimal = f / t;
      setResult({
        fraccion: `${formatNumber(f, 0)}/${formatNumber(t, 0)}`,
        decimal,
        porcentaje: decimal * 100,
        complemento: 1 - decimal,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Casos favorables (F)</label>
          <input
            type="number"
            value={favorables}
            onChange={(e) => { setFavorables(e.target.value); setResult(null); }}
            placeholder="ej. 3"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Casos totales (T)</label>
          <input
            type="number"
            value={totales}
            onChange={(e) => { setTotales(e.target.value); setResult(null); }}
            placeholder="ej. 6"
            min="1"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular probabilidad
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-4">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Probabilidad del evento</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Fracción</p>
                <p className="text-lg font-extrabold text-[var(--color-text)] font-mono">{result.fraccion}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Decimal</p>
                <p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.decimal, 4)}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Porcentaje</p>
                <p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.porcentaje, 2)} %</p>
              </div>
            </div>
          </div>
          <hr className="border-[var(--color-border)]" />
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Probabilidad del evento contrario</p>
            <p className="text-lg font-bold text-[var(--color-text)]">
              {formatNumber(result.complemento, 4)}{' '}
              <span className="text-sm text-[var(--color-text-secondary)]">({formatNumber(result.complemento * 100, 2)} %)</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
