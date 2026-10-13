import { useEffect, useState } from 'react';
import { ZONAS_ESPANA, ZONAS_MUNDO, formatearEnZona, horaDeRelojAInstante, hoyEnZona } from '@/lib/utils/zonas';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

export default function MejorHoraLlamarTool() {
  const [origen, setOrigen] = useState('Europe/Madrid');
  const [destino, setDestino] = useState('America/New_York');
  const [horaLocal, setHoraLocal] = useState('18:00');
  const [fecha, setFecha] = useState('');
  const [result, setResult] = useState<{ destino: string; dia: string; ok: boolean } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { setFecha(hoyEnZona('Europe/Madrid')); }, []);

  function calcular() {
    try {
      setError('');
      const instante = horaDeRelojAInstante(fecha || hoyEnZona(origen), horaLocal, origen);
      if (!instante) throw new Error('Introduce tu hora local en formato HH:MM.');
      const hora = Number(formatearEnZona(instante, destino, { hour: '2-digit', hourCycle: 'h23' }));
      setResult({
        destino: formatearEnZona(instante, destino, { hour: '2-digit', minute: '2-digit' }),
        dia: formatearEnZona(instante, destino, { weekday: 'long', day: 'numeric', month: 'long' }),
        ok: hora >= 9 && hora < 21,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Comprueba qué hora es en el destino antes de llamar desde España. El horario de verano se tiene en cuenta automáticamente.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={LABEL}>Llamas desde</label>
          <select value={origen} onChange={(e) => { setOrigen(e.target.value); setResult(null); }} className={INPUT}>
            {ZONAS_ESPANA.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>País al que llamas</label>
          <select value={destino} onChange={(e) => { setDestino(e.target.value); setResult(null); }} className={INPUT}>
            {ZONAS_MUNDO.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Fecha</label>
          <input type="date" value={fecha} onChange={(e) => { setFecha(e.target.value); setResult(null); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tu hora en España</label>
          <input type="time" value={horaLocal} onChange={(e) => { setHoraLocal(e.target.value); setResult(null); }} className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar hora</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Hora en el destino</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.destino}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{result.dia}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.ok ? 'Buena hora para llamar (entre las 9:00 y las 21:00 allí).' : 'Mejor no llamar: en el destino es de noche o muy temprano.'}</p>
        </div>
      )}
    </div>
  );
}
