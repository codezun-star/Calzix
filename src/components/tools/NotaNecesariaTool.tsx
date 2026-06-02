import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

export default function NotaNecesariaTool() {
  const [notaActual, setNotaActual] = useState('');
  const [examenesPasados, setExamenesPasados] = useState('');
  const [examenesTotal, setExamenesTotal] = useState('');
  const [notaMinima, setNotaMinima] = useState('5');
  const [result, setResult] = useState<{ notaNecesaria: number; posible: boolean } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const na = parseFloat(notaActual.replace(',', '.'));
      const ep = parseFloat(examenesPasados.replace(',', '.'));
      const et = parseFloat(examenesTotal.replace(',', '.'));
      const nm = parseFloat(notaMinima.replace(',', '.'));
      if (isNaN(na) || isNaN(ep) || isNaN(et) || isNaN(nm)) throw new Error('Introduce todos los valores.');
      if (ep <= 0 || et <= ep) throw new Error('El número de exámenes debe ser mayor que los ya realizados.');
      if (na < 0 || na > 10) throw new Error('La nota actual debe estar entre 0 y 10.');
      if (nm < 0 || nm > 10) throw new Error('La nota mínima debe estar entre 0 y 10.');
      const examenesRestantes = et - ep;
      const notaNecesaria = (nm * et - na * ep) / examenesRestantes;
      setResult({ notaNecesaria, posible: notaNecesaria <= 10 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota media actual (0–10)</label>
          <input type="number" step="0.1" value={notaActual} onChange={(e) => { setNotaActual(e.target.value); setResult(null); }} placeholder="Ej. 4.5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nota mínima para aprobar</label>
          <input type="number" step="0.1" value={notaMinima} onChange={(e) => { setNotaMinima(e.target.value); setResult(null); }} placeholder="5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Exámenes ya realizados</label>
          <input type="number" step="1" value={examenesPasados} onChange={(e) => { setExamenesPasados(e.target.value); setResult(null); }} placeholder="Ej. 3" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Total de exámenes</label>
          <input type="number" step="1" value={examenesTotal} onChange={(e) => { setExamenesTotal(e.target.value); setResult(null); }} placeholder="Ej. 5" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular nota necesaria</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className={`rounded-xl p-4 space-y-1 ${result.posible ? 'bg-[var(--color-calcs-bg)]' : 'bg-red-50'}`}>
          <p className="text-sm text-[var(--color-text-secondary)]">Nota necesaria en los exámenes restantes</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.notaNecesaria, 2)}</p>
          <p className="text-sm font-medium">{result.posible ? 'Es posible lograrlo.' : 'No es posible alcanzar la nota mínima.'}</p>
        </div>
      )}
    </div>
  );
}
