import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const CAMPOS: { key: string; label: string; ph: string }[] = [
  { key: 'alquiler', label: 'Alojamiento', ph: '350' },
  { key: 'comida', label: 'Alimentación', ph: '200' },
  { key: 'transporte', label: 'Transporte', ph: '40' },
  { key: 'material', label: 'Material y libros', ph: '30' },
  { key: 'ocio', label: 'Ocio y otros', ph: '80' },
];

export default function PresupuestoEstudianteTool() {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ mensual: number; anual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      let mensual = 0;
      for (const c of CAMPOS) {
        const v = parseFloat(valores[c.key] || '0');
        if (isNaN(v) || v < 0) throw new Error('Todos los gastos deben ser números positivos.');
        mensual += v;
      }
      if (mensual === 0) throw new Error('Introduce al menos un gasto.');
      setResult({ mensual, anual: mensual * 12 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Introduce tus gastos mensuales estimados para conocer tu presupuesto de estudiante.</p>
      <div className="grid grid-cols-2 gap-3">
        {CAMPOS.map((c) => (
          <div key={c.key} className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">{c.label}</label>
            <input type="number" value={valores[c.key] ?? ''} onChange={(e) => { setValores({ ...valores, [c.key]: e.target.value }); setResult(null); }} placeholder={c.ph} className={INPUT} />
          </div>
        ))}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular presupuesto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Gasto mensual total</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.mensual)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Coste anual estimado: <strong>{formatCurrency(result.anual)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
