import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PotenciaContratadaTool() {
  const [potencia, setPotencia] = useState('');
  const [simultaneidad, setSimultaneidad] = useState('60');
  const [result, setResult] = useState<{ kw: number; recomendada: number } | null>(null);
  const [error, setError] = useState('');

  const ESTANDAR = [2.3, 3.45, 4.6, 5.75, 6.9, 8.05, 9.2];

  function calcular() {
    try {
      setError('');
      const p = parseFloat(potencia), s = parseFloat(simultaneidad);
      if (isNaN(p) || p <= 0) throw new Error('Introduce la potencia total de tus aparatos en vatios.');
      if (isNaN(s) || s <= 0 || s > 100) throw new Error('El factor de simultaneidad debe estar entre 1 y 100 %.');
      const kw = (p * (s / 100)) / 1000;
      const recomendada = ESTANDAR.find((t) => t >= kw) ?? Math.ceil(kw * 10) / 10;
      setResult({ kw, recomendada });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Suma la potencia de los aparatos que podrías usar a la vez y estima la potencia a contratar.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia total instalada (W)</label>
          <input type="number" value={potencia} onChange={(e) => { setPotencia(e.target.value); setResult(null); }} placeholder="Ej. 6000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Factor de simultaneidad (%)</label>
          <input type="number" value={simultaneidad} onChange={(e) => { setSimultaneidad(e.target.value); setResult(null); }} placeholder="60" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular potencia</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Potencia simultánea estimada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.kw, 2)} kW</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Potencia a contratar recomendada: <strong>{formatNumber(result.recomendada, 2)} kW</strong>. Contratar de más encarece la factura fija; de menos, salta el automático.</p>
        </div>
      )}
    </div>
  );
}
