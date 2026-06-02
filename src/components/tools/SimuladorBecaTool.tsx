import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function SimuladorBecaTool() {
  const [notaMedia, setNotaMedia] = useState('');
  const [renFamiliar, setRenFamiliar] = useState('');
  const [miembros, setMiembros] = useState('4');
  const [result, setResult] = useState<{ elegible: boolean; becaBase: number; becaVariable: number; total: number; motivo?: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const nota = parseFloat(notaMedia.replace(',', '.'));
      const renta = parseFloat(renFamiliar.replace(',', '.'));
      const n = parseFloat(miembros.replace(',', '.'));
      if (isNaN(nota) || isNaN(renta) || isNaN(n)) throw new Error('Introduce todos los valores.');
      if (nota < 0 || nota > 10 || renta < 0 || n <= 0) throw new Error('Valores no válidos.');

      const umbralRenta: Record<number, number> = { 1: 8422, 2: 14112, 3: 18780, 4: 23338, 5: 27024, 6: 30039, 7: 33252, 8: 36469 };
      const umbral = umbralRenta[Math.round(n)] ?? (36469 + (Math.round(n) - 8) * 3000);

      if (nota < 5) {
        setResult({ elegible: false, becaBase: 0, becaVariable: 0, total: 0, motivo: 'Se requiere nota media mínima de 5,0.' });
        return;
      }
      if (renta > umbral) {
        setResult({ elegible: false, becaBase: 0, becaVariable: 0, total: 0, motivo: `Renta familiar supera el umbral (${formatCurrency(umbral)} para ${Math.round(n)} miembros).` });
        return;
      }

      const becaBase = 400;
      let becaVariable = 0;
      if (nota >= 9) becaVariable = 3000;
      else if (nota >= 8) becaVariable = 2000;
      else if (nota >= 7) becaVariable = 1000;
      else if (nota >= 6) becaVariable = 500;

      const factorRenta = 1 - (renta / umbral) * 0.5;
      becaVariable = becaVariable * factorRenta;

      setResult({ elegible: true, becaBase, becaVariable, total: becaBase + becaVariable });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Simulación orientativa de beca MEC universitaria. Los importes reales dependen del presupuesto anual.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota media expediente (0–10)</label>
          <input type="number" step="0.1" value={notaMedia} onChange={(e) => { setNotaMedia(e.target.value); setResult(null); }} placeholder="Ej. 7.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Renta familiar anual (€)</label>
          <input type="number" value={renFamiliar} onChange={(e) => { setRenFamiliar(e.target.value); setResult(null); }} placeholder="Ej. 20000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Miembros de la unidad familiar</label>
        <input type="number" min="1" step="1" value={miembros} onChange={(e) => { setMiembros(e.target.value); setResult(null); }} placeholder="4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Simular beca</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-2 ${result.elegible ? 'bg-[var(--color-calcs-bg)]' : 'bg-red-50'}`}>
          {result.elegible ? (
            <>
              <p className="text-sm font-semibold text-[var(--color-accent)]">Probablemente elegible para beca</p>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div><p className="text-xs text-[var(--color-text-secondary)]">Cuantía fija</p><p className="font-bold">{formatCurrency(result.becaBase)}</p></div>
                <div><p className="text-xs text-[var(--color-text-secondary)]">Cuantía variable</p><p className="font-bold">{formatCurrency(result.becaVariable)}</p></div>
                <div><p className="text-xs text-[var(--color-text-secondary)]">Total estimado</p><p className="font-bold">{formatCurrency(result.total)}</p></div>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-700 font-semibold">{result.motivo}</p>
          )}
        </div>
      )}
    </div>
  );
}
