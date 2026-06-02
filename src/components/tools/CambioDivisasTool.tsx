import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const DIVISAS: Record<string, { label: string; simbolo: string; vsEUR: number }> = {
  EUR: { label: 'Euro (€)',            simbolo: '€', vsEUR: 1 },
  USD: { label: 'Dólar USA ($)',       simbolo: '$', vsEUR: 1.08 },
  GBP: { label: 'Libra esterlina (£)', simbolo: '£', vsEUR: 0.86 },
  JPY: { label: 'Yen japonés (¥)',     simbolo: '¥', vsEUR: 163 },
  CHF: { label: 'Franco suizo (CHF)',  simbolo: 'Fr', vsEUR: 0.97 },
  CAD: { label: 'Dólar canadiense',   simbolo: 'C$', vsEUR: 1.46 },
  AUD: { label: 'Dólar australiano',  simbolo: 'A$', vsEUR: 1.64 },
  MXN: { label: 'Peso mexicano',      simbolo: '$', vsEUR: 20.8 },
  BRL: { label: 'Real brasileño',     simbolo: 'R$', vsEUR: 5.37 },
  CNY: { label: 'Yuan chino',         simbolo: '¥', vsEUR: 7.84 },
  ARS: { label: 'Peso argentino',     simbolo: '$', vsEUR: 1040 },
  COP: { label: 'Peso colombiano',    simbolo: '$', vsEUR: 4520 },
};

type DivisaKey = keyof typeof DIVISAS;

export default function CambioDivisasTool() {
  const [cantidad, setCantidad] = useState('');
  const [de, setDe] = useState<DivisaKey>('EUR');
  const [a, setA] = useState<DivisaKey>('USD');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(cantidad.replace(',', '.'));
      if (isNaN(c) || c <= 0) throw new Error('Introduce una cantidad positiva.');
      const enEUR = c / DIVISAS[de].vsEUR;
      setResult(enEUR * DIVISAS[a].vsEUR);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const taxa = DIVISAS[de].vsEUR > 0 ? DIVISAS[a].vsEUR / DIVISAS[de].vsEUR : 0;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Tipos de cambio orientativos — actualizarlos antes de usarlos para transacciones reales.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">De</label>
          <select value={de} onChange={(e) => { setDe(e.target.value as DivisaKey); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {Object.entries(DIVISAS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A</label>
          <select value={a} onChange={(e) => { setA(e.target.value as DivisaKey); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {Object.entries(DIVISAS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad</label>
        <input type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{DIVISAS[a].simbolo} {formatNumber(result, 4)}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Tipo de cambio: 1 {de} = {formatNumber(taxa, 6)} {a}</p>
        </div>
      )}
    </div>
  );
}
