import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';
import { BECAS, umbralBeca } from '@/lib/constants/espana';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

interface Resultado {
  u1: number;
  u2: number;
  u3: number;
  nivel: 1 | 2 | 3 | 0;
}

const TEXTO: Record<Resultado['nivel'], string> = {
  1: 'Por debajo del umbral 1: optas a todas las cuantías (renta, residencia, variable y matrícula).',
  2: 'Entre el umbral 1 y el 2: optas a residencia, cuantía variable y matrícula, pero no a la cuantía fija de renta.',
  3: 'Entre el umbral 2 y el 3: solo optas a la beca de matrícula.',
  0: 'Por encima del umbral 3: no te corresponde ninguna ayuda de la beca general.',
};

export default function UmbralRentaTool() {
  const [miembros, setMiembros] = useState('4');
  const [renta, setRenta] = useState('');
  const [result, setResult] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const n = parseInt(miembros, 10);
      const r = parseFloat(renta.replace(',', '.'));
      if (isNaN(n) || isNaN(r) || n <= 0 || n > 20 || r < 0) throw new Error('Introduce valores válidos: entre 1 y 20 miembros y una renta positiva.');
      const u1 = umbralBeca(BECAS.umbral1, BECAS.extraMiembro.umbral1, n);
      const u2 = umbralBeca(BECAS.umbral2, BECAS.extraMiembro.umbral2, n);
      const u3 = umbralBeca(BECAS.umbral3, BECAS.extraMiembro.umbral3, n);
      const nivel: Resultado['nivel'] = r <= u1 ? 1 : r <= u2 ? 2 : r <= u3 ? 3 : 0;
      setResult({ u1, u2, u3, nivel });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">
        Umbrales de renta familiar de las becas del Ministerio de Educación, curso {BECAS.curso} ({BECAS.norma}).
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Miembros de la unidad familiar</label>
          <input type="number" min="1" step="1" value={miembros} onChange={(e) => { setMiembros(e.target.value); setResult(null); }} placeholder="4" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Renta familiar anual (€)</label>
          <input type="number" value={renta} onChange={(e) => { setRenta(e.target.value); setResult(null); }} placeholder="Ej. 20000" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Comprobar umbrales</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-3 ${result.nivel ? 'bg-[var(--color-calcs-bg)]' : 'bg-red-50'}`}>
          <p className="text-lg font-extrabold text-[var(--color-text)]">{TEXTO[result.nivel]}</p>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div><p className="text-xs text-[var(--color-text-secondary)]">Umbral 1</p><p className="font-bold text-[var(--color-text)]">{formatCurrency(result.u1)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Umbral 2</p><p className="font-bold text-[var(--color-text)]">{formatCurrency(result.u2)}</p></div>
            <div><p className="text-xs text-[var(--color-text-secondary)]">Umbral 3</p><p className="font-bold text-[var(--color-text)]">{formatCurrency(result.u3)}</p></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            La renta familiar es la suma de las bases imponibles general y del ahorro de la declaración de la Renta de 2025 de todos los miembros computables, menos la cuota resultante. También hay umbrales de patrimonio.
          </p>
        </div>
      )}
    </div>
  );
}
