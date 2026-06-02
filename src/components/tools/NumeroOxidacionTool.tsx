import { useState } from 'react';

const REGLAS = [
  { elemento: 'Oxígeno (O)', nox: -2, excepciones: 'Excepto en peróxidos (−1), F₂O (+2) y O₂ (0).' },
  { elemento: 'Hidrógeno (H)', nox: +1, excepciones: 'Excepto en hidruros metálicos (−1) y H₂ (0).' },
  { elemento: 'Flúor (F)', nox: -1, excepciones: 'Siempre −1 en compuestos.' },
  { elemento: 'Metales alcalinos (Li, Na, K...)', nox: +1, excepciones: 'Siempre +1 en compuestos.' },
  { elemento: 'Metales alcalinotérreos (Mg, Ca...)', nox: +2, excepciones: 'Siempre +2 en compuestos.' },
  { elemento: 'Cloro (Cl)', nox: -1, excepciones: 'Variable: −1 (cloruro), +1, +3, +5, +7 con oxígeno.' },
  { elemento: 'Nitrógeno (N)', nox: -3, excepciones: 'Variable: −3 a +5 según compuesto.' },
  { elemento: 'Carbono (C)', nox: 0, excepciones: 'Variable: −4 a +4 según compuesto.' },
  { elemento: 'Azufre (S)', nox: -2, excepciones: 'Variable: −2, 0, +4, +6 según compuesto.' },
];

const NOX_COMUNES: Record<string, { formula: string; nox: string }[]> = {
  'Óxidos de hierro': [{ formula: 'FeO', nox: 'Fe = +2' }, { formula: 'Fe₂O₃', nox: 'Fe = +3' }, { formula: 'Fe₃O₄', nox: 'Fe = +8/3 (mixto)' }],
  'Ácidos comunes':   [{ formula: 'HCl', nox: 'Cl = −1' }, { formula: 'H₂SO₄', nox: 'S = +6' }, { formula: 'HNO₃', nox: 'N = +5' }, { formula: 'H₃PO₄', nox: 'P = +5' }],
  'Manganeso':        [{ formula: 'MnO', nox: 'Mn = +2' }, { formula: 'MnO₂', nox: 'Mn = +4' }, { formula: 'KMnO₄', nox: 'Mn = +7' }],
};

export default function NumeroOxidacionTool() {
  const [seccion, setSeccion] = useState<'reglas' | 'comunes'>('reglas');

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Consulta las reglas para asignar números de oxidación (NOx) y ejemplos de compuestos comunes.</p>
      <div className="flex gap-2">
        <button onClick={() => setSeccion('reglas')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${seccion === 'reglas' ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-calcs-bg)] text-[var(--color-text)]'}`}>Reglas generales</button>
        <button onClick={() => setSeccion('comunes')} className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${seccion === 'comunes' ? 'bg-[var(--color-accent)] text-white' : 'bg-[var(--color-calcs-bg)] text-[var(--color-text)]'}`}>Ejemplos comunes</button>
      </div>
      {seccion === 'reglas' ? (
        <div className="space-y-3">
          {REGLAS.map((r) => (
            <div key={r.elemento} className="rounded-xl bg-[var(--color-calcs-bg)] p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-text)]">{r.elemento}</span>
                <span className="text-sm font-extrabold text-[var(--color-accent)]">NOx = {r.nox > 0 ? '+' : ''}{r.nox}</span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">{r.excepciones}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(NOX_COMUNES).map(([grupo, items]) => (
            <div key={grupo} className="space-y-2">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)]">{grupo}</p>
              {items.map((item) => (
                <div key={item.formula} className="flex justify-between rounded-xl bg-[var(--color-calcs-bg)] px-3 py-2 text-sm">
                  <span className="font-semibold text-[var(--color-text)]">{item.formula}</span>
                  <span className="text-[var(--color-text-secondary)]">{item.nox}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
