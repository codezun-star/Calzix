import { useState, useEffect } from 'react';

type ZoneKey =
  | 'UTC-12' | 'UTC-11' | 'UTC-10' | 'UTC-8' | 'UTC-7' | 'UTC-6'
  | 'UTC-5' | 'UTC-4' | 'UTC-3' | 'UTC-2' | 'UTC-1' | 'UTC+0'
  | 'UTC+1' | 'UTC+2' | 'UTC+3' | 'UTC+4' | 'UTC+5' | 'UTC+5:30'
  | 'UTC+6' | 'UTC+7' | 'UTC+8' | 'UTC+9' | 'UTC+10' | 'UTC+12';

const ZONES: Record<ZoneKey, { label: string; offset: number }> = {
  'UTC-12':   { label: 'UTC-12 (Línea de fecha)',       offset: -12 },
  'UTC-11':   { label: 'UTC-11 (Samoa)',                offset: -11 },
  'UTC-10':   { label: 'UTC-10 (Hawaii)',               offset: -10 },
  'UTC-8':    { label: 'UTC-8 (Los Ángeles)',           offset: -8  },
  'UTC-7':    { label: 'UTC-7 (Denver)',                offset: -7  },
  'UTC-6':    { label: 'UTC-6 (Chicago/México)',        offset: -6  },
  'UTC-5':    { label: 'UTC-5 (Nueva York/Bogotá)',     offset: -5  },
  'UTC-4':    { label: 'UTC-4 (Caracas)',               offset: -4  },
  'UTC-3':    { label: 'UTC-3 (Buenos Aires/São Paulo)',offset: -3  },
  'UTC-2':    { label: 'UTC-2',                         offset: -2  },
  'UTC-1':    { label: 'UTC-1 (Azores)',                offset: -1  },
  'UTC+0':    { label: 'UTC+0 (Londres/Lisboa)',        offset: 0   },
  'UTC+1':    { label: 'UTC+1 (Madrid/París)',          offset: 1   },
  'UTC+2':    { label: 'UTC+2 (Atenas/Cairo)',          offset: 2   },
  'UTC+3':    { label: 'UTC+3 (Moscú/Nairobi)',         offset: 3   },
  'UTC+4':    { label: 'UTC+4 (Dubái)',                 offset: 4   },
  'UTC+5':    { label: 'UTC+5 (Karachi)',               offset: 5   },
  'UTC+5:30': { label: 'UTC+5:30 (Nueva Delhi)',        offset: 5.5 },
  'UTC+6':    { label: 'UTC+6 (Dhaka)',                 offset: 6   },
  'UTC+7':    { label: 'UTC+7 (Bangkok)',               offset: 7   },
  'UTC+8':    { label: 'UTC+8 (Pekín/Singapur)',        offset: 8   },
  'UTC+9':    { label: 'UTC+9 (Tokio/Seúl)',            offset: 9   },
  'UTC+10':   { label: 'UTC+10 (Sídney)',               offset: 10  },
  'UTC+12':   { label: 'UTC+12 (Auckland)',             offset: 12  },
};

const ZONE_KEYS = Object.keys(ZONES) as ZoneKey[];

interface Resultado {
  horaDestino: string;
  diferencia: number;
  diaSiguiente: boolean;
  diaAnterior: boolean;
}

function calcularResultado(horaLocal: string, origen: ZoneKey, destino: ZoneKey): Resultado | null {
  if (!horaLocal) return null;
  const [hStr, mStr] = horaLocal.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isNaN(h) || isNaN(m)) return null;

  const totalMinLocal = h * 60 + m;
  const diferencia = ZONES[destino].offset - ZONES[origen].offset;
  const totalMinDestino = totalMinLocal + diferencia * 60;

  const minutosDelDia = 24 * 60;
  let minFinal = totalMinDestino % minutosDelDia;
  if (minFinal < 0) minFinal += minutosDelDia;

  const hDest = Math.floor(minFinal / 60);
  const mDest = Math.floor(minFinal % 60);
  const horaDestino = `${String(hDest).padStart(2, '0')}:${String(mDest).padStart(2, '0')}`;

  return {
    horaDestino,
    diferencia,
    diaSiguiente: totalMinDestino >= minutosDelDia,
    diaAnterior: totalMinDestino < 0,
  };
}

export default function DiferenciaHorariaTool() {
  const [horaLocal, setHoraLocal] = useState('12:00');
  const [origen, setOrigen] = useState<ZoneKey>('UTC+1');
  const [destino, setDestino] = useState<ZoneKey>('UTC-5');
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    setResultado(calcularResultado(horaLocal, origen, destino));
  }, [horaLocal, origen, destino]);

  const selectClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  const difStr =
    resultado
      ? resultado.diferencia === 0
        ? 'Sin diferencia'
        : resultado.diferencia > 0
        ? `+${resultado.diferencia}h`
        : `${resultado.diferencia}h`
      : null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          Hora local
        </label>
        <input
          type="time"
          value={horaLocal}
          onChange={(e) => setHoraLocal(e.target.value)}
          className={selectClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Zona horaria origen
          </label>
          <select
            value={origen}
            onChange={(e) => setOrigen(e.target.value as ZoneKey)}
            className={selectClass}
          >
            {ZONE_KEYS.map((k) => (
              <option key={k} value={k}>{ZONES[k].label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">
            Zona horaria destino
          </label>
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value as ZoneKey)}
            className={selectClass}
          >
            {ZONE_KEYS.map((k) => (
              <option key={k} value={k}>{ZONES[k].label}</option>
            ))}
          </select>
        </div>
      </div>

      {resultado && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Hora local ({origen})</p>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{horaLocal}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Hora en destino ({destino})</p>
              <p className="text-2xl font-extrabold text-[var(--color-accent)]">
                {resultado.horaDestino}
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Diferencia horaria</p>
              <p className="text-xl font-extrabold text-[var(--color-text)]">{difStr}</p>
            </div>
            {(resultado.diaSiguiente || resultado.diaAnterior) && (
              <span className="rounded-full bg-[var(--color-accent-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                {resultado.diaSiguiente ? 'Dia siguiente' : 'Dia anterior'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
