import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function NumeroPlacasTool() {
  const [consumoAnual, setConsumoAnual] = useState('');
  const [potenciaPanel, setPotenciaPanel] = useState('400');
  const [hsp, setHsp] = useState('4.5');
  const [result, setResult] = useState<{ paneles: number; potenciaTotal: number; kwhAnual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const ca = parseFloat(consumoAnual.replace(',', '.'));
      const pp = parseFloat(potenciaPanel.replace(',', '.'));
      const h = parseFloat(hsp.replace(',', '.'));
      if (isNaN(ca) || isNaN(pp) || isNaN(h)) throw new Error('Introduce todos los valores.');
      if (ca <= 0 || pp <= 0 || h <= 0) throw new Error('Los valores deben ser positivos.');
      const kwhDia = ca / 365;
      const kwpNecesarios = kwhDia / (h * 0.8);
      const paneles = Math.ceil((kwpNecesarios * 1000) / pp);
      const potenciaTotal = paneles * pp / 1000;
      const kwhAnual = paneles * (pp / 1000) * h * 365 * 0.8;
      setResult({ paneles, potenciaTotal, kwhAnual });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo anual (kWh)</label><input type="number" value={consumoAnual} onChange={(e) => { setConsumoAnual(e.target.value); setResult(null); }} placeholder="Ej. 4500" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Potencia del panel (Wp)</label><input type="number" value={potenciaPanel} onChange={(e) => { setPotenciaPanel(e.target.value); setResult(null); }} placeholder="400" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Horas sol pico (HSP)</label><input type="number" value={hsp} onChange={(e) => { setHsp(e.target.value); setResult(null); }} placeholder="4.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular paneles necesarios</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Paneles solares necesarios</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{result.paneles} paneles</p></div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Potencia instalación</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.potenciaTotal, 2)} kWp</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Generación estimada</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.kwhAnual, 0)} kWh/año</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
