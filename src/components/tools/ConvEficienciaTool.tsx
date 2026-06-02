import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'l100km' | 'kml' | 'mpgUS' | 'mpgUK';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  l100km: { label: 'L/100 km',        toBase: (v) => v,          fromBase: (v) => v },
  kml:    { label: 'km/L',            toBase: (v) => 100 / v,    fromBase: (v) => 100 / v },
  mpgUS:  { label: 'mpg (EE.UU.)',    toBase: (v) => 235.215 / v, fromBase: (v) => 235.215 / v },
  mpgUK:  { label: 'mpg (Reino Unido)', toBase: (v) => 282.481 / v, fromBase: (v) => 282.481 / v },
};

export default function ConvEficienciaTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState<UnitKey>('l100km');
  const [to, setTo]     = useState<UnitKey>('kml');

  const num    = parseFloat(value);
  const result = (!isNaN(num) && num > 0) ? UNITS[to].fromBase(UNITS[from].toBase(num)) : null;

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
          min="0.01"
          step="0.1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{UNITS[from].label} → {UNITS[to].label}</p>
        </div>
      )}
    </div>
  );
}
