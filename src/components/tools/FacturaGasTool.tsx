import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function FacturaGasTool() {
  const [consumo, setConsumo] = useState('');
  const [preciom3, setPreciom3] = useState('0.07');
  const [potenciaContratada, setPotenciaContratada] = useState('5');
  const [diasFacturacion, setDiasFacturacion] = useState('30');
  const [result, setResult] = useState<{ terminoConsumo: number; terminoPotencia: number; subtotal: number; iva: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(consumo.replace(',', '.'));
      const pm = parseFloat(preciom3.replace(',', '.'));
      const pot = parseFloat(potenciaContratada.replace(',', '.'));
      const dias = parseFloat(diasFacturacion.replace(',', '.'));
      if (isNaN(c) || isNaN(pm) || isNaN(pot) || isNaN(dias)) throw new Error('Introduce todos los valores.');
      if (c < 0 || pm <= 0 || pot <= 0 || dias <= 0) throw new Error('Los valores deben ser positivos.');
      const terminoConsumo = c * pm;
      const terminoPotencia = pot * dias * 0.003;
      const subtotal = terminoConsumo + terminoPotencia;
      const iva = subtotal * 0.21;
      setResult({ terminoConsumo, terminoPotencia, subtotal, iva, total: subtotal + iva });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo (m³)</label><input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 80" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio gas (€/m³)</label><input type="number" value={preciom3} onChange={(e) => { setPreciom3(e.target.value); setResult(null); }} placeholder="0.07" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia contratada (kW)</label><input type="number" value={potenciaContratada} onChange={(e) => { setPotenciaContratada(e.target.value); setResult(null); }} placeholder="5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de facturación</label><input type="number" value={diasFacturacion} onChange={(e) => { setDiasFacturacion(e.target.value); setResult(null); }} placeholder="30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular factura</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Término consumo</span><span>{formatCurrency(result.terminoConsumo)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Término potencia</span><span>{formatCurrency(result.terminoPotencia)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Subtotal</span><span>{formatCurrency(result.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">IVA (21%)</span><span>{formatCurrency(result.iva)}</span></div>
            <div className="flex justify-between font-extrabold text-base border-t border-[var(--color-border)] pt-1"><span>Total</span><span>{formatCurrency(result.total)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
