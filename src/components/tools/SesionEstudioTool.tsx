import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function SesionEstudioTool() {
  const [horasDisponibles, setHorasDisponibles] = useState('');
  const [horasConcentracion, setHorasConcentracion] = useState('2');
  const [result, setResult] = useState<{ sesiones: number; descansos: number; horasEstudio: number; horasDescanso: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const hd = parseFloat(horasDisponibles.replace(',', '.'));
      const hc = parseFloat(horasConcentracion.replace(',', '.'));
      if (isNaN(hd) || isNaN(hc)) throw new Error('Introduce las horas disponibles y de concentración máxima.');
      if (hd <= 0 || hc <= 0) throw new Error('Los valores deben ser positivos.');
      const sesiones = Math.floor(hd / (hc + 0.25));
      const horasEstudio = sesiones * hc;
      const horasDescanso = hd - horasEstudio;
      setResult({ sesiones, descansos: sesiones, horasEstudio, horasDescanso });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Planifica sesiones de estudio con descansos de 15 minutos entre cada bloque de concentración.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas disponibles</label><input type="number" value={horasDisponibles} onChange={(e) => { setHorasDisponibles(e.target.value); setResult(null); }} placeholder="Ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de concentración máxima por bloque</label><input type="number" value={horasConcentracion} onChange={(e) => { setHorasConcentracion(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Planificar sesión</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Bloques de estudio</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.sesiones}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Descansos (15 min)</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.descansos}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo de estudio</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.horasEstudio, 1)}h</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tiempo de descanso</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.horasDescanso * 60, 0)} min</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
