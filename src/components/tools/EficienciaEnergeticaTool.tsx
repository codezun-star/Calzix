import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'cop' | 'rendimiento' | 'eer';

export default function EficienciaEnergeticaTool() {
  const [modo, setModo] = useState<Modo>('cop');
  const [energia, setEnergia] = useState('');
  const [trabajo, setTrabajo] = useState('');
  const [result, setResult] = useState<{ valor: number; descripcion: string } | null>(null);
  const [error, setError] = useState('');

  const modos: { value: Modo; label: string; labelA: string; labelB: string; desc: string }[] = [
    { value: 'cop',        label: 'COP — Bomba de calor (calefacción)', labelA: 'Calor útil entregado (kW o kWh)', labelB: 'Energía eléctrica consumida (kW o kWh)', desc: 'COP = Calor útil / Energía eléctrica' },
    { value: 'rendimiento', label: 'Rendimiento — Caldera / motor',     labelA: 'Energía útil producida',          labelB: 'Energía total consumida',                 desc: 'η = Energía útil / Energía consumida × 100' },
    { value: 'eer',        label: 'EER — Aire acondicionado (frío)',    labelA: 'Frío extraído (kW o kWh)',        labelB: 'Energía eléctrica consumida (kW o kWh)',  desc: 'EER = Frío extraído / Energía eléctrica' },
  ];
  const m = modos.find((x) => x.value === modo)!;

  function calcular() {
    try {
      setError('');
      const a = parseFloat(energia.replace(',', '.'));
      const b = parseFloat(trabajo.replace(',', '.'));
      if (isNaN(a) || isNaN(b)) throw new Error('Introduce los dos valores.');
      if (b <= 0) throw new Error('La energía consumida debe ser positiva.');
      const valor = modo === 'rendimiento' ? (a / b) * 100 : a / b;
      setResult({ valor, descripcion: m.desc });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Tipo de eficiencia</legend>
        {modos.map((md) => (
          <label key={md.value} className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="modo" value={md.value} checked={modo === md.value} onChange={() => { setModo(md.value); setResult(null); setError(''); }} className="accent-[var(--color-accent)] w-4 h-4" />
            <span className="text-sm text-[var(--color-text)]">{md.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">{m.labelA}</label><input type="number" value={energia} onChange={(e) => { setEnergia(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">{m.labelB}</label><input type="number" value={trabajo} onChange={(e) => { setTrabajo(e.target.value); setResult(null); }} placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.descripcion}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.valor, 2)}{modo === 'rendimiento' ? ' %' : ''}</p>
        </div>
      )}
    </div>
  );
}
