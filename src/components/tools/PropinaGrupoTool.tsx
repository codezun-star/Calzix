import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

export default function PropinaGrupoTool() {
  const [cuenta, setCuenta] = useState('');
  const [porcentaje, setPorcentaje] = useState('10');
  const [personas, setPersonas] = useState('');
  const [result, setResult] = useState<{ propina: number; totalConPropina: number; porPersona: number; propinaPersona: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(cuenta.replace(',', '.'));
      const pp = parseFloat(porcentaje.replace(',', '.'));
      const n = parseFloat(personas.replace(',', '.'));
      if (isNaN(c) || isNaN(pp) || isNaN(n)) throw new Error('Introduce la cuenta, el porcentaje de propina y el número de personas.');
      if (c <= 0 || n <= 0) throw new Error('La cuenta y el número de personas deben ser positivos.');
      if (pp < 0) throw new Error('El porcentaje no puede ser negativo.');
      const propina = c * pp / 100;
      const totalConPropina = c + propina;
      setResult({ propina, totalConPropina, porPersona: totalConPropina / n, propinaPersona: propina / n });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const RAPIDOS = [5, 10, 15, 20];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe de la cuenta (€)</label><input type="number" value={cuenta} onChange={(e) => { setCuenta(e.target.value); setResult(null); }} placeholder="Ej. 120" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Número de personas</label><input type="number" value={personas} onChange={(e) => { setPersonas(e.target.value); setResult(null); }} placeholder="Ej. 4" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Porcentaje de propina</label>
        <div className="flex gap-2">
          {RAPIDOS.map((pp) => (
            <button key={pp} onClick={() => { setPorcentaje(String(pp)); setResult(null); }} className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition-colors ${porcentaje === String(pp) ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-calcs-bg)] text-[var(--color-text)]'}`}>{pp}%</button>
          ))}
        </div>
        <input type="number" value={porcentaje} onChange={(e) => { setPorcentaje(e.target.value); setResult(null); }} placeholder="10" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular y dividir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Propina total</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.propina)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Total con propina</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalConPropina)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Por persona (total)</p><p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.porPersona)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Propina por persona</p><p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.propinaPersona)}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
