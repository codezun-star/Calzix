import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ParadasDescansoTool() {
  const [horas, setHoras] = useState('');
  const [intervalo, setIntervalo] = useState('2');
  const [duracionParada, setDuracionParada] = useState('20');
  const [result, setResult] = useState<{ paradas: number; totalCon: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const h = parseFloat(horas), iv = parseFloat(intervalo), dp = parseFloat(duracionParada);
      if (isNaN(h) || h <= 0) throw new Error('Introduce las horas de conducción.');
      if (isNaN(iv) || iv <= 0) throw new Error('Introduce cada cuántas horas descansar.');
      if (isNaN(dp) || dp < 0) throw new Error('Introduce la duración de cada descanso.');
      const paradas = Math.max(0, Math.ceil(h / iv) - 1);
      setResult({ paradas, totalCon: h + (paradas * dp) / 60 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Las autoridades de tráfico recomiendan descansar al menos 15-20 minutos cada 2 horas de conducción.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de conducción</label>
          <input type="number" value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="Ej. 7" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Descansar cada (h)</label>
          <input type="number" value={intervalo} onChange={(e) => { setIntervalo(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cada parada (min)</label>
          <input type="number" value={duracionParada} onChange={(e) => { setDuracionParada(e.target.value); setResult(null); }} placeholder="20" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular descansos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Paradas de descanso recomendadas</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.paradas} {result.paradas === 1 ? 'parada' : 'paradas'}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Con los descansos, el viaje te llevará unas <strong>{formatNumber(result.totalCon, 1)} horas</strong> en total.</p>
        </div>
      )}
    </div>
  );
}
