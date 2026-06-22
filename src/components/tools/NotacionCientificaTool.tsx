import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
function superscript(n: number): string {
  return String(n).split('').map((c) => SUP[c] ?? c).join('');
}

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function NotacionCientificaTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ sci: string; mantissa: number; exp: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const x = parseFloat(input);
      if (isNaN(x)) throw new Error('Introduce un número. Admite formatos como 0.0034 o 1.5e6.');
      if (x === 0) { setResult({ sci: '0 × 10⁰', mantissa: 0, exp: 0 }); return; }
      const exp = Math.floor(Math.log10(Math.abs(x)));
      const mantissa = x / Math.pow(10, exp);
      setResult({ sci: `${formatNumber(mantissa, 4)} × 10${superscript(exp)}`, mantissa, exp });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número decimal</label>
        <input value={input} onChange={(e) => { setInput(e.target.value); setResult(null); }} placeholder="Ej. 0.00000452 o 6500000" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir a notación científica</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Notación científica</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.sci}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Mantisa: {formatNumber(result.mantissa, 4)} · Exponente: {result.exp}</p>
        </div>
      )}
    </div>
  );
}
