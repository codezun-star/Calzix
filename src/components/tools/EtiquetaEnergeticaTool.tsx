import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const LETRAS = [
  { letra: 'A+++', max: 30 },
  { letra: 'A++',  max: 55 },
  { letra: 'A+',   max: 85 },
  { letra: 'A',    max: 110 },
  { letra: 'B',    max: 150 },
  { letra: 'C',    max: 200 },
  { letra: 'D',    max: 250 },
  { letra: 'E',    max: 340 },
  { letra: 'F',    max: 450 },
  { letra: 'G',    max: Infinity },
];

const COLORES: Record<string, string> = {
  'A+++': 'text-green-700', 'A++': 'text-green-600', 'A+': 'text-green-500',
  'A': 'text-lime-500', 'B': 'text-yellow-500', 'C': 'text-amber-500',
  'D': 'text-orange-500', 'E': 'text-orange-600', 'F': 'text-red-500', 'G': 'text-red-700',
};

export default function EtiquetaEnergeticaTool() {
  const [consumo, setConsumo] = useState('');
  const [tipo, setTipo] = useState<'refrigerador' | 'lavadora' | 'general'>('general');
  const [result, setResult] = useState<{ letra: string; consumo: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(consumo.replace(',', '.'));
      if (isNaN(c) || c <= 0) throw new Error('Introduce el consumo anual en kWh.');
      const l = LETRAS.find((x) => c <= x.max) ?? LETRAS[LETRAS.length - 1];
      setResult({ letra: l.letra, consumo: c });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Clasifica un electrodoméstico según su consumo anual (escala EU 2021).</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Consumo anual del electrodoméstico (kWh/año)</label>
        <input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder="Ej. 120" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Clasificar</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-sm text-[var(--color-text-secondary)]">Etiqueta energética estimada</p>
          <p className={`text-4xl font-extrabold ${COLORES[result.letra]}`}>{result.letra}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{formatNumber(result.consumo)} kWh/año</p>
          <p className="text-xs text-[var(--color-text-muted)]">Clasificación orientativa — la etiqueta real depende del modelo específico y la normativa aplicable.</p>
        </div>
      )}
    </div>
  );
}
