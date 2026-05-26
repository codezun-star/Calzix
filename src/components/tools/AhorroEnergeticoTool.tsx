import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

export default function AhorroEnergeticoTool() {
  const [consumo, setConsumo] = useState('');
  const [mejora, setMejora] = useState('');
  const [precio, setPrecio] = useState('0.15');
  const [result, setResult] = useState<{
    consumoNuevo: number;
    ahorroKwhMes: number;
    ahorroEurosMes: number;
    ahorroEurosAnio: number;
    co2Evitado: number;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const consumoN = parseFloat(consumo.replace(',', '.'));
      const mejoraN = parseFloat(mejora.replace(',', '.'));
      const precioN = parseFloat(precio.replace(',', '.'));

      if (isNaN(consumoN) || consumoN <= 0)
        throw new Error('Introduce un consumo actual válido (mayor que 0).');
      if (isNaN(mejoraN) || mejoraN <= 0 || mejoraN >= 100)
        throw new Error('La mejora de eficiencia debe estar entre 1 y 99%.');
      if (isNaN(precioN) || precioN <= 0)
        throw new Error('Introduce un precio de electricidad válido.');

      const consumoNuevo = consumoN * (1 - mejoraN / 100);
      const ahorroKwhMes = consumoN - consumoNuevo;
      const ahorroEurosMes = ahorroKwhMes * precioN;
      const ahorroEurosAnio = ahorroEurosMes * 12;
      const ahorroKwhAnio = ahorroKwhMes * 12;
      const co2Evitado = ahorroKwhAnio * 0.233;

      setResult({ consumoNuevo, ahorroKwhMes, ahorroEurosMes, ahorroEurosAnio, co2Evitado });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Consumo actual (kWh/mes)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={consumo}
            onChange={(e) => setConsumo(e.target.value)}
            placeholder="Ej. 300"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Mejora de eficiencia (%)
          </label>
          <input
            type="number"
            min="1"
            max="99"
            step="1"
            value={mejora}
            onChange={(e) => setMejora(e.target.value)}
            placeholder="Ej. 30"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Precio de la electricidad (€/kWh)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.15"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular ahorro
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Ahorro económico anual
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(result.ahorroEurosAnio)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Consumo nuevo</p>
              <p className="text-sm font-bold text-[var(--color-text)]">
                {formatNumber(result.consumoNuevo)} kWh/mes
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Ahorro mensual</p>
              <p className="text-sm font-bold text-[var(--color-text)]">
                {formatNumber(result.ahorroKwhMes)} kWh
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Ahorro €/mes</p>
              <p className="text-sm font-bold text-[var(--color-text)]">
                {formatCurrency(result.ahorroEurosMes)}
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">CO₂ evitado/año</p>
              <p className="text-sm font-bold text-[var(--color-text)]">
                {formatNumber(result.co2Evitado)} kg
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
