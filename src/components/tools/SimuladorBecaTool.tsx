import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import { BECAS, umbralBeca } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';
const LABEL = 'text-xs font-medium text-[var(--color-text-secondary)]';

interface Componente {
  nombre: string;
  importe: string;
  concede: boolean;
  motivo: string;
}

export default function SimuladorBecaTool() {
  const [notaMedia, setNotaMedia] = useState('');
  const [renFamiliar, setRenFamiliar] = useState('');
  const [miembros, setMiembros] = useState('4');
  const [fuera, setFuera] = useState(false);
  const [result, setResult] = useState<{ componentes: Componente[]; total: number; aviso: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const nota = parseFloat(notaMedia.replace(',', '.'));
      const renta = parseFloat(renFamiliar.replace(',', '.'));
      const n = parseInt(miembros, 10);
      if (isNaN(nota) || isNaN(renta) || isNaN(n)) throw new Error('Introduce la nota, la renta familiar y los miembros.');
      if (nota < 0 || nota > 10 || renta < 0 || n < 1 || n > 20) throw new Error('Revisa los valores: nota entre 0 y 10, renta positiva y entre 1 y 20 miembros.');

      const u1 = umbralBeca(BECAS.umbral1, BECAS.extraMiembro.umbral1, n);
      const u2 = umbralBeca(BECAS.umbral2, BECAS.extraMiembro.umbral2, n);
      const u3 = umbralBeca(BECAS.umbral3, BECAS.extraMiembro.umbral3, n);
      const c = BECAS.cuantias;
      const notaCuantias = nota >= BECAS.notaCuantias;

      const componentes: Componente[] = [
        {
          nombre: 'Beca de matrícula (precios públicos)',
          importe: 'Matrícula gratuita',
          concede: renta <= u3 && nota >= BECAS.notaMatricula,
          motivo: renta > u3 ? `Renta superior al umbral 3 (${formatCurrency(u3)})` : nota < BECAS.notaMatricula ? 'Nota inferior a 5' : 'Renta por debajo del umbral 3',
        },
        {
          nombre: 'Cuantía fija ligada a la renta',
          importe: formatCurrency(c.renta),
          concede: renta <= u1 && notaCuantias,
          motivo: renta > u1 ? `Renta superior al umbral 1 (${formatCurrency(u1)})` : !notaCuantias ? 'Nota inferior a 6,5' : 'Renta por debajo del umbral 1',
        },
        {
          nombre: 'Cuantía fija ligada a la residencia',
          importe: formatCurrency(c.residencia),
          concede: fuera && renta <= u2 && notaCuantias,
          motivo: !fuera ? 'Solo si estudias fuera del domicilio familiar' : renta > u2 ? `Renta superior al umbral 2 (${formatCurrency(u2)})` : !notaCuantias ? 'Nota inferior a 6,5' : 'Estudias fuera y tu renta no supera el umbral 2',
        },
        {
          nombre: 'Cuantía variable',
          importe: `desde ${formatCurrency(c.variableMinima)}`,
          concede: renta <= u2 && notaCuantias,
          motivo: renta > u2 ? `Renta superior al umbral 2 (${formatCurrency(u2)})` : !notaCuantias ? 'Nota inferior a 6,5' : 'Depende de tu nota, tu renta y el presupuesto',
        },
        {
          nombre: 'Cuantía por excelencia académica',
          importe: `${formatCurrency(c.excelencia.min)} a ${formatCurrency(c.excelencia.max)}`,
          concede: renta <= u3 && nota >= BECAS.notaExcelencia,
          motivo: nota >= BECAS.notaExcelencia ? 'Nota media de 8 o más' : 'Requiere una nota media de 8 o más',
        },
      ];

      let total = 0;
      if (componentes[1].concede) total += c.renta;
      if (componentes[2].concede) total += c.residencia;
      if (componentes[3].concede) total += c.variableMinima;
      if (componentes[4].concede) total += c.excelencia.min;

      const u1Sup = umbralBeca(BECAS.umbral1Sup, BECAS.extraMiembro.umbral1, n);
      const u3Sup = umbralBeca(BECAS.umbral3Sup, BECAS.extraMiembro.umbral3, n);
      const aviso =
        renta > u1 && renta <= u1Sup ? `Tu renta está en la franja del umbral 1 (${formatCurrency(u1)}-${formatCurrency(u1Sup)}): revisa tu caso en la convocatoria.`
        : renta > u3 && renta <= u3Sup ? `Tu renta está en la franja del umbral 3 (${formatCurrency(u3)}-${formatCurrency(u3Sup)}): revisa tu caso en la convocatoria.`
        : '';

      setResult({ componentes, total, aviso });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">
        Simulación orientativa de la beca general del Ministerio de Educación para estudios universitarios, curso {BECAS.curso} ({BECAS.norma}).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className={LABEL}>Nota de acceso o media del curso anterior</label>
          <input type="number" step="0.01" value={notaMedia} onChange={(e) => { setNotaMedia(e.target.value); setResult(null); }} placeholder="Ej. 7,5" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Renta familiar anual (€)</label>
          <input type="number" value={renFamiliar} onChange={(e) => { setRenFamiliar(e.target.value); setResult(null); }} placeholder="Ej. 20000" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className={LABEL}>Miembros de la unidad familiar</label>
          <input type="number" min="1" step="1" value={miembros} onChange={(e) => { setMiembros(e.target.value); setResult(null); }} placeholder="4" className={INPUT} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
        <input type="checkbox" checked={fuera} onChange={(e) => { setFuera(e.target.checked); setResult(null); }} className="h-4 w-4 accent-[var(--color-accent)]" />
        Estudio fuera del domicilio familiar (residencia o piso compartido)
      </label>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Simular beca</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Importe mínimo estimado (sin contar la matrícula)</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatCurrency(result.total)}</p>
          </div>
          <ul className="space-y-2">
            {result.componentes.map((comp) => (
              <li key={comp.nombre} className="flex items-start gap-2 text-sm">
                {comp.concede
                  ? <CheckCircle className="mt-0.5 shrink-0 text-green-600" size={16} />
                  : <XCircle className="mt-0.5 shrink-0 text-red-500" size={16} />}
                <span>
                  <strong className="text-[var(--color-text)]">{comp.nombre}</strong>{' '}
                  <span className="text-[var(--color-text-secondary)]">· {comp.importe} · {comp.motivo}</span>
                </span>
              </li>
            ))}
          </ul>
          {result.aviso && <p className="text-xs text-[var(--color-text-secondary)]">{result.aviso}</p>}
          <p className="text-xs text-[var(--color-text-muted)]">
            Supone 1.º de grado con matrícula completa (60 créditos). En cursos posteriores se exige aprobar un porcentaje de créditos que depende de la rama, y también cuentan los umbrales de patrimonio.
          </p>
        </div>
      )}
    </div>
  );
}
