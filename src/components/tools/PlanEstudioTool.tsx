import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PlanEstudioTool() {
  const [asignaturas, setAsignaturas] = useState('5');
  const [horasAsignatura, setHorasAsignatura] = useState('20');
  const [semanas, setSemanas] = useState('8');
  const [diasSemana, setDiasSemana] = useState('5');
  const [result, setResult] = useState<{ horasTotal: number; horasDia: number; horasSemana: number; posible: boolean } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const a = parseFloat(asignaturas.replace(',', '.'));
      const ha = parseFloat(horasAsignatura.replace(',', '.'));
      const s = parseFloat(semanas.replace(',', '.'));
      const ds = parseFloat(diasSemana.replace(',', '.'));
      if (isNaN(a) || isNaN(ha) || isNaN(s) || isNaN(ds)) throw new Error('Introduce todos los valores.');
      if (a <= 0 || ha <= 0 || s <= 0 || ds <= 0 || ds > 7) throw new Error('Los valores deben ser positivos.');
      const horasTotal = a * ha;
      const diasDisponibles = s * ds;
      const horasDia = horasTotal / diasDisponibles;
      setResult({ horasTotal, horasDia, horasSemana: horasDia * ds, posible: horasDia <= 10 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de asignaturas</label><input type="number" value={asignaturas} onChange={(e) => { setAsignaturas(e.target.value); setResult(null); }} placeholder="5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de estudio por asignatura</label><input type="number" value={horasAsignatura} onChange={(e) => { setHorasAsignatura(e.target.value); setResult(null); }} placeholder="20" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Semanas disponibles</label><input type="number" value={semanas} onChange={(e) => { setSemanas(e.target.value); setResult(null); }} placeholder="8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de estudio por semana</label><input type="number" value={diasSemana} onChange={(e) => { setDiasSemana(e.target.value); setResult(null); }} placeholder="5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Generar plan</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-3 ${result.posible ? 'bg-[var(--color-calcs-bg)]' : 'bg-amber-50'}`}>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total horas</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.horasTotal, 0)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Horas/semana</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.horasSemana, 1)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Horas/día</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.horasDia, 1)}</p></div>
          </div>
          {!result.posible && <p className="text-sm text-amber-700">Más de 10h/día — considera reducir asignaturas o ampliar el plazo.</p>}
        </div>
      )}
    </div>
  );
}
