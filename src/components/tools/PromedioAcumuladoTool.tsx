import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function PromedioAcumuladoTool() {
  const [prevProm, setPrevProm] = useState('');
  const [prevCred, setPrevCred] = useState('');
  const [curProm, setCurProm] = useState('');
  const [curCred, setCurCred] = useState('');
  const [result, setResult] = useState<{ prom: number; creditos: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pp = parseFloat(prevProm), pc = parseFloat(prevCred), cp = parseFloat(curProm), cc = parseFloat(curCred);
      if ([pp, pc, cp, cc].some((x) => isNaN(x))) throw new Error('Introduce promedio y créditos anteriores y del periodo actual.');
      if (pc < 0 || cc < 0) throw new Error('Los créditos no pueden ser negativos.');
      const total = pc + cc;
      if (total === 0) throw new Error('El total de créditos no puede ser cero.');
      setResult({ prom: (pp * pc + cp * cc) / total, creditos: total });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Combina tu promedio anterior con el del nuevo periodo, ponderando por créditos.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Promedio anterior</label>
          <input type="number" value={prevProm} onChange={(e) => { setPrevProm(e.target.value); setResult(null); }} placeholder="Ej. 8.2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Créditos cursados</label>
          <input type="number" value={prevCred} onChange={(e) => { setPrevCred(e.target.value); setResult(null); }} placeholder="Ej. 120" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Promedio del periodo</label>
          <input type="number" value={curProm} onChange={(e) => { setCurProm(e.target.value); setResult(null); }} placeholder="Ej. 9.0" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Créditos del periodo</label>
          <input type="number" value={curCred} onChange={(e) => { setCurCred(e.target.value); setResult(null); }} placeholder="Ej. 30" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular promedio</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Promedio acumulado</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.prom, 3)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Sobre un total de {formatNumber(result.creditos, 0)} créditos.</p>
        </div>
      )}
    </div>
  );
}
