import { useState } from 'react';

function randomUniqueInts(count: number, min: number, max: number): number[] {
  const set = new Set<number>();
  while (set.size < count) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    set.add(min + (arr[0] % (max - min + 1)));
  }
  return Array.from(set).sort((a, b) => a - b);
}

type Loteria = 'primitiva' | 'bonoloto' | 'euromillones' | 'gordo' | 'custom';

const LOTERIAS: Record<Loteria, { label: string; main: [number, number, number]; extra?: [number, number, number] }> = {
  primitiva:    { label: 'La Primitiva',   main: [6, 1, 49] },
  bonoloto:     { label: 'Bonoloto',       main: [6, 1, 49] },
  euromillones: { label: 'Euromillones',   main: [5, 1, 50], extra: [2, 1, 12] },
  gordo:        { label: 'El Gordo de la Primitiva', main: [5, 1, 54], extra: [1, 0, 9] },
  custom:       { label: 'Personalizado',  main: [6, 1, 49] },
};

export default function GeneradorLoteriaTool() {
  const [tipo, setTipo] = useState<Loteria>('primitiva');
  const [customCount, setCustomCount] = useState('6');
  const [customMax, setCustomMax] = useState('49');
  const [resultado, setResultado] = useState<{ main: number[]; extra?: number[] } | null>(null);

  function generar() {
    if (tipo === 'custom') {
      const n = Math.min(Math.max(1, parseInt(customCount) || 6), 20);
      const max = Math.max(n, parseInt(customMax) || 49);
      setResultado({ main: randomUniqueInts(n, 1, max) });
    } else {
      const l = LOTERIAS[tipo];
      const main = randomUniqueInts(l.main[0], l.main[1], l.main[2]);
      const extra = l.extra ? randomUniqueInts(l.extra[0], l.extra[1], l.extra[2]) : undefined;
      setResultado({ main, extra });
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de lotería</label>
        <select value={tipo} onChange={(e) => { setTipo(e.target.value as Loteria); setResultado(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {(Object.entries(LOTERIAS) as [Loteria, (typeof LOTERIAS)[Loteria]][]).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      {tipo === 'custom' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Cantidad de números</label><input type="number" value={customCount} onChange={(e) => { setCustomCount(e.target.value); setResultado(null); }} min="1" max="20" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
          <div className="space-y-1"><label className="text-xs text-[var(--color-text-secondary)]">Número máximo</label><input type="number" value={customMax} onChange={(e) => { setCustomMax(e.target.value); setResultado(null); }} min="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        </div>
      )}
      <button onClick={generar} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Generar números</button>
      {resultado !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {resultado.main.map((n) => (
              <span key={n} className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white font-extrabold flex items-center justify-center text-sm">{n}</span>
            ))}
          </div>
          {resultado.extra && (
            <div className="flex gap-2 justify-center">
              {resultado.extra.map((n) => (
                <span key={n} className="w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center text-sm">{n}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
