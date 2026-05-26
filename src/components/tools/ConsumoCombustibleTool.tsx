import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

type TipoCombustible = 'gasolina' | 'diesel';

const CO2_FACTOR: Record<TipoCombustible, number> = {
  gasolina: 2.392,
  diesel: 2.640,
};

interface Resultado {
  litros: number;
  costeTotal: number;
  costePorPersona: number;
  co2: number;
}

export default function ConsumoCombustibleTool() {
  const [distancia, setDistancia] = useState('');
  const [consumo, setConsumo] = useState('7');
  const [precio, setPrecio] = useState('1.70');
  const [personas, setPersonas] = useState('1');
  const [combustible, setCombustible] = useState<TipoCombustible>('gasolina');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    const d = parseFloat(distancia.replace(',', '.'));
    const c = parseFloat(consumo.replace(',', '.'));
    const p = parseFloat(precio.replace(',', '.'));
    const n = parseFloat(personas.replace(',', '.'));

    if (isNaN(d) || d <= 0) { setError('Introduce una distancia válida en km.'); return; }
    if (isNaN(c) || c <= 0) { setError('Introduce un consumo válido en L/100km.'); return; }
    if (isNaN(p) || p <= 0) { setError('Introduce un precio de combustible válido.'); return; }
    if (isNaN(n) || n < 1 || !Number.isInteger(n)) { setError('El número de personas debe ser un entero mayor que 0.'); return; }

    const litros = d * (c / 100);
    const costeTotal = litros * p;
    const costePorPersona = costeTotal / n;
    const co2 = litros * CO2_FACTOR[combustible];

    setResultado({ litros, costeTotal, costePorPersona, co2 });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Distancia del trayecto (km)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            placeholder="Ej. 350"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Consumo del coche (L/100 km)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={consumo}
            onChange={(e) => setConsumo(e.target.value)}
            placeholder="Ej. 7"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Precio del combustible (€/L)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej. 1.70"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Número de personas
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            placeholder="Ej. 2"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Tipo de combustible
          </label>
          <select
            value={combustible}
            onChange={(e) => setCombustible(e.target.value as TipoCombustible)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            <option value="gasolina">Gasolina (2,392 kg CO₂/L)</option>
            <option value="diesel">Diésel (2,640 kg CO₂/L)</option>
          </select>
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular coste del trayecto
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Litros necesarios</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultado.litros, 2)} L
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Coste total</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(resultado.costeTotal)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Coste por persona</p>
            <p className="text-2xl font-extrabold text-[var(--color-accent)]">
              {formatCurrency(resultado.costePorPersona)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">CO₂ emitido</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultado.co2, 2)} kg
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
