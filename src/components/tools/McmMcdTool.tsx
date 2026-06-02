import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

function mcd(a: number, b: number): number {
  while (b !== 0) { const t = b; b = a % b; a = t; }
  return Math.abs(a);
}

export default function McmMcdTool() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<{ mcm: number; mcd: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const na = parseInt(a, 10);
      const nb = parseInt(b, 10);
      if (isNaN(na) || isNaN(nb)) throw new Error('Introduce dos números enteros.');
      if (na <= 0 || nb <= 0) throw new Error('Los números deben ser positivos.');
      const d = mcd(na, nb);
      const m = (na / d) * nb;
      setResult({ mcm: m, mcd: d });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Primer número</label>
          <input type="number" min="1" step="1" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="Ej. 12" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Segundo número</label>
          <input type="number" min="1" step="1" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="Ej. 18" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Mínimo Común Múltiplo (MCM)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.mcm)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Máximo Común Divisor (MCD)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.mcd)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
