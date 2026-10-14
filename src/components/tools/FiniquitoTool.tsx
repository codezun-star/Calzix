import { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

type Extincion = 'voluntaria' | 'fin-contrato' | 'objetivo' | 'improcedente' | 'disciplinario';

/** Días de indemnización por año trabajado y tope en mensualidades (Estatuto de los Trabajadores). */
const EXTINCIONES: Record<Extincion, { label: string; dias: number; topeMeses: number | null }> = {
  voluntaria:      { label: 'Baja voluntaria (dimisión)',                dias: 0,  topeMeses: null },
  'fin-contrato':  { label: 'Fin de contrato temporal (12 días/año)',     dias: 12, topeMeses: null },
  objetivo:        { label: 'Despido objetivo (20 días/año)',             dias: 20, topeMeses: 12 },
  improcedente:    { label: 'Despido improcedente (33 días/año)',         dias: 33, topeMeses: 24 },
  disciplinario:   { label: 'Despido disciplinario procedente',          dias: 0,  topeMeses: null },
};

interface Resultado {
  salarioMes: number;
  vacaciones: number;
  pagasExtra: number;
  preaviso: number;
  finiquito: number;
  indemnizacion: number;
  anios: number;
  total: number;
}

const DIA_MS = 86400000;

function parseFecha(v: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  return m ? new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]))) : null;
}

export default function FiniquitoTool() {
  const [salarioAnual, setSalarioAnual] = useState('');
  const [alta, setAlta] = useState('');
  const [baja, setBaja] = useState('');
  const [vacacionesPendientes, setVacacionesPendientes] = useState('0');
  const [prorrateadas, setProrrateadas] = useState(false);
  const [extincion, setExtincion] = useState<Extincion>('voluntaria');
  const [diasPreaviso, setDiasPreaviso] = useState('0');
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const sa = parseFloat(salarioAnual.replace(',', '.'));
      const vp = parseFloat(vacacionesPendientes.replace(',', '.') || '0');
      const dp = parseFloat(diasPreaviso.replace(',', '.') || '0');
      const fAlta = parseFecha(alta);
      const fBaja = parseFecha(baja);
      if (isNaN(sa) || sa <= 0) throw new Error('Introduce tu salario bruto anual.');
      if (!fAlta || !fBaja) throw new Error('Introduce la fecha de alta y la fecha de baja en la empresa.');
      if (fBaja < fAlta) throw new Error('La fecha de baja no puede ser anterior a la de alta.');
      if (isNaN(vp) || vp < 0 || isNaN(dp) || dp < 0) throw new Error('Los días de vacaciones y de preaviso no pueden ser negativos.');

      const salarioDia = sa / 365;

      // 1. Días trabajados del mes de la baja (no cobrados todavía), con la nómina
      // ordinaria: salario mensual / 30. Sin prorrateo, el mensual excluye las pagas
      // extra, que se liquidan aparte en el punto 3 (evita contarlas dos veces).
      const diaMes = fBaja.getUTCDate();
      const salarioMensual = prorrateadas ? sa / 12 : sa / 14;
      const salarioMes = (salarioMensual / 30) * Math.min(diaMes, 30);

      // 2. Vacaciones generadas y no disfrutadas.
      const vacaciones = salarioDia * vp;

      // 3. Parte proporcional de las pagas extra (devengo semestral: verano ene-jun, Navidad jul-dic).
      let pagasExtra = 0;
      if (!prorrateadas) {
        const anio = fBaja.getUTCFullYear();
        const inicioSemestre = fBaja.getUTCMonth() < 6 ? Date.UTC(anio, 0, 1) : Date.UTC(anio, 6, 1);
        const desde = Math.max(inicioSemestre, fAlta.getTime());
        const dias = Math.floor((fBaja.getTime() - desde) / DIA_MS) + 1;
        const paga = sa / 14;
        pagasExtra = paga * (dias / 182.5);
      }

      // 4. Preaviso no respetado en una baja voluntaria (se descuenta).
      const preaviso = extincion === 'voluntaria' ? salarioDia * dp : 0;

      // 5. Indemnización.
      const anios = (fBaja.getTime() - fAlta.getTime() + DIA_MS) / (365.25 * DIA_MS);
      const { dias, topeMeses } = EXTINCIONES[extincion];
      let indemnizacion = salarioDia * dias * anios;
      if (topeMeses !== null) indemnizacion = Math.min(indemnizacion, (sa / 12) * topeMeses);

      const finiquito = salarioMes + vacaciones + pagasExtra - preaviso;
      setResult({ salarioMes, vacaciones, pagasExtra, preaviso, finiquito, indemnizacion, anios, total: finiquito + indemnizacion });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  function reset() { setResult(null); }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Cálculo orientativo del finiquito y la indemnización según el Estatuto de los Trabajadores.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={LABEL}>Salario bruto anual (€)</label>
          <input type="number" value={salarioAnual} onChange={(e) => { setSalarioAnual(e.target.value); reset(); }} placeholder="Ej. 24000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Motivo del fin de la relación laboral</label>
          <select value={extincion} onChange={(e) => { setExtincion(e.target.value as Extincion); reset(); }} className={INPUT}>
            {(Object.keys(EXTINCIONES) as Extincion[]).map((k) => <option key={k} value={k}>{EXTINCIONES[k].label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Fecha de alta en la empresa</label>
          <input type="date" value={alta} onChange={(e) => { setAlta(e.target.value); reset(); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Fecha de baja (último día trabajado)</label>
          <input type="date" value={baja} onChange={(e) => { setBaja(e.target.value); reset(); }} className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Días de vacaciones pendientes</label>
          <input type="number" min="0" value={vacacionesPendientes} onChange={(e) => { setVacacionesPendientes(e.target.value); reset(); }} placeholder="Ej. 5" className={INPUT} />
        </div>
        {extincion === 'voluntaria' && (
          <div className="space-y-1">
            <label className={LABEL}>Días de preaviso que no has cumplido</label>
            <input type="number" min="0" value={diasPreaviso} onChange={(e) => { setDiasPreaviso(e.target.value); reset(); }} placeholder="0" className={INPUT} />
          </div>
        )}
      </div>
      <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
        <input type="checkbox" checked={prorrateadas} onChange={(e) => { setProrrateadas(e.target.checked); reset(); }} className="h-4 w-4 accent-[var(--color-accent)]" />
        Cobro las pagas extra prorrateadas en la nómina mensual
      </label>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular finiquito</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Salario de los días trabajados del mes</span><span className="font-semibold">{formatCurrency(result.salarioMes)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Vacaciones no disfrutadas</span><span className="font-semibold">{formatCurrency(result.vacaciones)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Parte proporcional de pagas extra</span><span className="font-semibold">{formatCurrency(result.pagasExtra)}</span></div>
            {result.preaviso > 0 && (
              <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Descuento por falta de preaviso</span><span className="font-semibold">−{formatCurrency(result.preaviso)}</span></div>
            )}
            <div className="border-t border-[var(--color-border)] pt-2 flex justify-between"><span className="font-semibold text-[var(--color-text)]">Finiquito (bruto)</span><span className="font-bold text-[var(--color-text)]">{formatCurrency(result.finiquito)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-text-secondary)]">Indemnización ({formatNumber(result.anios, 2)} años de antigüedad)</span><span className="font-semibold">{formatCurrency(result.indemnizacion)}</span></div>
            <div className="border-t border-[var(--color-border)] pt-2 flex justify-between"><span className="font-semibold text-[var(--color-text)]">Total a cobrar (bruto)</span><span className="text-xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</span></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            El finiquito tributa en el IRPF y cotiza a la Seguridad Social; la indemnización legal por despido está exenta de IRPF (hasta 180.000 €).
            Supone pagas extra semestrales (verano y Navidad); los días del último mes se pagan a salario mensual / 30, y las vacaciones y la indemnización, a salario anual / 365. Si tu contrato es anterior al 12-2-2012, la parte anterior se indemniza a 45 días por año.
          </p>
        </div>
      )}
    </div>
  );
}
