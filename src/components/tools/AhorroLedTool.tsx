import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function AhorroLedTool() {
  const [bombillas, setBombillas] = useState('');
  const [wAntigua, setWAntigua] = useState('60');
  const [wLed, setWLed] = useState('9');
  const [horas, setHoras] = useState('5');
  const [precio, setPrecio] = useState('0.15');
  const [result, setResult] = useState<{ kwh: number; ahorro: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseInt(bombillas, 10), wa = parseFloat(wAntigua), wl = parseFloat(wLed), h = parseFloat(horas), p = parseFloat(precio);
      if ([n, wa, wl, h, p].some((x) => isNaN(x) || x < 0)) throw new Error('Revisa los datos: todos deben ser números positivos.');
      if (wl > wa) throw new Error('La bombilla LED debería consumir menos que la antigua.');
      const kwh = (n * (wa - wl) * h * 365) / 1000;
      setResult({ kwh, ahorro: kwh * p });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nº de bombillas</label>
          <input type="number" value={bombillas} onChange={(e) => { setBombillas(e.target.value); setResult(null); }} placeholder="Ej. 10" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas/día encendidas</label>
          <input type="number" value={horas} onChange={(e) => { setHoras(e.target.value); setResult(null); }} placeholder="5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">W bombilla antigua</label>
          <input type="number" value={wAntigua} onChange={(e) => { setWAntigua(e.target.value); setResult(null); }} placeholder="60" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">W bombilla LED</label>
          <input type="number" value={wLed} onChange={(e) => { setWLed(e.target.value); setResult(null); }} placeholder="9" className={INPUT} />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio del kWh</label>
          <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="0.15" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular ahorro</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Ahorro anual al cambiar a LED</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.ahorro)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Dejarás de consumir {formatNumber(result.kwh, 0)} kWh al año.</p>
        </div>
      )}
    </div>
  );
}
