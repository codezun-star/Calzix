import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const TRAMOS = [
  { desde: 1,   hasta: 9,    descuento: 0 },
  { desde: 10,  hasta: 49,   descuento: 5 },
  { desde: 50,  hasta: 99,   descuento: 10 },
  { desde: 100, hasta: 499,  descuento: 15 },
  { desde: 500, hasta: Infinity, descuento: 20 },
];

export default function DescuentoVolumenTool() {
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descuentoManual, setDescuentoManual] = useState('');
  const [modoManual, setModoManual] = useState(false);
  const [result, setResult] = useState<{ descuento: number; precioFinal: number; ahorro: number; totalFinal: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pu = parseFloat(precioUnitario.replace(',', '.'));
      const q  = parseFloat(cantidad.replace(',', '.'));
      if (isNaN(pu) || isNaN(q)) throw new Error('Introduce precio unitario y cantidad.');
      if (pu <= 0 || q <= 0) throw new Error('Los valores deben ser positivos.');
      let descuento: number;
      if (modoManual) {
        descuento = parseFloat(descuentoManual.replace(',', '.'));
        if (isNaN(descuento) || descuento < 0 || descuento >= 100) throw new Error('El descuento debe estar entre 0 y 100.');
      } else {
        const tramo = TRAMOS.find((t) => q >= t.desde && q <= t.hasta);
        descuento = tramo ? tramo.descuento : 0;
      }
      const precioFinal = pu * (1 - descuento / 100);
      const ahorro = pu - precioFinal;
      setResult({ descuento, precioFinal, ahorro, totalFinal: precioFinal * q });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio unitario (€)</label>
          <input type="number" value={precioUnitario} onChange={(e) => { setPrecioUnitario(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad de unidades</label>
          <input type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} placeholder="Ej. 50" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={modoManual} onChange={(e) => { setModoManual(e.target.checked); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" />
        <span className="text-sm text-[var(--color-text)]">Usar descuento personalizado</span>
      </label>
      {modoManual && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Descuento personalizado (%)</label>
          <input type="number" value={descuentoManual} onChange={(e) => { setDescuentoManual(e.target.value); setResult(null); }} placeholder="Ej. 12" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      )}
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Descuento aplicado</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatPercent(result.descuento)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Precio unitario final</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.precioFinal)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Ahorro por unidad</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.ahorro)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total a pagar</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalFinal)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
