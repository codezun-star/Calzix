import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { COTIZACION } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

type Contrato = 'indefinido' | 'temporal';

interface Resultado {
  coste: number;
  cotizacion: number;
  tipo: number;
  mensual: number;
  partidas: Array<{ concepto: string; tipo: number; importe: number }>;
}

export default function CosteEmpresaTrabajadorTool() {
  const [bruto, setBruto] = useState('');
  const [contrato, setContrato] = useState<Contrato>('indefinido');
  const [atEp, setAtEp] = useState(String(COTIZACION.empresa.atEpOrientativo));
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const b = parseFloat(bruto.replace(',', '.'));
      const at = parseFloat(atEp.replace(',', '.'));
      if (isNaN(b) || b <= 0) throw new Error('Introduce el salario bruto anual.');
      if (isNaN(at) || at < 0 || at > 10) throw new Error('El tipo de accidentes de trabajo debe estar entre 0 y 10 %.');
      const e = COTIZACION.empresa;
      const base = Math.min(b, COTIZACION.baseMaximaMensual * 12);
      const tipos: Array<[string, number]> = [
        ['Contingencias comunes', e.contingenciasComunes],
        ['Desempleo', contrato === 'temporal' ? e.desempleoTemporal : e.desempleoIndefinido],
        ['FOGASA', e.fogasa],
        ['Formación profesional', e.formacionProfesional],
        ['MEI (equidad intergeneracional)', e.mei],
        ['Accidentes de trabajo (AT/EP)', at],
      ];
      const partidas = tipos.map(([concepto, tipo]) => ({ concepto, tipo, importe: base * tipo / 100 }));
      const cotizacion = partidas.reduce((s, p) => s + p.importe, 0);
      const tipo = tipos.reduce((s, [, t]) => s + t, 0);
      setResult({ coste: b + cotizacion, cotizacion, tipo, mensual: (b + cotizacion) / 12, partidas });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Coste de un empleado en España: salario bruto más las cotizaciones a cargo de la empresa en 2026 (Orden PJC/297/2026).</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className={LABEL}>Salario bruto anual (€)</label>
          <input type="number" value={bruto} onChange={(e) => { setBruto(e.target.value); setResult(null); }} placeholder="Ej. 24000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tipo de contrato</label>
          <select value={contrato} onChange={(e) => { setContrato(e.target.value === 'temporal' ? 'temporal' : 'indefinido'); setResult(null); }} className={INPUT}>
            <option value="indefinido">Indefinido</option>
            <option value="temporal">Temporal</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tipo AT/EP según actividad (%)</label>
          <input type="number" step="0.05" value={atEp} onChange={(e) => { setAtEp(e.target.value); setResult(null); }} className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular coste</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs text-[var(--color-text-secondary)]">Coste total anual para la empresa</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.coste)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Cotizaciones de la empresa: {formatCurrency(result.cotizacion)} ({formatPercent(result.tipo)}) · Coste mensual (12 meses): <strong>{formatCurrency(result.mensual)}</strong>.</p>
          <dl className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-1 text-xs text-[var(--color-text-secondary)]">
            {result.partidas.map((p) => (
              <div key={p.concepto} className="contents">
                <dt>{p.concepto}</dt>
                <dd className="text-right">{formatPercent(p.tipo)}</dd>
                <dd className="text-right font-medium text-[var(--color-text)]">{formatCurrency(p.importe)}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-[var(--color-text-muted)]">Las cotizaciones se calculan hasta la base máxima de 5.101,20 €/mes. Por encima se aplica la cuota de solidaridad, no incluida.</p>
        </div>
      )}
    </div>
  );
}
