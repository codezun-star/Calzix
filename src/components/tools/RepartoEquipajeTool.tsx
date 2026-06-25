import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function RepartoEquipajeTool() {
  const [peso, setPeso] = useState('');
  const [maletas, setMaletas] = useState('');
  const [limite, setLimite] = useState('23');
  const [result, setResult] = useState<{ porMaleta: number; exceso: boolean; minMaletas: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(peso), n = parseInt(maletas, 10), l = parseFloat(limite);
      if (isNaN(p) || p <= 0) throw new Error('Introduce el peso total a repartir.');
      if (isNaN(n) || n < 1) throw new Error('Introduce el número de maletas.');
      if (isNaN(l) || l <= 0) throw new Error('Introduce el límite de peso por maleta.');
      const porMaleta = p / n;
      setResult({ porMaleta, exceso: porMaleta > l, minMaletas: Math.ceil(p / l) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Peso total (kg)</label>
          <input type="number" value={peso} onChange={(e) => { setPeso(e.target.value); setResult(null); }} placeholder="Ej. 40" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nº de maletas</label>
          <input type="number" value={maletas} onChange={(e) => { setMaletas(e.target.value); setResult(null); }} placeholder="Ej. 2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Límite/maleta (kg)</label>
          <input type="number" value={limite} onChange={(e) => { setLimite(e.target.value); setResult(null); }} placeholder="23" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Repartir peso</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Peso por maleta</p>
          <p className={`text-2xl font-extrabold ${result.exceso ? 'text-red-600' : 'text-[var(--color-text)]'}`}>{formatNumber(result.porMaleta, 1)} kg</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.exceso ? `Superas el límite: necesitarías al menos ${result.minMaletas} maletas para no exceder ${limite} kg cada una.` : 'Cada maleta queda dentro del límite permitido.'}</p>
        </div>
      )}
    </div>
  );
}
