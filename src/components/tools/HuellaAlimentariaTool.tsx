import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function HuellaAlimentariaTool() {
  const [carne, setCarne] = useState('0');
  const [lacteos, setLacteos] = useState('0');
  const [pescado, setPescado] = useState('0');
  const [cereales, setCereales] = useState('0');
  const [frutas, setFrutas] = useState('0');
  const [result, setResult] = useState<{ co2Total: number; perDia: number; arboles: number } | null>(null);
  const [error, setError] = useState('');

  const factores = {
    carne:    { label: 'Carne roja (kg/semana)',          kgCo2: 27 },
    lacteos:  { label: 'Lácteos (kg/semana)',             kgCo2: 3.2 },
    pescado:  { label: 'Pescado y marisco (kg/semana)',   kgCo2: 5 },
    cereales: { label: 'Pan, pasta, arroz (kg/semana)',   kgCo2: 1.4 },
    frutas:   { label: 'Frutas y verduras (kg/semana)',   kgCo2: 0.5 },
  };

  function calcular() {
    try {
      setError('');
      const vals: Record<string, number> = {
        carne: parseFloat(carne) || 0, lacteos: parseFloat(lacteos) || 0,
        pescado: parseFloat(pescado) || 0, cereales: parseFloat(cereales) || 0,
        frutas: parseFloat(frutas) || 0,
      };
      const co2Semanal = Object.entries(vals).reduce((acc, [k, v]) => acc + v * factores[k as keyof typeof factores].kgCo2, 0);
      const co2Total = co2Semanal * 52;
      setResult({ co2Total, perDia: co2Total / 365, arboles: Math.ceil(co2Total / 20) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const inp = (label: string, val: string, set: (s: string) => void) => (
    <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</label><input type="number" value={val} onChange={(e) => { set(e.target.value); setResult(null); }} min="0" step="0.1" placeholder="0" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
  );

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {inp(factores.carne.label, carne, setCarne)}
        {inp(factores.lacteos.label, lacteos, setLacteos)}
        {inp(factores.pescado.label, pescado, setPescado)}
        {inp(factores.cereales.label, cereales, setCereales)}
        {inp(factores.frutas.label, frutas, setFrutas)}
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular huella alimentaria</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ anual</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.co2Total, 1)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">CO₂ por día</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.perDia, 2)} kg</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Árboles para compensar</p><p className="text-xl font-extrabold text-[var(--color-text)]">{result.arboles}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
