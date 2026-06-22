import { useState } from 'react';

const MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'],
  [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];
const VALS: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

function toRoman(n: number): string {
  let r = '';
  for (const [v, s] of MAP) { while (n >= v) { r += s; n -= v; } }
  return r;
}

function fromRoman(s: string): number {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = VALS[s[i]];
    const next = VALS[s[i + 1]];
    total += next && cur < next ? -cur : cur;
  }
  return total;
}

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function NumerosRomanosTool() {
  const [mode, setMode] = useState<'toRoman' | 'toNumber'>('toRoman');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (mode === 'toRoman') {
        const n = parseInt(input, 10);
        if (isNaN(n)) throw new Error('Introduce un número entero.');
        if (n < 1 || n > 3999) throw new Error('El número debe estar entre 1 y 3999.');
        setResult(toRoman(n));
      } else {
        const s = input.toUpperCase().trim();
        if (!/^[IVXLCDM]+$/.test(s)) throw new Error('Usa solo letras romanas válidas: I, V, X, L, C, D, M.');
        const n = fromRoman(s);
        if (toRoman(n) !== s) throw new Error('Ese número romano no está bien formado.');
        setResult(String(n));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['toRoman', 'Número → Romano'], ['toNumber', 'Romano → Número']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setError(''); setInput(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => { setInput(e.target.value); setResult(null); }}
        placeholder={mode === 'toRoman' ? 'Ej. 2024' : 'Ej. MMXXIV'}
        className={INPUT}
        aria-label="Valor a convertir"
      />
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado</p>
          <p className="text-3xl font-extrabold tracking-wide text-[var(--color-text)]">{result}</p>
        </div>
      )}
    </div>
  );
}
