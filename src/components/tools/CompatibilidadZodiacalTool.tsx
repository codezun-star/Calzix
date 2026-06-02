import { useState } from 'react';
import { formatPercent } from '@/lib/utils/format';

const SIGNOS = [
  { nombre: 'Aries',       elemento: 'fuego', fechaInicio: [3,21] },
  { nombre: 'Tauro',       elemento: 'tierra', fechaInicio: [4,20] },
  { nombre: 'Géminis',     elemento: 'aire',  fechaInicio: [5,21] },
  { nombre: 'Cáncer',      elemento: 'agua',  fechaInicio: [6,21] },
  { nombre: 'Leo',         elemento: 'fuego', fechaInicio: [7,23] },
  { nombre: 'Virgo',       elemento: 'tierra', fechaInicio: [8,23] },
  { nombre: 'Libra',       elemento: 'aire',  fechaInicio: [9,23] },
  { nombre: 'Escorpio',    elemento: 'agua',  fechaInicio: [10,23] },
  { nombre: 'Sagitario',   elemento: 'fuego', fechaInicio: [11,22] },
  { nombre: 'Capricornio', elemento: 'tierra', fechaInicio: [12,22] },
  { nombre: 'Acuario',     elemento: 'aire',  fechaInicio: [1,20] },
  { nombre: 'Piscis',      elemento: 'agua',  fechaInicio: [2,19] },
];

function getSigno(fecha: string): typeof SIGNOS[0] {
  const d = new Date(fecha);
  const mes = d.getMonth() + 1;
  const dia = d.getDate();
  for (let i = SIGNOS.length - 1; i >= 0; i--) {
    const [sm, sd] = SIGNOS[i].fechaInicio;
    if (mes > sm || (mes === sm && dia >= sd)) return SIGNOS[i];
  }
  return SIGNOS[9]; // Capricornio cubre también 1–19 enero (año nuevo)
}

const COMPAT_ELEM: Record<string, Record<string, number>> = {
  fuego:  { fuego: 85, tierra: 55, aire: 90, agua: 60 },
  tierra: { fuego: 55, tierra: 90, aire: 65, agua: 85 },
  aire:   { fuego: 90, tierra: 65, aire: 85, agua: 70 },
  agua:   { fuego: 60, tierra: 85, aire: 70, agua: 90 },
};

export default function CompatibilidadZodiacalTool() {
  const [fecha1, setFecha1] = useState('');
  const [fecha2, setFecha2] = useState('');
  const [result, setResult] = useState<{ signo1: string; signo2: string; pct: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fecha1 || !fecha2) throw new Error('Introduce las dos fechas de nacimiento.');
      const s1 = getSigno(fecha1);
      const s2 = getSigno(fecha2);
      const pct = COMPAT_ELEM[s1.elemento][s2.elemento];
      setResult({ signo1: s1.nombre, signo2: s2.nombre, pct });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Compatibilidad astrológica basada en los elementos de cada signo.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento 1</label><input type="date" value={fecha1} onChange={(e) => { setFecha1(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
        <div className="space-y-1"><label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento 2</label><input type="date" value={fecha2} onChange={(e) => { setFecha2(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" /></div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular compatibilidad</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">{result.signo1} y {result.signo2}</p>
          <p className="text-3xl font-extrabold text-[var(--color-text)]">{formatPercent(result.pct)}</p>
        </div>
      )}
    </div>
  );
}
