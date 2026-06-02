import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const HORAS_NIVEL: Record<string, { label: string; horas: number }> = {
  a1:   { label: 'A1 (principiante)',      horas: 150 },
  a2:   { label: 'A2 (elemental)',          horas: 300 },
  b1:   { label: 'B1 (intermedio)',         horas: 500 },
  b2:   { label: 'B2 (intermedio-alto)',    horas: 800 },
  c1:   { label: 'C1 (avanzado)',           horas: 1200 },
  c2:   { label: 'C2 (dominio)',            horas: 2000 },
};

export default function HorasIdiomaTool() {
  const [nivel, setNivel] = useState('b2');
  const [nivelActual, setNivelActual] = useState('a1');
  const [horasDia, setHorasDia] = useState('1');
  const [result, setResult] = useState<{ horasTotales: number; dias: number; meses: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const hd = parseFloat(horasDia.replace(',', '.'));
      if (isNaN(hd) || hd <= 0) throw new Error('Las horas de estudio diarias deben ser positivas.');
      const horasObj = HORAS_NIVEL[nivel].horas;
      const horasAct = HORAS_NIVEL[nivelActual].horas;
      if (horasObj <= horasAct) throw new Error('El nivel objetivo debe ser mayor que tu nivel actual.');
      const horasTotales = horasObj - horasAct;
      const dias = horasTotales / hd;
      setResult({ horasTotales, dias, meses: dias / 30 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tu nivel actual</label>
          <select value={nivelActual} onChange={(e) => { setNivelActual(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {Object.entries(HORAS_NIVEL).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nivel objetivo</label>
          <select value={nivel} onChange={(e) => { setNivel(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {Object.entries(HORAS_NIVEL).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de estudio por día</label>
        <input type="number" value={horasDia} onChange={(e) => { setHorasDia(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular tiempo estimado</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Horas totales</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.horasTotales)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Días</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.dias, 0)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Meses</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.meses, 1)}</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] text-center">Estimación basada en el Marco Europeo de Referencia (MCER)</p>
        </div>
      )}
    </div>
  );
}
