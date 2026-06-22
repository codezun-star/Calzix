import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function LogaritmoTool() {
  const [num, setNum] = useState('');
  const [base, setBase] = useState('10');
  const [result, setResult] = useState<{ log: number; ln: number; log10: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const x = parseFloat(num);
      const b = parseFloat(base);
      if (isNaN(x)) throw new Error('Introduce el número.');
      if (x <= 0) throw new Error('El logaritmo solo existe para números positivos.');
      if (isNaN(b) || b <= 0 || b === 1) throw new Error('La base debe ser positiva y distinta de 1.');
      setResult({ log: Math.log(x) / Math.log(b), ln: Math.log(x), log10: Math.log10(x) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número</label>
          <input type="number" value={num} onChange={(e) => { setNum(e.target.value); setResult(null); }} placeholder="Ej. 1000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Base</label>
          <input type="number" value={base} onChange={(e) => { setBase(e.target.value); setResult(null); }} placeholder="10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular logaritmo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Logaritmo en base {base}</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.log, 6)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Logaritmo natural (ln)</p>
              <p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.ln, 6)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Logaritmo decimal (log₁₀)</p>
              <p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.log10, 6)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
