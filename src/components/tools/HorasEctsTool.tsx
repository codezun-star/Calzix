import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function HorasEctsTool() {
  const [creditos, setCreditos] = useState('');
  const [horasCredito, setHorasCredito] = useState('27');
  const [semanas, setSemanas] = useState('15');
  const [result, setResult] = useState<{ total: number; semana: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(creditos), h = parseFloat(horasCredito), s = parseFloat(semanas);
      if (isNaN(c) || c <= 0) throw new Error('Introduce el número de créditos ECTS.');
      if (isNaN(h) || h <= 0) throw new Error('Introduce las horas por crédito (25-30).');
      if (isNaN(s) || s <= 0) throw new Error('Introduce las semanas del periodo.');
      const total = c * h;
      setResult({ total, semana: total / s });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">1 crédito ECTS equivale a unas 25-30 horas de trabajo total (clases + estudio personal).</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Créditos ECTS</label>
          <input type="number" value={creditos} onChange={(e) => { setCreditos(e.target.value); setResult(null); }} placeholder="Ej. 6" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas/crédito</label>
          <input type="number" value={horasCredito} onChange={(e) => { setHorasCredito(e.target.value); setResult(null); }} placeholder="27" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Semanas</label>
          <input type="number" value={semanas} onChange={(e) => { setSemanas(e.target.value); setResult(null); }} placeholder="15" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular horas</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Horas totales de trabajo</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.total, 0)} h</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a unas <strong>{formatNumber(result.semana, 1)} horas a la semana</strong> durante el periodo.</p>
        </div>
      )}
    </div>
  );
}
