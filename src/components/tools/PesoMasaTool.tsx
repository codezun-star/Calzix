import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

const CUERPOS: { nombre: string; g: number }[] = [
  { nombre: 'Tierra', g: 9.81 },
  { nombre: 'Luna', g: 1.62 },
  { nombre: 'Marte', g: 3.71 },
  { nombre: 'Júpiter', g: 24.79 },
  { nombre: 'Venus', g: 8.87 },
  { nombre: 'Sol', g: 274 },
];

export default function PesoMasaTool() {
  const [masa, setMasa] = useState('');
  const [gIndex, setGIndex] = useState('0');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(masa);
      if (isNaN(m) || m < 0) throw new Error('Introduce una masa válida en kilogramos.');
      setResult(m * CUERPOS[parseInt(gIndex, 10)].g);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El peso es la fuerza de la gravedad: P = m · g, en newtons (N).</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa (kg)</label>
          <input type="number" value={masa} onChange={(e) => { setMasa(e.target.value); setResult(null); }} placeholder="Ej. 70" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cuerpo celeste</label>
          <select value={gIndex} onChange={(e) => { setGIndex(e.target.value); setResult(null); }} className={INPUT}>
            {CUERPOS.map((c, i) => <option key={c.nombre} value={i}>{c.nombre} (g = {c.g})</option>)}
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular peso</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Peso en {CUERPOS[parseInt(gIndex, 10)].nombre}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 2)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">N</span></p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a {formatNumber(result / 9.81, 2)} kg-fuerza en la Tierra.</p>
        </div>
      )}
    </div>
  );
}
