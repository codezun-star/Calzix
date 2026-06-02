import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function AutonomiaTool() {
  const [bateria, setBateria] = useState('');
  const [consumo, setConsumo] = useState('');
  const [velocidad, setVelocidad] = useState('120');
  const [result, setResult] = useState<{ autonomiaKm: number; tiempoHoras: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const b = parseFloat(bateria.replace(',', '.'));
      const c = parseFloat(consumo.replace(',', '.'));
      const v = parseFloat(velocidad.replace(',', '.'));
      if (isNaN(b) || isNaN(c) || isNaN(v)) throw new Error('Introduce capacidad de batería, consumo y velocidad.');
      if (b <= 0 || c <= 0 || v <= 0) throw new Error('Los valores deben ser positivos.');
      const autonomiaKm = (b / c) * 100;
      const tiempoHoras = autonomiaKm / v;
      setResult({ autonomiaKm, tiempoHoras });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Capacidad de batería (kWh)</label><input type="number" value={bateria} onChange={(e) => { setBateria(e.target.value); setResult(null); }} placeholder="Ej. 77" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo real (kWh/100 km)</label><input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 18" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad media (km/h)</label><input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="120" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular autonomía</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Autonomía estimada</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.autonomiaKm, 0)} km</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo de viaje</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.tiempoHoras, 2)} h</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
