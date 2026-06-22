import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function AceleracionTool() {
  const [vi, setVi] = useState('');
  const [vf, setVf] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const i = parseFloat(vi), f = parseFloat(vf), t = parseFloat(tiempo);
      if (isNaN(i) || isNaN(f) || isNaN(t)) throw new Error('Introduce velocidad inicial, final y tiempo.');
      if (t <= 0) throw new Error('El tiempo debe ser mayor que cero.');
      setResult((f - i) / t);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Aceleración a = (v final − v inicial) / tiempo, en m/s².</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">V. inicial (m/s)</label>
          <input type="number" value={vi} onChange={(e) => { setVi(e.target.value); setResult(null); }} placeholder="Ej. 0" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">V. final (m/s)</label>
          <input type="number" value={vf} onChange={(e) => { setVf(e.target.value); setResult(null); }} placeholder="Ej. 27.8" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tiempo (s)</label>
          <input type="number" value={tiempo} onChange={(e) => { setTiempo(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular aceleración</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Aceleración</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 3)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">m/s²</span></p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result < 0 ? 'Negativa: el cuerpo está frenando (desaceleración).' : result === 0 ? 'Nula: velocidad constante.' : 'Positiva: el cuerpo está acelerando.'}</p>
        </div>
      )}
    </div>
  );
}
