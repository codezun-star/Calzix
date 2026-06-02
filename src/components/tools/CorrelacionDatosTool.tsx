import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function CorrelacionDatosTool() {
  const [datosX, setDatosX] = useState('');
  const [datosY, setDatosY] = useState('');
  const [result, setResult] = useState<{ r: number; tipo: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const xs = datosX.split(/[,;\s]+/).map((s) => parseFloat(s.replace(',', '.'))).filter((n) => !isNaN(n));
      const ys = datosY.split(/[,;\s]+/).map((s) => parseFloat(s.replace(',', '.'))).filter((n) => !isNaN(n));
      if (xs.length < 3 || ys.length < 3) throw new Error('Introduce al menos 3 valores en cada serie.');
      if (xs.length !== ys.length) throw new Error('Ambas series deben tener el mismo número de datos.');
      const n = xs.length;
      const mx = xs.reduce((a, b) => a + b, 0) / n;
      const my = ys.reduce((a, b) => a + b, 0) / n;
      let num = 0, dx = 0, dy = 0;
      for (let i = 0; i < n; i++) {
        num += (xs[i] - mx) * (ys[i] - my);
        dx += (xs[i] - mx) ** 2;
        dy += (ys[i] - my) ** 2;
      }
      if (dx === 0 || dy === 0) throw new Error('Una serie tiene varianza cero, correlación no definida.');
      const r = num / Math.sqrt(dx * dy);
      const tipo = Math.abs(r) >= 0.9 ? 'muy fuerte' : Math.abs(r) >= 0.7 ? 'fuerte' : Math.abs(r) >= 0.5 ? 'moderada' : Math.abs(r) >= 0.3 ? 'débil' : 'muy débil o nula';
      setResult({ r, tipo: (r > 0 ? 'positiva ' : r < 0 ? 'negativa ' : '') + tipo });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce los valores separados por coma o espacio</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Serie X</label>
        <input type="text" value={datosX} onChange={(e) => { setDatosX(e.target.value); setResult(null); }} placeholder="Ej. 1, 2, 3, 4, 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Serie Y</label>
        <input type="text" value={datosY} onChange={(e) => { setDatosY(e.target.value); setResult(null); }} placeholder="Ej. 2, 4, 5, 4, 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular correlación</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Coeficiente de Pearson (r)</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.r, 4)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Correlación {result.tipo}</p>
        </div>
      )}
    </div>
  );
}
