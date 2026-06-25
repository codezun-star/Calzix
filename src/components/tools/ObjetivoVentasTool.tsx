import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ObjetivoVentasTool() {
  const [meta, setMeta] = useState('');
  const [dias, setDias] = useState('22');
  const [actual, setActual] = useState('0');
  const [diasRestantes, setDiasRestantes] = useState('');
  const [result, setResult] = useState<{ diario: number; restante: number; diarioRestante: number | null } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(meta), d = parseFloat(dias), a = parseFloat(actual || '0'), dr = parseFloat(diasRestantes);
      if (isNaN(m) || m <= 0) throw new Error('Introduce la meta de ventas del mes.');
      if (isNaN(d) || d <= 0) throw new Error('Introduce los días laborables del mes.');
      if (a < 0) throw new Error('Las ventas actuales no pueden ser negativas.');
      const restante = Math.max(0, m - a);
      let diarioRestante: number | null = null;
      if (!isNaN(dr) && dr > 0) diarioRestante = restante / dr;
      setResult({ diario: m / d, restante, diarioRestante });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Meta de ventas del mes</label>
          <input type="number" value={meta} onChange={(e) => { setMeta(e.target.value); setResult(null); }} placeholder="Ej. 30000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días laborables del mes</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="22" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Vendido hasta ahora <span className="opacity-60">opc.</span></label>
          <input type="number" value={actual} onChange={(e) => { setActual(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días que quedan <span className="opacity-60">opc.</span></label>
          <input type="number" value={diasRestantes} onChange={(e) => { setDiasRestantes(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular objetivo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Objetivo diario para llegar a la meta</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.diario)}/día</p>
          {result.diarioRestante !== null && (
            <p className="text-sm text-[var(--color-text-secondary)]">Te faltan {formatCurrency(result.restante)}: necesitas <strong>{formatCurrency(result.diarioRestante)}/día</strong> en los días que quedan.</p>
          )}
        </div>
      )}
    </div>
  );
}
