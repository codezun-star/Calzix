import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function PrecioCosteMasTool() {
  const [coste, setCoste] = useState('');
  const [margen, setMargen] = useState('');
  const [result, setResult] = useState<{ precio: number; beneficio: number; margenReal: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(coste.replace(',', '.'));
      const m = parseFloat(margen.replace(',', '.'));
      if (isNaN(c) || isNaN(m)) throw new Error('Introduce el coste y el margen.');
      if (c <= 0) throw new Error('El coste debe ser positivo.');
      if (m < 0) throw new Error('El margen no puede ser negativo.');
      const precio = c * (1 + m / 100);
      const beneficio = precio - c;
      const margenReal = (beneficio / precio) * 100;
      setResult({ precio, beneficio, margenReal });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Precio = Coste × (1 + Markup %)</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Coste (€)</label>
          <input type="number" value={coste} onChange={(e) => { setCoste(e.target.value); setResult(null); }} placeholder="Ej. 100" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Markup / Margen sobre coste (%)</label>
          <input type="number" value={margen} onChange={(e) => { setMargen(e.target.value); setResult(null); }} placeholder="Ej. 30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular precio</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Precio de venta</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.precio)}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-[var(--color-text-secondary)]">Beneficio: <span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.beneficio)}</span></p>
            <p className="text-[var(--color-text-secondary)]">Margen s/venta: <span className="font-semibold text-[var(--color-text)]">{formatPercent(result.margenReal)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
