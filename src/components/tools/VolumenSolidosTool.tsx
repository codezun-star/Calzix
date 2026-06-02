import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Solido = 'cubo' | 'esfera' | 'cilindro' | 'cono' | 'prisma' | 'piramide';

export default function VolumenSolidosTool() {
  const [solido, setSolido] = useState<Solido>('cubo');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [h, setH] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const solidos: { value: Solido; label: string }[] = [
    { value: 'cubo', label: 'Cubo' },
    { value: 'esfera', label: 'Esfera' },
    { value: 'cilindro', label: 'Cilindro' },
    { value: 'cono', label: 'Cono' },
    { value: 'prisma', label: 'Prisma rectangular' },
    { value: 'piramide', label: 'Pirámide cuadrada' },
  ];

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      const nh = parseFloat(h.replace(',', '.'));
      if (isNaN(na) || na <= 0) throw new Error('Introduce un valor positivo.');
      let v: number;
      if (solido === 'cubo')      v = na * na * na;
      else if (solido === 'esfera') v = (4 / 3) * Math.PI * na * na * na;
      else if (solido === 'cilindro') { if (isNaN(nh) || nh <= 0) throw new Error('Introduce radio y altura.'); v = Math.PI * na * na * nh; }
      else if (solido === 'cono')     { if (isNaN(nh) || nh <= 0) throw new Error('Introduce radio y altura.'); v = (1 / 3) * Math.PI * na * na * nh; }
      else if (solido === 'prisma')   { if (isNaN(nb) || isNaN(nh) || nb <= 0 || nh <= 0) throw new Error('Introduce largo, ancho y alto.'); v = na * nb * nh; }
      else { if (isNaN(nh) || nh <= 0) throw new Error('Introduce lado de base y altura.'); v = (1 / 3) * na * na * nh; }
      setResult(v);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Sólido</label>
        <select value={solido} onChange={(e) => { setSolido(e.target.value as Solido); setResult(null); setError(''); setA(''); setB(''); setH(''); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {solidos.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{solido === 'cubo' ? 'Arista (m)' : solido === 'esfera' ? 'Radio (m)' : solido === 'prisma' ? 'Largo (m)' : 'Radio/Lado (m)'}</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        {solido === 'prisma' && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho (m)</label>
            <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        )}
        {(solido !== 'cubo' && solido !== 'esfera') && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura (m)</label>
            <input type="number" value={h} onChange={(e) => { setH(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        )}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Volumen</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} m³</p>
          <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(result * 1000, 4)} litros</p>
        </div>
      )}
    </div>
  );
}
