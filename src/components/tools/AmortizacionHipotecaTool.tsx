import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function AmortizacionHipotecaTool() {
  const [capital, setCapital] = useState('');
  const [interes, setInteres] = useState('');
  const [anios, setAnios] = useState('');
  const [result, setResult] = useState<{ cuota: number; totalPagado: number; totalIntereses: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(capital.replace(',', '.'));
      const r = parseFloat(interes.replace(',', '.')) / 100 / 12;
      const n = parseFloat(anios.replace(',', '.')) * 12;
      if (isNaN(c) || isNaN(r) || isNaN(n)) throw new Error('Introduce capital, interés anual y plazo.');
      if (c <= 0 || n <= 0) throw new Error('El capital y el plazo deben ser positivos.');
      if (r < 0) throw new Error('El tipo de interés no puede ser negativo.');
      let cuota: number;
      if (r === 0) {
        cuota = c / n;
      } else {
        cuota = c * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      }
      const totalPagado = cuota * n;
      setResult({ cuota, totalPagado, totalIntereses: totalPagado - c });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Capital prestado (€)</label>
          <input type="number" value={capital} onChange={(e) => { setCapital(e.target.value); setResult(null); }} placeholder="150000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Interés anual (%)</label>
          <input type="number" value={interes} onChange={(e) => { setInteres(e.target.value); setResult(null); }} placeholder="3.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Plazo (años)</label>
          <input type="number" value={anios} onChange={(e) => { setAnios(e.target.value); setResult(null); }} placeholder="30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular cuota</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Cuota mensual</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.cuota)}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total pagado</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalPagado)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total intereses</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalIntereses)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
