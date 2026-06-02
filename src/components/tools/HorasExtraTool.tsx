import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function HorasExtraTool() {
  const [salarioAnual, setSalarioAnual] = useState('');
  const [horasExtra, setHorasExtra] = useState('');
  const [recargo, setRecargo] = useState('25');
  const [result, setResult] = useState<{ valorHora: number; valorExtra: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(salarioAnual.replace(',', '.'));
      const h = parseFloat(horasExtra.replace(',', '.'));
      const r = parseFloat(recargo.replace(',', '.'));
      if (isNaN(s) || isNaN(h) || isNaN(r)) throw new Error('Introduce todos los valores.');
      if (s <= 0 || h <= 0) throw new Error('El salario y las horas deben ser positivos.');
      if (r < 0) throw new Error('El recargo no puede ser negativo.');
      const horasAnuales = 1800;
      const valorHora = s / horasAnuales;
      const valorExtra = valorHora * (1 + r / 100);
      setResult({ valorHora, valorExtra, total: valorExtra * h });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario bruto anual (€)</label>
        <input type="number" value={salarioAnual} onChange={(e) => { setSalarioAnual(e.target.value); setResult(null); }} placeholder="Ej. 30000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas extra realizadas</label>
          <input type="number" value={horasExtra} onChange={(e) => { setHorasExtra(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Recargo sobre hora normal (%)</label>
          <input type="number" value={recargo} onChange={(e) => { setRecargo(e.target.value); setResult(null); }} placeholder="25" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Valor hora normal</p><p className="text-base font-extrabold text-[var(--color-text)]">{formatCurrency(result.valorHora)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Valor hora extra</p><p className="text-base font-extrabold text-[var(--color-text)]">{formatCurrency(result.valorExtra)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total a cobrar</p><p className="text-base font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
