import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function EnergiaPotencialTool() {
  const [masa, setMasa] = useState('');
  const [altura, setAltura] = useState('');
  const [g, setG] = useState('9.81');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(masa.replace(',', '.'));
      const h = parseFloat(altura.replace(',', '.'));
      const gv = parseFloat(g.replace(',', '.'));
      if (isNaN(m) || isNaN(h) || isNaN(gv)) throw new Error('Introduce valores numéricos válidos.');
      if (m <= 0) throw new Error('La masa debe ser mayor que cero.');
      if (gv <= 0) throw new Error('La gravedad debe ser mayor que cero.');
      setResult(m * gv * h);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">Ep = m · g · h</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa (kg)</label>
          <input type="number" value={masa} onChange={(e) => { setMasa(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura (m)</label>
          <input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Gravedad (m/s²)</label>
        <input type="number" value={g} onChange={(e) => { setG(e.target.value); setResult(null); }} placeholder="9.81" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Energía potencial gravitatoria</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} J</p>
          <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(result / 1000, 6)} kJ</p>
        </div>
      )}
    </div>
  );
}
