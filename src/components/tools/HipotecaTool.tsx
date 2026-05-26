import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

interface ResultadoHipoteca {
  cuotaMensual: number;
  totalPagado: number;
  totalIntereses: number;
}

export default function HipotecaTool() {
  const [capital, setCapital] = useState('');
  const [interes, setInteres] = useState('');
  const [plazo, setPlazo] = useState('');
  const [result, setResult] = useState<ResultadoHipoteca | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    setResult(null);

    const cap = parseFloat(capital);
    const tipoAnual = parseFloat(interes);
    const anos = parseFloat(plazo);

    if (isNaN(cap) || cap <= 0) { setError('Introduce un capital prestado válido (mayor que 0).'); return; }
    if (isNaN(tipoAnual) || tipoAnual < 0) { setError('Introduce un tipo de interés válido (0 o mayor).'); return; }
    if (isNaN(anos) || anos <= 0) { setError('Introduce un plazo válido en años (mayor que 0).'); return; }

    const r = tipoAnual / 100 / 12;
    const n = anos * 12;

    let cuotaMensual: number;
    if (r === 0) {
      cuotaMensual = cap / n;
    } else {
      const factor = Math.pow(1 + r, n);
      cuotaMensual = cap * r * factor / (factor - 1);
    }

    const totalPagado = cuotaMensual * n;
    const totalIntereses = totalPagado - cap;

    setResult({ cuotaMensual, totalPagado, totalIntereses });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Capital prestado (€)</label>
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          placeholder="150000"
          min="0"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Tipo de interés anual (%)</label>
          <input
            type="number"
            value={interes}
            onChange={(e) => setInteres(e.target.value)}
            placeholder="3.5"
            min="0"
            step="0.1"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Plazo (años)</label>
          <input
            type="number"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            placeholder="30"
            min="1"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular hipoteca
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">Cuota mensual</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.cuotaMensual)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--color-border)]">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Total pagado</p>
              <p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalPagado)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Total intereses</p>
              <p className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.totalIntereses)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
