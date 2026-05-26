import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Forma = 'rectangulo' | 'circulo' | 'triangulo';

export default function AreaJardinTool() {
  const [forma, setForma] = useState<Forma>('rectangulo');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [radio, setRadio] = useState('');
  const [base, setBase] = useState('');
  const [altura, setAltura] = useState('');
  const [densidad, setDensidad] = useState('4');
  const [result, setResult] = useState<{
    area: number;
    plantas: number;
    aguaSemanal: number;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const densidadN = parseFloat(densidad.replace(',', '.'));
      if (isNaN(densidadN) || densidadN <= 0)
        throw new Error('La densidad de siembra debe ser mayor que 0.');

      let area = 0;

      if (forma === 'rectangulo') {
        const largoN = parseFloat(largo.replace(',', '.'));
        const anchoN = parseFloat(ancho.replace(',', '.'));
        if (isNaN(largoN) || largoN <= 0) throw new Error('Introduce un largo válido (mayor que 0).');
        if (isNaN(anchoN) || anchoN <= 0) throw new Error('Introduce un ancho válido (mayor que 0).');
        area = largoN * anchoN;
      } else if (forma === 'circulo') {
        const radioN = parseFloat(radio.replace(',', '.'));
        if (isNaN(radioN) || radioN <= 0) throw new Error('Introduce un radio válido (mayor que 0).');
        area = Math.PI * radioN * radioN;
      } else {
        const baseN = parseFloat(base.replace(',', '.'));
        const alturaN = parseFloat(altura.replace(',', '.'));
        if (isNaN(baseN) || baseN <= 0) throw new Error('Introduce una base válida (mayor que 0).');
        if (isNaN(alturaN) || alturaN <= 0) throw new Error('Introduce una altura válida (mayor que 0).');
        area = (baseN * alturaN) / 2;
      }

      const plantas = Math.ceil(area * densidadN);
      const aguaSemanal = area * 5;

      setResult({ area, plantas, aguaSemanal });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Forma del terreno
        </label>
        <select
          value={forma}
          onChange={(e) => {
            setForma(e.target.value as Forma);
            setResult(null);
            setError('');
          }}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="rectangulo">Rectángulo / Cuadrado</option>
          <option value="circulo">Círculo</option>
          <option value="triangulo">Triángulo</option>
        </select>
      </div>

      {forma === 'rectangulo' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Largo (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              placeholder="Ej. 10"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Ancho (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
              placeholder="Ej. 5"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>
      )}

      {forma === 'circulo' && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Radio (m)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            placeholder="Ej. 4"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      )}

      {forma === 'triangulo' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Base (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              placeholder="Ej. 8"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Altura (m)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ej. 6"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Densidad de siembra (plantas/m²)
        </label>
        <input
          type="number"
          min="0.1"
          step="0.5"
          value={densidad}
          onChange={(e) => setDensidad(e.target.value)}
          placeholder="4"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Área del jardín
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(result.area)} m²
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Plantas necesarias</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{result.plantas} plantas</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Agua de riego/semana</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatNumber(result.aguaSemanal)} L</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
