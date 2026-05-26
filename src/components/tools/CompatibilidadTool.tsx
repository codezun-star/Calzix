import { useState } from 'react';

interface Resultado {
  porcentaje: number;
  categoria: string;
  mensaje: string;
}

function calcularCompatibilidad(nombre1: string, nombre2: string): Resultado {
  const combinado = (nombre1 + nombre2).toLowerCase();
  let suma = 0;
  for (const c of combinado) {
    suma += c.charCodeAt(0);
  }
  const porcentaje = suma % 101;

  let categoria: string;
  let mensaje: string;

  if (porcentaje <= 20) {
    categoria = 'Conexión débil';
    mensaje = 'Quizás os une otra cosa que los algoritmos no pueden ver. El destino tiene sus propios planes.';
  } else if (porcentaje <= 40) {
    categoria = 'Amigos con potencial';
    mensaje = 'Hay algo ahí. Con tiempo y paciencia, quién sabe lo que puede surgir.';
  } else if (porcentaje <= 60) {
    categoria = 'Buena química';
    mensaje = 'Hay una chispa interesante entre vosotros. Vale la pena explorarla.';
  } else if (porcentaje <= 80) {
    categoria = 'Gran compatibilidad';
    mensaje = 'Los astros (y el algoritmo) están de vuestro lado. Tenéis mucho en común.';
  } else {
    categoria = 'Almas gemelas';
    mensaje = 'El universo parece haber conspirado para juntaros. Extraordinario.';
  }

  return { porcentaje, categoria, mensaje };
}

export default function CompatibilidadTool() {
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    const n1 = nombre1.trim();
    const n2 = nombre2.trim();
    if (!n1 || !n2) {
      setError('Introduce los dos nombres para calcular la compatibilidad.');
      return;
    }
    if (n1.length < 2 || n2.length < 2) {
      setError('Cada nombre debe tener al menos 2 caracteres.');
      return;
    }
    setResultado(calcularCompatibilidad(n1, n2));
  }

  const labelClass = 'text-xs font-medium text-[var(--color-text-secondary)]';
  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Nombre 1</label>
          <input
            type="text"
            placeholder="Ej: María"
            value={nombre1}
            onChange={(e) => setNombre1(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && calcular()}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Nombre 2</label>
          <input
            type="text"
            placeholder="Ej: Carlos"
            value={nombre2}
            onChange={(e) => setNombre2(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && calcular()}
            className={inputClass}
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular compatibilidad
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado !== null && (
        <div className="space-y-3">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-6 text-center space-y-2">
            <p className="text-sm text-[var(--color-text-secondary)]">
              {nombre1.trim()} &amp; {nombre2.trim()}
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-extrabold text-[var(--color-accent)]">
                {resultado.porcentaje}%
              </span>
            </div>
            <p className="text-lg font-bold text-[var(--color-text)]">{resultado.categoria}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{resultado.mensaje}</p>
          </div>

          <p className="text-xs text-center text-[var(--color-text-muted)] px-2">
            Solo para diversión. El amor verdadero no se calcula con algoritmos.
          </p>
        </div>
      )}
    </div>
  );
}
