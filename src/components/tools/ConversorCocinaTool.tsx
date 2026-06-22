import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

// Base: mililitros
const UNITS: Record<string, number> = {
  'Taza (240 ml)': 240,
  'Cucharada (15 ml)': 15,
  'Cucharadita (5 ml)': 5,
  'Mililitro (ml)': 1,
  'Onza líquida': 29.5735,
  'Litro': 1000,
  'Taza EE.UU. (236 ml)': 236.588,
};
const KEYS = Object.keys(UNITS);
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorCocinaTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState(KEYS[0]);
  const [to, setTo] = useState(KEYS[3]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(value);
      if (isNaN(v) || v < 0) throw new Error('Introduce una cantidad válida.');
      setResult((v * UNITS[from]) / UNITS[to]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad</label>
        <input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder="Ej. 2" className={INPUT} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">De</label>
          <select value={from} onChange={(e) => { setFrom(e.target.value); setResult(null); }} className={INPUT}>{KEYS.map((k) => <option key={k} value={k}>{k}</option>)}</select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A</label>
          <select value={to} onChange={(e) => { setTo(e.target.value); setResult(null); }} className={INPUT}>{KEYS.map((k) => <option key={k} value={k}>{k}</option>)}</select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">{value} {from} equivale a</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 3)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{to}</span></p>
        </div>
      )}
    </div>
  );
}
