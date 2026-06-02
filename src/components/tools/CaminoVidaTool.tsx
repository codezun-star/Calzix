import { useState } from 'react';

function reducirNumero(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return n;
}

const SIGNIFICADOS: Record<number, string> = {
  1:  'Líder nato, independiente y pionero. Vas por tu propio camino.',
  2:  'Diplomático y cooperativo. Tu fortaleza está en las relaciones.',
  3:  'Creativo y comunicativo. Tienes el don de la expresión.',
  4:  'Trabajador y disciplinado. Construyes estructuras sólidas.',
  5:  'Aventurero y libre. Necesitas variedad y movimiento.',
  6:  'Responsable y protector. Tu vocación es cuidar a los demás.',
  7:  'Analítico y espiritual. Buscas la verdad y el conocimiento.',
  8:  'Ambicioso y materialista. Tienes capacidad para el éxito.',
  9:  'Humanista y altruista. Tu misión es servir al mundo.',
  11: 'Maestro espiritual. Intuición y sensibilidad elevadas (Número Maestro).',
  22: 'Constructor maestro. Puedes materializar grandes visiones (Número Maestro).',
  33: 'Maestro del amor. Compasión y servicio desinteresado (Número Maestro).',
};

export default function CaminoVidaTool() {
  const [fecha, setFecha] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!fecha) throw new Error('Selecciona tu fecha de nacimiento.');
      const [anio, mes, dia] = fecha.split('-').map(Number);
      const suma = reducirNumero(dia) + reducirNumero(mes) + reducirNumero(anio);
      setResult(reducirNumero(suma));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El número de camino de vida se calcula a partir de tu fecha de nacimiento y revela tu propósito vital según la numerología.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Fecha de nacimiento</label>
        <input type="date" value={fecha} onChange={(e) => { setFecha(e.target.value); setResult(null); }} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs text-[var(--color-text-secondary)]">Tu número de camino de vida</p>
          <p className="text-4xl font-extrabold text-[var(--color-text)]">{result}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{SIGNIFICADOS[result] ?? 'Número especial.'}</p>
        </div>
      )}
    </div>
  );
}
