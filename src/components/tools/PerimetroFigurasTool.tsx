import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Figura = 'circulo' | 'cuadrado' | 'rectangulo' | 'triangulo' | 'rombo' | 'pentagono' | 'hexagono';

export default function PerimetroFigurasTool() {
  const [figura, setFigura] = useState<Figura>('circulo');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const figuras: { value: Figura; label: string }[] = [
    { value: 'circulo', label: 'Círculo (circunferencia)' },
    { value: 'cuadrado', label: 'Cuadrado' },
    { value: 'rectangulo', label: 'Rectángulo' },
    { value: 'triangulo', label: 'Triángulo' },
    { value: 'rombo', label: 'Rombo' },
    { value: 'pentagono', label: 'Pentágono regular' },
    { value: 'hexagono', label: 'Hexágono regular' },
  ];

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      const nc = parseFloat(c.replace(',', '.'));
      if (isNaN(na) || na <= 0) throw new Error('El primer valor debe ser positivo.');
      let p: number;
      if (figura === 'circulo')    p = 2 * Math.PI * na;
      else if (figura === 'cuadrado')   p = 4 * na;
      else if (figura === 'rectangulo') { if (isNaN(nb) || nb <= 0) throw new Error('Introduce ancho y alto.'); p = 2 * (na + nb); }
      else if (figura === 'triangulo')  { if (isNaN(nb) || isNaN(nc) || nb <= 0 || nc <= 0) throw new Error('Introduce los 3 lados.'); p = na + nb + nc; }
      else if (figura === 'rombo')      { if (isNaN(nb) || nb <= 0) throw new Error('Introduce ambas diagonales.'); p = 2 * Math.sqrt(na * na + nb * nb); }
      else if (figura === 'pentagono')  p = 5 * na;
      else p = 6 * na;
      setResult(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Figura</label>
        <select value={figura} onChange={(e) => { setFigura(e.target.value as Figura); setResult(null); setError(''); setA(''); setB(''); setC(''); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {figuras.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{figura === 'circulo' ? 'Radio (m)' : figura === 'rombo' ? 'Diagonal 1 (m)' : 'Lado a (m)'}</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        {(figura === 'rectangulo' || figura === 'rombo') && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">{figura === 'rombo' ? 'Diagonal 2 (m)' : 'Lado b (m)'}</label>
            <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
          </div>
        )}
        {figura === 'triangulo' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--color-text-secondary)]">Lado b (m)</label>
              <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--color-text-secondary)]">Lado c (m)</label>
              <input type="number" value={c} onChange={(e) => { setC(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            </div>
          </>
        )}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Perímetro</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)} m</p>
        </div>
      )}
    </div>
  );
}
