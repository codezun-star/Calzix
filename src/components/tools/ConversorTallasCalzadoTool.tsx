import { useState } from 'react';

// Tabla aproximada de equivalencias de tallas de calzado
const TABLA: { eu: number; cm: number; usM: string; usW: string; uk: string }[] = [
  { eu: 35, cm: 22.5, usM: '3.5', usW: '5', uk: '2.5' },
  { eu: 36, cm: 23.0, usM: '4', usW: '6', uk: '3.5' },
  { eu: 37, cm: 23.5, usM: '5', usW: '6.5', uk: '4' },
  { eu: 38, cm: 24.0, usM: '5.5', usW: '7.5', uk: '5' },
  { eu: 39, cm: 25.0, usM: '6.5', usW: '8', uk: '6' },
  { eu: 40, cm: 25.5, usM: '7', usW: '9', uk: '6.5' },
  { eu: 41, cm: 26.0, usM: '8', usW: '9.5', uk: '7.5' },
  { eu: 42, cm: 26.5, usM: '8.5', usW: '10.5', uk: '8' },
  { eu: 43, cm: 27.5, usM: '9.5', usW: '11', uk: '9' },
  { eu: 44, cm: 28.0, usM: '10', usW: '12', uk: '9.5' },
  { eu: 45, cm: 29.0, usM: '11', usW: '13', uk: '10.5' },
  { eu: 46, cm: 29.5, usM: '12', usW: '—', uk: '11.5' },
];
const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function ConversorTallasCalzadoTool() {
  const [eu, setEu] = useState('40');
  const row = TABLA.find((t) => t.eu === parseInt(eu, 10)) ?? TABLA[5];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Selecciona tu talla europea (EU) y consulta su equivalencia. Valores aproximados; la talla real puede variar según la marca.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Talla europea (EU)</label>
        <select value={eu} onChange={(e) => setEu(e.target.value)} className={INPUT}>
          {TABLA.map((t) => <option key={t.eu} value={t.eu}>EU {t.eu}</option>)}
        </select>
      </div>
      <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><p className="text-xs text-[var(--color-text-secondary)]">Longitud pie</p><p className="text-lg font-bold text-[var(--color-text)]">{row.cm} cm</p></div>
        <div><p className="text-xs text-[var(--color-text-secondary)]">US Hombre</p><p className="text-lg font-bold text-[var(--color-text)]">{row.usM}</p></div>
        <div><p className="text-xs text-[var(--color-text-secondary)]">US Mujer</p><p className="text-lg font-bold text-[var(--color-text)]">{row.usW}</p></div>
        <div><p className="text-xs text-[var(--color-text-secondary)]">UK</p><p className="text-lg font-bold text-[var(--color-text)]">{row.uk}</p></div>
      </div>
    </div>
  );
}
