import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Transporte = 'coche_gasolina' | 'coche_diesel' | 'coche_electrico' | 'moto' | 'autobus' | 'tren' | 'avion';

const FACTORES: Record<Transporte, { label: string; gco2km: number }> = {
  coche_gasolina:  { label: 'Coche (gasolina)', gco2km: 170 },
  coche_diesel:    { label: 'Coche (diésel)',   gco2km: 150 },
  coche_electrico: { label: 'Coche eléctrico',  gco2km: 50  },
  moto:            { label: 'Moto',             gco2km: 100 },
  autobus:         { label: 'Autobús',           gco2km: 68  },
  tren:            { label: 'Tren (media dist.)', gco2km: 14 },
  avion:           { label: 'Avión',             gco2km: 255 },
};

export default function Co2TransporteTool() {
  const [transporte, setTransporte] = useState<Transporte>('coche_gasolina');
  const [distancia, setDistancia] = useState('');
  const [viajes, setViajes] = useState('1');
  const [result, setResult] = useState<{ co2kg: number; co2anual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia.replace(',', '.'));
      const v = parseFloat(viajes.replace(',', '.')) || 1;
      if (isNaN(d) || d <= 0) throw new Error('Introduce la distancia en kilómetros.');
      const co2kg = (d * v * FACTORES[transporte].gco2km) / 1000;
      const co2anual = co2kg * 365;
      setResult({ co2kg, co2anual });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Medio de transporte</label>
        <select value={transporte} onChange={(e) => { setTransporte(e.target.value as Transporte); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {(Object.entries(FACTORES) as [Transporte, { label: string; gco2km: number }][]).map(([k, v]) => <option key={k} value={k}>{v.label} ({v.gco2km} g CO₂/km)</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia (km)</label><input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Viajes por día</label><input type="number" value={viajes} onChange={(e) => { setViajes(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular emisiones</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ por viaje</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2kg, 3)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ anual (365 días)</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2anual, 1)} kg</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
