import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

const PORCENTAJES_PRESET = [5, 10, 12, 15, 20];

export default function PropinaTool() {
  const [cuenta, setCuenta] = useState('');
  const [porcentajePreset, setPorcentajePreset] = useState<number | null>(10);
  const [porcentajeLibre, setPorcentajeLibre] = useState('');
  const [usarLibre, setUsarLibre] = useState(false);
  const [comensales, setComensales] = useState('1');
  const [result, setResult] = useState<{
    propina: number;
    total: number;
    porPersona: number;
    porcentaje: number;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const cuentaN = parseFloat(cuenta.replace(',', '.'));
      if (isNaN(cuentaN) || cuentaN < 0)
        throw new Error('Introduce un importe de cuenta válido.');

      let porcentajeN: number;
      if (usarLibre) {
        porcentajeN = parseFloat(porcentajeLibre.replace(',', '.'));
        if (isNaN(porcentajeN) || porcentajeN < 0)
          throw new Error('Introduce un porcentaje de propina válido.');
      } else {
        if (porcentajePreset === null) throw new Error('Selecciona un porcentaje de propina.');
        porcentajeN = porcentajePreset;
      }

      const comensalesN = parseInt(comensales);
      if (isNaN(comensalesN) || comensalesN < 1)
        throw new Error('El número de comensales debe ser al menos 1.');

      const propina = cuentaN * (porcentajeN / 100);
      const total = cuentaN + propina;
      const porPersona = total / comensalesN;

      setResult({ propina, total, porPersona, porcentaje: porcentajeN });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Importe de la cuenta (€)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={cuenta}
          onChange={(e) => setCuenta(e.target.value)}
          placeholder="Ej. 85.50"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      {/* Porcentaje de propina */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Porcentaje de propina
        </label>
        <div className="flex gap-2 flex-wrap">
          {PORCENTAJES_PRESET.map((p) => (
            <button
              key={p}
              onClick={() => { setUsarLibre(false); setPorcentajePreset(p); }}
              className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors ${
                !usarLibre && porcentajePreset === p
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
              }`}
            >
              {p}%
            </button>
          ))}
          <button
            onClick={() => setUsarLibre(true)}
            className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors ${
              usarLibre
                ? 'bg-[var(--color-accent)] text-white'
                : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            Otro
          </button>
        </div>
        {usarLibre && (
          <input
            type="number"
            min="0"
            step="1"
            value={porcentajeLibre}
            onChange={(e) => setPorcentajeLibre(e.target.value)}
            placeholder="Ej. 18"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Numero de comensales
        </label>
        <input
          type="number"
          min="1"
          step="1"
          value={comensales}
          onChange={(e) => setComensales(e.target.value)}
          placeholder="1"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular propina
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Total a pagar
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatCurrency(result.total)}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Propina del {result.porcentaje}% incluida
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Propina</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.propina)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Por persona</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatCurrency(result.porPersona)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
