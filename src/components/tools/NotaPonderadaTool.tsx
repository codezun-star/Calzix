import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface Asignatura { nota: string; peso: string; }

export default function NotaPonderadaTool() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([
    { nota: '', peso: '' },
    { nota: '', peso: '' },
    { nota: '', peso: '' },
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function actualizar(idx: number, campo: keyof Asignatura, valor: string) {
    setAsignaturas((prev) => prev.map((a, i) => i === idx ? { ...a, [campo]: valor } : a));
    setResult(null);
  }

  function agregar() { setAsignaturas((p) => [...p, { nota: '', peso: '' }]); }
  function quitar(idx: number) { if (asignaturas.length > 2) setAsignaturas((p) => p.filter((_, i) => i !== idx)); }

  function calcular() {
    try {
      setError('');
      const validas = asignaturas.filter((a) => a.nota !== '' && a.peso !== '');
      if (validas.length < 1) throw new Error('Introduce al menos una nota con su peso.');
      let sumaPonderada = 0, sumaPesos = 0;
      for (const a of validas) {
        const nota = parseFloat(a.nota.replace(',', '.'));
        const peso = parseFloat(a.peso.replace(',', '.'));
        if (isNaN(nota) || isNaN(peso)) throw new Error('Introduce valores numéricos válidos.');
        if (nota < 0) throw new Error('Las notas no pueden ser negativas.');
        if (peso <= 0) throw new Error('Los pesos deben ser positivos.');
        sumaPonderada += nota * peso;
        sumaPesos += peso;
      }
      setResult(sumaPonderada / sumaPesos);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-5 gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
          <span className="col-span-2">Asignatura / Nota</span>
          <span className="col-span-2">Peso (%)</span>
          <span></span>
        </div>
        {asignaturas.map((a, i) => (
          <div key={i} className="grid grid-cols-5 gap-2">
            <input type="number" value={a.nota} onChange={(e) => actualizar(i, 'nota', e.target.value)} placeholder="Ej. 7.5" className="col-span-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            <input type="number" value={a.peso} onChange={(e) => actualizar(i, 'peso', e.target.value)} placeholder="Ej. 30" className="col-span-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
            <button onClick={() => quitar(i)} className="text-xs text-red-500 hover:text-red-700">✕</button>
          </div>
        ))}
      </div>
      <button onClick={agregar} className="text-sm text-[var(--color-accent)] hover:underline">+ Añadir asignatura</button>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular nota ponderada</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-sm text-[var(--color-text-secondary)]">Nota media ponderada</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result, 3)}</p>
        </div>
      )}
    </div>
  );
}
