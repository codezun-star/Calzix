import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DistanciaDosPuntosTool() {
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [result, setResult] = useState<{ dist: number; mx: number; my: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const ax = parseFloat(x1), ay = parseFloat(y1), bx = parseFloat(x2), by = parseFloat(y2);
      if ([ax, ay, bx, by].some((v) => isNaN(v))) throw new Error('Introduce las coordenadas de los dos puntos.');
      setResult({ dist: Math.hypot(bx - ax, by - ay), mx: (ax + bx) / 2, my: (ay + by) / 2 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[var(--color-text-secondary)]">Punto A (x₁, y₁)</p>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={x1} onChange={(e) => { setX1(e.target.value); setResult(null); }} placeholder="x₁ ej. 1" className={INPUT} aria-label="x1" />
          <input type="number" value={y1} onChange={(e) => { setY1(e.target.value); setResult(null); }} placeholder="y₁ ej. 2" className={INPUT} aria-label="y1" />
        </div>
        <p className="text-xs font-semibold text-[var(--color-text-secondary)]">Punto B (x₂, y₂)</p>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={x2} onChange={(e) => { setX2(e.target.value); setResult(null); }} placeholder="x₂ ej. 4" className={INPUT} aria-label="x2" />
          <input type="number" value={y2} onChange={(e) => { setY2(e.target.value); setResult(null); }} placeholder="y₂ ej. 6" className={INPUT} aria-label="y2" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular distancia</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Distancia entre A y B</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.dist, 4)}</p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">Punto medio: ({formatNumber(result.mx, 2)}, {formatNumber(result.my, 2)})</p>
        </div>
      )}
    </div>
  );
}
