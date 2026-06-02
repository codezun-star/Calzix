import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'potencia' | 'tension' | 'intensidad';

export default function PotenciaElectricaTool() {
  const [modo, setModo] = useState<Modo>('potencia');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; labelA: string; labelB: string; unit: string }[] = [
    { value: 'potencia',   label: 'Calcular potencia (W)',    labelA: 'Tensión (V)',    labelB: 'Intensidad (A)', unit: 'W' },
    { value: 'tension',    label: 'Calcular tensión (V)',     labelA: 'Potencia (W)',   labelB: 'Intensidad (A)', unit: 'V' },
    { value: 'intensidad', label: 'Calcular intensidad (A)',  labelA: 'Potencia (W)',   labelB: 'Tensión (V)',    unit: 'A' },
  ];
  const m = modos.find((x) => x.value === modo)!;

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      if (isNaN(na) || isNaN(nb)) throw new Error('Introduce valores numéricos válidos.');
      if (nb === 0) throw new Error('El segundo valor no puede ser cero.');
      if (modo === 'potencia')   setResult(na * nb);
      if (modo === 'tension')    setResult(na / nb);
      if (modo === 'intensidad') setResult(na / nb);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">P = V · I</p>
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
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} {m.unit}</p>
          {modo === 'potencia' && <p className="text-xs text-[var(--color-text-muted)] mt-1">{formatNumber(result / 1000, 4)} kW</p>}
        </div>
      )}
    </div>
  );
}
