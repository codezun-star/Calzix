import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { calcularNomina, type ResultadoNomina, type TipoContrato } from '@/lib/utils/nomina';
import { ANIO_FISCAL } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

export default function IrpfRetencionTool() {
  const [salario, setSalario] = useState('');
  const [contrato, setContrato] = useState<TipoContrato>('indefinido');
  const [hijos, setHijos] = useState('0');
  const [menores3, setMenores3] = useState('0');
  const [compartidos, setCompartidos] = useState(true);
  const [edad, setEdad] = useState('40');
  const [result, setResult] = useState<ResultadoNomina | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(salario.replace(',', '.'));
      if (isNaN(s) || s <= 0) throw new Error('Introduce un salario bruto anual positivo.');
      const h = parseInt(hijos, 10);
      const m3 = parseInt(menores3, 10);
      const e = parseInt(edad, 10);
      if (isNaN(h) || h < 0 || h > 10) throw new Error('Introduce un número de hijos entre 0 y 10.');
      if (isNaN(m3) || m3 < 0 || m3 > h) throw new Error('Los hijos menores de 3 años no pueden superar el total de hijos.');
      if (isNaN(e) || e < 16 || e > 100) throw new Error('Introduce una edad entre 16 y 100 años.');
      setResult(calcularNomina({ bruto: s, contrato, hijos: h, hijosMenores3: m3, hijosCompartidos: compartidos, edad: e }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  function reset() { setResult(null); }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">
        Retención de IRPF {ANIO_FISCAL} en España con el algoritmo de la Agencia Tributaria.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={LABEL}>Salario bruto anual (€)</label>
          <input type="number" min="0" step="100" value={salario} onChange={(e) => { setSalario(e.target.value); reset(); }} onKeyDown={(e) => e.key === 'Enter' && calcular()} placeholder="Ej. 35000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tipo de contrato</label>
          <select value={contrato} onChange={(e) => { setContrato(e.target.value === 'temporal' ? 'temporal' : 'indefinido'); reset(); }} className={INPUT}>
            <option value="indefinido">Indefinido o de duración superior a un año</option>
            <option value="temporal">Temporal (menos de un año)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Hijos menores de 25 a cargo</label>
          <input type="number" min="0" max="10" step="1" value={hijos} onChange={(e) => { setHijos(e.target.value); reset(); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>De ellos, menores de 3 años</label>
          <input type="number" min="0" max="10" step="1" value={menores3} onChange={(e) => { setMenores3(e.target.value); reset(); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tu edad</label>
          <input type="number" min="16" max="100" step="1" value={edad} onChange={(e) => { setEdad(e.target.value); reset(); }} className={INPUT} />
        </div>
        <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] sm:mt-6">
          <input type="checkbox" checked={compartidos} onChange={(e) => { setCompartidos(e.target.checked); reset(); }} className="h-4 w-4 accent-[var(--color-accent)]" />
          Comparto el mínimo por hijos con el otro progenitor (50 %)
        </label>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular retención</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Tipo de retención</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatPercent(result.tipoRetencion)}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3"><p className="text-xs text-[var(--color-text-secondary)]">Retención anual</p><p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.retencionAnual)}</p></div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3"><p className="text-xs text-[var(--color-text-secondary)]">Al mes (14 pagas)</p><p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.retencionAnual / 14)}</p></div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3"><p className="text-xs text-[var(--color-text-secondary)]">Al mes (12 pagas)</p><p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.retencionAnual / 12)}</p></div>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[var(--color-text-secondary)]">
            <dt>Cotizaciones a la Seguridad Social</dt><dd className="text-right font-medium text-[var(--color-text)]">{formatCurrency(result.cotizacion)}</dd>
            <dt>Reducción por rendimientos del trabajo</dt><dd className="text-right font-medium text-[var(--color-text)]">{formatCurrency(result.reduccionTrabajo)}</dd>
            <dt>Base para calcular la retención</dt><dd className="text-right font-medium text-[var(--color-text)]">{formatCurrency(result.baseRetencion)}</dd>
            <dt>Mínimo personal y familiar</dt><dd className="text-right font-medium text-[var(--color-text)]">{formatCurrency(result.minimoPersonalFamiliar)}</dd>
            <dt>Sueldo neto anual</dt><dd className="text-right font-medium text-[var(--color-text)]">{formatCurrency(result.netoAnual)}</dd>
          </dl>
          {result.deduccionSmiRenta > 0 && (
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Por cobrar cerca del SMI, en la Renta podrás aplicar la deducción de hasta 590,89 € y recuperar unos {formatCurrency(result.deduccionSmiRenta)} retenidos.
            </p>
          )}
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Orientativo: situación familiar general (no casado con cónyuge sin rentas ni familia monoparental), sin
            discapacidad ni otros pagadores. Lo que pagas de verdad se ajusta en la declaración de la Renta con la escala de tu comunidad autónoma.
          </p>
        </div>
      )}
    </div>
  );
}
