import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function EquilibrioQuimicoTool() {
  const [coefA, setCoefA] = useState('1');
  const [coefB, setCoefB] = useState('1');
  const [coefC, setCoefC] = useState('1');
  const [coefD, setCoefD] = useState('1');
  const [concA, setConcA] = useState('');
  const [concB, setConcB] = useState('');
  const [concC, setConcC] = useState('');
  const [concD, setConcD] = useState('');
  const [result, setResult] = useState<{ kc: number; descripcion: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const ca = parseFloat(concA.replace(',', '.'));
      const cb = parseFloat(concB.replace(',', '.'));
      const cc = parseFloat(concC.replace(',', '.'));
      const cd = parseFloat(concD.replace(',', '.'));
      const na = parseFloat(coefA.replace(',', '.'));
      const nb = parseFloat(coefB.replace(',', '.'));
      const nc = parseFloat(coefC.replace(',', '.'));
      const nd = parseFloat(coefD.replace(',', '.'));
      if ([ca,cb,cc,cd].some(isNaN)) throw new Error('Introduce todas las concentraciones en mol/L.');
      if ([ca,cb,cc,cd].some((v) => v <= 0)) throw new Error('Las concentraciones deben ser positivas.');
      const numerador = Math.pow(cc, nc) * Math.pow(cd, nd);
      const denominador = Math.pow(ca, na) * Math.pow(cb, nb);
      const kc = numerador / denominador;
      const descripcion = kc > 1000 ? 'Equilibrio muy desplazado hacia productos.' : kc > 1 ? 'Equilibrio favorece los productos.' : kc === 1 ? 'Concentraciones similares de reactivos y productos.' : 'Equilibrio favorece los reactivos.';
      setResult({ kc, descripcion });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const inp = (label: string, val: string, set: (s: string) => void, ph: string) => (
    <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label><input type="number" value={val} onChange={(e) => { set(e.target.value); setResult(null); }} placeholder={ph} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">aA + bB ⇌ cC + dD &nbsp;→&nbsp; Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</p>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Reactivos (coeficiente y concentración en mol/L)</p>
        <div className="grid grid-cols-4 gap-2">
          {inp('Coef. a', coefA, setCoefA, '1')}
          {inp('[A] mol/L', concA, setConcA, 'Ej. 0.5')}
          {inp('Coef. b', coefB, setCoefB, '1')}
          {inp('[B] mol/L', concB, setConcB, 'Ej. 0.3')}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Productos (coeficiente y concentración en mol/L)</p>
        <div className="grid grid-cols-4 gap-2">
          {inp('Coef. c', coefC, setCoefC, '1')}
          {inp('[C] mol/L', concC, setConcC, 'Ej. 0.2')}
          {inp('Coef. d', coefD, setCoefD, '1')}
          {inp('[D] mol/L', concD, setConcD, 'Ej. 0.4')}
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular Kc</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Constante de equilibrio Kc</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.kc.toExponential(4)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.descripcion}</p>
        </div>
      )}
    </div>
  );
}
