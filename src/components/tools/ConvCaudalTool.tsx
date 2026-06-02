import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'm3s' | 'ls' | 'm3h' | 'lmin' | 'galmin' | 'ft3s';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  m3s:   { label: 'm³/s',       toBase: (v) => v,              fromBase: (v) => v },
  ls:    { label: 'L/s',        toBase: (v) => v * 0.001,      fromBase: (v) => v / 0.001 },
  m3h:   { label: 'm³/h',       toBase: (v) => v / 3600,       fromBase: (v) => v * 3600 },
  lmin:  { label: 'L/min',      toBase: (v) => v / 60000,      fromBase: (v) => v * 60000 },
  galmin:{ label: 'gal/min (EE.UU.)', toBase: (v) => v * 6.30902e-5, fromBase: (v) => v / 6.30902e-5 },
  ft3s:  { label: 'ft³/s',      toBase: (v) => v * 0.0283168,  fromBase: (v) => v / 0.0283168 },
};

export default function ConvCaudalTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState<UnitKey>('m3s');
  const [to, setTo]     = useState<UnitKey>('ls');

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
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 8)}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{UNITS[from].label} → {UNITS[to].label}</p>
        </div>
      )}
    </div>
  );
}
