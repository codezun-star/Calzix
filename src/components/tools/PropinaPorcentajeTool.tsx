import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function PropinaPorcentajeTool() {
  const [cuenta, setCuenta] = useState('');
  const [porcentaje, setPorcentaje] = useState('10');
  const [result, setResult] = useState<{ propina: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(cuenta.replace(',', '.'));
      const p = parseFloat(porcentaje.replace(',', '.'));
      if (isNaN(c) || isNaN(p)) throw new Error('Introduce el importe de la cuenta y el porcentaje de propina.');
      if (c <= 0) throw new Error('El importe debe ser positivo.');
      if (p < 0) throw new Error('El porcentaje no puede ser negativo.');
      const propina = c * p / 100;
      setResult({ propina, total: c + propina });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const RAPIDOS = [5, 10, 15, 20];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe de la cuenta (€)</label>
        <input type="number" value={cuenta} onChange={(e) => { setCuenta(e.target.value); setResult(null); }} placeholder="Ej. 45.50" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Porcentaje de propina (%)</label>
        <input type="number" value={porcentaje} onChange={(e) => { setPorcentaje(e.target.value); setResult(null); }} placeholder="10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="flex gap-2">
        {RAPIDOS.map((p) => (
          <button key={p} onClick={() => { setPorcentaje(String(p)); setResult(null); }} className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition-colors ${porcentaje === String(p) ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-calcs-bg)] text-[var(--color-text)]'}`}>{p}%</button>
        ))}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular propina</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Propina ({formatPercent(parseFloat(porcentaje))})</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.propina)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total a pagar</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
