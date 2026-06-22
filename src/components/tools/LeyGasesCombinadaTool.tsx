import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function LeyGasesCombinadaTool() {
  const [p1, setP1] = useState('');
  const [v1, setV1] = useState('');
  const [t1, setT1] = useState('');
  const [p2, setP2] = useState('');
  const [v2, setV2] = useState('');
  const [t2, setT2] = useState('');
  const [result, setResult] = useState<{ label: string; value: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const vals = { p1: parseFloat(p1), v1: parseFloat(v1), t1: parseFloat(t1), p2: parseFloat(p2), v2: parseFloat(v2), t2: parseFloat(t2) };
      const blanks = Object.entries(vals).filter(([, v]) => isNaN(v)).map(([k]) => k);
      if (blanks.length !== 1) throw new Error('Deja exactamente un campo vacío: el que quieres calcular.');
      const known = Object.entries(vals).filter(([, v]) => !isNaN(v));
      if (known.some(([k, v]) => (k === 't1' || k === 't2') && v <= 0)) throw new Error('Las temperaturas deben ir en Kelvin y ser mayores que cero.');
      const { p1: P1, v1: V1, t1: T1, p2: P2, v2: V2, t2: T2 } = vals;
      let value: number, label: string;
      switch (blanks[0]) {
        case 'p1': value = (P2 * V2 * T1) / (V1 * T2); label = 'Presión inicial P₁'; break;
        case 'v1': value = (P2 * V2 * T1) / (P1 * T2); label = 'Volumen inicial V₁'; break;
        case 't1': value = (P1 * V1 * T2) / (P2 * V2); label = 'Temperatura inicial T₁ (K)'; break;
        case 'p2': value = (P1 * V1 * T2) / (V2 * T1); label = 'Presión final P₂'; break;
        case 'v2': value = (P1 * V1 * T2) / (P2 * T1); label = 'Volumen final V₂'; break;
        default: value = (P2 * V2 * T1) / (P1 * V1); label = 'Temperatura final T₂ (K)';
      }
      if (!isFinite(value)) throw new Error('Revisa los datos: hay una división por cero.');
      setResult({ label, value });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const reset = () => setResult(null);
  const field = (label: string, val: string, set: (v: string) => void, ph: string) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label>
      <input type="number" value={val} onChange={(e) => { set(e.target.value); reset(); }} placeholder={ph} className={INPUT} />
    </div>
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">P₁V₁/T₁ = P₂V₂/T₂. Rellena 5 campos y deja vacío el que buscas. Temperatura en Kelvin.</p>
      <div>
        <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">Estado inicial</p>
        <div className="grid grid-cols-3 gap-3">
          {field('Presión P₁', p1, setP1, 'atm')}
          {field('Volumen V₁', v1, setV1, 'L')}
          {field('Temp. T₁ (K)', t1, setT1, 'K')}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">Estado final</p>
        <div className="grid grid-cols-3 gap-3">
          {field('Presión P₂', p2, setP2, 'atm')}
          {field('Volumen V₂', v2, setV2, 'L')}
          {field('Temp. T₂ (K)', t2, setT2, 'K')}
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular incógnita</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.label}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.value, 4)}</p>
        </div>
      )}
    </div>
  );
}
