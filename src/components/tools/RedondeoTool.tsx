import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function RedondeoTool() {
  const [num, setNum] = useState('');
  const [decimals, setDecimals] = useState('2');
  const [result, setResult] = useState<{ round: number; floor: number; ceil: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const x = parseFloat(num);
      const d = parseInt(decimals, 10);
      if (isNaN(x)) throw new Error('Introduce un número.');
      if (isNaN(d) || d < 0 || d > 10) throw new Error('Los decimales deben estar entre 0 y 10.');
      const f = Math.pow(10, d);
      setResult({
        round: Math.round(x * f) / f,
        floor: Math.floor(x * f) / f,
        ceil: Math.ceil(x * f) / f,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const dec = parseInt(decimals, 10) || 0;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número</label>
          <input type="number" value={num} onChange={(e) => { setNum(e.target.value); setResult(null); }} placeholder="Ej. 3.14159" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Decimales</label>
          <input type="number" min="0" max="10" step="1" value={decimals} onChange={(e) => { setDecimals(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Redondear</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Redondeo normal (al más cercano)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.round, dec)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Por defecto (abajo)</p>
              <p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.floor, dec)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Por exceso (arriba)</p>
              <p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.ceil, dec)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
