import { useState } from 'react';

const BASES: { label: string; base: number; re: RegExp }[] = [
  { label: 'Binario (2)', base: 2, re: /^[01]+$/ },
  { label: 'Octal (8)', base: 8, re: /^[0-7]+$/ },
  { label: 'Decimal (10)', base: 10, re: /^[0-9]+$/ },
  { label: 'Hexadecimal (16)', base: 16, re: /^[0-9a-fA-F]+$/ },
];
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorNumeracionTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('2');
  const [to, setTo] = useState('10');
  const [result, setResult] = useState<{ value: string; decimal: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const fromBase = parseInt(from, 10);
      const toBase = parseInt(to, 10);
      const spec = BASES.find((b) => b.base === fromBase)!;
      const clean = value.trim();
      if (!clean) throw new Error('Introduce un número.');
      if (!spec.re.test(clean)) throw new Error(`Ese número no es válido en base ${fromBase}.`);
      const decimal = parseInt(clean, fromBase);
      setResult({ value: decimal.toString(toBase).toUpperCase(), decimal });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Número</label>
        <input value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Ej. 1010" className={INPUT} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">De base</label>
          <select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }} className={INPUT}>{BASES.map((b) => <option key={b.base} value={b.base}>{b.label}</option>)}</select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A base</label>
          <select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }} className={INPUT}>{BASES.map((b) => <option key={b.base} value={b.base}>{b.label}</option>)}</select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Resultado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)] break-all">{result.value}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a {result.decimal} en decimal.</p>
        </div>
      )}
    </div>
  );
}
