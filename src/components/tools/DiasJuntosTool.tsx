import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function DiasJuntosTool() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [result, setResult] = useState<{ dias: number; semanas: number; meses: number; anos: number; proximo: { dias: number; label: string } | null } | null>(null);
  const [error, setError] = useState('');

  const HITOS = [100, 200, 365, 500, 730, 1000, 1461, 2000, 3650];

  function calcular() {
    try {
      setError('');
      if (!fechaInicio) throw new Error('Selecciona la fecha de inicio.');
      const inicio = new Date(fechaInicio);
      const ahora = new Date();
      if (inicio > ahora) throw new Error('La fecha de inicio no puede ser futura.');
      const diff = Math.floor((ahora.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
      const proxHito = HITOS.find((h) => h > diff);
      const proximo = proxHito !== undefined ? { dias: proxHito - diff, label: `${proxHito} días juntos` } : null;
      setResult({ dias: diff, semanas: diff / 7, meses: diff / 30.44, anos: diff / 365.25, proximo });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de inicio de la relación</label>
        <input type="date" value={fechaInicio} onChange={(e) => { setFechaInicio(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Lleváis juntos</p><p className="text-3xl font-extrabold text-[var(--color-text)]">{formatNumber(result.dias)} días</p></div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Semanas</p><p className="font-bold text-[var(--color-text)]">{formatNumber(result.semanas, 1)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Meses</p><p className="font-bold text-[var(--color-text)]">{formatNumber(result.meses, 1)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Años</p><p className="font-bold text-[var(--color-text)]">{formatNumber(result.anos, 2)}</p></div>
          </div>
          {result.proximo && <p className="text-xs text-[var(--color-text-secondary)]">Próximo hito: <span className="font-semibold text-[var(--color-text)]">{result.proximo.label}</span> en {result.proximo.dias} días</p>}
        </div>
      )}
    </div>
  );
}
