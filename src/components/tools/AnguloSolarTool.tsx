import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function AnguloSolarTool() {
  const [latitud, setLatitud] = useState('');
  const [mes, setMes] = useState('6');
  const [result, setResult] = useState<{ optimo: number; medioDia: number } | null>(null);
  const [error, setError] = useState('');

  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  const DECLINACION = [-23.1, -13.3, -2.4, 9.4, 18.8, 23.4, 21.2, 13.5, 2.2, -9.6, -18.9, -23.3];

  function calcular() {
    try {
      setError('');
      const lat = parseFloat(latitud.replace(',', '.'));
      const m = parseInt(mes, 10) - 1;
      if (isNaN(lat)) throw new Error('Introduce la latitud de tu ubicación.');
      if (lat < -90 || lat > 90) throw new Error('La latitud debe estar entre -90° y 90°.');
      const declinacion = DECLINACION[m];
      const medioDia = 90 - Math.abs(lat - declinacion);
      const optimo = lat - declinacion;
      setResult({ optimo: Math.abs(optimo), medioDia });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Ángulo de inclinación óptimo para paneles solares según la latitud y el mes.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Latitud (°)</label>
          <input type="number" min="-90" max="90" value={latitud} onChange={(e) => { setLatitud(e.target.value); setResult(null); }} placeholder="Ej. 40.4 (Madrid)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Mes</label>
          <select value={mes} onChange={(e) => { setMes(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {meses.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ángulo solar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Ángulo óptimo de inclinación</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.optimo, 1)}°</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Ángulo solar mediodía</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.medioDia, 1)}°</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
