import { useState } from 'react';

const SIGNIFICADOS: Record<number, { nombre: string; descripcion: string }> = {
  1: { nombre: 'El Líder', descripcion: 'Liderazgo e independencia. Eres pionero, ambicioso y tienes una gran capacidad para iniciar proyectos nuevos.' },
  2: { nombre: 'El Diplomático', descripcion: 'Cooperación y diplomacia. Eres empático, sensible y tienes el don de construir puentes entre personas.' },
  3: { nombre: 'El Creativo', descripcion: 'Creatividad y expresión. Eres comunicativo, artístico y traes alegría a quienes te rodean.' },
  4: { nombre: 'El Constructor', descripcion: 'Estabilidad y trabajo duro. Eres disciplinado, práctico y construyes bases sólidas para el futuro.' },
  5: { nombre: 'El Aventurero', descripcion: 'Libertad y aventura. Eres versátil, curioso y buscas constantemente nuevas experiencias.' },
  6: { nombre: 'El Protector', descripcion: 'Amor y responsabilidad. Eres cariñoso, leal y te preocupas profundamente por los demás.' },
  7: { nombre: 'El Sabio', descripcion: 'Espiritualidad y sabiduría. Eres analítico, introspectivo y buscas la verdad más allá de lo evidente.' },
  8: { nombre: 'El Ejecutivo', descripcion: 'Poder y abundancia. Eres ambicioso, determinado y tienes habilidades naturales para los negocios.' },
  9: { nombre: 'El Humanitario', descripcion: 'Humanitarismo y compasión. Eres generoso, idealista y sientes un profundo deseo de hacer el bien.' },
  11: { nombre: 'Número Maestro 11', descripcion: 'Intuición y espiritualidad elevada. Eres extremadamente sensible, intuitivo y tienes un potencial espiritual excepcional.' },
  22: { nombre: 'Número Maestro 22', descripcion: 'El Constructor Maestro. Combinas visión idealista con capacidad práctica para crear cosas que perduran.' },
  33: { nombre: 'Número Maestro 33', descripcion: 'El Maestro Espiritual. Eres un guía compasivo con una misión de elevar la consciencia de quienes te rodean.' },
};

interface Resultado {
  numero: number;
  nombre: string;
  descripcion: string;
}

function sumarDigitos(n: number): number {
  return String(n)
    .split('')
    .reduce((acc, d) => acc + parseInt(d, 10), 0);
}

function calcularCaminoDeVida(fecha: string): Resultado {
  // fecha viene en formato YYYY-MM-DD
  const partes = fecha.split('-');
  const anio = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10);
  const dia = parseInt(partes[2], 10);

  // Sumar todos los dígitos de DD + MM + AAAA
  const digitosDia = sumarDigitos(dia);
  const digitosMes = sumarDigitos(mes);
  const digitosAnio = sumarDigitos(anio);

  let suma = digitosDia + digitosMes + digitosAnio;

  // Reducir a un solo dígito, excepto números maestros 11, 22, 33
  while (suma > 9 && suma !== 11 && suma !== 22 && suma !== 33) {
    suma = sumarDigitos(suma);
  }

  const significado = SIGNIFICADOS[suma] ?? {
    nombre: 'Desconocido',
    descripcion: 'No se encontró significado para este número.',
  };

  return { numero: suma, nombre: significado.nombre, descripcion: significado.descripcion };
}

export default function NumerologiaTool() {
  const [fecha, setFecha] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    if (!fecha) {
      setError('Introduce tu fecha de nacimiento.');
      return;
    }
    try {
      const res = calcularCaminoDeVida(fecha);
      setResultado(res);
    } catch {
      setError('Fecha de nacimiento no válida.');
    }
  }

  const labelClass = 'text-xs font-medium text-[var(--color-text-secondary)]';
  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className={labelClass}>Fecha de nacimiento</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className={inputClass}
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular número de camino de vida
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado !== null && (
        <div className="space-y-3">
          <div className="rounded-xl bg-[var(--color-calcs-bg)] p-6 text-center space-y-2">
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">
              Tu número de camino de vida
            </p>
            <span className="text-5xl font-extrabold text-[var(--color-accent)]">
              {resultado.numero}
            </span>
            <p className="text-lg font-bold text-[var(--color-text)]">{resultado.nombre}</p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {resultado.descripcion}
            </p>
          </div>

          <p className="text-xs text-center text-[var(--color-text-muted)] px-2">
            La numerología es una práctica esotérica. Solo para entretenimiento.
          </p>
        </div>
      )}
    </div>
  );
}
