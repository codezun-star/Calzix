import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorPendienteTool() {
  const [mode, setMode] = useState<'fromPct' | 'fromDeg'>('fromPct');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<{ pct: number; deg: number; ratio: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const v = parseFloat(value);
      if (isNaN(v)) throw new Error('Introduce un valor.');
      let pct: number, deg: number;
      if (mode === 'fromPct') {
        if (v < 0) throw new Error('La pendiente en % no puede ser negativa.');
        pct = v;
        deg = (Math.atan(v / 100) * 180) / Math.PI;
      } else {
        if (v < 0 || v >= 90) throw new Error('El ángulo debe estar entre 0 y 89,99°.');
        deg = v;
        pct = Math.tan((v * Math.PI) / 180) * 100;
      }
      const ratio = pct === 0 ? '1 : ∞' : `1 : ${formatNumber(100 / pct, 2)}`;
      setResult({ pct, deg, ratio });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al convertir.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['fromPct', 'Desde %'], ['fromDeg', 'Desde grados']] as const).map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); setError(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-accent-bg)] text-[var(--color-text-secondary)]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">{mode === 'fromPct' ? 'Pendiente (%)' : 'Ángulo (grados)'}</label>
        <input type="number" value={value} onChange={(e) => { setValue(e.target.value); setResult(null); }} placeholder={mode === 'fromPct' ? 'Ej. 12' : 'Ej. 6.84'} className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-3 gap-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Porcentaje</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.pct, 2)} %</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Grados</p><p className="text-lg font-bold text-[var(--color-text)]">{formatNumber(result.deg, 2)}°</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Proporción</p><p className="text-lg font-bold text-[var(--color-text)]">{result.ratio}</p></div>
        </div>
      )}
    </div>
  );
}
