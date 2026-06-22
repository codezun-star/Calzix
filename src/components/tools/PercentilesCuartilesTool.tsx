import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 1) return sorted[0];
  const rank = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(rank);
  const hi = Math.ceil(rank);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (rank - lo) * (sorted[hi] - sorted[lo]);
}

export default function PercentilesCuartilesTool() {
  const [data, setData] = useState('');
  const [p, setP] = useState('90');
  const [result, setResult] = useState<{ q1: number; q2: number; q3: number; iqr: number; pv: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const nums = data.split(/[,\s]+/).filter(Boolean).map(Number);
      if (nums.length < 2 || nums.some((x) => isNaN(x))) throw new Error('Introduce al menos dos números separados por comas.');
      const pp = parseFloat(p);
      if (isNaN(pp) || pp < 0 || pp > 100) throw new Error('El percentil debe estar entre 0 y 100.');
      const sorted = [...nums].sort((a, b) => a - b);
      const q1 = percentile(sorted, 25);
      const q3 = percentile(sorted, 75);
      setResult({ q1, q2: percentile(sorted, 50), q3, iqr: q3 - q1, pv: percentile(sorted, pp) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Datos (separados por comas)</label>
        <input value={data} onChange={(e) => { setData(e.target.value); setResult(null); }} placeholder="Ej. 12, 15, 18, 22, 25, 30, 35" className={INPUT} />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Percentil a calcular (0-100)</label>
        <input type="number" min="0" max="100" value={p} onChange={(e) => { setP(e.target.value); setResult(null); }} placeholder="90" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Q1 (25%)</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.q1, 2)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Q2 (mediana)</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.q2, 2)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Q3 (75%)</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.q3, 2)}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-calcs-border)] pt-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Rango intercuartílico (IQR)</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.iqr, 2)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Percentil {p}</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.pv, 2)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
