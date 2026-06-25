import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

const BANDAS: { max: number; etiqueta: string; rango: string }[] = [
  { max: 1, etiqueta: 'Bebé (0-11 meses)', rango: '12 a 16 horas (incluidas siestas)' },
  { max: 3, etiqueta: 'Niño pequeño (1-2 años)', rango: '11 a 14 horas' },
  { max: 6, etiqueta: 'Preescolar (3-5 años)', rango: '10 a 13 horas' },
  { max: 14, etiqueta: 'Niño en edad escolar (6-13 años)', rango: '9 a 11 horas' },
  { max: 18, etiqueta: 'Adolescente (14-17 años)', rango: '8 a 10 horas' },
  { max: 26, etiqueta: 'Adulto joven (18-25 años)', rango: '7 a 9 horas' },
  { max: 65, etiqueta: 'Adulto (26-64 años)', rango: '7 a 9 horas' },
  { max: 200, etiqueta: 'Adulto mayor (65+ años)', rango: '7 a 8 horas' },
];

export default function HorasSuenoEdadTool() {
  const [edad, setEdad] = useState('');
  const [result, setResult] = useState<{ etiqueta: string; rango: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const e = parseFloat(edad);
      if (isNaN(e) || e < 0 || e > 120) throw new Error('Introduce una edad válida en años.');
      const banda = BANDAS.find((b) => e < b.max) ?? BANDAS[BANDAS.length - 1];
      setResult({ etiqueta: banda.etiqueta, rango: banda.rango });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Recomendaciones de horas de sueño por edad según la National Sleep Foundation.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Edad (años)</label>
        <input type="number" value={edad} onChange={(e) => { setEdad(e.target.value); setResult(null); }} placeholder="Ej. 30" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Ver recomendación</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">{result.etiqueta}</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{result.rango}</p>
        </div>
      )}
    </div>
  );
}
