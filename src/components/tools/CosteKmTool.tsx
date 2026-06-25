import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CosteKmTool() {
  const [consumo, setConsumo] = useState('');
  const [precio, setPrecio] = useState('');
  const [mantenimiento, setMantenimiento] = useState('0.05');
  const [result, setResult] = useState<{ km: number; cien: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(consumo), p = parseFloat(precio), m = parseFloat(mantenimiento || '0');
      if (isNaN(c) || c < 0 || isNaN(p) || p < 0) throw new Error('Introduce el consumo y el precio del combustible.');
      if (isNaN(m) || m < 0) throw new Error('El coste de mantenimiento debe ser positivo.');
      const km = (c / 100) * p + m;
      setResult({ km, cien: km * 100 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo (L/100 km)</label>
          <input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 6.5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio combustible/L</label>
          <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="Ej. 1.6" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Mantenimiento/km <span className="opacity-60">opc.</span></label>
          <input type="number" value={mantenimiento} onChange={(e) => { setMantenimiento(e.target.value); setResult(null); }} placeholder="0.05" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Coste por kilómetro</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.km)}/km</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Cada 100 km te cuestan <strong>{formatCurrency(result.cien)}</strong> (combustible + mantenimiento).</p>
        </div>
      )}
    </div>
  );
}
