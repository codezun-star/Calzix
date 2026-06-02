import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function ConsumoDuchaTool() {
  const [minutos, setMinutos] = useState('');
  const [caudal, setCaudal] = useState('9');
  const [duchasDia, setDuchasDia] = useState('1');
  const [personas, setPersonas] = useState('1');
  const [result, setResult] = useState<{ litrosDucha: number; litrosDia: number; litrosMes: number; litrosAnio: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const m = parseFloat(minutos.replace(',', '.'));
      const c = parseFloat(caudal.replace(',', '.'));
      const d = parseFloat(duchasDia.replace(',', '.'));
      const p = parseFloat(personas.replace(',', '.'));
      if (isNaN(m) || isNaN(c) || isNaN(d) || isNaN(p)) throw new Error('Introduce todos los valores.');
      if (m <= 0 || c <= 0 || d <= 0 || p <= 0) throw new Error('Los valores deben ser positivos.');
      const litrosDucha = m * c;
      const litrosDia = litrosDucha * d * p;
      setResult({ litrosDucha, litrosDia, litrosMes: litrosDia * 30, litrosAnio: litrosDia * 365 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Minutos de ducha</label><input type="number" value={minutos} onChange={(e) => { setMinutos(e.target.value); setResult(null); }} placeholder="Ej. 8" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Caudal del grifo (L/min)</label><input type="number" value={caudal} onChange={(e) => { setCaudal(e.target.value); setResult(null); }} placeholder="9" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Duchas por persona/día</label><input type="number" value={duchasDia} onChange={(e) => { setDuchasDia(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de personas</label><input type="number" value={personas} onChange={(e) => { setPersonas(e.target.value); setResult(null); }} placeholder="1" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular consumo</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por ducha</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosDucha, 1)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por día (total)</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosDia, 1)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por mes</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosMes, 0)} L</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por año</p><p className="font-extrabold text-[var(--color-text)]">{formatNumber(result.litrosAnio, 0)} L</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
