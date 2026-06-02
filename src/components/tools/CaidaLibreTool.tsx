import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'tiempo' | 'altura' | 'velocidad';

export default function CaidaLibreTool() {
  const [modo, setModo] = useState<Modo>('tiempo');
  const [input, setInput] = useState('');
  const [g, setG] = useState('9.81');
  const [result, setResult] = useState<{ h: number; v: number; t: number } | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; placeholder: string; unit: string }[] = [
    { value: 'tiempo',    label: 'Conoces el tiempo (s)',    placeholder: 'Ej. 3', unit: 's' },
    { value: 'altura',    label: 'Conoces la altura (m)',    placeholder: 'Ej. 44.1', unit: 'm' },
    { value: 'velocidad', label: 'Conoces la velocidad (m/s)', placeholder: 'Ej. 29.4', unit: 'm/s' },
  ];
  const m = modos.find((x) => x.value === modo)!;

  function calcular() {
    try {
      setError('');
      const val = parseFloat(input.replace(',', '.'));
      const gv  = parseFloat(g.replace(',', '.'));
      if (isNaN(val) || isNaN(gv)) throw new Error('Introduce valores numéricos válidos.');
      if (val <= 0 || gv <= 0)    throw new Error('Los valores deben ser positivos.');
      let h: number, v: number, t: number;
      if (modo === 'tiempo') {
        t = val; h = 0.5 * gv * t * t; v = gv * t;
      } else if (modo === 'altura') {
        h = val; t = Math.sqrt((2 * h) / gv); v = gv * t;
      } else {
        v = val; t = v / gv; h = 0.5 * gv * t * t;
      }
      setResult({ h, v, t });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Dato conocido</legend>
        {modos.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={md.value} checked={modo === md.value} onChange={() => { setModo(md.value); setResult(null); setError(''); setInput(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Valor ({m.unit})</label>
          <input type="number" value={input} onChange={(e) => { setInput(e.target.value); setResult(null); }} placeholder={m.placeholder} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Gravedad (m/s²)</label>
          <input type="number" value={g} onChange={(e) => { setG(e.target.value); setResult(null); }} placeholder="9.81" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Altura</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.h, 3)} m</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Velocidad</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.v, 3)} m/s</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo</p><p className="text-lg font-extrabold text-[var(--color-text)]">{formatNumber(result.t, 3)} s</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
