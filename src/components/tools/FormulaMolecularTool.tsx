import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const MASAS_ATOMICAS: Record<string, number> = {
  H:1.008, He:4.003, Li:6.941, Be:9.012, B:10.81, C:12.011, N:14.007, O:15.999,
  F:18.998, Ne:20.180, Na:22.990, Mg:24.305, Al:26.982, Si:28.086, P:30.974,
  S:32.065, Cl:35.453, K:39.098, Ca:40.078, Fe:55.845, Cu:63.546, Zn:65.38,
  Ag:107.868, Sn:118.71, I:126.904, Au:196.967, Hg:200.592, Pb:207.2,
};

function parsearFormula(formula: string): Record<string, number> {
  const elementos: Record<string, number> = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(formula)) !== null) {
    if (!m[1]) continue;
    const el = m[1];
    const n = parseInt(m[2] || '1', 10);
    elementos[el] = (elementos[el] ?? 0) + n;
  }
  return elementos;
}

export default function FormulaMolecularTool() {
  const [formulaEmpírica, setFormulaEmpírica] = useState('');
  const [masaMolecular, setMasaMolecular] = useState('');
  const [result, setResult] = useState<{ formulaMolecular: string; masaEmpírica: number; n: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const formula = formulaEmpírica.trim();
      const mm = parseFloat(masaMolecular.replace(',', '.'));
      if (!formula) throw new Error('Introduce la fórmula empírica (ej. CH₂O o CH2O).');
      if (isNaN(mm) || mm <= 0) throw new Error('Introduce la masa molecular (g/mol).');
      const normalizada = formula.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)));
      const elementos = parsearFormula(normalizada);
      if (Object.keys(elementos).length === 0) throw new Error('Fórmula no reconocida. Usa letras mayúsculas para cada elemento (ej. CH2O).');
      const masaEmpirica = Object.entries(elementos).reduce((acc, [el, n]) => {
        const masa = MASAS_ATOMICAS[el];
        if (!masa) throw new Error(`Elemento "${el}" no reconocido.`);
        return acc + masa * n;
      }, 0);
      const n = Math.round(mm / masaEmpirica);
      if (n < 1) throw new Error('La masa molecular es menor que la masa empírica.');
      const formulaMolecular = Object.entries(elementos)
        .map(([el, cnt]) => cnt * n === 1 ? el : `${el}${cnt * n}`)
        .join('');
      setResult({ formulaMolecular, masaEmpírica: masaEmpirica, n });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Obtén la fórmula molecular a partir de la fórmula empírica y la masa molecular.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fórmula empírica</label>
          <input type="text" value={formulaEmpírica} onChange={(e) => { setFormulaEmpírica(e.target.value); setResult(null); }} placeholder="Ej. CH2O" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa molecular (g/mol)</label>
          <input type="number" value={masaMolecular} onChange={(e) => { setMasaMolecular(e.target.value); setResult(null); }} placeholder="Ej. 180" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular fórmula molecular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs text-[var(--color-text-secondary)]">Fórmula molecular (factor n = {result.n})</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.formulaMolecular}</p>
          <p className="text-xs text-[var(--color-text-muted)]">Masa empírica: {formatNumber(result.masaEmpírica, 3)} g/mol</p>
        </div>
      )}
    </div>
  );
}
