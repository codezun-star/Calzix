import { useState } from 'react';
import { formatNumber, formatCurrency, formatPercent } from '@/lib/utils/format';

type Modo = 'margen' | 'precio' | 'coste';

export default function MargenBeneficioTool() {
  const [modo, setModo] = useState<Modo>('margen');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<{ valor: number; beneficio?: number } | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; labelA: string; labelB: string; unitR: string }[] = [
    { value: 'margen',  label: 'Calcular margen (%)',   labelA: 'Precio de venta (€)', labelB: 'Coste (€)',        unitR: '%' },
    { value: 'precio',  label: 'Calcular precio de venta (€)', labelA: 'Coste (€)', labelB: 'Margen deseado (%)', unitR: '€' },
    { value: 'coste',   label: 'Calcular coste (€)',    labelA: 'Precio de venta (€)', labelB: 'Margen (%)',       unitR: '€' },
  ];
  const m = modos.find((x) => x.value === modo)!;

  function calcular() {
    try {
      setError('');
      const na = parseFloat(a.replace(',', '.'));
      const nb = parseFloat(b.replace(',', '.'));
      if (isNaN(na) || isNaN(nb)) throw new Error('Introduce valores numéricos válidos.');
      if (na <= 0) throw new Error('El primer valor debe ser positivo.');
      if (modo === 'margen') {
        if (nb < 0) throw new Error('El coste no puede ser negativo.');
        const margen = ((na - nb) / na) * 100;
        setResult({ valor: margen, beneficio: na - nb });
      } else if (modo === 'precio') {
        if (nb >= 100) throw new Error('El margen no puede ser 100% o más.');
        setResult({ valor: na / (1 - nb / 100), beneficio: na * nb / (100 - nb) });
      } else {
        if (nb >= 100) throw new Error('El margen no puede ser 100% o más.');
        setResult({ valor: na * (1 - nb / 100), beneficio: na * nb / 100 });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Calcular</legend>
        {modos.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={md.value} checked={modo === md.value} onChange={() => { setModo(md.value); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{m.labelA}</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{m.labelB}</label>
          <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{modo === 'margen' ? formatPercent(result.valor) : formatCurrency(result.valor)}</p>
          {result.beneficio !== undefined && <p className="text-sm text-[var(--color-text-secondary)]">Beneficio bruto: {formatCurrency(result.beneficio)}</p>}
        </div>
      )}
    </div>
  );
}
