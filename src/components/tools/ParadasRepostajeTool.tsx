import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ParadasRepostajeTool() {
  const [distancia, setDistancia] = useState('');
  const [autonomia, setAutonomia] = useState('');
  const [reserva, setReserva] = useState('15');
  const [result, setResult] = useState<{ paradas: number; util: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia), a = parseFloat(autonomia), r = parseFloat(reserva || '0');
      if (isNaN(d) || d <= 0) throw new Error('Introduce la distancia total del viaje.');
      if (isNaN(a) || a <= 0) throw new Error('Introduce la autonomía con el depósito lleno.');
      if (isNaN(r) || r < 0 || r >= 100) throw new Error('La reserva debe estar entre 0 y 99 %.');
      const util = a * (1 - r / 100);
      const paradas = Math.max(0, Math.ceil(d / util) - 1);
      setResult({ paradas, util });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula cuántas veces tendrás que repostar en un viaje largo dejando un margen de reserva.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia total (km)</label>
          <input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 1200" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Autonomía (km)</label>
          <input type="number" value={autonomia} onChange={(e) => { setAutonomia(e.target.value); setResult(null); }} placeholder="Ej. 700" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Reserva (%)</label>
          <input type="number" value={reserva} onChange={(e) => { setReserva(e.target.value); setResult(null); }} placeholder="15" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular paradas</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Paradas de repostaje necesarias</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.paradas} {result.paradas === 1 ? 'parada' : 'paradas'}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Repostando cada {formatNumber(result.util, 0)} km aprox. (con la reserva de seguridad).</p>
        </div>
      )}
    </div>
  );
}
