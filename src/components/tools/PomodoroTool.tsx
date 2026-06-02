import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PomodoroTool() {
  const [horasTrabajo, setHorasTrabajo] = useState('');
  const [minPomodoro, setMinPomodoro] = useState('25');
  const [minDescansoCorto, setMinDescansoCorto] = useState('5');
  const [minDescansoLargo, setMinDescansoLargo] = useState('15');
  const [pomodorosPorBloque, setPomodorosPorBloque] = useState('4');
  const [result, setResult] = useState<{ pomodoros: number; bloques: number; tiempoTotal: number; tiempoDescanso: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const h = parseFloat(horasTrabajo.replace(',', '.'));
      const mp = parseFloat(minPomodoro.replace(',', '.'));
      const mdc = parseFloat(minDescansoCorto.replace(',', '.'));
      const mdl = parseFloat(minDescansoLargo.replace(',', '.'));
      const ppb = parseFloat(pomodorosPorBloque.replace(',', '.'));
      if (isNaN(h) || isNaN(mp) || isNaN(mdc) || isNaN(mdl) || isNaN(ppb)) throw new Error('Introduce todos los valores.');
      if (h <= 0 || mp <= 0 || mdc <= 0 || mdl <= 0 || ppb <= 0) throw new Error('Los valores deben ser positivos.');
      const minTrabajo = h * 60;
      const pomodoros = Math.ceil(minTrabajo / mp);
      const bloques = Math.ceil(pomodoros / ppb);
      const tiempoDescanso = (bloques - 1) * mdl + (pomodoros - bloques) * mdc;
      const tiempoTotal = pomodoros * mp + tiempoDescanso;
      setResult({ pomodoros, bloques, tiempoTotal, tiempoDescanso });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de trabajo a completar</label>
        <input type="number" value={horasTrabajo} onChange={(e) => { setHorasTrabajo(e.target.value); setResult(null); }} placeholder="Ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos por pomodoro</label><input type="number" value={minPomodoro} onChange={(e) => { setMinPomodoro(e.target.value); setResult(null); }} placeholder="25" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Pomodoros por bloque</label><input type="number" value={pomodorosPorBloque} onChange={(e) => { setPomodorosPorBloque(e.target.value); setResult(null); }} placeholder="4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Descanso corto (min)</label><input type="number" value={minDescansoCorto} onChange={(e) => { setMinDescansoCorto(e.target.value); setResult(null); }} placeholder="5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Descanso largo (min)</label><input type="number" value={minDescansoLargo} onChange={(e) => { setMinDescansoLargo(e.target.value); setResult(null); }} placeholder="15" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Planificar sesión</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Pomodoros necesarios</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.pomodoros}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Bloques de trabajo</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.bloques}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo de descanso</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.tiempoDescanso, 0)} min</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo total</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.tiempoTotal, 0)} min ({formatNumber(result.tiempoTotal / 60, 1)}h)</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
