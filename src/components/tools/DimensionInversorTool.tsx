import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DimensionInversorTool() {
  const [kwp, setKwp] = useState('');
  const [ratio, setRatio] = useState('0.9');
  const [result, setResult] = useState<{ recomendado: number; min: number; max: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(kwp), r = parseFloat(ratio);
      if (isNaN(p) || p <= 0) throw new Error('Introduce la potencia pico de los paneles (kWp).');
      if (isNaN(r) || r <= 0 || r > 1.3) throw new Error('La ratio inversor/paneles suele estar entre 0,8 y 1,2.');
      setResult({ recomendado: p * r, min: p * 0.8, max: p * 1.0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El inversor suele dimensionarse a un 80-100 % de la potencia pico de los paneles.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia de los paneles (kWp)</label>
          <input type="number" value={kwp} onChange={(e) => { setKwp(e.target.value); setResult(null); }} placeholder="Ej. 5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ratio inversor/paneles</label>
          <input type="number" value={ratio} onChange={(e) => { setRatio(e.target.value); setResult(null); }} placeholder="0.9" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Dimensionar inversor</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Potencia de inversor recomendada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.recomendado, 2)} kW</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Rango habitual: entre {formatNumber(result.min, 2)} y {formatNumber(result.max, 2)} kW para tus paneles.</p>
        </div>
      )}
    </div>
  );
}
