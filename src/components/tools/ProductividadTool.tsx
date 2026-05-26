import { useState } from 'react';
import { formatNumber, formatPercent } from '@/lib/utils/format';

type Valoracion = 'Baja' | 'Media' | 'Alta' | 'Excepcional';

function getValoracion(tasa: number): Valoracion {
  if (tasa < 50) return 'Baja';
  if (tasa < 80) return 'Media';
  if (tasa <= 100) return 'Alta';
  return 'Excepcional';
}

const valoracionColors: Record<Valoracion, string> = {
  Baja: 'text-red-600',
  Media: 'text-yellow-600',
  Alta: 'text-[var(--color-accent)]',
  Excepcional: 'text-blue-600',
};

export default function ProductividadTool() {
  const [completadas, setCompletadas] = useState('');
  const [planificadas, setPlanificadas] = useState('');
  const [horas, setHoras] = useState('');
  const [result, setResult] = useState<{
    tasaCompletacion: number;
    tareasPorHora: number;
    horasPorTarea: number;
    valoracion: Valoracion;
  } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const completadasN = parseFloat(completadas.replace(',', '.'));
      const planificadasN = parseFloat(planificadas.replace(',', '.'));
      const horasN = parseFloat(horas.replace(',', '.'));

      if (isNaN(completadasN) || completadasN < 0)
        throw new Error('Introduce un número válido de tareas completadas.');
      if (isNaN(planificadasN) || planificadasN <= 0)
        throw new Error('Las tareas planificadas deben ser mayores que 0.');
      if (isNaN(horasN) || horasN <= 0)
        throw new Error('Las horas trabajadas deben ser mayores que 0.');
      if (completadasN === 0)
        throw new Error('Las tareas completadas deben ser mayores que 0 para calcular la productividad.');

      const tasaCompletacion = (completadasN / planificadasN) * 100;
      const tareasPorHora = completadasN / horasN;
      const horasPorTarea = horasN / completadasN;
      const valoracion = getValoracion(tasaCompletacion);

      setResult({ tasaCompletacion, tareasPorHora, horasPorTarea, valoracion });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Tareas completadas
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={completadas}
            onChange={(e) => setCompletadas(e.target.value)}
            placeholder="Ej. 8"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Tareas planificadas
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={planificadas}
            onChange={(e) => setPlanificadas(e.target.value)}
            placeholder="Ej. 10"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Horas trabajadas
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            placeholder="Ej. 8"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular productividad
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
                Tasa de completación
              </p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatPercent(result.tasaCompletacion)}
              </p>
            </div>
            <p className={`text-lg font-bold ${valoracionColors[result.valoracion]}`}>
              {result.valoracion}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Tareas por hora</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatNumber(result.tareasPorHora)}</p>
            </div>
            <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Horas por tarea</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{formatNumber(result.horasPorTarea)} h</p>
            </div>
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">
            {result.valoracion === 'Baja' && 'Menos del 50% de las tareas completadas. Analiza los obstáculos que frenan tu rendimiento.'}
            {result.valoracion === 'Media' && 'Entre el 50% y el 80%. Buen comienzo, pero hay margen de mejora.'}
            {result.valoracion === 'Alta' && 'Entre el 80% y el 100%. Excelente rendimiento. Mantén el ritmo.'}
            {result.valoracion === 'Excepcional' && 'Superaste las tareas planificadas. Rendimiento excepcional.'}
          </p>
        </div>
      )}
    </div>
  );
}
