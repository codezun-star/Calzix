import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

interface Fila {
  ano: number;
  aportado: number;
  intereses: number;
  saldo: number;
}

interface Resultado {
  final: number;
  aportado: number;
  intereses: number;
  multiplicador: number;
  filas: Fila[];
}

export default function InteresCompuestoTool() {
  const [capital, setCapital] = useState('');
  const [aportacion, setAportacion] = useState('0');
  const [tasa, setTasa] = useState('');
  const [anos, setAnos] = useState('');
  const [frecuencia, setFrecuencia] = useState('12');
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const c0 = parseFloat(capital || '0');
      const mensual = parseFloat(aportacion || '0');
      const r = parseFloat(tasa);
      const n = parseFloat(anos);
      const f = parseInt(frecuencia, 10);

      if (isNaN(c0) || c0 < 0) throw new Error('El capital inicial no puede ser negativo.');
      if (isNaN(mensual) || mensual < 0) throw new Error('La aportación mensual no puede ser negativa.');
      if (c0 === 0 && mensual === 0) throw new Error('Introduce un capital inicial o una aportación mensual.');
      if (isNaN(r) || r < 0) throw new Error('Introduce un interés anual válido (0 o mayor).');
      if (isNaN(n) || n <= 0) throw new Error('Introduce el número de años (mayor que 0).');
      if (n > 80) throw new Error('El plazo máximo es de 80 años.');

      const i = r / 100 / f;                 // interés de cada periodo
      const aporte = mensual * (12 / f);     // aportación acumulada en cada periodo
      const filas: Fila[] = [];

      let saldo = c0;
      let aportado = c0;
      const totalPeriodos = Math.round(n * f);

      for (let p = 1; p <= totalPeriodos; p++) {
        saldo = saldo * (1 + i) + aporte;
        aportado += aporte;
        // Una fila por año completo
        if (p % f === 0) {
          filas.push({ ano: p / f, aportado, intereses: saldo - aportado, saldo });
        }
      }

      // Si el plazo no cierra un año exacto, añadimos la fila final
      if (filas.length === 0 || filas[filas.length - 1].saldo !== saldo) {
        filas.push({ ano: n, aportado, intereses: saldo - aportado, saldo });
      }

      setResult({
        final: saldo,
        aportado,
        intereses: saldo - aportado,
        multiplicador: aportado > 0 ? saldo / aportado : 0,
        filas,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
      setResult(null);
    }
  }

  function reset<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setResult(null); };
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">
        El interés compuesto reinvierte los intereses ganados, de modo que cada periodo generas rendimiento también sobre los intereses anteriores.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Capital inicial (€)</label>
          <input type="number" value={capital} onChange={(e) => reset(setCapital)(e.target.value)} placeholder="Ej. 5000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Aportación mensual (€)</label>
          <input type="number" value={aportacion} onChange={(e) => reset(setAportacion)(e.target.value)} placeholder="Ej. 100" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Interés anual (%)</label>
          <input type="number" value={tasa} onChange={(e) => reset(setTasa)(e.target.value)} placeholder="Ej. 5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Plazo (años)</label>
          <input type="number" value={anos} onChange={(e) => reset(setAnos)(e.target.value)} placeholder="Ej. 20" className={INPUT} />
        </div>
        <div className="space-y-1 col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Capitalización</label>
          <select value={frecuencia} onChange={(e) => reset(setFrecuencia)(e.target.value)} className={INPUT}>
            <option value="12">Mensual (12 veces al año)</option>
            <option value="4">Trimestral (4 veces al año)</option>
            <option value="1">Anual (1 vez al año)</option>
          </select>
        </div>
      </div>

      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">
        Calcular interés compuesto
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="space-y-3">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
            <p className="text-xs text-[var(--color-text-secondary)]">Capital final</p>
            <p className="text-3xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.final)}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Habrás aportado <strong>{formatCurrency(result.aportado)}</strong> y los intereses habrán sumado{' '}
              <strong>{formatCurrency(result.intereses)}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Aportado</p>
              <p className="font-bold text-[var(--color-text)]">{formatCurrency(result.aportado)}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Intereses</p>
              <p className="font-bold text-[var(--color-text)]">{formatCurrency(result.intereses)}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Multiplicador</p>
              <p className="font-bold text-[var(--color-text)]">×{formatNumber(result.multiplicador, 2)}</p>
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto rounded-xl border border-[var(--color-border)]">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-[var(--color-calcs-bg)]">
                <tr>
                  <th className="px-3 py-2 font-semibold text-[var(--color-text)]">Año</th>
                  <th className="px-3 py-2 font-semibold text-[var(--color-text)]">Aportado</th>
                  <th className="px-3 py-2 font-semibold text-[var(--color-text)]">Intereses</th>
                  <th className="px-3 py-2 font-semibold text-[var(--color-text)]">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {result.filas.map((fila) => (
                  <tr key={fila.ano} className="border-t border-[var(--color-border)]">
                    <td className="px-3 py-1.5 text-[var(--color-text-secondary)]">{formatNumber(fila.ano, 1)}</td>
                    <td className="px-3 py-1.5 text-[var(--color-text-secondary)]">{formatCurrency(fila.aportado)}</td>
                    <td className="px-3 py-1.5 text-[var(--color-text-secondary)]">{formatCurrency(fila.intereses)}</td>
                    <td className="px-3 py-1.5 font-semibold text-[var(--color-text)]">{formatCurrency(fila.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[var(--color-text-secondary)]">
            Cálculo orientativo con un interés constante. No incluye impuestos, comisiones ni inflación.
          </p>
        </div>
      )}
    </div>
  );
}
