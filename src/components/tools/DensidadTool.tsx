import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DensidadTool() {
  const [masa, setMasa] = useState('');
  const [volumen, setVolumen] = useState('');
  const [densidad, setDensidad] = useState('');
  const [result, setResult] = useState<{ label: string; value: number; unit: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(masa), v = parseFloat(volumen), d = parseFloat(densidad);
      const filled = [!isNaN(m), !isNaN(v), !isNaN(d)].filter(Boolean).length;
      if (filled < 2) throw new Error('Introduce dos de los tres valores para calcular el tercero.');
      if (!isNaN(m) && !isNaN(v)) {
        if (v === 0) throw new Error('El volumen no puede ser cero.');
        setResult({ label: 'Densidad', value: m / v, unit: 'kg/m³' });
      } else if (!isNaN(m) && !isNaN(d)) {
        if (d === 0) throw new Error('La densidad no puede ser cero.');
        setResult({ label: 'Volumen', value: m / d, unit: 'm³' });
      } else {
        setResult({ label: 'Masa', value: d * v, unit: 'kg' });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const reset = () => setResult(null);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Rellena dos campos y deja vacío el que quieras calcular (ρ = m / V).</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa (kg)</label>
          <input type="number" value={masa} onChange={(e) => { setMasa(e.target.value); reset(); }} placeholder="Ej. 2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Volumen (m³)</label>
          <input type="number" value={volumen} onChange={(e) => { setVolumen(e.target.value); reset(); }} placeholder="Ej. 0.5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Densidad (kg/m³)</label>
          <input type="number" value={densidad} onChange={(e) => { setDensidad(e.target.value); reset(); }} placeholder="?" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.label}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.value, 4)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{result.unit}</span></p>
        </div>
      )}
    </div>
  );
}
