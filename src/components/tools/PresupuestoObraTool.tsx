import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

export default function PresupuestoObraTool() {
  const [superficie, setSuperficie] = useState('');
  const [tipologia, setTipologia] = useState<'reforma_integral' | 'cocina' | 'bano' | 'pintura' | 'suelo'>('reforma_integral');
  const [calidad, setCalidad] = useState<'economica' | 'media' | 'alta'>('media');
  const [result, setResult] = useState<{ min: number; max: number; medio: number } | null>(null);
  const [error, setError] = useState('');

  const PRECIOS: Record<string, Record<string, [number, number]>> = {
    reforma_integral: { economica: [400, 600], media: [700, 1000], alta: [1100, 1800] },
    cocina:           { economica: [3000, 5000], media: [6000, 10000], alta: [12000, 20000] },
    bano:             { economica: [2000, 3500], media: [4000, 7000], alta: [8000, 15000] },
    pintura:          { economica: [6, 10], media: [12, 18], alta: [20, 30] },
    suelo:            { economica: [20, 35], media: [40, 65], alta: [70, 120] },
  };

  const TIPOLOGIAS = [
    { value: 'reforma_integral', label: 'Reforma integral (€/m²)' },
    { value: 'cocina', label: 'Cocina completa (€ total)' },
    { value: 'bano', label: 'Baño completo (€ total)' },
    { value: 'pintura', label: 'Pintura interior (€/m²)' },
    { value: 'suelo', label: 'Suelo nuevo (€/m²)' },
  ];

  function calcular() {
    try {
      setError('');
      const s = parseFloat(superficie.replace(',', '.'));
      const [min, max] = PRECIOS[tipologia][calidad];
      const porM2 = tipologia === 'cocina' || tipologia === 'bano';
      if (porM2) {
        setResult({ min, max, medio: (min + max) / 2 });
      } else {
        if (isNaN(s) || s <= 0) throw new Error('Introduce la superficie en m².');
        setResult({ min: min * s, max: max * s, medio: ((min + max) / 2) * s });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const isFlatPrice = tipologia === 'cocina' || tipologia === 'bano';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Estimación orientativa para España. Los precios incluyen materiales y mano de obra.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de obra</label>
          <select value={tipologia} onChange={(e) => { setTipologia(e.target.value as typeof tipologia); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            {TIPOLOGIAS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Calidad de materiales</label>
          <select value={calidad} onChange={(e) => { setCalidad(e.target.value as typeof calidad); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
            <option value="economica">Económica</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>
      {!isFlatPrice && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Superficie (m²)</label>
          <input type="number" value={superficie} onChange={(e) => { setSuperficie(e.target.value); setResult(null); }} placeholder="Ej. 80" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      )}
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Estimar presupuesto</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div><p className="text-xs text-[var(--color-text-secondary)]">Presupuesto estimado</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.medio)}</p></div>
          <p className="text-sm text-[var(--color-text-secondary)]">Rango: {formatCurrency(result.min)} – {formatCurrency(result.max)}</p>
          {!isFlatPrice && <p className="text-xs text-[var(--color-text-muted)]">Para {formatNumber(parseFloat(superficie), 0)} m² · {PRECIOS[tipologia][calidad].join('–')} €/m²</p>}
        </div>
      )}
    </div>
  );
}
