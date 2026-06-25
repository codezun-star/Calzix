import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function DescuentoSucesivoTool() {
  const [precio, setPrecio] = useState('');
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [d3, setD3] = useState('');
  const [result, setResult] = useState<{ final: number; ahorro: number; equivalente: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(precio);
      if (isNaN(p) || p < 0) throw new Error('Introduce el precio original.');
      const ds = [d1, d2, d3].map((d) => parseFloat(d || '0'));
      if (ds.some((d) => isNaN(d) || d < 0 || d > 100)) throw new Error('Cada descuento debe estar entre 0 y 100 %.');
      let final = p;
      ds.forEach((d) => { final *= (1 - d / 100); });
      const ahorro = p - final;
      setResult({ final, ahorro, equivalente: p > 0 ? (ahorro / p) * 100 : 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Aplica varios descuentos en cadena (uno sobre el resultado del anterior).</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio original</label>
        <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="Ej. 100" className={INPUT} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">1.er descuento (%)</label>
          <input type="number" value={d1} onChange={(e) => { setD1(e.target.value); setResult(null); }} placeholder="20" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">2.º descuento (%)</label>
          <input type="number" value={d2} onChange={(e) => { setD2(e.target.value); setResult(null); }} placeholder="10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">3.er descuento (%)</label>
          <input type="number" value={d3} onChange={(e) => { setD3(e.target.value); setResult(null); }} placeholder="0" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Precio final</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.final)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Ahorro: {formatCurrency(result.ahorro)} · Descuento único equivalente: <strong>{formatPercent(result.equivalente)}</strong>.</p>
        </div>
      )}
    </div>
  );
}
