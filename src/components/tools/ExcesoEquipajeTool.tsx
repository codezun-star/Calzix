import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

export default function ExcesoEquipajeTool() {
  const [pesoActual, setPesoActual] = useState('');
  const [pesoPermitido, setPesoPermitido] = useState('23');
  const [tarifaKg, setTarifaKg] = useState('15');
  const [result, setResult] = useState<{ exceso: number; coste: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const pa = parseFloat(pesoActual.replace(',', '.'));
      const pp = parseFloat(pesoPermitido.replace(',', '.'));
      const tk = parseFloat(tarifaKg.replace(',', '.'));
      if (isNaN(pa) || isNaN(pp) || isNaN(tk)) throw new Error('Introduce todos los valores.');
      if (pa <= 0 || pp <= 0 || tk <= 0) throw new Error('Los valores deben ser positivos.');
      const exceso = Math.max(0, pa - pp);
      setResult({ exceso, coste: exceso * tk });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Peso de tu maleta (kg)</label><input type="number" value={pesoActual} onChange={(e) => { setPesoActual(e.target.value); setResult(null); }} placeholder="Ej. 28" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Peso permitido por la aerolínea (kg)</label><input type="number" value={pesoPermitido} onChange={(e) => { setPesoPermitido(e.target.value); setResult(null); }} placeholder="23" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Tarifa por kilo de exceso (€/kg)</label><input type="number" value={tarifaKg} onChange={(e) => { setTarifaKg(e.target.value); setResult(null); }} placeholder="15" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular exceso</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-2 ${result.exceso > 0 ? 'bg-red-50' : 'bg-[var(--color-calcs-bg)]'}`}>
          {result.exceso > 0 ? (
            <>
              <p className="text-sm font-semibold text-red-700">Exceso de equipaje</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.exceso, 1)} kg de exceso</p>
              <p className="text-xl font-extrabold text-red-700">Coste estimado: {formatCurrency(result.coste)}</p>
            </>
          ) : (
            <p className="text-lg font-extrabold text-[var(--color-text)]">Tu maleta está dentro del límite permitido.</p>
          )}
        </div>
      )}
    </div>
  );
}
