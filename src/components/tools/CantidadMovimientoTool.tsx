import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CantidadMovimientoTool() {
  const [p, setP] = useState('');
  const [masa, setMasa] = useState('');
  const [velocidad, setVelocidad] = useState('');
  const [result, setResult] = useState<{ label: string; value: number; unit: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pp = parseFloat(p), m = parseFloat(masa), v = parseFloat(velocidad);
      const filled = [!isNaN(pp), !isNaN(m), !isNaN(v)].filter(Boolean).length;
      if (filled < 2) throw new Error('Introduce dos de los tres valores para calcular el tercero.');
      if (!isNaN(m) && !isNaN(v)) setResult({ label: 'Cantidad de movimiento (p)', value: m * v, unit: 'kg·m/s' });
      else if (!isNaN(pp) && !isNaN(v)) {
        if (v === 0) throw new Error('La velocidad no puede ser cero para despejar la masa.');
        setResult({ label: 'Masa (m)', value: pp / v, unit: 'kg' });
      } else {
        if (m === 0) throw new Error('La masa no puede ser cero para despejar la velocidad.');
        setResult({ label: 'Velocidad (v)', value: pp / m, unit: 'm/s' });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const reset = () => setResult(null);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Rellena dos campos y deja vacío el que quieras calcular (p = m · v).</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad mov. (kg·m/s)</label>
          <input type="number" value={p} onChange={(e) => { setP(e.target.value); reset(); }} placeholder="?" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa (kg)</label>
          <input type="number" value={masa} onChange={(e) => { setMasa(e.target.value); reset(); }} placeholder="Ej. 1200" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad (m/s)</label>
          <input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); reset(); }} placeholder="Ej. 25" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.label}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.value, 2)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{result.unit}</span></p>
        </div>
      )}
    </div>
  );
}
