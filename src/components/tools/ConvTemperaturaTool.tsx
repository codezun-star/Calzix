import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type TempUnit = 'C' | 'F' | 'K';

const UNITS: Record<TempUnit, { label: string }> = {
  C: { label: 'Celsius (°C)' },
  F: { label: 'Fahrenheit (°F)' },
  K: { label: 'Kelvin (K)' },
};

function convert(value: number, from: TempUnit, to: TempUnit): number {
  if (from === to) return value;

  // Convertir a Celsius primero
  let celsius: number;
  if (from === 'C')      celsius = value;
  else if (from === 'F') celsius = (value - 32) * 5 / 9;
  else                   celsius = value - 273.15;

  // Convertir de Celsius al destino
  if (to === 'C') return celsius;
  if (to === 'F') return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}

export default function ConvTemperaturaTool() {
  const [value, setValue] = useState('');
  const [from, setFrom]   = useState<TempUnit>('C');
  const [to, setTo]       = useState<TempUnit>('F');

  const num    = parseFloat(value);
  const result = !isNaN(num) ? convert(num, from, to) : null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">De</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as TempUnit)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            {(Object.keys(UNITS) as TempUnit[]).map((k) => (
              <option key={k} value={k}>{UNITS[k].label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as TempUnit)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            {(Object.keys(UNITS) as TempUnit[]).map((k) => (
              <option key={k} value={k}>{UNITS[k].label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Valor</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 2)}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {UNITS[from].label} → {UNITS[to].label}
          </p>
        </div>
      )}
    </div>
  );
}
