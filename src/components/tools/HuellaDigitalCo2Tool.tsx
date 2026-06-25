import { useState } from 'react';
import { formatNumber } from '@/lib/utils/format';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

export default function HuellaDigitalCo2Tool() {
  const [streaming, setStreaming] = useState('');
  const [emails, setEmails] = useState('');
  const [busquedas, setBusquedas] = useState('');
  const [result, setResult] = useState<{ anual: number; mensual: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const s = parseFloat(streaming || '0'), e = parseFloat(emails || '0'), b = parseFloat(busquedas || '0');
      if ([s, e, b].some((x) => isNaN(x) || x < 0)) throw new Error('Introduce valores positivos.');
      // Factores aprox.: streaming 0,06 kg/h, email 0,004 kg, búsqueda 0,002 kg
      const diario = s * 0.06 + e * 0.004 + b * 0.002;
      const anual = diario * 365;
      setResult({ anual, mensual: anual / 12 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">Estima la huella de carbono de tu actividad digital diaria. Valores medios orientativos.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Streaming vídeo (h/día)</label>
          <input type="number" value={streaming} onChange={(e) => { setStreaming(e.target.value); setResult(null); }} placeholder="Ej. 3" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Emails enviados/día</label>
          <input type="number" value={emails} onChange={(e) => { setEmails(e.target.value); setResult(null); }} placeholder="Ej. 30" className={INPUT} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-text-secondary)]">Búsquedas web/día</label>
          <input type="number" value={busquedas} onChange={(e) => { setBusquedas(e.target.value); setResult(null); }} placeholder="Ej. 40" className={INPUT} />
        </div>
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular huella digital</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Huella digital anual</p>
          <p className="text-2xl font-extrabold text-[var(--color-text)]">{formatNumber(result.anual, 1)} kg CO₂/año</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Equivale a unos {formatNumber(result.mensual, 2)} kg de CO₂ al mes por tu actividad digital.</p>
        </div>
      )}
    </div>
  );
}
