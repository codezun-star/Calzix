import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CapacidadEndeudamientoTool() {
  const [ingresos, setIngresos] = useState('');
  const [deudas, setDeudas] = useState('0');
  const [tasa, setTasa] = useState('');
  const [plazo, setPlazo] = useState('');
  const [result, setResult] = useState<{ cuota: number; prestamo: number | null } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const ing = parseFloat(ingresos), deu = parseFloat(deudas || '0');
      if (isNaN(ing) || ing <= 0) throw new Error('Introduce tus ingresos netos mensuales.');
      if (isNaN(deu) || deu < 0) throw new Error('Las deudas actuales no pueden ser negativas.');
      const cuotaMax = Math.max(0, ing * 0.35 - deu);
      let prestamo: number | null = null;
      const r = parseFloat(tasa), y = parseFloat(plazo);
      if (!isNaN(r) && !isNaN(y) && y > 0) {
        const i = r / 100 / 12;
        const n = y * 12;
        prestamo = i === 0 ? cuotaMax * n : cuotaMax * (1 - Math.pow(1 + i, -n)) / i;
      }
      setResult({ cuota: cuotaMax, prestamo });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Regla del 35 %: la cuota total de tus deudas no debería superar el 35 % de tus ingresos netos.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ingresos netos/mes</label>
          <input type="number" value={ingresos} onChange={(e) => { setIngresos(e.target.value); setResult(null); }} placeholder="Ej. 2500" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cuotas/deudas actuales</label>
          <input type="number" value={deudas} onChange={(e) => { setDeudas(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Interés anual (%) <span className="opacity-60">opcional</span></label>
          <input type="number" value={tasa} onChange={(e) => { setTasa(e.target.value); setResult(null); }} placeholder="Ej. 3.5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Plazo (años) <span className="opacity-60">opcional</span></label>
          <input type="number" value={plazo} onChange={(e) => { setPlazo(e.target.value); setResult(null); }} placeholder="Ej. 25" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular capacidad</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Cuota mensual máxima recomendada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.cuota)}</p>
          {result.prestamo !== null && (
            <p className="text-sm text-[var(--color-text-secondary)]">Con ese interés y plazo, podrías pedir un préstamo de hasta <strong>{formatCurrency(result.prestamo)}</strong>.</p>
          )}
        </div>
      )}
    </div>
  );
}
