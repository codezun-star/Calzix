import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function MejorHoraLlamarTool() {
  const [horaLocal, setHoraLocal] = useState('');
  const [diferencia, setDiferencia] = useState('');
  const [result, setResult] = useState<{ destino: string; ok: boolean } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = /^(\d{1,2}):(\d{2})$/.exec(horaLocal.trim());
      if (!m) throw new Error('Introduce tu hora local en formato HH:MM.');
      const hh = parseInt(m[1], 10), mm = parseInt(m[2], 10);
      if (hh > 23 || mm > 59) throw new Error('Hora no válida.');
      const dif = parseFloat(diferencia);
      if (isNaN(dif)) throw new Error('Introduce la diferencia horaria del destino (ej. +6 o -3).');
      let total = hh * 60 + mm + dif * 60;
      total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
      const dh = Math.floor(total / 60), dm = Math.round(total % 60);
      setResult({ destino: `${dh.toString().padStart(2, '0')}:${dm.toString().padStart(2, '0')}`, ok: dh >= 8 && dh < 22 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Comprueba qué hora es en el destino para no llamar de madrugada.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tu hora local (HH:MM)</label>
          <input value={horaLocal} onChange={(e) => { setHoraLocal(e.target.value); setResult(null); }} placeholder="18:00" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Diferencia horaria (h)</label>
          <input type="number" value={diferencia} onChange={(e) => { setDiferencia(e.target.value); setResult(null); }} placeholder="Ej. +6" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar hora</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Hora en el destino</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.destino}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.ok ? 'Buena hora para llamar (horario diurno razonable).' : 'Evita llamar: en el destino es de noche o muy temprano.'}</p>
        </div>
      )}
    </div>
  );
}
