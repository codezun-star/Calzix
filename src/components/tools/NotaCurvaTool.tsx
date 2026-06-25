import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function NotaCurvaTool() {
  const [nota, setNota] = useState('');
  const [maxClase, setMaxClase] = useState('');
  const [maxPosible, setMaxPosible] = useState('10');
  const [result, setResult] = useState<{ ajustada: number; subida: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseFloat(nota), mc = parseFloat(maxClase), mp = parseFloat(maxPosible);
      if (isNaN(n) || isNaN(mc) || isNaN(mp)) throw new Error('Introduce tu nota, la nota más alta de la clase y la nota máxima posible.');
      if (mc <= 0 || mp <= 0) throw new Error('Las notas máximas deben ser mayores que cero.');
      if (n > mc) throw new Error('Tu nota no puede ser mayor que la nota más alta de la clase.');
      const factor = mp / mc;
      const ajustada = Math.min(n * factor, mp);
      setResult({ ajustada, subida: ajustada - n });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Curva lineal: la nota más alta de la clase se escala a la máxima posible y el resto se ajusta en proporción.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tu nota</label>
          <input type="number" value={nota} onChange={(e) => { setNota(e.target.value); setResult(null); }} placeholder="Ej. 6" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota más alta de la clase</label>
          <input type="number" value={maxClase} onChange={(e) => { setMaxClase(e.target.value); setResult(null); }} placeholder="Ej. 8" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota máxima posible</label>
          <input type="number" value={maxPosible} onChange={(e) => { setMaxPosible(e.target.value); setResult(null); }} placeholder="10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Aplicar curva</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Nota ajustada con curva</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.ajustada, 2)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Has subido {formatNumber(result.subida, 2)} puntos respecto a tu nota original.</p>
        </div>
      )}
    </div>
  );
}
