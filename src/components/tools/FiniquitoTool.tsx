import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function FiniquitoTool() {
  const [salarioAnual, setSalarioAnual] = useState('');
  const [diasTrabajados, setDiasTrabajados] = useState('');
  const [vacacionesPendientes, setVacacionesPendientes] = useState('');
  const [diasPrevAviso, setDiasPrevAviso] = useState('0');
  const [result, setResult] = useState<{ parteProporional: number; vacaciones: number; preavisoFalta: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const sa = parseFloat(salarioAnual.replace(',', '.'));
      const dt = parseFloat(diasTrabajados.replace(',', '.'));
      const vp = parseFloat(vacacionesPendientes.replace(',', '.'));
      const dp = parseFloat(diasPrevAviso.replace(',', '.'));
      if (isNaN(sa) || isNaN(dt) || isNaN(vp) || isNaN(dp)) throw new Error('Introduce todos los valores.');
      if (sa <= 0 || dt < 0 || vp < 0) throw new Error('Los valores deben ser no negativos.');
      const salarioDia = sa / 365;
      const parteProporional = salarioDia * dt;
      const vacaciones = salarioDia * vp;
      const preavisoFalta = dp < 0 ? Math.abs(dp) * salarioDia : 0;
      setResult({ parteProporional, vacaciones, preavisoFalta, total: parteProporional + vacaciones + preavisoFalta });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Cálculo orientativo del finiquito (parte proporcional + vacaciones pendientes)</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario bruto anual (€)</label>
        <input type="number" value={salarioAnual} onChange={(e) => { setSalarioAnual(e.target.value); setResult(null); }} placeholder="Ej. 24000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días trabajados en el año</label>
          <input type="number" value={diasTrabajados} onChange={(e) => { setDiasTrabajados(e.target.value); setResult(null); }} placeholder="Ej. 90" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de vacaciones pendientes</label>
          <input type="number" value={vacacionesPendientes} onChange={(e) => { setVacacionesPendientes(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular finiquito</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Parte proporcional salario</span><span className="font-semibold">{formatCurrency(result.parteProporional)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Vacaciones pendientes</span><span className="font-semibold">{formatCurrency(result.vacaciones)}</span></div>
            <div className="border-t border-[var(--color-border)] pt-2 flex justify-between"><span className="font-semibold text-[var(--color-text)]">Total finiquito</span><span className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
