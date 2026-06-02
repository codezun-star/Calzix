import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function SeguroViajeTool() {
  const [precioViaje, setPrecioViaje] = useState('');
  const [dias, setDias] = useState('');
  const [personas, setPersonas] = useState('2');
  const [destino, setDestino] = useState<'europa' | 'mundo'>('europa');
  const [result, setResult] = useState<{ estimacion: number; porDia: number; porPersona: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pv = parseFloat(precioViaje.replace(',', '.'));
      const d = parseFloat(dias.replace(',', '.'));
      const p = parseFloat(personas.replace(',', '.'));
      if (isNaN(pv) || isNaN(d) || isNaN(p)) throw new Error('Introduce todos los valores.');
      if (pv <= 0 || d <= 0 || p <= 0) throw new Error('Los valores deben ser positivos.');
      const tarifaBase = destino === 'europa' ? 1.5 : 3;
      const porDia = tarifaBase + (pv / 1000) * 0.5;
      const estimacion = porDia * d * p;
      setResult({ estimacion, porDia, porPersona: estimacion / p });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Estimación orientativa del coste de un seguro de viaje. Los precios reales varían según la aseguradora.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio total del viaje (€)</label><input type="number" value={precioViaje} onChange={(e) => { setPrecioViaje(e.target.value); setResult(null); }} placeholder="Ej. 1500" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Días del viaje</label><input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="Ej. 10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de viajeros</label><input type="number" value={personas} onChange={(e) => { setPersonas(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Destino</label><select value={destino} onChange={(e) => { setDestino(e.target.value as typeof destino); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"><option value="europa">Europa</option><option value="mundo">Resto del mundo</option></select></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Estimar coste del seguro</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Estimación total del seguro</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.estimacion)}</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por día y persona</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.porDia)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por persona (total)</p><p className="font-extrabold text-[var(--color-text)]">{formatCurrency(result.porPersona)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
