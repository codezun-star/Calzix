import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PresionFuerzaAreaTool() {
  const [presion, setPresion] = useState('');
  const [fuerza, setFuerza] = useState('');
  const [area, setArea] = useState('');
  const [result, setResult] = useState<{ label: string; value: number; unit: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(presion), f = parseFloat(fuerza), a = parseFloat(area);
      const filled = [!isNaN(p), !isNaN(f), !isNaN(a)].filter(Boolean).length;
      if (filled < 2) throw new Error('Introduce dos de los tres valores para calcular el tercero.');
      if (!isNaN(f) && !isNaN(a)) {
        if (a === 0) throw new Error('El área no puede ser cero.');
        setResult({ label: 'Presión', value: f / a, unit: 'Pa' });
      } else if (!isNaN(p) && !isNaN(a)) {
        setResult({ label: 'Fuerza', value: p * a, unit: 'N' });
      } else {
        if (p === 0) throw new Error('La presión no puede ser cero para despejar el área.');
        setResult({ label: 'Área', value: f / p, unit: 'm²' });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const reset = () => setResult(null);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Rellena dos campos y deja vacío el que quieras calcular (P = F / A).</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Presión (Pa)</label>
          <input type="number" value={presion} onChange={(e) => { setPresion(e.target.value); reset(); }} placeholder="?" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fuerza (N)</label>
          <input type="number" value={fuerza} onChange={(e) => { setFuerza(e.target.value); reset(); }} placeholder="Ej. 500" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Área (m²)</label>
          <input type="number" value={area} onChange={(e) => { setArea(e.target.value); reset(); }} placeholder="Ej. 0.25" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.label}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.value, 3)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">{result.unit}</span></p>
        </div>
      )}
    </div>
  );
}
