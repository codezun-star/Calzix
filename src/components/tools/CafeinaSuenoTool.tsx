import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CafeinaSuenoTool() {
  const [hora, setHora] = useState('');
  const [horasCorte, setHorasCorte] = useState('6');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = /^(\d{1,2}):(\d{2})$/.exec(hora.trim());
      if (!m) throw new Error('Introduce la hora a la que quieres dormir (HH:MM).');
      const hh = parseInt(m[1], 10), mm = parseInt(m[2], 10);
      if (hh > 23 || mm > 59) throw new Error('Hora no válida.');
      const corte = parseFloat(horasCorte);
      if (isNaN(corte) || corte < 0 || corte > 12) throw new Error('Las horas de margen deben estar entre 0 y 12.');
      let min = hh * 60 + mm - corte * 60;
      min = ((min % (24 * 60)) + 24 * 60) % (24 * 60);
      const ch = Math.floor(min / 60), cm = Math.round(min % 60);
      setResult(`${ch.toString().padStart(2, '0')}:${cm.toString().padStart(2, '0')}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">La cafeína tarda horas en eliminarse. Conviene tomar el último café varias horas antes de dormir.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Hora de dormir (HH:MM)</label>
          <input value={hora} onChange={(e) => { setHora(e.target.value); setResult(null); }} placeholder="23:00" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Margen sin cafeína (horas)</label>
          <input type="number" value={horasCorte} onChange={(e) => { setHorasCorte(e.target.value); setResult(null); }} placeholder="6" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Toma tu último café/té/bebida con cafeína antes de las</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{result}</p>
        </div>
      )}
    </div>
  );
}
