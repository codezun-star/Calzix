import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface Material {
  key: string;
  label: string;
  factor: number; // kg CO₂ por kg reciclado
  placeholder: string;
}

const MATERIALES: Material[] = [
  { key: 'papel', label: 'Papel y cartón', factor: 0.9, placeholder: 'Ej: 5' },
  { key: 'plastico', label: 'Plástico', factor: 1.5, placeholder: 'Ej: 2' },
  { key: 'vidrio', label: 'Vidrio', factor: 0.3, placeholder: 'Ej: 3' },
  { key: 'metales', label: 'Metales (latas, etc.)', factor: 2.0, placeholder: 'Ej: 1' },
  { key: 'organico', label: 'Materia orgánica (compost)', factor: 0.5, placeholder: 'Ej: 4' },
];

interface DetalleResultado {
  label: string;
  kgMes: number;
  co2Mes: number;
}

interface Resultado {
  desglose: DetalleResultado[];
  co2TotalMes: number;
  co2TotalAnio: number;
  arbolesEquivalentes: number;
}

export default function ReciclajeTool() {
  const [cantidades, setCantidades] = useState<Record<string, string>>(
    Object.fromEntries(MATERIALES.map((m) => [m.key, '']))
  );
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function set(key: string, val: string) {
    setCantidades((prev) => ({ ...prev, [key]: val }));
  }

  function calcular() {
    setError('');
    try {
      const desglose: DetalleResultado[] = MATERIALES.map((m) => {
        const kg = parseFloat(cantidades[m.key]) || 0;
        if (kg < 0) throw new Error(`El valor de ${m.label} no puede ser negativo.`);
        return { label: m.label, kgMes: kg, co2Mes: kg * m.factor };
      });

      const co2TotalMes = desglose.reduce((acc, d) => acc + d.co2Mes, 0);
      const co2TotalAnio = co2TotalMes * 12;
      const arbolesEquivalentes = co2TotalAnio / 22;

      setResultado({ desglose, co2TotalMes, co2TotalAnio, arbolesEquivalentes });
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
        {MATERIALES.map((m) => (
          <div key={m.key} className="space-y-1">
            <label className={labelClass}>{m.label} (kg/mes)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder={m.placeholder}
              value={cantidades[m.key]}
              onChange={(e) => set(m.key, e.target.value)}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular impacto del reciclaje
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado !== null && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">CO₂ evitado/mes</p>
              <span className="text-lg font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.co2TotalMes, 1)} kg
              </span>
            </div>
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">CO₂ evitado/año</p>
              <span className="text-lg font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.co2TotalAnio, 1)} kg
              </span>
            </div>
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">Árboles equiv.</p>
              <span className="text-lg font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.arbolesEquivalentes, 1)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-4 space-y-2">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              CO₂ evitado por material (kg/mes)
            </p>
            {resultado.desglose.map(({ label, kgMes, co2Mes }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">
                  {label} ({formatNumber(kgMes, 1)} kg)
                </span>
                <span className="font-semibold text-[var(--color-text)]">
                  {formatNumber(co2Mes, 2)} kg CO₂
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
