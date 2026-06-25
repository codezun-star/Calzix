import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function CosteAlquilerCocheTool() {
  const [tarifa, setTarifa] = useState('');
  const [dias, setDias] = useState('');
  const [seguro, setSeguro] = useState('0');
  const [extras, setExtras] = useState('0');
  const [result, setResult] = useState<{ total: number; porDia: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const t = parseFloat(tarifa), d = parseFloat(dias), s = parseFloat(seguro || '0'), e = parseFloat(extras || '0');
      if (isNaN(t) || t < 0) throw new Error('Introduce la tarifa diaria.');
      if (isNaN(d) || d <= 0) throw new Error('Introduce el número de días.');
      if (isNaN(s) || s < 0 || isNaN(e) || e < 0) throw new Error('El seguro y los extras deben ser positivos.');
      const total = (t + s) * d + e;
      setResult({ total, porDia: total / d });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tarifa por día</label>
          <input type="number" value={tarifa} onChange={(e) => { setTarifa(e.target.value); setResult(null); }} placeholder="Ej. 35" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días de alquiler</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="Ej. 7" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Seguro por día</label>
          <input type="number" value={seguro} onChange={(e) => { setSeguro(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Extras (único)</label>
          <input type="number" value={extras} onChange={(e) => { setExtras(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Coste total del alquiler</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Coste medio por día (con seguro y extras): <strong>{formatCurrency(result.porDia)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
