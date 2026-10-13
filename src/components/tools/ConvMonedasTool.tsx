import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';
import { DIVISAS, DIVISAS_FECHA, CODIGOS_DIVISA, convertirDivisa, type CodigoDivisa } from '@/lib/constants/divisas';

const SELECT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConvMonedasTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState<CodigoDivisa>('EUR');
  const [to, setTo] = useState<CodigoDivisa>('USD');

  const num = parseFloat(value.replace(',', '.'));
  const result = !isNaN(num) ? convertirDivisa(num, from, to) : null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">De</label>
          <select value={from} onChange={(e) => setFrom(e.target.value as CodigoDivisa)} className={SELECT}>
            {CODIGOS_DIVISA.map((k) => (
              <option key={k} value={k}>{DIVISAS[k].nombre} ({k})</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">A</label>
          <select value={to} onChange={(e) => setTo(e.target.value as CodigoDivisa)} className={SELECT}>
            {CODIGOS_DIVISA.map((k) => (
              <option key={k} value={k}>{DIVISAS[k].nombre} ({k})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Importe</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0" className={SELECT} />
      </div>

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 2)} {DIVISAS[to].simbolo}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            1 {from} = {formatNumber(convertirDivisa(1, from, to), 4)} {to}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Tipos de referencia del BCE del {DIVISAS_FECHA}. Para operaciones reales consulta el tipo y la comisión de tu banco.
          </p>
        </div>
      )}
    </div>
  );
}
