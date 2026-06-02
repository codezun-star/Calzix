import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function SistemaEcuacionesTool() {
  const [a1, setA1] = useState('');
  const [b1, setB1] = useState('');
  const [c1, setC1] = useState('');
  const [a2, setA2] = useState('');
  const [b2, setB2] = useState('');
  const [c2, setC2] = useState('');
  const [result, setResult] = useState<{ x: number; y: number } | null>(null);
  const [error, setError] = useState('');

  function parse(s: string) { return parseFloat(s.replace(',', '.')); }

  function calcular() {
    try {
      setError('');
      const pa1 = parse(a1), pb1 = parse(b1), pc1 = parse(c1);
      const pa2 = parse(a2), pb2 = parse(b2), pc2 = parse(c2);
      if ([pa1,pb1,pc1,pa2,pb2,pc2].some(isNaN)) throw new Error('Introduce todos los coeficientes.');
      const det = pa1 * pb2 - pa2 * pb1;
      if (det === 0) throw new Error('El sistema no tiene solución única (ecuaciones dependientes o incompatibles).');
      const x = (pc1 * pb2 - pc2 * pb1) / det;
      const y = (pa1 * pc2 - pa2 * pc1) / det;
      setResult({ x, y });
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
      <p className="text-xs text-[var(--color-text-secondary)] font-mono">a₁x + b₁y = c₁ &nbsp; | &nbsp; a₂x + b₂y = c₂</p>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Primera ecuación</p>
        <div className="grid grid-cols-3 gap-2">{inp('a₁', a1, setA1)}{inp('b₁', b1, setB1)}{inp('c₁', c1, setC1)}</div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-secondary)]">Segunda ecuación</p>
        <div className="grid grid-cols-3 gap-2">{inp('a₂', a2, setA2)}{inp('b₂', b2, setB2)}{inp('c₂', c2, setC2)}</div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Resolver</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-xs text-[var(--color-text-secondary)]">x =</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.x, 6)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">y =</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.y, 6)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
