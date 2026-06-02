import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

export default function CostoGasolinera() {
  const [litros, setLitros] = useState('');
  const [precio, setPrecio] = useState('');
  const [result, setResult] = useState<{ total: number; precioLitro: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const l = parseFloat(litros.replace(',', '.'));
      const p = parseFloat(precio.replace(',', '.'));
      if (isNaN(l) || isNaN(p)) throw new Error('Introduce los litros y el precio del combustible.');
      if (l <= 0 || p <= 0) throw new Error('Los valores deben ser positivos.');
      setResult({ total: l * p, precioLitro: p });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Litros repostados</label>
          <input type="number" value={litros} onChange={(e) => { setLitros(e.target.value); setResult(null); }} placeholder="Ej. 40" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio del combustible (€/L)</label>
          <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="Ej. 1.65" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Total a pagar</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(parseFloat(litros), 1)} litros × {formatCurrency(result.precioLitro)}/L</p>
        </div>
      )}
    </div>
  );
}
