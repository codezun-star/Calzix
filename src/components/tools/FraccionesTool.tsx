import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) { const t = b; b = a % b; a = t; }
  return a || 1;
}

type Op = '+' | '-' | '*' | '/';

const INPUT = 'w-16 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-sm text-center text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function FraccionesTool() {
  const [n1, setN1] = useState('');
  const [d1, setD1] = useState('');
  const [n2, setN2] = useState('');
  const [d2, setD2] = useState('');
  const [op, setOp] = useState<Op>('+');
  const [result, setResult] = useState<{ num: number; den: number; dec: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const a = parseInt(n1, 10), b = parseInt(d1, 10), c = parseInt(n2, 10), d = parseInt(d2, 10);
      if ([a, b, c, d].some((x) => isNaN(x))) throw new Error('Introduce los cuatro valores de las dos fracciones.');
      if (b === 0 || d === 0) throw new Error('El denominador no puede ser cero.');
      let num: number, den: number;
      switch (op) {
        case '+': num = a * d + c * b; den = b * d; break;
        case '-': num = a * d - c * b; den = b * d; break;
        case '*': num = a * c; den = b * d; break;
        default:
          if (c === 0) throw new Error('No se puede dividir entre una fracción de numerador cero.');
          num = a * d; den = b * c;
      }
      if (den < 0) { num = -num; den = -den; }
      const g = gcd(num, den);
      setResult({ num: num / g, den: den / g, dec: num / den });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const reset = () => setResult(null);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="space-y-1 text-center">
          <input type="number" value={n1} onChange={(e) => { setN1(e.target.value); reset(); }} placeholder="a" className={INPUT} aria-label="Numerador 1" />
          <div className="h-px bg-[var(--color-text)]" />
          <input type="number" value={d1} onChange={(e) => { setD1(e.target.value); reset(); }} placeholder="b" className={INPUT} aria-label="Denominador 1" />
        </div>
        <select value={op} onChange={(e) => { setOp(e.target.value as Op); reset(); }} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" aria-label="Operación">
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <div className="space-y-1 text-center">
          <input type="number" value={n2} onChange={(e) => { setN2(e.target.value); reset(); }} placeholder="c" className={INPUT} aria-label="Numerador 2" />
          <div className="h-px bg-[var(--color-text)]" />
          <input type="number" value={d2} onChange={(e) => { setD2(e.target.value); reset(); }} placeholder="d" className={INPUT} aria-label="Denominador 2" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado simplificado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">
            {result.num}{result.den !== 1 && <span className="text-[var(--color-text-secondary)]"> / {result.den}</span>}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">En decimal: {formatNumber(result.dec, 4)}</p>
        </div>
      )}
    </div>
  );
}
