import { useState } from 'react';

const CICLO_MIN = 90;

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const mm = ((total % 60) + 60) % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export default function CiclosSuenoTool() {
  const [modo, setModo] = useState<'despertar' | 'dormir'>('despertar');
  const [hora, setHora] = useState('');
  const [result, setResult] = useState<{ entradas: { ciclos: number; hora: string }[]; label: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!hora) throw new Error('Selecciona una hora.');
      if (modo === 'despertar') {
        const entradas = [6, 5, 4].map((ciclos) => ({
          ciclos,
          hora: addMinutes(hora, -(ciclos * CICLO_MIN + 14)),
        }));
        setResult({ entradas, label: 'Acuéstate a estas horas para despertarte descansado' });
      } else {
        const entradas = [4, 5, 6].map((ciclos) => ({
          ciclos,
          hora: addMinutes(hora, ciclos * CICLO_MIN + 14),
        }));
        setResult({ entradas, label: 'Despiértate a estas horas para terminar un ciclo completo' });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Cada ciclo de sueño dura ~90 minutos. Despertarse al final de un ciclo hace que te sientas más descansado.</p>
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Modo de cálculo</legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="despertar" checked={modo === 'despertar'} onChange={() => { setModo('despertar'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Quiero despertar a esta hora — ¿cuándo me acuesto?</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="modo" value="dormir" checked={modo === 'dormir'} onChange={() => { setModo('dormir'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" />
          <span className="text-sm text-[var(--color-text)]">Me acuesto a esta hora — ¿cuándo me despierto?</span>
        </label>
      </fieldset>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">{modo === 'despertar' ? 'Hora de despertar' : 'Hora de acostarse'}</label>
        <input type="time" value={hora} onChange={(e) => { setHora(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">{result.label}</p>
          <div className="space-y-1">
            {result.entradas.map(({ ciclos, hora: h }) => (
              <div key={ciclos} className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">{ciclos} ciclos ({ciclos * 1.5}h)</span>
                <span className="text-xl font-extrabold text-[var(--color-text)]">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
