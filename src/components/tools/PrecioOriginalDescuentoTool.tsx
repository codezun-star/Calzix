import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function PrecioOriginalDescuentoTool() {
  const [precioFinal, setPrecioFinal] = useState('');
  const [descuento, setDescuento] = useState('');
  const [result, setResult] = useState<{ original: number; ahorro: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pf = parseFloat(precioFinal.replace(',', '.'));
      const d  = parseFloat(descuento.replace(',', '.'));
      if (isNaN(pf) || isNaN(d)) throw new Error('Introduce el precio con descuento y el porcentaje.');
      if (pf <= 0) throw new Error('El precio final debe ser positivo.');
      if (d <= 0 || d >= 100) throw new Error('El descuento debe estar entre 0% y 100%.');
      const original = pf / (1 - d / 100);
      setResult({ original, ahorro: original - pf });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Conoces el precio con descuento y quieres saber el precio original.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio con descuento (€)</label>
          <input type="number" value={precioFinal} onChange={(e) => { setPrecioFinal(e.target.value); setResult(null); }} placeholder="Ej. 75" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Descuento aplicado (%)</label>
          <input type="number" value={descuento} onChange={(e) => { setDescuento(e.target.value); setResult(null); }} placeholder="Ej. 25" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular precio original</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Precio original</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.original)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Ahorro: {formatCurrency(result.ahorro)} ({formatPercent(parseFloat(descuento))})</p>
        </div>
      )}
    </div>
  );
}
