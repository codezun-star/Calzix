import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PresionHidrostaticaTool() {
  const [densidad, setDensidad] = useState('1000');
  const [altura, setAltura] = useState('');
  const [g, setG] = useState('9.81');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const rho = parseFloat(densidad.replace(',', '.'));
      const h   = parseFloat(altura.replace(',', '.'));
      const gv  = parseFloat(g.replace(',', '.'));
      if (isNaN(rho) || isNaN(h) || isNaN(gv)) throw new Error('Introduce valores numéricos válidos.');
      if (rho <= 0 || gv <= 0) throw new Error('La densidad y la gravedad deben ser positivas.');
      if (h < 0) throw new Error('La profundidad no puede ser negativa.');
      setResult(rho * gv * h);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">P = ρ · g · h</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Densidad del fluido (kg/m³)</label>
          <input type="number" value={densidad} onChange={(e) => { setDensidad(e.target.value); setResult(null); }} placeholder="1000 (agua)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Profundidad (m)</label>
          <input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
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
          <p className="text-sm text-[var(--color-text-secondary)]">Presión hidrostática</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 2)} Pa</p>
          <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(result / 1000, 4)} kPa · {formatNumber(result / 101325, 5)} atm</p>
        </div>
      )}
    </div>
  );
}
