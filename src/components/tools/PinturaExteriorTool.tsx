import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function PinturaExteriorTool() {
  const [perimetro, setPerimetro] = useState('');
  const [altura, setAltura] = useState('');
  const [ventanas, setVentanas] = useState('0');
  const [puertas, setPuertas] = useState('0');
  const [rendimiento, setRendimiento] = useState('8');
  const [manos, setManos] = useState('2');
  const [result, setResult] = useState<{ areaBruta: number; areaDescuentos: number; areaTotal: number; litros: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(perimetro.replace(',', '.'));
      const h = parseFloat(altura.replace(',', '.'));
      const v = parseFloat(ventanas.replace(',', '.')) || 0;
      const pu = parseFloat(puertas.replace(',', '.')) || 0;
      const rend = parseFloat(rendimiento.replace(',', '.'));
      const m = parseFloat(manos.replace(',', '.'));
      if (isNaN(p) || isNaN(h) || isNaN(rend) || isNaN(m)) throw new Error('Introduce las dimensiones y el rendimiento.');
      if (p <= 0 || h <= 0 || rend <= 0 || m <= 0) throw new Error('Los valores deben ser positivos.');
      const areaBruta = p * h;
      const areaDescuentos = v * 1.5 + pu * 2;
      const areaTotal = Math.max(0, areaBruta - areaDescuentos);
      const litros = (areaTotal * m) / rend;
      setResult({ areaBruta, areaDescuentos, areaTotal, litros });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Perímetro exterior (m)</label><input type="number" value={perimetro} onChange={(e) => { setPerimetro(e.target.value); setResult(null); }} placeholder="Ej. 40" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura de la fachada (m)</label><input type="number" value={altura} onChange={(e) => { setAltura(e.target.value); setResult(null); }} placeholder="Ej. 6" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de ventanas</label><input type="number" value={ventanas} onChange={(e) => { setVentanas(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de puertas</label><input type="number" value={puertas} onChange={(e) => { setPuertas(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Rendimiento (m²/L)</label><input type="number" value={rendimiento} onChange={(e) => { setRendimiento(e.target.value); setResult(null); }} placeholder="8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de manos</label><input type="number" value={manos} onChange={(e) => { setManos(e.target.value); setResult(null); }} placeholder="2" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular pintura</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Área bruta</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.areaBruta, 2)} m²</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Área neta</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.areaTotal, 2)} m²</p></div>
          </div>
          <div><p className="text-xs text-[var(--color-text-secondary)]">Litros de pintura necesarios</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litros, 2)} L</p></div>
        </div>
      )}
    </div>
  );
}
