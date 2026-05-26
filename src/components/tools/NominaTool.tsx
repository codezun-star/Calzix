import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

function calcularIrpf(baseIrpf: number): number {
  const tramos: Array<{ hasta: number; tipo: number }> = [
    { hasta: 12450, tipo: 0.19 },
    { hasta: 20200, tipo: 0.24 },
    { hasta: 35200, tipo: 0.30 },
    { hasta: 60000, tipo: 0.37 },
    { hasta: Infinity, tipo: 0.45 },
  ];

  let irpf = 0;
  let baseRestante = baseIrpf;
  let limiteAnterior = 0;

  for (const tramo of tramos) {
    if (baseRestante <= 0) break;
    const tramoHasta = tramo.hasta - limiteAnterior;
    const baseEnTramo = Math.min(baseRestante, tramoHasta);
    irpf += baseEnTramo * tramo.tipo;
    baseRestante -= baseEnTramo;
    limiteAnterior = tramo.hasta;
  }

  return irpf;
}

export default function NominaTool() {
  const [bruto, setBruto] = useState('');
  const [result, setResult] = useState<{
    ss: number;
    baseIrpf: number;
    irpf: number;
    irpfPorcentaje: number;
    netoAnual: number;
    netoMensual12: number;
    netoMensual14: number;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const brutoN = parseFloat(bruto.replace(',', '.'));
      if (isNaN(brutoN) || brutoN <= 0)
        throw new Error('Introduce un salario bruto anual válido (mayor que 0).');

      const ss = brutoN * 0.064;
      const baseIrpf = brutoN - ss;
      const irpf = calcularIrpf(baseIrpf);
      const irpfPorcentaje = (irpf / brutoN) * 100;
      const netoAnual = brutoN - ss - irpf;
      const netoMensual12 = netoAnual / 12;
      const netoMensual14 = netoAnual / 14;

      setResult({ ss, baseIrpf, irpf, irpfPorcentaje, netoAnual, netoMensual12, netoMensual14 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Salario bruto anual (€)
        </label>
        <input
          type="number"
          min="0"
          step="100"
          value={bruto}
          onChange={(e) => setBruto(e.target.value)}
          placeholder="Ej. 30000"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular neto
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Salario neto anual
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(result.netoAnual)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Neto/mes (12 pagas)</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.netoMensual12)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Neto/mes (14 pagas)</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.netoMensual14)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Seg. Social (6,4%)</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.ss)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">IRPF estimado</p>
              <p className="text-sm font-bold text-[var(--color-text)]">
                {formatCurrency(result.irpf)}{' '}
                <span className="font-normal text-[var(--color-text-secondary)]">
                  ({formatPercent(result.irpfPorcentaje)})
                </span>
              </p>
            </div>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
            Calculo orientativo basado en los tramos de IRPF 2024 y cotizacion del 6,4% a la Seguridad Social.
            Consulta a un asesor fiscal para tu situacion concreta.
          </p>
        </div>
      )}
    </div>
  );
}
