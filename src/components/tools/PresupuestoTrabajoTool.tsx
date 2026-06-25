import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PresupuestoTrabajoTool() {
  const [materiales, setMateriales] = useState('');
  const [horas, setHoras] = useState('');
  const [precioHora, setPrecioHora] = useState('');
  const [margen, setMargen] = useState('20');
  const [iva, setIva] = useState('21');
  const [result, setResult] = useState<{ mano: number; subtotal: number; conMargen: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const mat = parseFloat(materiales || '0'), h = parseFloat(horas || '0'), ph = parseFloat(precioHora || '0'), mg = parseFloat(margen || '0'), iv = parseFloat(iva || '0');
      if ([mat, h, ph, mg, iv].some((x) => isNaN(x) || x < 0)) throw new Error('Revisa los datos: deben ser números positivos.');
      const mano = h * ph;
      const subtotal = mat + mano;
      const conMargen = subtotal * (1 + mg / 100);
      const total = conMargen * (1 + iv / 100);
      setResult({ mano, subtotal, conMargen, total });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Coste de materiales</label>
          <input type="number" value={materiales} onChange={(e) => { setMateriales(e.target.value); setResult(null); }} placeholder="Ej. 300" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de trabajo</label>
          <input type="number" value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio por hora</label>
          <input type="number" value={precioHora} onChange={(e) => { setPrecioHora(e.target.value); setResult(null); }} placeholder="Ej. 25" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Margen (%)</label>
          <input type="number" value={margen} onChange={(e) => { setMargen(e.target.value); setResult(null); }} placeholder="20" className={INPUT} />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">IVA (%)</label>
          <input type="number" value={iva} onChange={(e) => { setIva(e.target.value); setResult(null); }} placeholder="21" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular presupuesto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Mano de obra</span><span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.mano)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Subtotal (materiales + mano)</span><span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Con margen</span><span className="font-semibold text-[var(--color-text)]">{formatCurrency(result.conMargen)}</span></div>
          <div className="flex justify-between border-t border-[var(--color-calcs-border)] pt-2"><span className="font-bold text-[var(--color-text)]">Total con IVA</span><span className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</span></div>
        </div>
      )}
    </div>
  );
}
