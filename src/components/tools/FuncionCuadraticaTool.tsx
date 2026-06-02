import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function FuncionCuadraticaTool() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<{ discriminante: number; x1: number | null; x2: number | null; xVertice: number; yVertice: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      const nc = parseFloat(c.replace(',', '.'));
      if (isNaN(na) || isNaN(nb) || isNaN(nc)) throw new Error('Introduce los tres coeficientes a, b y c.');
      if (na === 0) throw new Error('El coeficiente a no puede ser 0 (no sería cuadrática).');
      const disc = nb * nb - 4 * na * nc;
      const xv = -nb / (2 * na);
      const yv = na * xv * xv + nb * xv + nc;
      let x1: number | null = null;
      let x2: number | null = null;
      if (disc >= 0) {
        x1 = (-nb + Math.sqrt(disc)) / (2 * na);
        x2 = (-nb - Math.sqrt(disc)) / (2 * na);
      }
      setResult({ discriminante: disc, x1, x2, xVertice: xv, yVertice: yv });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">ax² + bx + c = 0</p>
      <div className="grid grid-cols-3 gap-3">
        {[['a', a, setA], ['b', b, setB], ['c', c, setC]].map(([label, val, set]) => (
          <div key={label as string} className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Coeficiente {label as string}</label>
            <input type="number" value={val as string} onChange={(e) => { (set as (s: string) => void)(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        ))}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Discriminante (b² - 4ac)</p>
            <p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.discriminante, 4)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Raíces</p>
            {result.x1 !== null && result.x2 !== null ? (
              <p className="font-extrabold text-[var(--color-text)]">x₁ = {formatNumber(result.x1, 6)} &nbsp; x₂ = {formatNumber(result.x2, 6)}</p>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">Sin raíces reales (discriminante negativo)</p>
            )}
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Vértice</p>
            <p className="font-extrabold text-[var(--color-text)]">({formatNumber(result.xVertice, 4)}, {formatNumber(result.yVertice, 4)})</p>
          </div>
        </div>
      )}
    </div>
  );
}
