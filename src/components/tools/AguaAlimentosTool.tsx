import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Alimento = 'carne_vaca' | 'carne_cerdo' | 'pollo' | 'huevo' | 'leche' | 'trigo' | 'arroz' | 'tomate' | 'manzana' | 'cafe';

const HUELLA: Record<Alimento, { label: string; litrosKg: number }> = {
  carne_vaca: { label: 'Carne de vacuno', litrosKg: 15400 },
  carne_cerdo:{ label: 'Carne de cerdo',  litrosKg: 5990  },
  pollo:      { label: 'Pollo',           litrosKg: 4330  },
  huevo:      { label: 'Huevo',           litrosKg: 3300  },
  leche:      { label: 'Leche',           litrosKg: 1020  },
  trigo:      { label: 'Trigo / Pan',     litrosKg: 1830  },
  arroz:      { label: 'Arroz',           litrosKg: 2497  },
  tomate:     { label: 'Tomate',          litrosKg: 214   },
  manzana:    { label: 'Manzana',         litrosKg: 822   },
  cafe:       { label: 'Café',            litrosKg: 140000 },
};

export default function AguaAlimentosTool() {
  const [alimento, setAlimento] = useState<Alimento>('carne_vaca');
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState<'kg' | 'g'>('kg');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(cantidad.replace(',', '.'));
      if (isNaN(c) || c <= 0) throw new Error('Introduce la cantidad de alimento.');
      const kg = unidad === 'g' ? c / 1000 : c;
      setResult(kg * HUELLA[alimento].litrosKg);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Huella hídrica — agua virtual necesaria para producir ese alimento.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Alimento</label>
        <select value={alimento} onChange={(e) => { setAlimento(e.target.value as Alimento); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]">
          {(Object.entries(HUELLA) as [Alimento, { label: string; litrosKg: number }][]).map(([k, v]) => <option key={k} value={k}>{v.label} ({formatNumber(v.litrosKg)} L/kg)</option>)}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Cantidad</label><input type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} placeholder="Ej. 0.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Unidad</label><select value={unidad} onChange={(e) => { setUnidad(e.target.value as 'kg' | 'g'); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"><option value="kg">kg</option><option value="g">g</option></select></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular huella hídrica</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Agua virtual consumida</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 0)} litros</p>
          <p className="text-xs text-[var(--color-text-muted)]">Equivale a {formatNumber(result / 1000, 2)} m³ de agua</p>
        </div>
      )}
    </div>
  );
}
