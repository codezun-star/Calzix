import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function RentabilidadRoiTool() {
  const [inversion, setInversion] = useState('');
  const [ganancia, setGanancia] = useState('');
  const [anios, setAnios] = useState('1');
  const [result, setResult] = useState<{ roi: number; roiAnual: number; beneficio: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const inv = parseFloat(inversion.replace(',', '.'));
      const gan = parseFloat(ganancia.replace(',', '.'));
      const a   = parseFloat(anios.replace(',', '.'));
      if (isNaN(inv) || isNaN(gan) || isNaN(a)) throw new Error('Introduce todos los valores.');
      if (inv <= 0) throw new Error('La inversión debe ser positiva.');
      if (a <= 0) throw new Error('El período debe ser positivo.');
      const beneficio = gan - inv;
      const roi = (beneficio / inv) * 100;
      const roiAnual = roi / a;
      setResult({ roi, roiAnual, beneficio });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">ROI = (Ganancia − Inversión) / Inversión × 100</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Inversión inicial (€)</label>
          <input type="number" value={inversion} onChange={(e) => { setInversion(e.target.value); setResult(null); }} placeholder="Ej. 10000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Valor final / Ganancia total (€)</label>
          <input type="number" value={ganancia} onChange={(e) => { setGanancia(e.target.value); setResult(null); }} placeholder="Ej. 13000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Período (años)</label>
        <input type="number" value={anios} onChange={(e) => { setAnios(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ROI</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">ROI total</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatPercent(result.roi)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">ROI anual</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatPercent(result.roiAnual)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Beneficio</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.beneficio)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
