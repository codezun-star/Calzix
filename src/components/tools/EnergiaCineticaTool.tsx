import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function EnergiaCineticaTool() {
  const [masa, setMasa] = useState('');
  const [velocidad, setVelocidad] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(masa.replace(',', '.'));
      const v = parseFloat(velocidad.replace(',', '.'));
      if (isNaN(m) || isNaN(v)) throw new Error('Introduce valores numéricos válidos.');
      if (m <= 0) throw new Error('La masa debe ser mayor que cero.');
      setResult(0.5 * m * v * v);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">Ec = ½ · m · v²</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa (kg)</label>
          <input type="number" value={masa} onChange={(e) => { setMasa(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad (m/s)</label>
          <input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Energía cinética</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} J</p>
          <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(result / 1000, 6)} kJ</p>
        </div>
      )}
    </div>
  );
}
