import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

type Modo = 'palabras' | 'paginas';

interface Resultado {
  ppm: number;
  clasificacion: string;
  minutosLibro: number;
  horasLibro: number;
  minRestantes: number;
}

function clasificarPPM(ppm: number): string {
  if (ppm < 150) return 'Lento';
  if (ppm < 250) return 'Promedio';
  if (ppm < 400) return 'Rápido';
  return 'Muy rápido';
}

const PALABRAS_POR_PAGINA = 250;

export default function VelocidadLecturaTool() {
  const [modo, setModo] = useState<Modo>('palabras');
  const [cantidad, setCantidad] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [libro, setLibro] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    const c = parseFloat(cantidad.replace(',', '.'));
    const t = parseFloat(tiempo.replace(',', '.'));
    const lib = parseFloat(libro.replace(',', '.'));

    if (isNaN(c) || c <= 0) {
      setError(modo === 'palabras' ? 'Introduce el número de palabras leídas.' : 'Introduce el número de páginas leídas.');
      return;
    }
    if (isNaN(t) || t <= 0) { setError('Introduce el tiempo empleado en minutos.'); return; }
    if (isNaN(lib) || lib <= 0) { setError('Introduce la longitud del libro.'); return; }

    const palabrasLeidas = modo === 'palabras' ? c : c * PALABRAS_POR_PAGINA;
    const palabrasLibro = modo === 'palabras' ? lib : lib * PALABRAS_POR_PAGINA;

    const ppm = palabrasLeidas / t;
    const minutosLibro = palabrasLibro / ppm;
    const horasLibro = Math.floor(minutosLibro / 60);
    const minRestantes = Math.round(minutosLibro % 60);

    setResultado({
      ppm,
      clasificacion: clasificarPPM(ppm),
      minutosLibro,
      horasLibro,
      minRestantes,
    });
  }

  const labelCantidad = modo === 'palabras' ? 'Palabras leídas' : 'Páginas leídas';
  const labelLibro = modo === 'palabras' ? 'Palabras del libro a leer' : 'Páginas del libro a leer';
  const placeholderCantidad = modo === 'palabras' ? 'Ej. 500' : 'Ej. 2';
  const placeholderLibro = modo === 'palabras' ? 'Ej. 90000' : 'Ej. 360';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex gap-2">
        {(['palabras', 'paginas'] as Modo[]).map((m) => (
          <button
            key={m}
            onClick={() => { setModo(m); setResultado(null); setCantidad(''); setLibro(''); }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              modo === m
                ? 'bg-[var(--color-accent)] text-white'
                : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-bg)]'
            }`}
          >
            {m === 'palabras' ? 'Por palabras' : 'Por páginas'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{labelCantidad}</label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder={placeholderCantidad}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Tiempo empleado (minutos)
          </label>
          <input
            type="number"
            min="1"
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            placeholder="Ej. 10"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">{labelLibro}</label>
          <input
            type="number"
            min="1"
            value={libro}
            onChange={(e) => setLibro(e.target.value)}
            placeholder={placeholderLibro}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          {modo === 'paginas' && (
            <p className="text-xs text-[var(--color-text-muted)]">
              Se estiman {PALABRAS_POR_PAGINA} palabras por página.
            </p>
          )}
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular velocidad
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.ppm, 0)} ppm
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Palabras por minuto</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[var(--color-accent)]">
                {resultado.clasificacion}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Clasificación</p>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-3 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">Tiempo estimado para leer el libro</p>
            <p className="text-2xl font-extrabold text-[var(--color-text)] mt-1">
              {resultado.horasLibro > 0
                ? `${resultado.horasLibro} h ${resultado.minRestantes} min`
                : `${resultado.minRestantes} min`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
