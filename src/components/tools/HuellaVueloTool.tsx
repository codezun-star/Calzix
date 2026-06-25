import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function HuellaVueloTool() {
  const [distancia, setDistancia] = useState('');
  const [idaVuelta, setIdaVuelta] = useState(true);
  const [clase, setClase] = useState('1');
  const [result, setResult] = useState<{ co2: number; arboles: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia);
      if (isNaN(d) || d <= 0) throw new Error('Introduce la distancia del vuelo en kilómetros.');
      // Factor medio aprox. 0,15 kg CO2 por km y pasajero (turista)
      const km = d * (idaVuelta ? 2 : 1);
      const co2 = km * 0.15 * parseFloat(clase);
      setResult({ co2, arboles: co2 / 22 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia del vuelo (km, solo ida)</label>
        <input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 1050" className={INPUT} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Trayecto</label>
          <select value={idaVuelta ? 'iv' : 'i'} onChange={(e) => { setIdaVuelta(e.target.value === 'iv'); setResult(null); }} className={INPUT}>
            <option value="iv">Ida y vuelta</option>
            <option value="i">Solo ida</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Clase</label>
          <select value={clase} onChange={(e) => { setClase(e.target.value); setResult(null); }} className={INPUT}>
            <option value="1">Turista</option>
            <option value="1.5">Business</option>
            <option value="2">Primera</option>
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular huella</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Emisiones del vuelo (CO₂)</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2, 0)} kg CO₂</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Para compensarlo harían falta unos {formatNumber(result.arboles, 1)} árboles durante un año. Valor orientativo.</p>
        </div>
      )}
    </div>
  );
}
