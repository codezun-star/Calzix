import { useState } from 'react';

const INPUT = 'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]';

const RASGOS: Record<number, string> = {
  1: 'Liderazgo, independencia y determinación. Naciste para abrir caminos.',
  2: 'Sensibilidad, diplomacia y cooperación. Brillas en las relaciones y la armonía.',
  3: 'Creatividad, comunicación y optimismo. Tu don es expresar y alegrar.',
  4: 'Orden, esfuerzo y estabilidad. Eres el pilar fiable que construye con bases sólidas.',
  5: 'Libertad, aventura y versatilidad. Necesitas movimiento y cambio para sentirte vivo.',
  6: 'Responsabilidad, amor y cuidado. El hogar y los demás ocupan tu corazón.',
  7: 'Análisis, introspección y espiritualidad. Buscas el sentido profundo de las cosas.',
  8: 'Ambición, poder y abundancia. Tienes talento para los negocios y los logros materiales.',
  9: 'Compasión, idealismo y generosidad. Vives para ayudar y dejar el mundo mejor.',
  11: 'Número maestro: intuición elevada e inspiración. Un visionario con gran sensibilidad.',
  22: 'Número maestro: el gran constructor. Capacidad de convertir grandes sueños en realidad.',
};

function reducir(n: number): number {
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split('').reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

export default function NumeroDiaNacimientoTool() {
  const [dia, setDia] = useState('');
  const [result, setResult] = useState<{ num: number; rasgo: string } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      const d = parseInt(dia, 10);
      if (isNaN(d) || d < 1 || d > 31) throw new Error('Introduce el día del mes en que naciste (1-31).');
      const num = reducir(d);
      setResult({ num, rasgo: RASGOS[num] ?? '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El número del día de nacimiento revela un rasgo central de tu personalidad según la numerología.</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Día del mes en que naciste</label>
        <input type="number" min="1" max="31" value={dia} onChange={(e) => { setDia(e.target.value); setResult(null); }} placeholder="Ej. 23" className={INPUT} />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-1">
          <p className="text-xs text-[var(--color-text-secondary)]">Tu número del día de nacimiento</p>
          <p className="text-4xl font-extrabold text-[var(--color-text)]">{result.num}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{result.rasgo}</p>
        </div>
      )}
    </div>
  );
}
