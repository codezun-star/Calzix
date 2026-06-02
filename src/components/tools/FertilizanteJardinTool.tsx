import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Cultivo = 'cesped' | 'hortalizas' | 'frutales' | 'flores' | 'arbustos';

const DOSIS: Record<Cultivo, { label: string; gm2: number; frecuencia: string }> = {
  cesped:     { label: 'Césped',        gm2: 30, frecuencia: 'cada 4-6 semanas' },
  hortalizas: { label: 'Hortalizas',    gm2: 40, frecuencia: 'cada 3-4 semanas' },
  frutales:   { label: 'Árboles frutales', gm2: 50, frecuencia: 'cada 4-8 semanas' },
  flores:     { label: 'Flores',        gm2: 20, frecuencia: 'cada 3-4 semanas' },
  arbustos:   { label: 'Arbustos',      gm2: 25, frecuencia: 'cada 6-8 semanas' },
};

export default function FertilizanteJardinTool() {
  const [cultivo, setCultivo] = useState<Cultivo>('cesped');
  const [area, setArea] = useState('');
  const [result, setResult] = useState<{ gramos: number; kilogramos: number; frecuencia: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const a = parseFloat(area.replace(',', '.'));
      if (isNaN(a) || a <= 0) throw new Error('Introduce el área en metros cuadrados.');
      const d = DOSIS[cultivo];
      const gramos = a * d.gm2;
      setResult({ gramos, kilogramos: gramos / 1000, frecuencia: d.frecuencia });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de cultivo</label>
        <select value={cultivo} onChange={(e) => { setCultivo(e.target.value as Cultivo); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {(Object.entries(DOSIS) as [Cultivo, { label: string; gm2: number; frecuencia: string }][]).map(([k, v]) => <option key={k} value={k}>{v.label} ({v.gm2} g/m²)</option>)}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Área del jardín (m²)</label>
        <input type="number" value={area} onChange={(e) => { setArea(e.target.value); setResult(null); }} placeholder="Ej. 30" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular fertilizante</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Cantidad por aplicación</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.gramos, 0)} g ({formatNumber(result.kilogramos, 2)} kg)</p></div>
          <p className="text-sm text-[var(--color-text-secondary)]">Frecuencia recomendada: {result.frecuencia}</p>
        </div>
      )}
    </div>
  );
}
