import { useState } from 'react';
import { formatNumber, formatPercent } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function RendimientoReaccionTool() {
  const [real, setReal] = useState('');
  const [teorico, setTeorico] = useState('');
  const [result, setResult] = useState<{ pct: number; perdido: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const r = parseFloat(real), t = parseFloat(teorico);
      if (isNaN(r) || isNaN(t)) throw new Error('Introduce el rendimiento real y el teórico.');
      if (r < 0 || t <= 0) throw new Error('El rendimiento teórico debe ser mayor que cero.');
      if (r > t) throw new Error('El rendimiento real no puede superar al teórico. Revisa los datos.');
      setResult({ pct: (r / t) * 100, perdido: t - r });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Rendimiento % = (rendimiento real / rendimiento teórico) × 100. Usa las mismas unidades (g o mol).</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Rendimiento real</label>
          <input type="number" value={real} onChange={(e) => { setReal(e.target.value); setResult(null); }} placeholder="Ej. 8.2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Rendimiento teórico</label>
          <input type="number" value={teorico} onChange={(e) => { setTeorico(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular rendimiento</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Rendimiento de la reacción</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatPercent(result.pct)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Producto no obtenido (pérdida): {formatNumber(result.perdido, 3)}</p>
        </div>
      )}
    </div>
  );
}
