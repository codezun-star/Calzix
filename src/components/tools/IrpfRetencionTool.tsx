import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const TRAMOS = [
  { hasta: 12450,  tipo: 19 },
  { hasta: 20200,  tipo: 24 },
  { hasta: 35200,  tipo: 30 },
  { hasta: 60000,  tipo: 37 },
  { hasta: 300000, tipo: 45 },
  { hasta: Infinity, tipo: 47 },
];

function calcularIRPF(bruto: number): number {
  let impuesto = 0;
  let anterior = 0;
  for (const tramo of TRAMOS) {
    if (bruto <= anterior) break;
    const base = Math.min(bruto, tramo.hasta) - anterior;
    impuesto += base * tramo.tipo / 100;
    anterior = tramo.hasta;
    if (bruto <= tramo.hasta) break;
  }
  return impuesto;
}

export default function IrpfRetencionTool() {
  const [salario, setSalario] = useState('');
  const [result, setResult] = useState<{ irpf: number; neto: number; tipo: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(salario.replace(',', '.'));
      if (isNaN(s) || s <= 0) throw new Error('Introduce un salario bruto positivo.');
      const irpf = calcularIRPF(s);
      setResult({ irpf, neto: s - irpf, tipo: (irpf / s) * 100 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">IRPF 2026 (España) — Cálculo orientativo sin deducciones personales.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Salario bruto anual (€)</label>
        <input type="number" value={salario} onChange={(e) => { setSalario(e.target.value); setResult(null); }} placeholder="Ej. 35000" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular retención</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xs text-[var(--color-text-secondary)]">IRPF anual</p><p className="text-base font-extrabold text-[var(--color-text)]">{formatCurrency(result.irpf)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Tipo medio</p><p className="text-base font-extrabold text-[var(--color-text)]">{formatPercent(result.tipo)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Neto anual</p><p className="text-base font-extrabold text-[var(--color-text)]">{formatCurrency(result.neto)}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs text-[var(--color-text-secondary)]">
            <p>IRPF/mes: {formatCurrency(result.irpf / 12)}</p>
            <p>Neto/mes: {formatCurrency(result.neto / 12)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
