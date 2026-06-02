import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'velocidad' | 'frecuencia' | 'longitud';

export default function FrecuenciaOndaTool() {
  const [modo, setModo] = useState<Modo>('velocidad');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; labelA: string; labelB: string; unit: string }[] = [
    { value: 'velocidad',  label: 'Calcular velocidad (m/s)',      labelA: 'Frecuencia (Hz)',   labelB: 'Longitud de onda (m)',  unit: 'm/s' },
    { value: 'frecuencia', label: 'Calcular frecuencia (Hz)',       labelA: 'Velocidad (m/s)',   labelB: 'Longitud de onda (m)',  unit: 'Hz' },
    { value: 'longitud',   label: 'Calcular longitud de onda (m)',  labelA: 'Velocidad (m/s)',   labelB: 'Frecuencia (Hz)',       unit: 'm' },
  ];
  const m = modos.find((x) => x.value === modo)!;

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      if (isNaN(na) || isNaN(nb)) throw new Error('Introduce valores numéricos válidos.');
      if (nb === 0) throw new Error('El segundo valor no puede ser cero.');
      if (na <= 0 || nb <= 0) throw new Error('Los valores deben ser positivos.');
      if (modo === 'velocidad')  setResult(na * nb);
      if (modo === 'frecuencia') setResult(na / nb);
      if (modo === 'longitud')   setResult(na / nb);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">v = f · λ</p>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Calcular</legend>
        {modos.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={md.value} checked={modo === md.value} onChange={() => { setModo(md.value); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{m.labelA}</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{m.labelB}</label>
          <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 6)} {m.unit}</p>
        </div>
      )}
    </div>
  );
}
