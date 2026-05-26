import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'j' | 'kj' | 'cal' | 'kcal' | 'wh' | 'kwh' | 'btu';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  j:    { label: 'Julios (J)',              toBase: (v) => v,               fromBase: (v) => v },
  kj:   { label: 'Kilojulios (kJ)',         toBase: (v) => v * 1000,        fromBase: (v) => v / 1000 },
  cal:  { label: 'Calorías (cal)',          toBase: (v) => v * 4.184,       fromBase: (v) => v / 4.184 },
  kcal: { label: 'Kilocalorías (kcal)',     toBase: (v) => v * 4184,        fromBase: (v) => v / 4184 },
  wh:   { label: 'Vatios-hora (Wh)',        toBase: (v) => v * 3600,        fromBase: (v) => v / 3600 },
  kwh:  { label: 'Kilovatios-hora (kWh)',   toBase: (v) => v * 3600000,     fromBase: (v) => v / 3600000 },
  btu:  { label: 'BTU',                     toBase: (v) => v * 1055.05585,  fromBase: (v) => v / 1055.05585 },
};

export default function ConvEnergiaTool() {
  const [value, setValue] = useState('');
  const [from, setFrom]   = useState<UnitKey>('kwh');
  const [to, setTo]       = useState<UnitKey>('j');

  const num    = parseFloat(value);
  const result = !isNaN(num) ? UNITS[to].fromBase(UNITS[from].toBase(num)) : null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">De</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as UnitKey)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            {(Object.keys(UNITS) as UnitKey[]).map((k) => (
              <option key={k} value={k}>{UNITS[k].label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as UnitKey)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            {(Object.keys(UNITS) as UnitKey[]).map((k) => (
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
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 6)}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {UNITS[from].label} → {UNITS[to].label}
          </p>
        </div>
      )}
    </div>
  );
}
