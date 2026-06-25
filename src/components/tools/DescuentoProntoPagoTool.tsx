import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DescuentoProntoPagoTool() {
  const [importe, setImporte] = useState('');
  const [descuento, setDescuento] = useState('');
  const [dias, setDias] = useState('');
  const [result, setResult] = useState<{ ahorro: number; neto: number; tae: number | null } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const imp = parseFloat(importe), d = parseFloat(descuento), dd = parseFloat(dias);
      if (isNaN(imp) || isNaN(d)) throw new Error('Introduce el importe y el porcentaje de descuento.');
      if (imp < 0 || d < 0 || d > 100) throw new Error('El descuento debe estar entre 0 y 100 %.');
      const ahorro = (imp * d) / 100;
      // Coste financiero anualizado de NO acogerse (aprox.)
      let tae: number | null = null;
      if (!isNaN(dd) && dd > 0 && d < 100) tae = (d / (100 - d)) * (365 / dd) * 100;
      setResult({ ahorro, neto: imp - ahorro, tae });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe de la factura</label>
          <input type="number" value={importe} onChange={(e) => { setImporte(e.target.value); setResult(null); }} placeholder="Ej. 1000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Descuento (%)</label>
          <input type="number" value={descuento} onChange={(e) => { setDescuento(e.target.value); setResult(null); }} placeholder="Ej. 2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días adelantados <span className="opacity-60">opc.</span></label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="Ej. 30" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">A pagar con descuento</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.neto)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Ahorras {formatCurrency(result.ahorro)}.{result.tae !== null && ` Equivale a un rendimiento anual del ${result.tae.toFixed(1)} % por pagar antes.`}</p>
        </div>
      )}
    </div>
  );
}
