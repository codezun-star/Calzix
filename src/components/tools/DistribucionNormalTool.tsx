import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

function erf(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function phi(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

export default function DistribucionNormalTool() {
  const [media, setMedia] = useState('0');
  const [desv, setDesv] = useState('1');
  const [x, setX] = useState('');
  const [result, setResult] = useState<{ z: number; menor: number; mayor: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const mu = parseFloat(media.replace(',', '.'));
      const sigma = parseFloat(desv.replace(',', '.'));
      const xv = parseFloat(x.replace(',', '.'));
      if (isNaN(mu) || isNaN(sigma) || isNaN(xv)) throw new Error('Introduce todos los valores.');
      if (sigma <= 0) throw new Error('La desviación típica debe ser positiva.');
      const z = (xv - mu) / sigma;
      const menor = phi(z);
      setResult({ z, menor, mayor: 1 - menor });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Media (μ)</label>
          <input type="number" value={media} onChange={(e) => { setMedia(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Desviación típica (σ)</label>
          <input type="number" value={desv} onChange={(e) => { setDesv(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Valor (x)</label>
        <input type="number" value={x} onChange={(e) => { setX(e.target.value); setResult(null); }} placeholder="Ej. 1.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Puntuación Z</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.z, 4)}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">P(X ≤ x)</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.menor * 100, 4)} %</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">P(X &gt; x)</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.mayor * 100, 4)} %</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
