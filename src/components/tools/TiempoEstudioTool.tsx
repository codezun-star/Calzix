import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

interface Resultado {
  horasLectura: number;
  horasRepaso: number;
  totalHoras: number;
  dias2h: number;
  dias4h: number;
  dias6h: number;
}

export default function TiempoEstudioTool() {
  const [temas, setTemas] = useState('');
  const [paginas, setPaginas] = useState('');
  const [velocidad, setVelocidad] = useState('20');
  const [repaso, setRepaso] = useState('30');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    const t = parseFloat(temas.replace(',', '.'));
    const p = parseFloat(paginas.replace(',', '.'));
    const v = parseFloat(velocidad.replace(',', '.'));
    const r = parseFloat(repaso.replace(',', '.'));

    if (isNaN(t) || t <= 0) { setError('Introduce un número de temas válido.'); return; }
    if (isNaN(p) || p <= 0) { setError('Introduce páginas por tema válidas.'); return; }
    if (isNaN(v) || v <= 0) { setError('Introduce una velocidad de lectura válida.'); return; }
    if (isNaN(r) || r < 0 || r > 100) { setError('El porcentaje de repaso debe estar entre 0 y 100.'); return; }

    const horasLectura = (t * p) / v;
    const horasRepaso = horasLectura * (r / 100);
    const totalHoras = horasLectura + horasRepaso;

    setResultado({
      horasLectura,
      horasRepaso,
      totalHoras,
      dias2h: Math.ceil(totalHoras / 2),
      dias4h: Math.ceil(totalHoras / 4),
      dias6h: Math.ceil(totalHoras / 6),
    });
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Número de temas / capítulos
          </label>
          <input
            type="number"
            min="1"
            value={temas}
            onChange={(e) => setTemas(e.target.value)}
            placeholder="Ej. 12"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Páginas por tema (promedio)
          </label>
          <input
            type="number"
            min="1"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
            placeholder="Ej. 25"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Velocidad de lectura (páginas/hora)
          </label>
          <input
            type="number"
            min="1"
            value={velocidad}
            onChange={(e) => setVelocidad(e.target.value)}
            placeholder="Ej. 20"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Porcentaje para repasos (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={repaso}
            onChange={(e) => setRepaso(e.target.value)}
            placeholder="Ej. 30"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular tiempo de estudio
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado && (
        <div className="space-y-3">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.horasLectura, 1)}h
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Lectura inicial</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.horasRepaso, 1)}h
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Repasos</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[var(--color-accent)]">
                {formatNumber(resultado.totalHoras, 1)}h
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Total</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-3">
              Días estimados según intensidad diaria
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { horas: 2, dias: resultado.dias2h },
                { horas: 4, dias: resultado.dias4h },
                { horas: 6, dias: resultado.dias6h },
              ].map(({ horas, dias }) => (
                <div key={horas} className="rounded-lg bg-[var(--color-calcs-bg)] p-3">
                  <p className="text-xl font-extrabold text-[var(--color-text)]">{dias}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{horas}h/día</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
