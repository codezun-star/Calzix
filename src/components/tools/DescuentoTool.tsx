import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

type TipoIva = 0 | 4 | 10 | 21;

export default function DescuentoTool() {
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [ivaActivo, setIvaActivo] = useState(false);
  const [tipoIva, setTipoIva] = useState<TipoIva>(21);
  const [result, setResult] = useState<{
    ahorro: number;
    precioDescuento: number;
    precioFinal: number;
    ivaAplicado: boolean;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const precioN = parseFloat(precio.replace(',', '.'));
      const descuentoN = parseFloat(descuento.replace(',', '.'));

      if (isNaN(precioN) || precioN < 0)
        throw new Error('Introduce un precio válido (mayor o igual a 0).');
      if (isNaN(descuentoN) || descuentoN < 0 || descuentoN > 100)
        throw new Error('El descuento debe estar entre 0 y 100%.');

      const ahorro = precioN * (descuentoN / 100);
      const precioDescuento = precioN - ahorro;
      const precioFinal = ivaActivo
        ? precioDescuento * (1 + tipoIva / 100)
        : precioDescuento;

      setResult({ ahorro, precioDescuento, precioFinal, ivaAplicado: ivaActivo });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Precio original (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej. 99.99"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Descuento (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            placeholder="Ej. 20"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* Checkbox IVA */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-calcs-bg)] p-3 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={ivaActivo}
            onChange={(e) => setIvaActivo(e.target.checked)}
            className="h-4 w-4 rounded accent-[var(--color-accent)]"
          />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            Aplicar IVA después del descuento
          </span>
        </label>

        {ivaActivo && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de IVA</label>
            <select
              value={tipoIva}
              onChange={(e) => setTipoIva(parseInt(e.target.value) as TipoIva)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              <option value={4}>4% — Tipo superreducido</option>
              <option value={10}>10% — Tipo reducido</option>
              <option value={21}>21% — Tipo general</option>
            </select>
          </div>
        )}
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular descuento
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Precio final
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(result.precioFinal)}
            </p>
            {result.ivaAplicado && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                IVA ({tipoIva}%) incluido
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Ahorro</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.ahorro)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Precio con descuento</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.precioDescuento)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
