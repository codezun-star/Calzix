import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';
import { INTERES } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

type Caso = 'comercial' | 'legal' | 'otro';

export default function RecargoMoraTool() {
  const [importe, setImporte] = useState('');
  const [caso, setCaso] = useState<Caso>('comercial');
  const [tasa, setTasa] = useState(String(INTERES.demoraComercial));
  const [dias, setDias] = useState('');
  const [result, setResult] = useState<{ interes: number; costesCobro: number; total: number } | null>(null);
  const [error, setError] = useState('');

  function elegir(c: Caso) {
    setCaso(c);
    if (c === 'comercial') setTasa(String(INTERES.demoraComercial));
    if (c === 'legal') setTasa(String(INTERES.legal));
    setResult(null);
  }

  function calcular() {
    try {
      setError('');
      const imp = parseFloat(importe.replace(',', '.'));
      const t = parseFloat(tasa.replace(',', '.'));
      const d = parseFloat(dias.replace(',', '.'));
      if (isNaN(imp) || isNaN(t) || isNaN(d)) throw new Error('Introduce el importe, el tipo de interés anual y los días de retraso.');
      if (imp < 0 || t < 0 || d < 0) throw new Error('Los valores no pueden ser negativos.');
      const interes = (imp * (t / 100) * d) / 365;
      const costesCobro = caso === 'comercial' ? INTERES.costesCobro : 0;
      setResult({ interes, costesCobro, total: imp + interes + costesCobro });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        {([
          ['comercial', `Entre empresas y autónomos (${INTERES.demoraComercial} %)`],
          ['legal', `Interés legal del dinero (${INTERES.legal} %)`],
          ['otro', 'Otro pactado en contrato'],
        ] as const).map(([k, label]) => (
          <button key={k} onClick={() => elegir(k)} className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${caso === k ? 'bg-[var(--color-accent)] text-white' : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'}`}>{label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className={LABEL}>Importe de la factura (€)</label>
          <input type="number" value={importe} onChange={(e) => { setImporte(e.target.value); setResult(null); }} placeholder="Ej. 1000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Tipo de interés anual (%)</label>
          <input type="number" step="0.01" value={tasa} onChange={(e) => { setTasa(e.target.value); setCaso('otro'); setResult(null); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Días de retraso</label>
          <input type="number" value={dias} onChange={(e) => { setDias(e.target.value); setResult(null); }} placeholder="Ej. 45" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular intereses</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Intereses de demora</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.interes)}</p>
          {result.costesCobro > 0 && (
            <p className="text-sm text-[var(--color-text-secondary)]">Indemnización por costes de cobro (art. 8 Ley 3/2004): <strong>{formatCurrency(result.costesCobro)}</strong>.</p>
          )}
          <p className="text-sm text-[var(--color-text-secondary)]">Total a reclamar: <strong>{formatCurrency(result.total)}</strong>.</p>
          <p className="text-xs text-[var(--color-text-muted)]">Interés = importe × tipo anual × días / 365. El tipo legal de demora entre empresas es el del BCE más 8 puntos: {INTERES.demoraComercial} % en el segundo semestre de 2026.</p>
        </div>
      )}
    </div>
  );
}
