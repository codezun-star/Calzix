import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function ConcentracionMolarTool() {
  const [masa, setMasa] = useState('');
  const [masaMolar, setMasaMolar] = useState('');
  const [moles, setMoles] = useState('');
  const [volumen, setVolumen] = useState('');

  const [resultMoles, setResultMoles] = useState<number | null>(null);
  const [resultConc, setResultConc] = useState<number | null>(null);
  const [errorMoles, setErrorMoles] = useState('');
  const [errorConc, setErrorConc] = useState('');

  function calcularMoles() {
    try {
      setErrorMoles('');
      setResultMoles(null);
      const m = parseFloat(masa.replace(',', '.'));
      const mm = parseFloat(masaMolar.replace(',', '.'));
      if (isNaN(m)) throw new Error('Introduce una masa válida en gramos.');
      if (isNaN(mm)) throw new Error('Introduce una masa molar válida en g/mol.');
      if (mm <= 0) throw new Error('La masa molar debe ser mayor que cero.');
      if (m < 0) throw new Error('La masa no puede ser negativa.');
      setResultMoles(m / mm);
    } catch (e) {
      setErrorMoles(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  function calcularConcentracion() {
    try {
      setErrorConc('');
      setResultConc(null);
      const mol = parseFloat(moles.replace(',', '.'));
      const vol = parseFloat(volumen.replace(',', '.'));
      if (isNaN(mol)) throw new Error('Introduce la cantidad de moles.');
      if (isNaN(vol)) throw new Error('Introduce el volumen en litros.');
      if (vol <= 0) throw new Error('El volumen debe ser mayor que cero.');
      if (mol < 0) throw new Error('Los moles no pueden ser negativos.');
      setResultConc(mol / vol);
    } catch (e) {
      setErrorConc(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="space-y-6">
      {/* Sección 1: Calcular moles */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
        <h2 className="text-base font-bold text-[var(--color-text)]">Calcular moles</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Fórmula: <span className="font-mono font-semibold">n = m / M</span> — moles = masa (g) / masa molar (g/mol)
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa (g)</label>
            <input
              type="number"
              value={masa}
              onChange={(e) => { setMasa(e.target.value); setResultMoles(null); }}
              placeholder="ej. 18"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Masa molar (g/mol)</label>
            <input
              type="number"
              value={masaMolar}
              onChange={(e) => { setMasaMolar(e.target.value); setResultMoles(null); }}
              placeholder="ej. 18,015 (agua)"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>

        <button
          onClick={calcularMoles}
          className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Calcular moles
        </button>

        {errorMoles && <p className="text-sm text-red-600">{errorMoles}</p>}

        {resultMoles !== null && (
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Moles</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultMoles, 6)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">mol</span>
            </p>
          </div>
        )}
      </div>

      {/* Sección 2: Calcular concentración */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
        <h2 className="text-base font-bold text-[var(--color-text)]">Calcular concentración molar</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Fórmula: <span className="font-mono font-semibold">C = n / V</span> — concentración (mol/L) = moles / volumen (L)
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Moles (mol)</label>
            <input
              type="number"
              value={moles}
              onChange={(e) => { setMoles(e.target.value); setResultConc(null); }}
              placeholder="ej. 0,5"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Volumen (L)</label>
            <input
              type="number"
              value={volumen}
              onChange={(e) => { setVolumen(e.target.value); setResultConc(null); }}
              placeholder="ej. 2"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </div>

        <button
          onClick={calcularConcentracion}
          className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Calcular concentración
        </button>

        {errorConc && <p className="text-sm text-red-600">{errorConc}</p>}

        {resultConc !== null && (
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Concentración molar</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultConc, 6)} <span className="text-base font-semibold text-[var(--color-text-secondary)]">mol/L</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
