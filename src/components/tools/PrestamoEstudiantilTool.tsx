import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PrestamoEstudiantilTool() {
  const [monto, setMonto] = useState('');
  const [tasa, setTasa] = useState('');
  const [anios, setAnios] = useState('');
  const [result, setResult] = useState<{ cuota: number; total: number; intereses: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(monto), t = parseFloat(tasa), y = parseFloat(anios);
      if (isNaN(m) || m <= 0) throw new Error('Introduce el importe del préstamo.');
      if (isNaN(t) || t < 0) throw new Error('Introduce el interés anual.');
      if (isNaN(y) || y <= 0) throw new Error('Introduce el plazo en años.');
      const i = t / 100 / 12;
      const n = y * 12;
      const cuota = i === 0 ? m / n : (m * i) / (1 - Math.pow(1 + i, -n));
      const total = cuota * n;
      setResult({ cuota, total, intereses: total - m });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe del préstamo</label>
          <input type="number" value={monto} onChange={(e) => { setMonto(e.target.value); setResult(null); }} placeholder="Ej. 12000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Interés anual (%)</label>
          <input type="number" value={tasa} onChange={(e) => { setTasa(e.target.value); setResult(null); }} placeholder="Ej. 4" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Plazo (años)</label>
          <input type="number" value={anios} onChange={(e) => { setAnios(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular cuota</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Cuota mensual</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.cuota)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Total a devolver: {formatCurrency(result.total)} · Intereses: <strong>{formatCurrency(result.intereses)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
