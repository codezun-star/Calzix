import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function HoraLlegadaZonaTool() {
  const [salida, setSalida] = useState('');
  const [duracion, setDuracion] = useState('');
  const [diferencia, setDiferencia] = useState('');
  const [result, setResult] = useState<{ local: string; dia: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = /^(\d{1,2}):(\d{2})$/.exec(salida.trim());
      if (!m) throw new Error('Introduce la hora de salida en formato HH:MM (hora de origen).');
      const hh = parseInt(m[1], 10), mm = parseInt(m[2], 10);
      if (hh > 23 || mm > 59) throw new Error('Hora de salida no válida.');
      const dur = parseFloat(duracion), dif = parseFloat(diferencia);
      if (isNaN(dur) || dur < 0) throw new Error('Introduce la duración del vuelo en horas.');
      if (isNaN(dif)) throw new Error('Introduce la diferencia horaria del destino (ej. +6 o -3).');
      const totalMin = hh * 60 + mm + dur * 60 + dif * 60;
      const dia = Math.floor(totalMin / (24 * 60));
      let min = totalMin % (24 * 60);
      if (min < 0) min += 24 * 60;
      const lh = Math.floor(min / 60), lm = Math.round(min % 60);
      setResult({ local: `${lh.toString().padStart(2, '0')}:${lm.toString().padStart(2, '0')}`, dia });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Calcula la hora local de llegada teniendo en cuenta la duración del vuelo y la diferencia horaria.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salida (hora origen)</label>
          <input value={salida} onChange={(e) => { setSalida(e.target.value); setResult(null); }} placeholder="14:00" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Duración (h)</label>
          <input type="number" value={duracion} onChange={(e) => { setDuracion(e.target.value); setResult(null); }} placeholder="Ej. 9.5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Diferencia horaria (h)</label>
          <input type="number" value={diferencia} onChange={(e) => { setDiferencia(e.target.value); setResult(null); }} placeholder="Ej. -6" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular llegada</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Hora local de llegada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.local}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.dia === 0 ? 'Llegas el mismo día.' : result.dia > 0 ? `Llegas ${result.dia} día(s) después de salir.` : `Llegas ${Math.abs(result.dia)} día(s) antes (cruzando la línea de cambio de fecha).`}</p>
        </div>
      )}
    </div>
  );
}
