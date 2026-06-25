import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DistanciaRelacionTool() {
  const [fecha, setFecha] = useState('');
  const [result, setResult] = useState<{ dias: number; semanas: number; finde: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fecha) throw new Error('Elige la fecha de vuestro próximo reencuentro.');
      const objetivo = new Date(fecha + 'T00:00:00');
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (isNaN(objetivo.getTime())) throw new Error('Fecha no válida.');
      const dias = Math.round((objetivo.getTime() - hoy.getTime()) / 86400000);
      if (dias < 0) throw new Error('Esa fecha ya ha pasado. Elige una futura.');
      setResult({ dias, semanas: dias / 7, finde: Math.floor(dias / 7) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Cuenta los días que faltan para volver a verte con tu pareja.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha del próximo reencuentro</label>
        <input type="date" value={fecha} onChange={(e) => { setFecha(e.target.value); setResult(null); }} className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Contar los días</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Faltan</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{result.dias} {result.dias === 1 ? 'día' : 'días'}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatNumber(result.semanas, 1)} semanas · unos {result.finde} fines de semana por delante.</p>
        </div>
      )}
    </div>
  );
}
