import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

const DIAS_SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

interface Resultado {
  anos: number;
  meses: number;
  dias: number;
  totalMeses: number;
  totalSemanas: number;
  totalDias: number;
  totalHoras: number;
  diaNacimiento: string;
  diasParaCumple: number;
  edadEnCumple: number;
}

/** Crea una fecha local a mediodía para que los cambios de hora no muevan el día. */
function fechaLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

export default function CalculadoraEdadTool() {
  const [nacimiento, setNacimiento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!nacimiento) throw new Error('Introduce tu fecha de nacimiento.');

      const nac = fechaLocal(nacimiento);
      if (isNaN(nac.getTime())) throw new Error('La fecha de nacimiento no es válida.');

      const hoy = new Date();
      const ref = referencia ? fechaLocal(referencia) : new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 12, 0, 0, 0);
      if (isNaN(ref.getTime())) throw new Error('La fecha de referencia no es válida.');
      if (nac > ref) throw new Error('La fecha de nacimiento debe ser anterior a la fecha de referencia.');

      // Edad exacta en años, meses y días
      let anos = ref.getFullYear() - nac.getFullYear();
      let meses = ref.getMonth() - nac.getMonth();
      let dias = ref.getDate() - nac.getDate();
      if (dias < 0) {
        meses--;
        // Días del mes anterior a la fecha de referencia
        dias += new Date(ref.getFullYear(), ref.getMonth(), 0).getDate();
      }
      if (meses < 0) {
        meses += 12;
        anos--;
      }

      const totalDias = Math.round((ref.getTime() - nac.getTime()) / 86400000);

      // Próximo cumpleaños a partir de la fecha de referencia
      let cumple = new Date(ref.getFullYear(), nac.getMonth(), nac.getDate(), 12, 0, 0, 0);
      if (cumple.getTime() < ref.getTime()) {
        cumple = new Date(ref.getFullYear() + 1, nac.getMonth(), nac.getDate(), 12, 0, 0, 0);
      }
      const diasParaCumple = Math.round((cumple.getTime() - ref.getTime()) / 86400000);

      setResult({
        anos,
        meses,
        dias,
        totalMeses: anos * 12 + meses,
        totalSemanas: Math.floor(totalDias / 7),
        totalDias,
        totalHoras: totalDias * 24,
        diaNacimiento: DIAS_SEMANA[nac.getDay()],
        diasParaCumple,
        edadEnCumple: anos + 1,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
      setResult(null);
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento</label>
          <input type="date" value={nacimiento} onChange={(e) => { setNacimiento(e.target.value); setResult(null); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Calcular la edad el día <span className="opacity-60">opcional</span>
          </label>
          <input type="date" value={referencia} onChange={(e) => { setReferencia(e.target.value); setResult(null); }} className={INPUT} />
        </div>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)]">Si dejas la segunda fecha vacía, se calcula la edad de hoy.</p>

      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">
        Calcular edad
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="space-y-3">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
            <p className="text-xs text-[var(--color-text-secondary)]">Edad exacta</p>
            <p className="text-3xl font-extrabold text-[var(--color-text)]">
              {result.anos} {result.anos === 1 ? 'año' : 'años'}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {result.anos} {result.anos === 1 ? 'año' : 'años'}, {result.meses} {result.meses === 1 ? 'mes' : 'meses'} y{' '}
              {result.dias} {result.dias === 1 ? 'día' : 'días'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Meses</p>
              <p className="font-bold text-[var(--color-text)]">{formatNumber(result.totalMeses)}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Semanas</p>
              <p className="font-bold text-[var(--color-text)]">{formatNumber(result.totalSemanas)}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Días</p>
              <p className="font-bold text-[var(--color-text)]">{formatNumber(result.totalDias)}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Horas</p>
              <p className="font-bold text-[var(--color-text)]">{formatNumber(result.totalHoras)}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-4 space-y-1">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Naciste en <strong className="text-[var(--color-text)]">{result.diaNacimiento}</strong>.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {result.diasParaCumple === 0
                ? '¡Hoy es tu cumpleaños!'
                : <>Faltan <strong className="text-[var(--color-text)]">{formatNumber(result.diasParaCumple)} días</strong> para que cumplas {result.edadEnCumple}.</>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
