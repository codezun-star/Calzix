import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function TiempoLlegadaTool() {
  const [salida, setSalida] = useState('');
  const [distancia, setDistancia] = useState('');
  const [velocidad, setVelocidad] = useState('');
  const [paradas, setParadas] = useState('0');
  const [result, setResult] = useState<{ llegada: string; duracion: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia), v = parseFloat(velocidad), p = parseFloat(paradas || '0');
      const m = /^(\d{1,2}):(\d{2})$/.exec(salida.trim());
      if (!m) throw new Error('Introduce la hora de salida en formato HH:MM (ej. 08:30).');
      const hh = parseInt(m[1], 10), mm = parseInt(m[2], 10);
      if (hh > 23 || mm > 59) throw new Error('Hora de salida no válida.');
      if (isNaN(d) || d <= 0 || isNaN(v) || v <= 0) throw new Error('Introduce distancia y velocidad media.');
      if (isNaN(p) || p < 0) throw new Error('Los minutos de parada deben ser positivos.');
      const totalMin = (d / v) * 60 + p;
      const llegadaMin = (hh * 60 + mm + totalMin) % (24 * 60);
      const lh = Math.floor(llegadaMin / 60), lm = Math.round(llegadaMin % 60);
      const dh = Math.floor(totalMin / 60), dm = Math.round(totalMin % 60);
      setResult({
        llegada: `${lh.toString().padStart(2, '0')}:${lm.toString().padStart(2, '0')}`,
        duracion: `${dh} h ${dm.toString().padStart(2, '0')} min`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Hora de salida (HH:MM)</label>
          <input value={salida} onChange={(e) => { setSalida(e.target.value); setResult(null); }} placeholder="08:30" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Paradas (min)</label>
          <input type="number" value={paradas} onChange={(e) => { setParadas(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia (km)</label>
          <input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 400" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Velocidad media (km/h)</label>
          <input type="number" value={velocidad} onChange={(e) => { setVelocidad(e.target.value); setResult(null); }} placeholder="Ej. 100" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular llegada</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Hora estimada de llegada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.llegada}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Duración del viaje: {result.duracion}.</p>
        </div>
      )}
    </div>
  );
}
