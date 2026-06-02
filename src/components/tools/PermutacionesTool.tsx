import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export default function PermutacionesTool() {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [result, setResult] = useState<{ perm: number; comb: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const nv = parseInt(n, 10);
      const rv = parseInt(r, 10);
      if (isNaN(nv) || isNaN(rv)) throw new Error('Introduce n y r como enteros positivos.');
      if (nv < 0 || rv < 0) throw new Error('Los valores deben ser no negativos.');
      if (rv > nv) throw new Error('r no puede ser mayor que n.');
      if (nv > 20) throw new Error('El máximo es n = 20 (límite de precisión).');
      const fn = factorial(nv);
      const fr = factorial(rv);
      const fnr = factorial(nv - rv);
      setResult({ perm: fn / fnr, comb: fn / (fr * fnr) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Total de elementos (n)</label>
          <input type="number" min="0" max="20" step="1" value={n} onChange={(e) => { setN(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Elementos elegidos (r)</label>
          <input type="number" min="0" max="20" step="1" value={r} onChange={(e) => { setR(e.target.value); setResult(null); }} placeholder="Ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Permutaciones P(n,r) — orden importa</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.perm)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Combinaciones C(n,r) — orden no importa</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.comb)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
