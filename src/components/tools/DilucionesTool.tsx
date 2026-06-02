import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'v2' | 'c2' | 'v1' | 'c1';

export default function DilucionesTool() {
  const [modo, setModo] = useState<Modo>('v2');
  const [c1, setC1] = useState('');
  const [v1, setV1] = useState('');
  const [c2, setC2] = useState('');
  const [v2, setV2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; unit: string }[] = [
    { value: 'v2', label: 'Calcular volumen final V₂ (mL)', unit: 'mL' },
    { value: 'c2', label: 'Calcular concentración final C₂ (M)', unit: 'M' },
    { value: 'v1', label: 'Calcular volumen inicial V₁ (mL)', unit: 'mL' },
    { value: 'c1', label: 'Calcular concentración inicial C₁ (M)', unit: 'M' },
  ];

  function calcular() {
    try {
      setError('');
      const nc1 = parseFloat(c1.replace(',', '.'));
      const nv1 = parseFloat(v1.replace(',', '.'));
      const nc2 = parseFloat(c2.replace(',', '.'));
      const nv2 = parseFloat(v2.replace(',', '.'));
      if (modo === 'v2') {
        if (isNaN(nc1) || isNaN(nv1) || isNaN(nc2)) throw new Error('Introduce C₁, V₁ y C₂.');
        if (nc2 <= 0) throw new Error('C₂ debe ser positivo.');
        if (nc2 > nc1) throw new Error('La concentración final no puede ser mayor que la inicial.');
        setResult((nc1 * nv1) / nc2);
      } else if (modo === 'c2') {
        if (isNaN(nc1) || isNaN(nv1) || isNaN(nv2)) throw new Error('Introduce C₁, V₁ y V₂.');
        if (nv2 <= 0 || nv2 < nv1) throw new Error('V₂ debe ser mayor que V₁.');
        setResult((nc1 * nv1) / nv2);
      } else if (modo === 'v1') {
        if (isNaN(nc1) || isNaN(nc2) || isNaN(nv2)) throw new Error('Introduce C₁, C₂ y V₂.');
        if (nc1 <= 0) throw new Error('C₁ debe ser positivo.');
        setResult((nc2 * nv2) / nc1);
      } else {
        if (isNaN(nv1) || isNaN(nc2) || isNaN(nv2)) throw new Error('Introduce V₁, C₂ y V₂.');
        if (nv1 <= 0) throw new Error('V₁ debe ser positivo.');
        setResult((nc2 * nv2) / nv1);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const inp = (label: string, val: string, set: (s: string) => void, ph: string) => (
    <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label><input type="number" value={val} onChange={(e) => { set(e.target.value); setResult(null); }} placeholder={ph} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">C₁V₁ = C₂V₂</p>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Calcular</legend>
        {modos.map((m) => (
          <label key={m.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={m.value} checked={modo === m.value} onChange={() => { setModo(m.value); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{m.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        {modo !== 'c1' && inp('Concentración inicial C₁ (M)', c1, setC1, '1')}
        {modo !== 'v1' && inp('Volumen inicial V₁ (mL)', v1, setV1, '10')}
        {modo !== 'c2' && inp('Concentración final C₂ (M)', c2, setC2, '0.1')}
        {modo !== 'v2' && inp('Volumen final V₂ (mL)', v2, setV2, '100')}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} {modos.find(m => m.value === modo)!.unit}</p>
        </div>
      )}
    </div>
  );
}
