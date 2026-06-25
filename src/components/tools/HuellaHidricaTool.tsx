import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

// Litros de agua por kg de producto (huella hídrica aprox.)
const ALIMENTOS: Record<string, number> = {
  'Carne de vacuno': 15400,
  'Carne de cerdo': 6000,
  'Pollo': 4300,
  'Queso': 5000,
  'Huevos': 3300,
  'Arroz': 2500,
  'Pan / trigo': 1600,
  'Manzanas': 700,
  'Patatas': 290,
  'Chocolate': 17000,
  'Café (por kg)': 18900,
};
const KEYS = Object.keys(ALIMENTOS);
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function HuellaHidricaTool() {
  const [alimento, setAlimento] = useState(KEYS[0]);
  const [kg, setKg] = useState('');
  const [result, setResult] = useState<{ litros: number; duchas: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const k = parseFloat(kg);
      if (isNaN(k) || k <= 0) throw new Error('Introduce la cantidad en kilogramos.');
      const litros = k * ALIMENTOS[alimento];
      setResult({ litros, duchas: litros / 70 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">La huella hídrica es el agua total empleada para producir un alimento, desde el cultivo hasta tu mesa.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Alimento</label>
          <select value={alimento} onChange={(e) => { setAlimento(e.target.value); setResult(null); }} className={INPUT}>{KEYS.map((k) => <option key={k} value={k}>{k}</option>)}</select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad (kg)</label>
          <input type="number" value={kg} onChange={(e) => { setKg(e.target.value); setResult(null); }} placeholder="Ej. 1" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular huella hídrica</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Agua virtual utilizada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litros, 0)} litros</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a unas {formatNumber(result.duchas, 0)} duchas. Valores medios orientativos.</p>
        </div>
      )}
    </div>
  );
}
