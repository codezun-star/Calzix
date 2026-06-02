import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function VacacionesTool() {
  const [diasAnuales, setDiasAnuales] = useState('22');
  const [diasTrabajados, setDiasTrabajados] = useState('');
  const [result, setResult] = useState<{ diasCorresponden: number; diasPendientes: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const da = parseFloat(diasAnuales.replace(',', '.'));
      const dt = parseFloat(diasTrabajados.replace(',', '.'));
      if (isNaN(da) || isNaN(dt)) throw new Error('Introduce los días de vacaciones anuales y los días trabajados.');
      if (da <= 0 || dt < 0) throw new Error('Los valores deben ser positivos.');
      if (dt > 365) throw new Error('Los días trabajados no pueden superar 365.');
      const diasCorresponden = (da / 365) * dt;
      setResult({ diasCorresponden, diasPendientes: diasCorresponden });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de vacaciones anuales</label>
          <input type="number" value={diasAnuales} onChange={(e) => { setDiasAnuales(e.target.value); setResult(null); }} placeholder="22" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días trabajados en el período</label>
          <input type="number" value={diasTrabajados} onChange={(e) => { setDiasTrabajados(e.target.value); setResult(null); }} placeholder="Ej. 90" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular vacaciones proporcionales</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Días de vacaciones que corresponden</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.diasCorresponden, 2)} días</p>
          <p className="text-xs text-[var(--color-text-muted)]">({Math.round(result.diasCorresponden)} días redondeados)</p>
        </div>
      )}
    </div>
  );
}
