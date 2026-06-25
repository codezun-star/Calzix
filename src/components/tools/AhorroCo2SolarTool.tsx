import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function AhorroCo2SolarTool() {
  const [generacion, setGeneracion] = useState('');
  const [factor, setFactor] = useState('0.25');
  const [result, setResult] = useState<{ co2: number; arboles: number; km: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const g = parseFloat(generacion), f = parseFloat(factor);
      if (isNaN(g) || g <= 0) throw new Error('Introduce la generación solar anual en kWh.');
      if (isNaN(f) || f < 0) throw new Error('Introduce el factor de emisión de la red eléctrica.');
      const co2 = g * f;
      setResult({ co2, arboles: co2 / 22, km: co2 / 0.12 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El factor de emisión de la red varía por país (0,15-0,45 kg CO₂/kWh). Usa el de tu mix eléctrico.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Generación solar (kWh/año)</label>
          <input type="number" value={generacion} onChange={(e) => { setGeneracion(e.target.value); setResult(null); }} placeholder="Ej. 4500" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Factor red (kg CO₂/kWh)</label>
          <input type="number" value={factor} onChange={(e) => { setFactor(e.target.value); setResult(null); }} placeholder="0.25" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular CO₂ evitado</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">CO₂ evitado al año</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2, 0)} kg CO₂</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a lo que absorben unos {formatNumber(result.arboles, 0)} árboles al año, o a no recorrer {formatNumber(result.km, 0)} km en coche.</p>
        </div>
      )}
    </div>
  );
}
