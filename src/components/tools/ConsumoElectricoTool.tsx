import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

interface ResultadoElectrico {
  kwhDia: number;
  kwhMes: number;
  costeMes: number;
  costeAnio: number;
}

export default function ConsumoElectricoTool() {
  const [potencia, setPotencia] = useState('');
  const [horas, setHoras] = useState('');
  const [dias, setDias] = useState('30');
  const [precio, setPrecio] = useState('0.15');
  const [result, setResult] = useState<ResultadoElectrico | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    setResult(null);

    const p = parseFloat(potencia);
    const h = parseFloat(horas);
    const d = parseFloat(dias);
    const pr = parseFloat(precio);

    if (isNaN(p) || p <= 0) { setError('Introduce una potencia válida en vatios (mayor que 0).'); return; }
    if (isNaN(h) || h <= 0) { setError('Introduce las horas de uso diario (mayor que 0).'); return; }
    if (isNaN(d) || d <= 0) { setError('Introduce los días al mes (mayor que 0).'); return; }
    if (isNaN(pr) || pr <= 0) { setError('Introduce un precio de electricidad válido (mayor que 0).'); return; }

    const kwhDia = (p / 1000) * h;
    const kwhMes = kwhDia * d;
    const costeMes = kwhMes * pr;
    const costeAnio = costeMes * 12;

    setResult({ kwhDia, kwhMes, costeMes, costeAnio });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia del aparato (W)</label>
          <input
            type="number"
            value={potencia}
            onChange={(e) => setPotencia(e.target.value)}
            placeholder="1500"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas de uso al día</label>
          <input
            type="number"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            placeholder="8"
            min="0"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Días al mes</label>
          <input
            type="number"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
            placeholder="30"
            min="1"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio electricidad (€/kWh)</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.15"
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular consumo
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo diario</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.kwhDia, 3)} kWh</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo mensual</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.kwhMes, 2)} kWh</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--color-border)]">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Coste mensual</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.costeMes)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Coste anual</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.costeAnio)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
