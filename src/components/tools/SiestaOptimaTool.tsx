import { useState } from 'react';

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

const TIPOS = [
  { nombre: 'Nap turbo (10–20 min)', duracion: 20, descripcion: 'Ideal para recuperar energía rápida sin entrar en sueño profundo. Evita la inercia del sueño.' },
  { nombre: 'Siesta regenerativa (30 min)', duracion: 30, descripcion: 'Mejora la memoria y el estado de ánimo. Puede causar algo de inercia del sueño.' },
  { nombre: 'Siesta completa (90 min)', duracion: 90, descripcion: 'Ciclo completo de sueño. Recupera a fondo pero requiere tiempo. Mejor antes de las 15h.' },
];

export default function SiestaOptimaTool() {
  const [horaActual, setHoraActual] = useState('');
  const [tipo, setTipo] = useState(0);
  const [result, setResult] = useState<{ horaFin: string; descripcion: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!horaActual) throw new Error('Introduce la hora en que vas a acostarte.');
      const t = TIPOS[tipo];
      setResult({ horaFin: addMinutes(horaActual, t.duracion), descripcion: t.descripcion });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-3">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Tipo de siesta</legend>
        {TIPOS.map((t, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <input type="radio" name="tipo" checked={tipo === i} onChange={() => { setTipo(i); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4 mt-0.5" />
            <span className="text-sm text-[var(--color-text)]">{t.nombre}</span>
          </label>
        ))}
      </fieldset>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Hora en que empiezas la siesta</label>
        <input type="time" value={horaActual} onChange={(e) => { setHoraActual(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular hora de despertar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Despiértate a las</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{result.horaFin}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{result.descripcion}</p>
        </div>
      )}
    </div>
  );
}
