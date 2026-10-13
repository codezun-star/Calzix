import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

/**
 * Nueva etiqueta energética europea (A-G, sin «más»), vigente desde marzo de 2021
 * para frigoríficos, lavadoras, lavavajillas y pantallas. Umbrales orientativos
 * para un frigorífico combi de unos 300 litros: la clase real depende del índice
 * de eficiencia (EEI), que tiene en cuenta el volumen y el tipo de aparato.
 */
const LETRAS = [
  { letra: 'A', max: 110 },
  { letra: 'B', max: 140 },
  { letra: 'C', max: 175 },
  { letra: 'D', max: 220 },
  { letra: 'E', max: 275 },
  { letra: 'F', max: 345 },
  { letra: 'G', max: Infinity },
];

const COLORES: Record<string, string> = {
  A: 'text-green-700', B: 'text-green-500', C: 'text-lime-500', D: 'text-yellow-500',
  E: 'text-amber-500', F: 'text-orange-600', G: 'text-red-700',
};

export default function EtiquetaEnergeticaTool() {
  const [consumo, setConsumo] = useState('');
  const [precio, setPrecio] = useState('0.15');
  const [result, setResult] = useState<{ letra: string; consumo: number; coste: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(consumo.replace(',', '.'));
      const p = parseFloat(precio.replace(',', '.'));
      if (isNaN(c) || c <= 0) throw new Error('Introduce el consumo anual en kWh.');
      if (isNaN(p) || p <= 0) throw new Error('Introduce el precio del kWh de tu factura.');
      const l = LETRAS.find((x) => c <= x.max) ?? LETRAS[LETRAS.length - 1];
      setResult({ letra: l.letra, consumo: c, coste: c * p });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Clase orientativa en la etiqueta energética europea de 2021 (A-G) para un frigorífico combi de unos 300 litros, y su coste anual.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo anual (kWh/año)</label>
          <input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 150" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Precio del kWh (€)</label>
          <input type="number" step="0.01" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Clasificar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Etiqueta energética estimada</p>
          <p className={`text-4xl font-extrabold ${COLORES[result.letra]}`}>{result.letra}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatNumber(result.consumo)} kWh/año · coste de unos <strong>{formatCurrency(result.coste)}</strong> al año</p>
          <p className="text-xs text-[var(--color-text-muted)]">Orientativo: la clase oficial depende del índice de eficiencia energética de cada modelo, que puedes consultar con el código QR de la etiqueta en la base de datos europea EPREL.</p>
        </div>
      )}
    </div>
  );
}
