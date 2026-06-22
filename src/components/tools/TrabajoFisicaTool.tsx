import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function TrabajoFisicaTool() {
  const [fuerza, setFuerza] = useState('');
  const [distancia, setDistancia] = useState('');
  const [angulo, setAngulo] = useState('0');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const f = parseFloat(fuerza), d = parseFloat(distancia), a = parseFloat(angulo);
      if (isNaN(f) || isNaN(d)) throw new Error('Introduce la fuerza y la distancia.');
      if (isNaN(a)) throw new Error('Introduce el ángulo (0 si la fuerza va en la dirección del movimiento).');
      setResult(f * d * Math.cos((a * Math.PI) / 180));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Trabajo W = F · d · cos(θ), en julios (J).</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fuerza (N)</label>
          <input type="number" value={fuerza} onChange={(e) => { setFuerza(e.target.value); setResult(null); }} placeholder="Ej. 50" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia (m)</label>
          <input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ángulo (°)</label>
          <input type="number" value={angulo} onChange={(e) => { setAngulo(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular trabajo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-xs text-[var(--color-text-secondary)]">Trabajo realizado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 2)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">J</span></p>
        </div>
      )}
    </div>
  );
}
