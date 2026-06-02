import { useState } from 'react';

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const mm = ((total % 60) + 60) % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export default function HoraMelatoninaTool() {
  const [horaDespertar, setHoraDespertar] = useState('');
  const [cronotipo, setCronotipo] = useState<'alondra' | 'normal' | 'buho'>('normal');
  const [result, setResult] = useState<{ horaMelatonina: string; horaDormir: string; advanceMins: number } | null>(null);
  const [error, setError] = useState('');

  const cronotipos: { value: 'alondra' | 'normal' | 'buho'; label: string; advance: number }[] = [
    { value: 'alondra', label: 'Madrugador (alondra)',  advance: -10 * 60 },
    { value: 'normal',  label: 'Intermedio',            advance: -8 * 60 },
    { value: 'buho',    label: 'Trasnochador (búho)',   advance: -7 * 60 },
  ];

  function calcular() {
    try {
      setError('');
      if (!horaDespertar) throw new Error('Introduce tu hora habitual de despertar.');
      const ct = cronotipos.find((c) => c.value === cronotipo)!;
      const horaDormir = addMinutes(horaDespertar, ct.advance);
      const horaMelatonina = addMinutes(horaDormir, -120);
      setResult({ horaMelatonina, horaDormir, advanceMins: ct.advance });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">La melatonina funciona mejor cuando se toma 2 horas antes de la hora ideal de dormir. Dosis recomendada: 0,5 mg.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Hora habitual de despertar</label>
        <input type="time" value={horaDespertar} onChange={(e) => { setHoraDespertar(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cronotipo</label>
        <select value={cronotipo} onChange={(e) => { setCronotipo(e.target.value as 'alondra' | 'normal' | 'buho'); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {cronotipos.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular hora de melatonina</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Toma melatonina a las</p><p className="text-3xl font-extrabold text-[var(--color-text)]">{result.horaMelatonina}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Hora ideal de dormir</p><p className="text-3xl font-extrabold text-[var(--color-text)]">{result.horaDormir}</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">Consulta a tu médico antes de usar melatonina regularmente.</p>
        </div>
      )}
    </div>
  );
}
