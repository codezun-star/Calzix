import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ComisionVentasTool() {
  const [ventas, setVentas] = useState('');
  const [comision, setComision] = useState('');
  const [base, setBase] = useState('0');
  const [result, setResult] = useState<{ com: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(ventas), c = parseFloat(comision), b = parseFloat(base || '0');
      if (isNaN(v) || isNaN(c)) throw new Error('Introduce las ventas y el porcentaje de comisión.');
      if (v < 0 || c < 0 || b < 0) throw new Error('Los valores no pueden ser negativos.');
      const com = (v * c) / 100;
      setResult({ com, total: com + b });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ventas del periodo</label>
          <input type="number" value={ventas} onChange={(e) => { setVentas(e.target.value); setResult(null); }} placeholder="Ej. 15000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Comisión (%)</label>
          <input type="number" value={comision} onChange={(e) => { setComision(e.target.value); setResult(null); }} placeholder="Ej. 5" className={INPUT} />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario base fijo <span className="opacity-60">opcional</span></label>
          <input type="number" value={base} onChange={(e) => { setBase(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular comisión</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Comisión generada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.com)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Total a cobrar (base + comisión): <strong>{formatCurrency(result.total)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
