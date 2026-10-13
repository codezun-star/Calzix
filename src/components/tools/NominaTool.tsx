import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { calcularNomina, type ResultadoNomina, type TipoContrato } from '@/lib/utils/nomina';
import { ANIO_FISCAL } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

export default function NominaTool() {
  const [bruto, setBruto] = useState('');
  const [pagas, setPagas] = useState<12 | 14>(14);
  const [contrato, setContrato] = useState<TipoContrato>('indefinido');
  const [hijos, setHijos] = useState('0');
  const [result, setResult] = useState<ResultadoNomina | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const brutoN = parseFloat(bruto.replace(',', '.'));
      if (isNaN(brutoN) || brutoN <= 0)
        throw new Error('Introduce un salario bruto anual válido (mayor que 0).');
      const hijosN = parseInt(hijos, 10);
      if (isNaN(hijosN) || hijosN < 0 || hijosN > 10)
        throw new Error('Introduce un número de hijos entre 0 y 10.');
      setResult(calcularNomina({ bruto: brutoN, contrato, hijos: hijosN }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className={LABEL}>Salario bruto anual (€)</label>
        <input
          type="number"
          min="0"
          step="100"
          value={bruto}
          onChange={(e) => { setBruto(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === 'Enter' && calcular()}
          placeholder="Ej. 30000"
          className={INPUT}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className={LABEL}>Número de pagas</label>
          <select value={pagas} onChange={(e) => setPagas(e.target.value === '12' ? 12 : 14)} className={INPUT}>
            <option value={14}>14 pagas (2 extra)</option>
            <option value={12}>12 pagas (prorrateadas)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tipo de contrato</label>
          <select value={contrato} onChange={(e) => { setContrato(e.target.value === 'temporal' ? 'temporal' : 'indefinido'); setResult(null); }} className={INPUT}>
            <option value="indefinido">Indefinido</option>
            <option value="temporal">Temporal</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Hijos menores de 25 a cargo</label>
          <input type="number" min="0" max="10" step="1" value={hijos} onChange={(e) => { setHijos(e.target.value); setResult(null); }} className={INPUT} />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular sueldo neto
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Sueldo neto al mes ({pagas} pagas)
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(result.netoAnual / pagas)}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Neto anual: <strong>{formatCurrency(result.netoAnual)}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Bruto al mes</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.bruto / pagas)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Retención de IRPF</p>
              <p className="text-sm font-bold text-[var(--color-text)]">
                {formatPercent(result.tipoRetencion)}{' '}
                <span className="font-normal text-[var(--color-text-secondary)]">({formatCurrency(result.retencionAnual / pagas)}/mes)</span>
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Seguridad Social ({formatPercent(result.tipoCotizacion)})</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.cotizacion / pagas)}/mes</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">IRPF + SS al año</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.retencionAnual + result.cotizacion)}</p>
            </div>
          </div>

          {result.deduccionSmiRenta > 0 && (
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Con este sueldo tienes derecho a la deducción para perceptores del SMI: en la declaración de la Renta
              recuperarás hasta {formatCurrency(result.deduccionSmiRenta)} de lo retenido.
            </p>
          )}

          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Cálculo orientativo para {ANIO_FISCAL} con el algoritmo de retenciones de la Agencia Tributaria (situación
            familiar general, sin discapacidad) y las cotizaciones de la Orden PJC/297/2026. Tu nómina real puede variar
            según tu convenio, tu comunidad autónoma y los datos de tu modelo 145.
          </p>
        </div>
      )}
    </div>
  );
}
