import { useState } from 'react';

export default function AprendizajeEspaciadoTool() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [result, setResult] = useState<string[] | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fechaInicio) throw new Error('Selecciona una fecha de estudio inicial.');
      const inicio = new Date(fechaInicio);
      if (isNaN(inicio.getTime())) throw new Error('Fecha no válida.');
      const intervalos = [1, 3, 7, 14, 30, 60, 120];
      const fechas = intervalos.map((dias) => {
        const d = new Date(inicio);
        d.setDate(d.getDate() + dias);
        return `+${dias} días — ${d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;
      });
      setResult(fechas);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Basado en la curva del olvido de Ebbinghaus. Repasa el contenido en estas fechas para memorizar a largo plazo.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de estudio inicial</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => { setFechaInicio(e.target.value); setResult(null); }}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Generar calendario de repaso</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">Fechas de repaso recomendadas</p>
          <ol className="space-y-1">
            {result.map((f, i) => (
              <li key={i} className="text-sm text-[var(--color-text)] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent)] text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                {f}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
