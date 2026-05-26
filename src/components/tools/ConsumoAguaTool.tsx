import { useState } from 'react';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

interface Actividad {
  label: string;
  key: string;
  unidad: string;
  placeholder: string;
  factorDiario: number; // L/día calculados internamente
}

interface Valores {
  duchaMins: number;
  baneras: number;
  lavadoras: number;
  lavavajillas: number;
  inodoro: number;
  riegoMins: number;
  personas: number;
  precioM3: number;
}

interface DetalleActividad {
  label: string;
  litrosDia: number;
}

interface Resultado {
  totalLDia: number;
  totalLMes: number;
  costeMes: number;
  desglose: DetalleActividad[];
}

export default function ConsumoAguaTool() {
  const [valores, setValores] = useState<Valores>({
    duchaMins: 8,
    baneras: 0,
    lavadoras: 3,
    lavavajillas: 1,
    inodoro: 6,
    riegoMins: 0,
    personas: 2,
    precioM3: 2.5,
  });
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  function set(key: keyof Valores, val: string) {
    const n = parseFloat(val);
    setValores((prev) => ({ ...prev, [key]: isNaN(n) ? 0 : n }));
  }

  function calcular() {
    setError('');
    try {
      const {
        duchaMins,
        baneras,
        lavadoras,
        lavavajillas,
        inodoro,
        riegoMins,
        personas,
        precioM3,
      } = valores;

      if (personas <= 0) throw new Error('El número de personas debe ser mayor que 0.');
      if (precioM3 <= 0) throw new Error('El precio del agua debe ser mayor que 0.');

      // Litros por persona por día
      const duchaLD = duchaMins * 10;
      const baneraLD = (baneras / 7) * 150;
      const lavadoraLD = (lavadoras / 7) * 60;
      const lavavajillasLD = lavavajillas * 12;
      const inodorLD = inodoro * 9;
      const riegoLD = riegoMins * 15;

      const desglose: DetalleActividad[] = [
        { label: 'Ducha', litrosDia: duchaLD * personas },
        { label: 'Baño en bañera', litrosDia: baneraLD * personas },
        { label: 'Lavadora', litrosDia: lavadoraLD * personas },
        { label: 'Lavavajillas', litrosDia: lavavajillasLD * personas },
        { label: 'Inodoro', litrosDia: inodorLD * personas },
        { label: 'Riego jardín', litrosDia: riegoLD },
      ];

      const totalLDia = desglose.reduce((acc, d) => acc + d.litrosDia, 0);
      const totalLMes = totalLDia * 30;
      const costeMes = (totalLMes / 1000) * precioM3;

      setResultado({ totalLDia, totalLMes, costeMes, desglose });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  const labelClass = 'text-xs font-medium text-[var(--color-text-secondary)]';
  const inputClass =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Ducha (minutos/día por persona)</label>
          <input
            type="number"
            min="0"
            value={valores.duchaMins}
            onChange={(e) => set('duchaMins', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Baño en bañera (veces/semana por persona)</label>
          <input
            type="number"
            min="0"
            value={valores.baneras}
            onChange={(e) => set('baneras', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Lavadora (cargas/semana)</label>
          <input
            type="number"
            min="0"
            value={valores.lavadoras}
            onChange={(e) => set('lavadoras', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Lavavajillas (usos/día)</label>
          <input
            type="number"
            min="0"
            value={valores.lavavajillas}
            onChange={(e) => set('lavavajillas', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Inodoro (descargas/día por persona)</label>
          <input
            type="number"
            min="0"
            value={valores.inodoro}
            onChange={(e) => set('inodoro', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Riego jardín (minutos/día)</label>
          <input
            type="number"
            min="0"
            value={valores.riegoMins}
            onChange={(e) => set('riegoMins', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Personas en el hogar</label>
          <input
            type="number"
            min="1"
            value={valores.personas}
            onChange={(e) => set('personas', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Precio del agua (€/m³)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={valores.precioM3}
            onChange={(e) => set('precioM3', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Calcular consumo de agua
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultado !== null && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">L/día</p>
              <span className="text-xl font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.totalLDia, 0)}
              </span>
            </div>
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">L/mes</p>
              <span className="text-xl font-extrabold text-[var(--color-text)]">
                {formatNumber(resultado.totalLMes, 0)}
              </span>
            </div>
            <div className="rounded-xl bg-[var(--color-calcs-bg)] p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">Coste/mes</p>
              <span className="text-xl font-extrabold text-[var(--color-text)]">
                {formatCurrency(resultado.costeMes)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] p-4 space-y-2">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              Desglose por actividad (L/día)
            </p>
            {resultado.desglose.map(({ label, litrosDia }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">{label}</span>
                <span className="font-semibold text-[var(--color-text)]">
                  {formatNumber(litrosDia, 1)} L
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
