import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'lux' | 'fc' | 'phot' | 'nox' | 'klux';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  lux:  { label: 'Lux (lx)',         toBase: (v) => v,          fromBase: (v) => v },
  fc:   { label: 'Pie-candela (fc)',  toBase: (v) => v * 10.7639, fromBase: (v) => v / 10.7639 },
  phot: { label: 'Fot (ph)',          toBase: (v) => v * 10000,  fromBase: (v) => v / 10000 },
  nox:  { label: 'Nox (nx)',          toBase: (v) => v * 0.001,  fromBase: (v) => v / 0.001 },
  klux: { label: 'Kilolux (klx)',     toBase: (v) => v * 1000,   fromBase: (v) => v / 1000 },
};

export default function ConvIluminacionTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState<UnitKey>('lux');
  const [to, setTo]     = useState<UnitKey>('fc');

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
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{UNITS[from].label} → {UNITS[to].label}</p>
        </div>
      )}
    </div>
  );
}
