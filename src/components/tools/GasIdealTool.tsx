import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'presion' | 'volumen' | 'moles' | 'temperatura';

const R = 8.314; // J/(mol·K)

export default function GasIdealTool() {
  const [modo, setModo] = useState<Modo>('presion');
  const [p, setP] = useState('');
  const [v, setV] = useState('');
  const [n, setN] = useState('');
  const [t, setT] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; unit: string }[] = [
    { value: 'presion',      label: 'Calcular presión P (Pa)',       unit: 'Pa' },
    { value: 'volumen',      label: 'Calcular volumen V (m³)',       unit: 'm³' },
    { value: 'moles',        label: 'Calcular moles n (mol)',        unit: 'mol' },
    { value: 'temperatura',  label: 'Calcular temperatura T (K)',    unit: 'K' },
  ];

  function calcular() {
    try {
      setError('');
      const pv = parseFloat(p.replace(',', '.'));
      const vv = parseFloat(v.replace(',', '.'));
      const nv = parseFloat(n.replace(',', '.'));
      const tv = parseFloat(t.replace(',', '.'));
      if (modo === 'presion') {
        if (isNaN(vv) || isNaN(nv) || isNaN(tv)) throw new Error('Introduce V, n y T.');
        if (vv <= 0 || tv <= 0 || nv <= 0) throw new Error('Los valores deben ser positivos.');
        setResult((nv * R * tv) / vv);
      } else if (modo === 'volumen') {
        if (isNaN(pv) || isNaN(nv) || isNaN(tv)) throw new Error('Introduce P, n y T.');
        if (pv <= 0 || tv <= 0 || nv <= 0) throw new Error('Los valores deben ser positivos.');
        setResult((nv * R * tv) / pv);
      } else if (modo === 'moles') {
        if (isNaN(pv) || isNaN(vv) || isNaN(tv)) throw new Error('Introduce P, V y T.');
        if (pv <= 0 || vv <= 0 || tv <= 0) throw new Error('Los valores deben ser positivos.');
        setResult((pv * vv) / (R * tv));
      } else {
        if (isNaN(pv) || isNaN(vv) || isNaN(nv)) throw new Error('Introduce P, V y n.');
        if (pv <= 0 || vv <= 0 || nv <= 0) throw new Error('Los valores deben ser positivos.');
        setResult((pv * vv) / (nv * R));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const inp = (label: string, val: string, set: (s: string) => void) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label>
      <input type="number" value={val} onChange={(e) => { set(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
    </div>
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">PV = nRT &nbsp;(R = 8,314 J/mol·K)</p>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Calcular</legend>
        {modos.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={md.value} checked={modo === md.value} onChange={() => { setModo(md.value); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        {modo !== 'presion' && inp('Presión P (Pa)', p, setP)}
        {modo !== 'volumen' && inp('Volumen V (m³)', v, setV)}
        {modo !== 'moles' && inp('Moles n (mol)', n, setN)}
        {modo !== 'temperatura' && inp('Temperatura T (K)', t, setT)}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 6)} {modos.find(md => md.value === modo)!.unit}</p>
        </div>
      )}
    </div>
  );
}
