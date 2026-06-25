import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

function randInt(min: number, max: number): number {
  const range = max - min + 1;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}

export default function NumeroAleatorioTool() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [cantidad, setCantidad] = useState('1');
  const [sinRepetir, setSinRepetir] = useState(false);
  const [result, setResult] = useState<number[] | null>(null);
  const [error, setError] = useState('');

  function generar() {
    try {
      setError('');
      const mn = parseInt(min, 10), mx = parseInt(max, 10), n = parseInt(cantidad, 10);
      if (isNaN(mn) || isNaN(mx)) throw new Error('Introduce el rango mínimo y máximo.');
      if (mn > mx) throw new Error('El mínimo no puede ser mayor que el máximo.');
      if (isNaN(n) || n < 1 || n > 100) throw new Error('Genera entre 1 y 100 números.');
      if (sinRepetir && n > mx - mn + 1) throw new Error('No hay suficientes números en el rango para no repetir.');
      const nums: number[] = [];
      const usados = new Set<number>();
      while (nums.length < n) {
        const r = randInt(mn, mx);
        if (sinRepetir && usados.has(r)) continue;
        usados.add(r);
        nums.push(r);
      }
      setResult(nums);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Mínimo</label>
          <input type="number" value={min} onChange={(e) => { setMin(e.target.value); setResult(null); }} placeholder="1" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Máximo</label>
          <input type="number" value={max} onChange={(e) => { setMax(e.target.value); setResult(null); }} placeholder="100" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cuántos</label>
          <input type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} placeholder="1" className={INPUT} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <input type="checkbox" checked={sinRepetir} onChange={(e) => { setSinRepetir(e.target.checked); setResult(null); }} className="accent-[var(--color-accent)]" />
        Sin repetir números
      </label>
      <button onClick={generar} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Generar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">Resultado</p>
          <div className="flex flex-wrap gap-2">
            {result.map((n, i) => (
              <span key={i} className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-calcs-border)] px-2 text-base font-bold text-[var(--color-text)]">{n}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
