import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function LatasAluminioTool() {
  const [latas, setLatas] = useState('');
  const [periodo, setPeriodo] = useState('7');
  const [result, setResult] = useState<{ anual: number; kg: number; kwh: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(latas), p = parseFloat(periodo);
      if (isNaN(n) || n < 0) throw new Error('Introduce el número de latas.');
      if (isNaN(p) || p <= 0) throw new Error('Introduce el periodo en días.');
      const anual = (n / p) * 365;
      // 1 lata ≈ 15 g; reciclar 1 lata ahorra ≈ 0,14 kWh
      setResult({ anual, kg: (anual * 15) / 1000, kwh: anual * 0.14 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Reciclar aluminio ahorra hasta un 95 % de la energía necesaria para producirlo nuevo.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Latas que reciclas</label>
          <input type="number" value={latas} onChange={(e) => { setLatas(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cada (días)</label>
          <input type="number" value={periodo} onChange={(e) => { setPeriodo(e.target.value); setResult(null); }} placeholder="7" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular impacto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Reciclas al año</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.anual, 0)} latas</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatNumber(result.kg, 1)} kg de aluminio · ahorras unos {formatNumber(result.kwh, 0)} kWh de energía al año. Valores orientativos.</p>
        </div>
      )}
    </div>
  );
}
