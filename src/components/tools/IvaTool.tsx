import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

type Modo = 'anadir' | 'extraer';
type TipoIva = 4 | 10 | 21;

export default function IvaTool() {
  const [modo, setModo] = useState<Modo>('anadir');
  const [importe, setImporte] = useState('');
  const [tipoIva, setTipoIva] = useState<TipoIva>(21);
  const [result, setResult] = useState<{
    base: number;
    cuota: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const importeN = parseFloat(importe.replace(',', '.'));
      if (isNaN(importeN) || importeN < 0)
        throw new Error('Introduce un importe válido (mayor o igual a 0).');

      let base: number;
      let cuota: number;
      let total: number;

      if (modo === 'anadir') {
        base = importeN;
        cuota = base * (tipoIva / 100);
        total = base + cuota;
      } else {
        total = importeN;
        base = total / (1 + tipoIva / 100);
        cuota = total - base;
      }

      setResult({ base, cuota, total });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      {/* Selector de modo */}
      <div className="flex gap-2">
        <button
          onClick={() => { setModo('anadir'); setResult(null); setError(''); }}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
            modo === 'anadir'
              ? 'bg-[var(--color-accent)] text-white'
              : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
          }`}
        >
          Añadir IVA
        </button>
        <button
          onClick={() => { setModo('extraer'); setResult(null); setError(''); }}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
            modo === 'extraer'
              ? 'bg-[var(--color-accent)] text-white'
              : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]'
          }`}
        >
          Extraer IVA
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          {modo === 'anadir' ? 'Base imponible (€)' : 'Precio con IVA (€)'}
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
          placeholder="Ej. 100"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

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

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular IVA
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Precio total con IVA
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(result.total)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Base imponible</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.base)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Cuota IVA ({tipoIva}%)</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.cuota)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
