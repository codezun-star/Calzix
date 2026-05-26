import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type TipoCombustible = 'gasolina' | 'diesel' | 'electrico';
type TipoDieta = 'carnivora' | 'omnivora' | 'vegetariana' | 'vegana';

interface Resultado {
  totalKg: number;
  totalToneladas: number;
  desglose: {
    coche: number;
    vuelos: number;
    electricidad: number;
    dieta: number;
  };
  arboles: number;
}

const FACTOR_COCHE: Record<TipoCombustible, number> = {
  gasolina: 0.18,
  diesel: 0.168,
  electrico: 0.05,
};

const FACTOR_DIETA: Record<TipoDieta, number> = {
  carnivora: 2500,
  omnivora: 1700,
  vegetariana: 1200,
  vegana: 900,
};

export default function HuellaCarbonTool() {
  const [kmCoche, setKmCoche] = useState('');
  const [combustible, setCombustible] = useState<TipoCombustible>('gasolina');
  const [vuelosCortos, setVuelosCortos] = useState('');
  const [vuelosLargos, setVuelosLargos] = useState('');
  const [electricidadMes, setElectricidadMes] = useState('');
  const [dieta, setDieta] = useState<TipoDieta>('omnivora');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    try {
      const km = parseFloat(kmCoche) || 0;
      const cortos = parseFloat(vuelosCortos) || 0;
      const largos = parseFloat(vuelosLargos) || 0;
      const kwh = parseFloat(electricidadMes) || 0;

      if (km < 0 || cortos < 0 || largos < 0 || kwh < 0) {
        throw new Error('Los valores no pueden ser negativos.');
      }

      const coche = km * FACTOR_COCHE[combustible];
      const vuelos = cortos * 255 + largos * 1950;
      const electricidad = kwh * 12 * 0.233;
      const dietaKg = FACTOR_DIETA[dieta];

      const totalKg = coche + vuelos + electricidad + dietaKg;
      const totalToneladas = totalKg / 1000;
      const arboles = Math.ceil(totalKg / 22);

      setResultado({
        totalKg,
        totalToneladas,
        desglose: { coche, vuelos, electricidad, dieta: dietaKg },
        arboles,
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
          <label className={labelClass}>Km en coche al año</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 15000"
            value={kmCoche}
            onChange={(e) => setKmCoche(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Tipo de combustible</label>
          <select
            value={combustible}
            onChange={(e) => setCombustible(e.target.value as TipoCombustible)}
            className={inputClass}
          >
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diésel</option>
            <option value="electrico">Eléctrico</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Vuelos cortos (&lt;3h) al año</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 2"
            value={vuelosCortos}
            onChange={(e) => setVuelosCortos(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Vuelos largos (&gt;3h) al año</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 1"
            value={vuelosLargos}
            onChange={(e) => setVuelosLargos(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Consumo eléctrico mensual (kWh/mes)</label>
          <input
            type="number"
            min="0"
            placeholder="Ej: 250"
            value={electricidadMes}
            onChange={(e) => setElectricidadMes(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Tipo de dieta</label>
          <select
            value={dieta}
            onChange={(e) => setDieta(e.target.value as TipoDieta)}
            className={inputClass}
          >
            <option value="carnivora">Carnívora</option>
            <option value="omnivora">Omnívora</option>
            <option value="vegetariana">Vegetariana</option>
            <option value="vegana">Vegana</option>
          </select>
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular huella de carbono
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado !== null && (
        <div className="space-y-3">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Huella de carbono anual
            </p>
            <span className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultado.totalToneladas, 2)} tCO₂/año
            </span>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              ({formatNumber(resultado.totalKg, 0)} kg CO₂)
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-4 space-y-2">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              Desglose por categoría
            </p>
            {[
              { label: 'Transporte en coche', valor: resultado.desglose.coche },
              { label: 'Vuelos', valor: resultado.desglose.vuelos },
              { label: 'Electricidad del hogar', valor: resultado.desglose.electricidad },
              { label: 'Alimentación (dieta)', valor: resultado.desglose.dieta },
            ].map(({ label, valor }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">{label}</span>
                <span className="font-semibold text-[var(--color-text)]">
                  {formatNumber(valor, 0)} kg
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 text-center">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Equivale a plantar
            </p>
            <span className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultado.arboles, 0)} árboles
            </span>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              para compensar tu huella (1 árbol absorbe ~22 kg CO₂/año)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
