import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Tipo = 'pet' | 'hdpe' | 'pvc' | 'ldpe' | 'pp' | 'ps';

const PLASTICOS: Record<Tipo, { label: string; petreoAhorrado: number; co2Ahorrado: number; energiaAhorrada: number }> = {
  pet:  { label: 'PET (botellas agua)',    petreoAhorrado: 0.6,  co2Ahorrado: 1.5,  energiaAhorrada: 30 },
  hdpe: { label: 'HDPE (garrafas)',        petreoAhorrado: 0.5,  co2Ahorrado: 1.2,  energiaAhorrada: 25 },
  pvc:  { label: 'PVC',                   petreoAhorrado: 0.45, co2Ahorrado: 1.9,  energiaAhorrada: 22 },
  ldpe: { label: 'LDPE (bolsas)',          petreoAhorrado: 0.55, co2Ahorrado: 1.3,  energiaAhorrada: 28 },
  pp:   { label: 'PP (envases comida)',   petreoAhorrado: 0.5,  co2Ahorrado: 1.1,  energiaAhorrada: 24 },
  ps:   { label: 'PS (poliestireno)',      petreoAhorrado: 0.4,  co2Ahorrado: 1.0,  energiaAhorrada: 20 },
};

export default function PlasticoRecicladoTool() {
  const [tipo, setTipo] = useState<Tipo>('pet');
  const [kilos, setKilos] = useState('');
  const [result, setResult] = useState<{ petroleo: number; co2: number; energia: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const k = parseFloat(kilos.replace(',', '.'));
      if (isNaN(k) || k <= 0) throw new Error('Introduce los kilogramos de plástico reciclado.');
      const p = PLASTICOS[tipo];
      setResult({ petroleo: k * p.petreoAhorrado, co2: k * p.co2Ahorrado, energia: k * p.energiaAhorrada });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de plástico</label>
        <select value={tipo} onChange={(e) => { setTipo(e.target.value as Tipo); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {(Object.entries(PLASTICOS) as [Tipo, (typeof PLASTICOS)[Tipo]][]).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Kilos de plástico reciclado</label>
        <input type="number" value={kilos} onChange={(e) => { setKilos(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ahorro</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Petróleo ahorrado</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.petroleo, 2)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ evitado</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2, 2)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Energía ahorrada</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.energia, 1)} kWh</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
