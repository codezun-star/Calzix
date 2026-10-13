import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';
import { TUR_GAS, IVA } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

type Unidad = 'kwh' | 'm3';
type Tarifa = 'tur1' | 'tur2' | 'libre';

interface Resultado {
  kwh: number;
  terminoFijo: number;
  terminoVariable: number;
  impuesto: number;
  alquiler: number;
  base: number;
  iva: number;
  total: number;
}

export default function FacturaGasTool() {
  const [consumo, setConsumo] = useState('');
  const [unidad, setUnidad] = useState<Unidad>('kwh');
  const [tarifa, setTarifa] = useState<Tarifa>('tur1');
  const [fijoMes, setFijoMes] = useState(String(TUR_GAS.tur1.fijoMes));
  const [precioKwh, setPrecioKwh] = useState(String(TUR_GAS.tur1.variableKwh));
  const [dias, setDias] = useState('60');
  const [alquilerMes, setAlquilerMes] = useState('0.6');
  const [ivaPct, setIvaPct] = useState<number>(IVA.general);
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function elegirTarifa(t: Tarifa) {
    setTarifa(t);
    if (t !== 'libre') {
      setFijoMes(String(TUR_GAS[t].fijoMes));
      setPrecioKwh(String(TUR_GAS[t].variableKwh));
    }
    setResult(null);
  }

  function calcular() {
    try {
      setError('');
      const c = parseFloat(consumo.replace(',', '.'));
      const fm = parseFloat(fijoMes.replace(',', '.'));
      const pk = parseFloat(precioKwh.replace(',', '.'));
      const d = parseFloat(dias.replace(',', '.'));
      const al = parseFloat(alquilerMes.replace(',', '.') || '0');
      if ([c, fm, pk, d, al].some((x) => isNaN(x))) throw new Error('Introduce todos los valores.');
      if (c < 0 || fm < 0 || pk <= 0 || d <= 0 || al < 0) throw new Error('Los valores deben ser positivos.');
      const kwh = unidad === 'm3' ? c * TUR_GAS.kwhPorM3 : c;
      const meses = d / (365 / 12);
      const terminoFijo = fm * meses;
      const terminoVariable = kwh * pk;
      const impuesto = kwh * TUR_GAS.impuestoHidrocarburosKwh;
      const alquiler = al * meses;
      const base = terminoFijo + terminoVariable + impuesto + alquiler;
      const iva = base * (ivaPct / 100);
      setResult({ kwh, terminoFijo, terminoVariable, impuesto, alquiler, base, iva, total: base + iva });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        {([
          ['tur1', 'TUR 1 (hasta 5.000 kWh/año)'],
          ['tur2', 'TUR 2 (5.000-15.000 kWh/año)'],
          ['libre', 'Mercado libre'],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => elegirTarifa(k)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${tarifa === k ? 'bg-[var(--color-accent)] text-white' : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={LABEL}>Consumo del periodo</label>
          <div className="flex gap-2">
            <input type="number" value={consumo} onChange={(e) => { setConsumo(e.target.value); setResult(null); }} placeholder={unidad === 'kwh' ? 'Ej. 800' : 'Ej. 70'} className={INPUT} />
            <select value={unidad} onChange={(e) => { setUnidad(e.target.value === 'm3' ? 'm3' : 'kwh'); setResult(null); }} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-sm">
              <option value="kwh">kWh</option>
              <option value="m3">m³</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Días facturados</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="60" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Término fijo (€/mes, sin impuestos)</label>
          <input type="number" step="0.01" value={fijoMes} onChange={(e) => { setFijoMes(e.target.value); setTarifa('libre'); setResult(null); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Término variable (€/kWh, sin impuestos)</label>
          <input type="number" step="0.0001" value={precioKwh} onChange={(e) => { setPrecioKwh(e.target.value); setTarifa('libre'); setResult(null); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Alquiler del contador (€/mes)</label>
          <input type="number" step="0.01" value={alquilerMes} onChange={(e) => { setAlquilerMes(e.target.value); setResult(null); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>IVA aplicado</label>
          <select value={ivaPct} onChange={(e) => { setIvaPct(Number(e.target.value)); setResult(null); }} className={INPUT}>
            <option value={IVA.general}>21 % (tipo general)</option>
            <option value={IVA.reducido}>10 % (rebaja temporal)</option>
          </select>
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular factura</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div className="space-y-1 text-sm">
            {unidad === 'm3' && <p className="text-xs text-[var(--color-text-muted)]">{formatNumber(result.kwh, 0)} kWh (factor de conversión {formatNumber(TUR_GAS.kwhPorM3, 1)} kWh/m³)</p>}
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Término fijo</span><span>{formatCurrency(result.terminoFijo)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Término variable (consumo)</span><span>{formatCurrency(result.terminoVariable)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Impuesto sobre hidrocarburos</span><span>{formatCurrency(result.impuesto)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Alquiler del contador</span><span>{formatCurrency(result.alquiler)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">IVA ({ivaPct} %)</span><span>{formatCurrency(result.iva)}</span></div>
            <div className="flex justify-between font-extrabold text-base border-t border-[var(--color-border)] pt-1"><span>Total factura</span><span>{formatCurrency(result.total)}</span></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">Precios de la TUR para {TUR_GAS.periodo} (BOE). En el mercado libre, copia los precios de tu contrato.</p>
        </div>
      )}
    </div>
  );
}
