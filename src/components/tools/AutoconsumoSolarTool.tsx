import { useState } from 'react';
import { formatNumber, formatPercent } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function AutoconsumoSolarTool() {
  const [generacion, setGeneracion] = useState('');
  const [consumo, setConsumo] = useState('');
  const [factor, setFactor] = useState('35');
  const [result, setResult] = useState<{ auto: number; autosuf: number; excedente: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const g = parseFloat(generacion), c = parseFloat(consumo), f = parseFloat(factor);
      if (isNaN(g) || g <= 0) throw new Error('Introduce la generación solar anual.');
      if (isNaN(c) || c <= 0) throw new Error('Introduce tu consumo anual.');
      if (isNaN(f) || f < 0 || f > 100) throw new Error('El factor de autoconsumo debe estar entre 0 y 100 %.');
      const autoconsumida = Math.min(g * (f / 100), c);
      setResult({ auto: (autoconsumida / g) * 100, autosuf: (autoconsumida / c) * 100, excedente: g - autoconsumida });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Sin batería, el factor de autoconsumo suele rondar el 30-40 %; con batería puede superar el 60-70 %.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Generación (kWh/año)</label>
          <input type="number" value={generacion} onChange={(e) => { setGeneracion(e.target.value); setResult(null); }} placeholder="Ej. 4500" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo (kWh/año)</label>
          <input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 3500" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Factor autoconsumo (%)</label>
          <input type="number" value={factor} onChange={(e) => { setFactor(e.target.value); setResult(null); }} placeholder="35" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular autoconsumo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-2 gap-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Tasa de autoconsumo</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatPercent(result.auto)}</p></div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Autosuficiencia</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatPercent(result.autosuf)}</p></div>
          <div className="col-span-2"><p className="text-sm text-[var(--color-text-secondary)]">Excedente vertido a la red: <strong>{formatNumber(result.excedente, 0)} kWh/año</strong>.</p></div>
        </div>
      )}
    </div>
  );
}
