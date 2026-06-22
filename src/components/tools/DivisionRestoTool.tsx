import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DivisionRestoTool() {
  const [dividendo, setDividendo] = useState('');
  const [divisor, setDivisor] = useState('');
  const [result, setResult] = useState<{ cociente: number; resto: number; decimal: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const D = parseInt(dividendo, 10);
      const d = parseInt(divisor, 10);
      if (isNaN(D) || isNaN(d)) throw new Error('Introduce dividendo y divisor como números enteros.');
      if (d === 0) throw new Error('No se puede dividir entre cero.');
      const cociente = Math.trunc(D / d);
      setResult({ cociente, resto: D - cociente * d, decimal: D / d });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Dividendo</label>
          <input type="number" step="1" value={dividendo} onChange={(e) => { setDividendo(e.target.value); setResult(null); }} placeholder="Ej. 47" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Divisor</label>
          <input type="number" step="1" value={divisor} onChange={(e) => { setDivisor(e.target.value); setResult(null); }} placeholder="Ej. 5" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Dividir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Cociente</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.cociente)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Resto</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.resto)}</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">División exacta (decimal): {formatNumber(result.decimal, 4)}</p>
        </div>
      )}
    </div>
  );
}
