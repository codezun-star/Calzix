import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function CostoPeajesTool() {
  const [numPeajes, setNumPeajes] = useState('');
  const [costeMedio, setCosteMedio] = useState('');
  const [diasAnio, setDiasAnio] = useState('250');
  const [result, setResult] = useState<{ porViaje: number; semanal: number; mensual: number; anual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(numPeajes.replace(',', '.'));
      const c = parseFloat(costeMedio.replace(',', '.'));
      const d = parseFloat(diasAnio.replace(',', '.'));
      if (isNaN(n) || isNaN(c) || isNaN(d)) throw new Error('Introduce todos los valores.');
      if (n <= 0 || c <= 0 || d <= 0) throw new Error('Los valores deben ser positivos.');
      const porViaje = n * c;
      setResult({ porViaje, semanal: porViaje * 5, mensual: porViaje * (d / 12), anual: porViaje * d });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de peajes por trayecto</label><input type="number" value={numPeajes} onChange={(e) => { setNumPeajes(e.target.value); setResult(null); }} placeholder="Ej. 2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Coste medio por peaje (€)</label><input type="number" value={costeMedio} onChange={(e) => { setCosteMedio(e.target.value); setResult(null); }} placeholder="Ej. 1.50" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Días al año que usas la ruta</label><input type="number" value={diasAnio} onChange={(e) => { setDiasAnio(e.target.value); setResult(null); }} placeholder="250" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por trayecto</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.porViaje)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Semanal (5 días)</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.semanal)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Mensual</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.mensual)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Anual</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.anual)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
