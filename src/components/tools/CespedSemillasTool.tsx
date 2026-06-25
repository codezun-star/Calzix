import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CespedSemillasTool() {
  const [area, setArea] = useState('');
  const [dosis, setDosis] = useState('35');
  const [result, setResult] = useState<{ kg: number; sacos5: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const a = parseFloat(area), d = parseFloat(dosis);
      if (isNaN(a) || a <= 0) throw new Error('Introduce la superficie en metros cuadrados.');
      if (isNaN(d) || d <= 0) throw new Error('Introduce la dosis de semilla por m².');
      const kg = (a * d) / 1000;
      setResult({ kg, sacos5: Math.ceil(kg / 5) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Dosis habitual: 30-40 g/m² para césped nuevo y 15-20 g/m² para resembrar.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Superficie (m²)</label>
          <input type="number" value={area} onChange={(e) => { setArea(e.target.value); setResult(null); }} placeholder="Ej. 80" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Dosis (g/m²)</label>
          <input type="number" value={dosis} onChange={(e) => { setDosis(e.target.value); setResult(null); }} placeholder="35" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular semilla</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Semilla necesaria</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.kg, 2)} kg</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a unos {result.sacos5} saco(s) de 5 kg.</p>
        </div>
      )}
    </div>
  );
}
