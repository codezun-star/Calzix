import { useState, useMemo } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface Asignatura {
  id: number;
  nota: string;
  creditos: string;
}

export default function NotaMediaTool() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([
    { id: 1, nota: '', creditos: '' },
  ]);
  const [nextId, setNextId] = useState(2);

  function agregarAsignatura() {
    setAsignaturas((prev) => [...prev, { id: nextId, nota: '', creditos: '' }]);
    setNextId((n) => n + 1);
  }

  function eliminarAsignatura(id: number) {
    setAsignaturas((prev) => prev.filter((a) => a.id !== id));
  }

  function actualizarNota(id: number, nota: string) {
    setAsignaturas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, nota } : a))
    );
  }

  function actualizarCreditos(id: number, creditos: string) {
    setAsignaturas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, creditos } : a))
    );
  }

  const resultado = useMemo(() => {
    const validas = asignaturas.filter((a) => {
      const n = parseFloat(a.nota.replace(',', '.'));
      const c = parseFloat(a.creditos.replace(',', '.'));
      return !isNaN(n) && n >= 0 && n <= 10 && !isNaN(c) && c > 0;
    });

    if (validas.length === 0) return null;

    const errores: string[] = [];
    for (const a of asignaturas) {
      const n = parseFloat(a.nota.replace(',', '.'));
      if (a.nota !== '' && (isNaN(n) || n < 0 || n > 10)) {
        errores.push('Las notas deben estar entre 0 y 10.');
        break;
      }
    }
    for (const a of asignaturas) {
      const c = parseFloat(a.creditos.replace(',', '.'));
      if (a.creditos !== '' && (isNaN(c) || c <= 0)) {
        errores.push('Los créditos deben ser mayores que 0.');
        break;
      }
    }

    if (errores.length > 0) return { error: errores[0] };

    const sumaNotas = validas.reduce((acc, a) => acc + parseFloat(a.nota.replace(',', '.')), 0);
    const mediaSimple = sumaNotas / validas.length;

    const sumaPonderada = validas.reduce(
      (acc, a) =>
        acc + parseFloat(a.nota.replace(',', '.')) * parseFloat(a.creditos.replace(',', '.')),
      0
    );
    const sumaCreditos = validas.reduce((acc, a) => acc + parseFloat(a.creditos.replace(',', '.')), 0);
    const mediaPonderada = sumaPonderada / sumaCreditos;

    return { mediaSimple, mediaPonderada, n: validas.length, error: null };
  }, [asignaturas]);

  const superaMinimo = resultado && !resultado.error && resultado.mediaPonderada !== undefined
    ? resultado.mediaPonderada >= 5
    : null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      {/* Cabecera de la tabla */}
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs font-medium text-[var(--color-text-secondary)] px-1">
        <span>Nota (0-10)</span>
        <span>Creditos / Peso</span>
        <span className="w-8"></span>
      </div>

      {/* Filas de asignaturas */}
      <div className="space-y-2">
        {asignaturas.map((a) => (
          <div key={a.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={a.nota}
              onChange={(e) => actualizarNota(a.id, e.target.value)}
              placeholder="Ej. 7.5"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={a.creditos}
              onChange={(e) => actualizarCreditos(a.id, e.target.value)}
              placeholder="Ej. 6"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <button
              onClick={() => eliminarAsignatura(a.id)}
              disabled={asignaturas.length === 1}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-red-300 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Eliminar asignatura"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={agregarAsignatura}
        className="w-full rounded-xl border border-dashed border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
      >
        + Anadir asignatura
      </button>

      {resultado && resultado.error && (
        <p className="text-sm text-red-600">{resultado.error}</p>
      )}

      {resultado && !resultado.error && resultado.mediaSimple !== undefined && resultado.mediaPonderada !== undefined && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
              Media ponderada
            </p>
            <p className="text-2xl font-extrabold text-[var(--color-text)]">
              {formatNumber(resultado.mediaPonderada, 2)}
            </p>
            <p className={`text-sm font-semibold mt-1 ${superaMinimo ? 'text-[var(--color-accent)]' : 'text-red-600'}`}>
              {superaMinimo ? 'Supera el minimo (5,0)' : 'No supera el minimo (5,0)'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Media simple</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatNumber(resultado.mediaSimple, 2)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Asignaturas validas</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{resultado.n}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
