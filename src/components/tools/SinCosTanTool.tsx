import { useState, useEffect } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface TrigValues {
  sen: number;
  cos: number;
  tan: number | null;
  arcsen: number | null;
  arccos: number | null;
  arctan: number;
}

function calcularTrig(angulo: number, enGrados: boolean): TrigValues {
  const rad = enGrados ? (angulo * Math.PI) / 180 : angulo;

  const senVal = Math.sin(rad);
  const cosVal = Math.cos(rad);

  const tanDenom = Math.abs(cosVal);
  const tan = tanDenom < 1e-10 ? null : Math.tan(rad);

  const arcsenVal = Math.abs(senVal) <= 1 ? Math.asin(senVal) : null;
  const arccosVal = Math.abs(cosVal) <= 1 ? Math.acos(cosVal) : null;
  const arctanVal = Math.atan(senVal);

  const toUnit = (r: number | null): number | null => {
    if (r === null) return null;
    return enGrados ? (r * 180) / Math.PI : r;
  };

  return {
    sen: senVal,
    cos: cosVal,
    tan,
    arcsen: toUnit(arcsenVal),
    arccos: toUnit(arccosVal),
    arctan: toUnit(arctanVal) ?? 0,
  };
}

export default function SinCosTanTool() {
  const [angulo, setAngulo] = useState('');
  const [enGrados, setEnGrados] = useState(true);
  const [result, setResult] = useState<TrigValues | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (angulo.trim() === '') {
      setResult(null);
      setError('');
      return;
    }
    const n = parseFloat(angulo.replace(',', '.'));
    if (isNaN(n)) {
      setError('Introduce un ángulo numérico válido.');
      setResult(null);
      return;
    }
    setError('');
    setResult(calcularTrig(n, enGrados));
  }, [angulo, enGrados]);

  const unidad = enGrados ? '°' : 'rad';

  const filas: { label: string; value: string }[] = result
    ? [
        { label: 'sen', value: formatNumber(result.sen, 6) },
        { label: 'cos', value: formatNumber(result.cos, 6) },
        { label: 'tan', value: result.tan === null ? 'Indefinido' : formatNumber(result.tan, 6) },
        { label: `arcsen (${unidad})`, value: result.arcsen === null ? 'Indefinido' : formatNumber(result.arcsen, 6) },
        { label: `arccos (${unidad})`, value: result.arccos === null ? 'Indefinido' : formatNumber(result.arccos, 6) },
        { label: `arctan (${unidad})`, value: formatNumber(result.arctan, 6) },
      ]
    : [];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ángulo</label>
          <input
            type="number"
            value={angulo}
            onChange={(e) => setAngulo(e.target.value)}
            placeholder="ej. 45"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <fieldset className="space-y-1">
          <legend className="text-xs font-medium text-[var(--color-text-secondary)]">Unidad</legend>
          <div className="flex gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-sm text-[var(--color-text)]">
              <input
                type="radio"
                checked={enGrados}
                onChange={() => setEnGrados(true)}
                className="accent-[var(--color-accent)] w-4 h-4"
              />
              Grados
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-sm text-[var(--color-text)]">
              <input
                type="radio"
                checked={!enGrados}
                onChange={() => setEnGrados(false)}
                className="accent-[var(--color-accent)] w-4 h-4"
              />
              Radianes
            </label>
          </div>
        </fieldset>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && filas.length > 0 && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {filas.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</dt>
                <dd className="text-base font-bold text-[var(--color-text)] mt-0.5 font-mono">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {angulo.trim() === '' && (
        <p className="text-sm text-[var(--color-text-muted)]">Introduce un ángulo para ver los resultados al instante.</p>
      )}
    </div>
  );
}
