import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConsumoClimatizacionTool() {
  const [potencia, setPotencia] = useState('');
  const [horas, setHoras] = useState('');
  const [meses, setMeses] = useState('');
  const [precio, setPrecio] = useState('0.15');
  const [result, setResult] = useState<{ kwh: number; coste: number; mensual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(potencia), h = parseFloat(horas), m = parseFloat(meses), pr = parseFloat(precio);
      if ([p, h, m, pr].some((x) => isNaN(x) || x < 0)) throw new Error('Revisa los datos: todos deben ser positivos.');
      const dias = m * 30;
      const kwh = (p / 1000) * h * dias;
      const coste = kwh * pr;
      setResult({ kwh, coste, mensual: m > 0 ? coste / m : 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Estima el coste del aire acondicionado o la calefacción eléctrica durante la temporada.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia del equipo (W)</label>
          <input type="number" value={potencia} onChange={(e) => { setPotencia(e.target.value); setResult(null); }} placeholder="Ej. 1200" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de uso/día</label>
          <input type="number" value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="Ej. 6" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Meses de uso al año</label>
          <input type="number" value={meses} onChange={(e) => { setMeses(e.target.value); setResult(null); }} placeholder="Ej. 3" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio del kWh</label>
          <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="0.15" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular consumo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Coste de la temporada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.coste)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatNumber(result.kwh, 0)} kWh en total · unos {formatCurrency(result.mensual)} al mes mientras lo uses.</p>
        </div>
      )}
    </div>
  );
}
