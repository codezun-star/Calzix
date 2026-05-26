import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'm2' | 'km2' | 'cm2' | 'mm2' | 'ha' | 'acre' | 'ft2' | 'in2';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  m2:   { label: 'm²',                toBase: (v) => v,               fromBase: (v) => v },
  km2:  { label: 'km²',               toBase: (v) => v * 1000000,     fromBase: (v) => v / 1000000 },
  cm2:  { label: 'cm²',               toBase: (v) => v * 0.0001,      fromBase: (v) => v / 0.0001 },
  mm2:  { label: 'mm²',               toBase: (v) => v * 0.000001,    fromBase: (v) => v / 0.000001 },
  ha:   { label: 'Hectáreas (ha)',     toBase: (v) => v * 10000,       fromBase: (v) => v / 10000 },
  acre: { label: 'Acres',             toBase: (v) => v * 4046.8564,   fromBase: (v) => v / 4046.8564 },
  ft2:  { label: 'Pies² (ft²)',        toBase: (v) => v * 0.09290304,  fromBase: (v) => v / 0.09290304 },
  in2:  { label: 'Pulgadas² (in²)',    toBase: (v) => v * 0.00064516,  fromBase: (v) => v / 0.00064516 },
};

export default function ConvAreaTool() {
  const [value, setValue] = useState('');
  const [from, setFrom]   = useState<UnitKey>('m2');
  const [to, setTo]       = useState<UnitKey>('ha');

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
