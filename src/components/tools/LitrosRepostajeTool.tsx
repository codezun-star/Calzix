import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

export default function LitrosRepostajeTool() {
  const [distancia, setDistancia] = useState('');
  const [consumo, setConsumo] = useState('');
  const [deposito, setDeposito] = useState('');
  const [nivelActual, setNivelActual] = useState('');
  const [precio, setPrecio] = useState('');
  const [result, setResult] = useState<{ litrosNecesarios: number; litrosRepostar: number; coste: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseFloat(distancia.replace(',', '.'));
      const c = parseFloat(consumo.replace(',', '.'));
      const dep = parseFloat(deposito.replace(',', '.'));
      const nivel = parseFloat(nivelActual.replace(',', '.'));
      const p = parseFloat(precio.replace(',', '.'));
      if (isNaN(d) || isNaN(c)) throw new Error('Introduce la distancia y el consumo del vehículo.');
      if (d <= 0 || c <= 0) throw new Error('Los valores deben ser positivos.');
      const litrosNecesarios = (d * c) / 100;
      let litrosRepostar = litrosNecesarios;
      if (!isNaN(dep) && !isNaN(nivel)) {
        litrosRepostar = Math.max(0, litrosNecesarios - nivel);
      }
      const coste = !isNaN(p) && p > 0 ? litrosRepostar * p : 0;
      setResult({ litrosNecesarios, litrosRepostar, coste });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Distancia del trayecto (km)</label><input type="number" value={distancia} onChange={(e) => { setDistancia(e.target.value); setResult(null); }} placeholder="Ej. 300" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo del vehículo (L/100 km)</label><input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 7" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Capacidad depósito (L) — opcional</label><input type="number" value={deposito} onChange={(e) => { setDeposito(e.target.value); setResult(null); }} placeholder="Ej. 55" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Combustible actual (L) — opcional</label><input type="number" value={nivelActual} onChange={(e) => { setNivelActual(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio combustible (€/L) — opcional</label><input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="Ej. 1.65" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular repostaje</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Combustible para el trayecto</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosNecesarios, 2)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Litros a repostar</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosRepostar, 2)} L</p></div>
          </div>
          {result.coste > 0 && <p className="text-sm font-semibold text-[var(--color-text)]">Coste estimado: {formatCurrency(result.coste)}</p>}
        </div>
      )}
    </div>
  );
}
