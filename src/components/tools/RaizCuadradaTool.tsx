import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function RaizCuadradaTool() {
  const [num, setNum] = useState('');
  const [index, setIndex] = useState('2');
  const [result, setResult] = useState<{ value: number; exact: boolean } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const x = parseFloat(num);
      const n = parseInt(index, 10);
      if (isNaN(x)) throw new Error('Introduce el número (radicando).');
      if (isNaN(n) || n < 2) throw new Error('El índice de la raíz debe ser un entero igual o mayor que 2.');
      if (x < 0 && n % 2 === 0) throw new Error('No existe raíz real de índice par para un número negativo.');
      const r = x < 0 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n);
      const rounded = Math.round(r);
      setResult({ value: r, exact: Math.abs(Math.pow(rounded, n) - x) < 1e-9 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número (radicando)</label>
          <input type="number" value={num} onChange={(e) => { setNum(e.target.value); setResult(null); }} placeholder="Ej. 144" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Índice (2 = cuadrada)</label>
          <input type="number" min="2" step="1" value={index} onChange={(e) => { setIndex(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular raíz</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.value, 6)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.exact ? 'Es una raíz exacta.' : 'Resultado aproximado (raíz no exacta).'}</p>
        </div>
      )}
    </div>
  );
}
