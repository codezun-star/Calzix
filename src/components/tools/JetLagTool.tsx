import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function JetLagTool() {
  const [husoOrigen, setHusoOrigen] = useState('0');
  const [husoDestino, setHusoDestino] = useState('8');
  const [direction, setDirection] = useState<'este' | 'oeste'>('este');
  const [result, setResult] = useState<{ diferencia: number; diasRecuperacion: number; consejosAdelanto: string; consejosRetraso: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const o = parseFloat(husoOrigen.replace(',', '.'));
      const d = parseFloat(husoDestino.replace(',', '.'));
      if (isNaN(o) || isNaN(d)) throw new Error('Introduce los husos horarios (ej. Madrid = +1, Nueva York = -5).');
      const diferencia = Math.abs(d - o);
      const diasRecuperacion = direction === 'este' ? Math.ceil(diferencia * 0.67) : Math.ceil(diferencia * 0.5);
      setResult({
        diferencia,
        diasRecuperacion,
        consejosAdelanto: 'Acuéstate antes, evita la luz por la noche, toma melatonina 0,5–1 mg 2h antes de dormir.',
        consejosRetraso: 'Mantente activo durante el día, expónte a la luz solar por la mañana, evita siestas largas.',
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Huso horario origen (UTC±)</label><input type="number" min="-12" max="14" value={husoOrigen} onChange={(e) => { setHusoOrigen(e.target.value); setResult(null); }} placeholder="0 (UTC)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Huso horario destino (UTC±)</label><input type="number" min="-12" max="14" value={husoDestino} onChange={(e) => { setHusoDestino(e.target.value); setResult(null); }} placeholder="8 (China)" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <fieldset className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="dir" value="este" checked={direction === 'este'} onChange={() => { setDirection('este'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" /><span className="text-sm text-[var(--color-text)]">Vuelo hacia el este</span></label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="dir" value="oeste" checked={direction === 'oeste'} onChange={() => { setDirection('oeste'); setResult(null); }} className="accent-[var(--color-accent)] w-4 h-4" /><span className="text-sm text-[var(--color-text)]">Vuelo hacia el oeste</span></label>
      </fieldset>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular jet lag</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Diferencia horaria</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.diferencia)} horas</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Días de recuperación</p><p className="text-2xl font-extrabold text-[var(--color-text)]">~{result.diasRecuperacion} días</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">{direction === 'este' ? result.consejosAdelanto : result.consejosRetraso}</p>
        </div>
      )}
    </div>
  );
}
