import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PapelRecicladoTool() {
  const [kilos, setKilos] = useState('');
  const [result, setResult] = useState<{ arbolesAhorrados: number; aguaAhorrada: number; co2Ahorrado: number; energiaAhorrada: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const k = parseFloat(kilos.replace(',', '.'));
      if (isNaN(k) || k <= 0) throw new Error('Introduce los kilogramos de papel reciclado.');
      setResult({
        arbolesAhorrados: k / 60,
        aguaAhorrada: k * 26,
        co2Ahorrado: k * 1.1,
        energiaAhorrada: k * 4,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Recursos ahorrados al reciclar papel en lugar de producirlo con materia virgen.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Kilos de papel reciclado</label>
        <input type="number" value={kilos} onChange={(e) => { setKilos(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ahorro</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Árboles ahorrados</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.arbolesAhorrados, 2)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Agua ahorrada</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.aguaAhorrada, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ ahorrado</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2Ahorrado, 2)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Energía ahorrada</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.energiaAhorrada, 1)} kWh</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
