import { useState } from 'react';

type Modo = 'despertar' | 'acostar';

interface OpcionSueno {
  hora: string;
  ciclos: number;
  horas: number;
  etiqueta: string;
}

const CICLO_MINUTOS = 90;
const MINUTOS_DORMIRSE = 15;

const ETIQUETAS: Record<number, string> = {
  6: 'Ideal',
  5: 'Recomendado',
  4: 'Mínimo',
  3: 'Emergencia',
  2: 'Muy corto',
};

function minutosAHora(minutos: number): string {
  const totalMin = ((minutos % 1440) + 1440) % 1440;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function horaAMinutos(hora: string): number {
  const partes = hora.split(':');
  return parseInt(partes[0], 10) * 60 + parseInt(partes[1], 10);
}

function calcularDesdeDespiertar(horaDespertar: string): OpcionSueno[] {
  const minDespertar = horaAMinutos(horaDespertar);
  return [6, 5, 4, 3].map((ciclos) => {
    const minutosTotal = ciclos * CICLO_MINUTOS + MINUTOS_DORMIRSE;
    const minAcostar = minDespertar - minutosTotal;
    const horas = (ciclos * CICLO_MINUTOS) / 60;
    return {
      hora: minutosAHora(minAcostar),
      ciclos,
      horas,
      etiqueta: ETIQUETAS[ciclos] ?? '',
    };
  });
}

function calcularDesdeAcostar(horaAcostar: string): OpcionSueno[] {
  const minAcostar = horaAMinutos(horaAcostar);
  return [6, 5, 4, 3].map((ciclos) => {
    const minutosTotal = MINUTOS_DORMIRSE + ciclos * CICLO_MINUTOS;
    const minDespertar = minAcostar + minutosTotal;
    const horas = (ciclos * CICLO_MINUTOS) / 60;
    return {
      hora: minutosAHora(minDespertar),
      ciclos,
      horas,
      etiqueta: ETIQUETAS[ciclos] ?? '',
    };
  });
}

const ETIQUETA_COLOR: Record<string, string> = {
  Ideal: 'bg-green-100 text-green-800',
  Recomendado: 'bg-[var(--color-accent-bg)] text-[var(--color-accent)]',
  Mínimo: 'bg-yellow-100 text-yellow-800',
  Emergencia: 'bg-orange-100 text-orange-800',
  'Muy corto': 'bg-red-100 text-red-800',
};

export default function SuenoTool() {
  const [modo, setModo] = useState<Modo>('despertar');
  const [hora, setHora] = useState('07:00');
  const [opciones, setOpciones] = useState<OpcionSueno[] | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    setError('');
    if (!hora) {
      setError('Introduce una hora válida.');
      return;
    }
    if (modo === 'despertar') {
      setOpciones(calcularDesdeDespiertar(hora));
    } else {
      setOpciones(calcularDesdeAcostar(hora));
    }
  }

  const labelClass = 'text-xs font-medium text-[var(--color-text-secondary)]';
  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex rounded-xl border border-[var(--color-border)] overflow-hidden">
        {(['despertar', 'acostar'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setModo(m); setOpciones(null); }}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              modo === m
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-calcs-bg)]'
            }`}
          >
            {m === 'despertar' ? 'Me despierto a las...' : 'Me acuesto a las...'}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className={labelClass}>
          {modo === 'despertar' ? 'Hora de despertar' : 'Hora de acostarse'}
        </label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className={inputClass}
        />
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        {modo === 'despertar' ? 'Calcular hora de acostarse' : 'Calcular hora de despertar'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {opciones !== null && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
            {modo === 'despertar'
              ? 'Acuéstate a esta hora para despertar descansado'
              : 'Hora ideal para despertarte'}
          </p>
          {opciones.map((op) => (
            <div
              key={op.ciclos}
              className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-4 py-3"
            >
              <div>
                <span className="text-2xl font-extrabold text-[var(--color-text)]">{op.hora}</span>
                <span className="ml-2 text-sm text-[var(--color-text-secondary)]">
                  {op.horas}h · {op.ciclos} ciclos
                </span>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  ETIQUETA_COLOR[op.etiqueta] ?? ''
                }`}
              >
                {op.etiqueta}
              </span>
            </div>
          ))}
          <p className="text-xs text-[var(--color-text-muted)] pt-1">
            Calculado con ciclos de 90 min y 15 min para quedarse dormido.
          </p>
        </div>
      )}
    </div>
  );
}
