import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function CompensacionCo2Tool() {
  const [co2kg, setCo2kg] = useState('');
  const [result, setResult] = useState<{ arboles: number; hectareas: number; anyosBosque: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(co2kg.replace(',', '.'));
      if (isNaN(c) || c <= 0) throw new Error('Introduce la cantidad de CO₂ en kilogramos.');
      const arbolesPorTon = 50;
      const arboles = Math.ceil((c / 1000) * arbolesPorTon);
      const hectareas = (c / 1000) / 5;
      const anyosBosque = hectareas / 0.1;
      setResult({ arboles, hectareas, anyosBosque });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula cuántos árboles necesitas plantar para compensar tus emisiones de CO₂ (absorción media: 20 kg CO₂/árbol/año).</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">CO₂ a compensar (kg)</label>
        <input type="number" value={co2kg} onChange={(e) => { setCo2kg(e.target.value); setResult(null); }} placeholder="Ej. 1000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular compensación</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Árboles a plantar</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.arboles)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Equivalente en bosque</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.hectareas, 3)} ha</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">Estimación basada en 20 kg CO₂/árbol/año. La absorción real varía según la especie y las condiciones.</p>
        </div>
      )}
    </div>
  );
}
