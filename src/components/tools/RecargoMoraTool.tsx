import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function RecargoMoraTool() {
  const [importe, setImporte] = useState('');
  const [tasa, setTasa] = useState('');
  const [dias, setDias] = useState('');
  const [result, setResult] = useState<{ interes: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const imp = parseFloat(importe), t = parseFloat(tasa), d = parseFloat(dias);
      if (isNaN(imp) || isNaN(t) || isNaN(d)) throw new Error('Introduce el importe, la tasa anual y los días de retraso.');
      if (imp < 0 || t < 0 || d < 0) throw new Error('Los valores no pueden ser negativos.');
      const interes = (imp * (t / 100) * d) / 365;
      setResult({ interes, total: imp + interes });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Interés de demora = importe × (tasa anual / 100) × días / 365.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe adeudado</label>
          <input type="number" value={importe} onChange={(e) => { setImporte(e.target.value); setResult(null); }} placeholder="Ej. 1000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tasa de mora anual (%)</label>
          <input type="number" value={tasa} onChange={(e) => { setTasa(e.target.value); setResult(null); }} placeholder="Ej. 12" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de retraso</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="Ej. 45" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular recargo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Interés de demora</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.interes)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Total a pagar con recargo: <strong>{formatCurrency(result.total)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
