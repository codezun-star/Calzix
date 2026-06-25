import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CosteEmpresaTrabajadorTool() {
  const [bruto, setBruto] = useState('');
  const [ss, setSs] = useState('30');
  const [result, setResult] = useState<{ coste: number; cotizacion: number; mensual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const b = parseFloat(bruto), s = parseFloat(ss);
      if (isNaN(b) || b < 0) throw new Error('Introduce el salario bruto anual.');
      if (isNaN(s) || s < 0) throw new Error('Introduce el porcentaje de cotización de la empresa.');
      const cotizacion = (b * s) / 100;
      const coste = b + cotizacion;
      setResult({ coste, cotizacion, mensual: coste / 12 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El coste de un empleado es su salario bruto más las cotizaciones sociales que paga la empresa (típicamente un 28-32 %).</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario bruto anual</label>
          <input type="number" value={bruto} onChange={(e) => { setBruto(e.target.value); setResult(null); }} placeholder="Ej. 24000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cotización empresa (%)</label>
          <input type="number" value={ss} onChange={(e) => { setSs(e.target.value); setResult(null); }} placeholder="30" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Coste total anual para la empresa</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.coste)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Cotizaciones: {formatCurrency(result.cotizacion)} · Coste mensual: <strong>{formatCurrency(result.mensual)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
