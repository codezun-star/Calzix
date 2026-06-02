import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Planta = 'cesped' | 'arbustos' | 'hortalizas' | 'flores' | 'arboles';

const FACTORES: Record<Planta, { label: string; litrosMm2: number }> = {
  cesped:    { label: 'Césped',        litrosMm2: 4   },
  arbustos:  { label: 'Arbustos',      litrosMm2: 2   },
  hortalizas:{ label: 'Hortalizas',    litrosMm2: 5   },
  flores:    { label: 'Flores',        litrosMm2: 3   },
  arboles:   { label: 'Árboles',       litrosMm2: 1.5 },
};

export default function RiegoJardinTool() {
  const [planta, setPlanta] = useState<Planta>('cesped');
  const [area, setArea] = useState('');
  const [diasSemana, setDiasSemana] = useState('3');
  const [result, setResult] = useState<{ litrosSesion: number; litrosSemana: number; litrosMes: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const a = parseFloat(area.replace(',', '.'));
      const d = parseFloat(diasSemana.replace(',', '.'));
      if (isNaN(a) || isNaN(d)) throw new Error('Introduce el área del jardín y los días de riego.');
      if (a <= 0 || d <= 0 || d > 7) throw new Error('El área debe ser positiva y los días entre 1 y 7.');
      const litrosSesion = a * FACTORES[planta].litrosMm2;
      const litrosSemana = litrosSesion * d;
      setResult({ litrosSesion, litrosSemana, litrosMes: litrosSemana * 4 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de planta</label>
        <select value={planta} onChange={(e) => { setPlanta(e.target.value as Planta); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {(Object.entries(FACTORES) as [Planta, { label: string; litrosMm2: number }][]).map(([k, v]) => <option key={k} value={k}>{v.label} (~{v.litrosMm2} L/m²/riego)</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Área del jardín (m²)</label><input type="number" value={area} onChange={(e) => { setArea(e.target.value); setResult(null); }} placeholder="Ej. 50" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Riegos por semana</label><input type="number" value={diasSemana} onChange={(e) => { setDiasSemana(e.target.value); setResult(null); }} placeholder="3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular consumo de agua</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por sesión</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosSesion, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por semana</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosSemana, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por mes</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosMes, 0)} L</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
