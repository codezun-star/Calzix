import { useState } from 'react';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

type Tipo = 'usada' | 'nueva';

/** Tipos generales de ITP más consolidados (2026). El resto, a mano. */
const ITP_RAPIDO: ReadonlyArray<{ label: string; tipo: number }> = [
  { label: 'Madrid', tipo: 6 },
  { label: 'Canarias', tipo: 6.5 },
  { label: 'Andalucía', tipo: 7 },
  { label: 'Cataluña', tipo: 10 },
  { label: 'País Vasco', tipo: 4 },
];

interface Resultado {
  impuestos: number;
  detalleImpuestos: string;
  otros: number;
  gastos: number;
  pct: number;
  entrada: number;
  ahorroNecesario: number;
}

export default function GastosCompraViviendaTool() {
  const [precio, setPrecio] = useState('');
  const [tipo, setTipo] = useState<Tipo>('usada');
  const [itp, setItp] = useState('7');
  const [ajd, setAjd] = useState('1.5');
  const [otrosEur, setOtrosEur] = useState('2000');
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const p = parseFloat(precio.replace(',', '.'));
      const tItp = parseFloat(itp.replace(',', '.'));
      const tAjd = parseFloat(ajd.replace(',', '.'));
      const ot = parseFloat(otrosEur.replace(',', '.') || '0');
      if (isNaN(p) || p <= 0) throw new Error('Introduce el precio de la vivienda.');
      if ((tipo === 'usada' && (isNaN(tItp) || tItp < 0)) || (tipo === 'nueva' && (isNaN(tAjd) || tAjd < 0)) || isNaN(ot) || ot < 0)
        throw new Error('Los porcentajes y gastos deben ser positivos.');
      const impuestos = tipo === 'usada' ? p * tItp / 100 : p * 0.10 + p * tAjd / 100;
      const detalleImpuestos = tipo === 'usada'
        ? `ITP del ${formatPercent(tItp, 2)}`
        : `IVA del 10 % (${formatCurrency(p * 0.1)}) + AJD del ${formatPercent(tAjd, 2)} (${formatCurrency(p * tAjd / 100)})`;
      const gastos = impuestos + ot;
      const entrada = p * 0.2;
      setResult({ impuestos, detalleImpuestos, otros: ot, gastos, pct: gastos / p * 100, entrada, ahorroNecesario: entrada + gastos });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {([['usada', 'Segunda mano (ITP)'], ['nueva', 'Obra nueva (IVA + AJD)']] as const).map(([k, label]) => (
          <button key={k} onClick={() => { setTipo(k); setResult(null); }} className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${tipo === k ? 'bg-[var(--color-accent)] text-white' : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'}`}>{label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={LABEL}>Precio de la vivienda (€)</label>
          <input type="number" value={precio} onChange={(e) => { setPrecio(e.target.value); setResult(null); }} placeholder="Ej. 220000" className={INPUT} />
        </div>
        {tipo === 'usada' ? (
          <div className="space-y-1">
            <label className={LABEL}>ITP de tu comunidad autónoma (%)</label>
            <input type="number" step="0.1" value={itp} onChange={(e) => { setItp(e.target.value); setResult(null); }} className={INPUT} />
          </div>
        ) : (
          <div className="space-y-1">
            <label className={LABEL}>AJD de tu comunidad autónoma (%)</label>
            <input type="number" step="0.1" value={ajd} onChange={(e) => { setAjd(e.target.value); setResult(null); }} className={INPUT} />
          </div>
        )}
        <div className="space-y-1 sm:col-span-2">
          <label className={LABEL}>Notaría, registro, gestoría y tasación (€)</label>
          <input type="number" value={otrosEur} onChange={(e) => { setOtrosEur(e.target.value); setResult(null); }} className={INPUT} />
        </div>
      </div>
      {tipo === 'usada' && (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-[var(--color-text-muted)] self-center">Tipo general:</span>
          {ITP_RAPIDO.map((c) => (
            <button key={c.label} onClick={() => { setItp(String(c.tipo)); setResult(null); }} className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]">
              {c.label} {c.tipo} %
            </button>
          ))}
        </div>
      )}
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular gastos</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Gastos e impuestos de la compra ({formatPercent(result.pct)} del precio)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.gastos)}</p>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">Impuestos: <strong>{formatCurrency(result.impuestos)}</strong> ({result.detalleImpuestos}). Notaría, registro y otros: <strong>{formatCurrency(result.otros)}</strong>.</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Si el banco financia el 80 %, necesitas ahorrado: <strong>{formatCurrency(result.ahorroNecesario)}</strong> (entrada de {formatCurrency(result.entrada)} + gastos).</p>
          <p className="text-xs text-[var(--color-text-muted)]">Muchas comunidades aplican tipos reducidos a jóvenes, familias numerosas o vivienda habitual. Con hipoteca, el banco paga la notaría, el registro y el AJD del préstamo (Ley 5/2019); tú pagas la tasación.</p>
        </div>
      )}
    </div>
  );
}
