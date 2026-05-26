import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface Estadisticas {
  media: number;
  mediana: number;
  moda: number[];
  minimo: number;
  maximo: number;
  rango: number;
  desviacion: number;
  cuenta: number;
}

function calcularEstadisticas(nums: number[]): Estadisticas {
  const n = nums.length;
  const sorted = [...nums].sort((a, b) => a - b);

  const media = nums.reduce((s, v) => s + v, 0) / n;

  let mediana: number;
  if (n % 2 === 0) {
    mediana = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  } else {
    mediana = sorted[Math.floor(n / 2)];
  }

  const frecuencia: Map<number, number> = new Map();
  for (const v of nums) {
    frecuencia.set(v, (frecuencia.get(v) ?? 0) + 1);
  }
  const maxFreq = Math.max(...frecuencia.values());
  const moda = [...frecuencia.entries()]
    .filter(([, f]) => f === maxFreq)
    .map(([v]) => v)
    .sort((a, b) => a - b);

  const minimo = sorted[0];
  const maximo = sorted[n - 1];
  const rango = maximo - minimo;

  const varianza = nums.reduce((s, v) => s + Math.pow(v - media, 2), 0) / n;
  const desviacion = Math.sqrt(varianza);

  return { media, mediana, moda, minimo, maximo, rango, desviacion, cuenta: n };
}

export default function MediaMedianaTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<Estadisticas | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      setResult(null);
      const partes = input.split(/[\s,;]+/).filter((p) => p.trim() !== '');
      if (partes.length < 2) throw new Error('Introduce al menos 2 números separados por comas o espacios.');
      const nums = partes.map((p, i) => {
        const n = parseFloat(p.replace(',', '.'));
        if (isNaN(n)) throw new Error(`El valor "${p}" en la posición ${i + 1} no es un número válido.`);
        return n;
      });
      setResult(calcularEstadisticas(nums));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const filas: { label: string; value: string }[] = result
    ? [
        { label: 'Media', value: formatNumber(result.media, 4) },
        { label: 'Mediana', value: formatNumber(result.mediana, 4) },
        { label: result.moda.length === 1 ? 'Moda' : 'Modas', value: result.moda.map((m) => formatNumber(m, 4)).join(', ') },
        { label: 'Mínimo', value: formatNumber(result.minimo, 4) },
        { label: 'Máximo', value: formatNumber(result.maximo, 4) },
        { label: 'Rango', value: formatNumber(result.rango, 4) },
        { label: 'Desv. estándar', value: formatNumber(result.desviacion, 4) },
        { label: 'Cantidad', value: String(result.cuenta) },
      ]
    : [];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Números (separados por comas, espacios o punto y coma)
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          placeholder="ej. 4, 8, 15, 16, 23, 42"
          rows={3}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular estadísticas
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {filas.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</dt>
                <dd className="text-lg font-bold text-[var(--color-text)] mt-0.5">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
