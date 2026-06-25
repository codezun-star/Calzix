import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function AhorroAguaGrifoTool() {
  const [caudalActual, setCaudalActual] = useState('8');
  const [caudalNuevo, setCaudalNuevo] = useState('5');
  const [minutos, setMinutos] = useState('');
  const [personas, setPersonas] = useState('1');
  const [precio, setPrecio] = useState('2');
  const [result, setResult] = useState<{ litros: number; coste: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const ca = parseFloat(caudalActual), cn = parseFloat(caudalNuevo), m = parseFloat(minutos), p = parseInt(personas, 10), pr = parseFloat(precio);
      if ([ca, cn, m, p, pr].some((x) => isNaN(x) || x < 0)) throw new Error('Revisa los datos: deben ser positivos.');
      if (cn > ca) throw new Error('El caudal con aireador debería ser menor que el actual.');
      const litros = (ca - cn) * m * 365 * p;
      setResult({ litros, coste: (litros / 1000) * pr });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Un grifo normal da unos 8-12 L/min; con aireador, 5-6 L/min.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Caudal actual (L/min)</label>
          <input type="number" value={caudalActual} onChange={(e) => { setCaudalActual(e.target.value); setResult(null); }} placeholder="8" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Caudal con aireador (L/min)</label>
          <input type="number" value={caudalNuevo} onChange={(e) => { setCaudalNuevo(e.target.value); setResult(null); }} placeholder="5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos de grifo/día</label>
          <input type="number" value={minutos} onChange={(e) => { setMinutos(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Personas</label>
          <input type="number" value={personas} onChange={(e) => { setPersonas(e.target.value); setResult(null); }} placeholder="1" className={INPUT} />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio del agua (por m³)</label>
          <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="2" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ahorro</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Ahorro de agua al año</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litros, 0)} litros</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a un ahorro de <strong>{formatCurrency(result.coste)}</strong> al año en la factura del agua.</p>
        </div>
      )}
    </div>
  );
}
