import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';
import { DIVISAS, DIVISAS_FECHA, CODIGOS_DIVISA, convertirDivisa, type CodigoDivisa } from '@/lib/constants/divisas';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

export default function CambioDivisasTool() {
  const [cantidad, setCantidad] = useState('');
  const [de, setDe] = useState<CodigoDivisa>('EUR');
  const [a, setA] = useState<CodigoDivisa>('USD');
  const [comision, setComision] = useState('0');
  const [result, setResult] = useState<{ bruto: number; neto: number; coste: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c = parseFloat(cantidad.replace(',', '.'));
      const com = parseFloat(comision.replace(',', '.') || '0');
      if (isNaN(c) || c <= 0) throw new Error('Introduce una cantidad positiva.');
      if (isNaN(com) || com < 0 || com >= 100) throw new Error('La comisión debe estar entre 0 y 100 %.');
      const bruto = convertirDivisa(c, de, a);
      const neto = bruto * (1 - com / 100);
      setResult({ bruto, neto, coste: convertirDivisa(bruto - neto, a, de) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const tipo = convertirDivisa(1, de, a);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">
        Tipos de referencia del BCE del {DIVISAS_FECHA}. Orientativos: tu banco o la casa de cambio aplicarán su propio tipo y comisión.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={LABEL}>De</label>
          <select value={de} onChange={(e) => { setDe(e.target.value as CodigoDivisa); setResult(null); }} className={INPUT}>
            {CODIGOS_DIVISA.map((k) => <option key={k} value={k}>{DIVISAS[k].nombre} ({k})</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>A</label>
          <select value={a} onChange={(e) => { setA(e.target.value as CodigoDivisa); setResult(null); }} className={INPUT}>
            {CODIGOS_DIVISA.map((k) => <option key={k} value={k}>{DIVISAS[k].nombre} ({k})</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={LABEL}>Cantidad</label>
          <input type="number" value={cantidad} onChange={(e) => { setCantidad(e.target.value); setResult(null); }} onKeyDown={(e) => e.key === 'Enter' && calcular()} placeholder="Ej. 500" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Comisión o margen del banco (%)</label>
          <input type="number" min="0" step="0.1" value={comision} onChange={(e) => { setComision(e.target.value); setResult(null); }} placeholder="Ej. 3" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Convertir</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.neto, 2)} {DIVISAS[a].simbolo}</p>
          {result.neto !== result.bruto && (
            <p className="text-sm text-[var(--color-text-secondary)]">
              Sin comisión serían {formatNumber(result.bruto, 2)} {DIVISAS[a].simbolo}: la comisión te cuesta {formatNumber(result.coste, 2)} {DIVISAS[de].simbolo}.
            </p>
          )}
          <p className="text-xs text-[var(--color-text-muted)]">Tipo de cambio: 1 {de} = {formatNumber(tipo, 4)} {a}</p>
        </div>
      )}
    </div>
  );
}
