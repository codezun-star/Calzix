import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type UnitKey = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CHF' | 'CAD' | 'AUD' | 'MXN' | 'BRL' | 'CLP' | 'COP' | 'CNY';

const UNITS: Record<UnitKey, { label: string; toBase: (v: number) => number; fromBase: (v: number) => number }> = {
  EUR: { label: 'Euro (EUR)',          toBase: (v) => v,          fromBase: (v) => v },
  USD: { label: 'Dólar US (USD)',      toBase: (v) => v / 1.08,   fromBase: (v) => v * 1.08 },
  GBP: { label: 'Libra esterlina (GBP)', toBase: (v) => v / 0.856, fromBase: (v) => v * 0.856 },
  JPY: { label: 'Yen japonés (JPY)',   toBase: (v) => v / 161.5,  fromBase: (v) => v * 161.5 },
  CHF: { label: 'Franco suizo (CHF)',  toBase: (v) => v / 0.977,  fromBase: (v) => v * 0.977 },
  CAD: { label: 'Dólar canadiense (CAD)', toBase: (v) => v / 1.47, fromBase: (v) => v * 1.47 },
  AUD: { label: 'Dólar australiano (AUD)', toBase: (v) => v / 1.64, fromBase: (v) => v * 1.64 },
  MXN: { label: 'Peso mexicano (MXN)', toBase: (v) => v / 18.5,   fromBase: (v) => v * 18.5 },
  BRL: { label: 'Real brasileño (BRL)', toBase: (v) => v / 5.55,  fromBase: (v) => v * 5.55 },
  CLP: { label: 'Peso chileno (CLP)',  toBase: (v) => v / 1040,   fromBase: (v) => v * 1040 },
  COP: { label: 'Peso colombiano (COP)', toBase: (v) => v / 4600, fromBase: (v) => v * 4600 },
  CNY: { label: 'Yuan chino (CNY)',    toBase: (v) => v / 7.82,   fromBase: (v) => v * 7.82 },
};

export default function ConvMonedasTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState<UnitKey>('EUR');
  const [to, setTo] = useState<UnitKey>('USD');

  const num = parseFloat(value);
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
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe</label>
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
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 4)}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {UNITS[from].label} → {UNITS[to].label}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Tasas orientativas de 2024. Para operaciones reales consulta tu banco.
          </p>
        </div>
      )}
    </div>
  );
}
