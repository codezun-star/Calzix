import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConcentracionPpmTool() {
  const [soluto, setSoluto] = useState('');
  const [disolucion, setDisolucion] = useState('');
  const [result, setResult] = useState<{ ppm: number; pct: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(soluto), d = parseFloat(disolucion);
      if (isNaN(s) || isNaN(d)) throw new Error('Introduce la masa de soluto y la masa total de la disolución.');
      if (d <= 0) throw new Error('La masa de la disolución debe ser mayor que cero.');
      if (s > d) throw new Error('El soluto no puede pesar más que la disolución completa.');
      setResult({ ppm: (s / d) * 1e6, pct: (s / d) * 100 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">ppm = (masa de soluto / masa de disolución) × 1 000 000. Usa la misma unidad de masa en ambos.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa de soluto (mg)</label>
          <input type="number" value={soluto} onChange={(e) => { setSoluto(e.target.value); setResult(null); }} placeholder="Ej. 5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa de disolución (mg)</label>
          <input type="number" value={disolucion} onChange={(e) => { setDisolucion(e.target.value); setResult(null); }} placeholder="Ej. 1000000" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ppm</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Concentración</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.ppm, 2)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">ppm</span></p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale al {formatNumber(result.pct, 6)} % en masa. En agua, 1 ppm ≈ 1 mg/L.</p>
        </div>
      )}
    </div>
  );
}
