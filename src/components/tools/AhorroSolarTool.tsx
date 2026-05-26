import { useState } from 'react';
import { formatNumber, formatCurrency, formatPercent } from '@/lib/utils/format';

interface Resultado {
  generacionMes: number;
  autoconsumo: number;
  excedente: number;
  ahorroPorAutoconsumo: number;
  ingresoPorExcedente: number;
  ahorroTotalMes: number;
  ahorroAnual: number;
  porcentajeCubierto: number;
}

export default function AhorroSolarTool() {
  const [potencia, setPotencia] = useState('3');
  const [horasSol, setHorasSol] = useState('4.5');
  const [consumoMes, setConsumoMes] = useState('350');
  const [precioCompra, setPrecioCompra] = useState('0.15');
  const [precioVenta, setPrecioVenta] = useState('0.05');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    try {
      const p = parseFloat(potencia);
      const h = parseFloat(horasSol);
      const c = parseFloat(consumoMes);
      const pc = parseFloat(precioCompra);
      const pv = parseFloat(precioVenta);

      if (isNaN(p) || isNaN(h) || isNaN(c) || isNaN(pc) || isNaN(pv)) {
        throw new Error('Introduce valores numéricos válidos en todos los campos.');
      }
      if (p <= 0) throw new Error('La potencia debe ser mayor que 0.');
      if (h <= 0 || h > 24) throw new Error('Las horas de sol deben estar entre 0 y 24.');
      if (c <= 0) throw new Error('El consumo mensual debe ser mayor que 0.');
      if (pc <= 0) throw new Error('El precio de compra debe ser mayor que 0.');
      if (pv < 0) throw new Error('El precio de venta no puede ser negativo.');

      const generacionMes = p * h * 30;
      const autoconsumo = Math.min(generacionMes, c);
      const excedente = Math.max(0, generacionMes - c);
      const ahorroPorAutoconsumo = autoconsumo * pc;
      const ingresoPorExcedente = excedente * pv;
      const ahorroTotalMes = ahorroPorAutoconsumo + ingresoPorExcedente;
      const ahorroAnual = ahorroTotalMes * 12;
      const porcentajeCubierto = (autoconsumo / c) * 100;

      setResultado({
        generacionMes,
        autoconsumo,
        excedente,
        ahorroPorAutoconsumo,
        ingresoPorExcedente,
        ahorroTotalMes,
        ahorroAnual,
        porcentajeCubierto,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const labelClass = 'text-xs font-medium text-[var(--color-text-secondary)]';
  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Potencia de instalación (kWp)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={potencia}
            onChange={(e) => setPotencia(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Horas de sol pico al día (HSP)</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.1"
            value={horasSol}
            onChange={(e) => setHorasSol(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Consumo mensual del hogar (kWh/mes)</label>
          <input
            type="number"
            min="0"
            value={consumoMes}
            onChange={(e) => setConsumoMes(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Precio de la electricidad (€/kWh)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precioCompra}
            onChange={(e) => setPrecioCompra(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className={labelClass}>Precio de venta de excedentes (€/kWh)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular ahorro solar
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado !== null && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">Ahorro mensual</p>
              <span className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatCurrency(resultado.ahorroTotalMes)}
              </span>
            </div>
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">Ahorro anual</p>
              <span className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatCurrency(resultado.ahorroAnual)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-4 space-y-2">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              Desglose mensual
            </p>
            {[
              { label: 'Generacion solar', valor: `${formatNumber(resultado.generacionMes, 0)} kWh` },
              { label: 'Autoconsumo', valor: `${formatNumber(resultado.autoconsumo, 0)} kWh` },
              { label: 'Excedente volcado', valor: `${formatNumber(resultado.excedente, 0)} kWh` },
              { label: 'Ahorro por autoconsumo', valor: formatCurrency(resultado.ahorroPorAutoconsumo) },
              { label: 'Ingreso por excedente', valor: formatCurrency(resultado.ingresoPorExcedente) },
              { label: '% consumo cubierto', valor: formatPercent(resultado.porcentajeCubierto, 1) },
            ].map(({ label, valor }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">{label}</span>
                <span className="font-semibold text-[var(--color-text)]">{valor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
