import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

export default function PuntoEquilibrioTool() {
  const [costoFijo, setCostoFijo] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [costoVariable, setCostoVariable] = useState('');
  const [result, setResult] = useState<{ unidades: number; ingresos: number; margenContribucion: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const cf = parseFloat(costoFijo.replace(',', '.'));
      const pv = parseFloat(precioVenta.replace(',', '.'));
      const cv = parseFloat(costoVariable.replace(',', '.'));
      if (isNaN(cf) || isNaN(pv) || isNaN(cv)) throw new Error('Introduce todos los valores.');
      if (cf < 0 || pv <= 0 || cv < 0) throw new Error('Los valores deben ser positivos.');
      const mc = pv - cv;
      if (mc <= 0) throw new Error('El precio de venta debe ser mayor que el coste variable unitario.');
      const unidades = cf / mc;
      setResult({ unidades, ingresos: unidades * pv, margenContribucion: mc });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Costos fijos totales (€/período)</label>
          <input type="number" value={costoFijo} onChange={(e) => { setCostoFijo(e.target.value); setResult(null); }} placeholder="Ej. 5000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio de venta unitario (€)</label>
            <input type="number" value={precioVenta} onChange={(e) => { setPrecioVenta(e.target.value); setResult(null); }} placeholder="Ej. 50" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Costo variable unitario (€)</label>
            <input type="number" value={costoVariable} onChange={(e) => { setCostoVariable(e.target.value); setResult(null); }} placeholder="Ej. 30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular punto de equilibrio</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Unidades para equilibrio</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.unidades, 2)} ud.</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Ingresos en equilibrio</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.ingresos)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Margen de contribución</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.margenContribucion)}/ud.</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
