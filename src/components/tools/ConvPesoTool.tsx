import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'g' | 'kg' | 'mg' | 't' | 'lb' | 'oz' | 'st';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  g:  { label: 'Gramos',             toBase: (v) => v,                fromBase: (v) => v },
  kg: { label: 'Kilogramos',         toBase: (v) => v * 1000,         fromBase: (v) => v / 1000 },
  mg: { label: 'Miligramos',         toBase: (v) => v * 0.001,        fromBase: (v) => v / 0.001 },
  t:  { label: 'Toneladas métricas', toBase: (v) => v * 1000000,      fromBase: (v) => v / 1000000 },
  lb: { label: 'Libras',             toBase: (v) => v * 453.59237,    fromBase: (v) => v / 453.59237 },
  oz: { label: 'Onzas',              toBase: (v) => v * 28.349523,    fromBase: (v) => v / 28.349523 },
  st: { label: 'Stones',             toBase: (v) => v * 6350.29318,   fromBase: (v) => v / 6350.29318 },
};

export default function ConvPesoTool() {
  const [value, setValue] = useState('');
  const [from, setFrom]   = useState<UnitKey>('kg');
  const [to, setTo]       = useState<UnitKey>('lb');

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
