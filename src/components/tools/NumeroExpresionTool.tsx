import { useState } from 'react';

const TABLA: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,
  n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
};

function reducirNumero(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return n;
}

const SIGNIFICADOS: Record<number, string> = {
  1:  'Expresas liderazgo, independencia y determinación.',
  2:  'Expresas cooperación, diplomacia y sensibilidad.',
  3:  'Expresas creatividad, optimismo y comunicación.',
  4:  'Expresas orden, trabajo duro y responsabilidad.',
  5:  'Expresas libertad, adaptabilidad y curiosidad.',
  6:  'Expresas amor, cuidado y armonía.',
  7:  'Expresas análisis, espiritualidad y perfeccionismo.',
  8:  'Expresas ambición, poder y pragmatismo.',
  9:  'Expresas compasión, generosidad y sabiduría.',
  11: 'Expresas inspiración e intuición elevada (Número Maestro).',
  22: 'Expresas capacidad de construcción a gran escala (Número Maestro).',
  33: 'Expresas amor incondicional y servicio (Número Maestro).',
};

export default function NumeroExpresionTool() {
  const [nombre, setNombre] = useState('');
  const [result, setResult] = useState<{ numero: number; suma: number } | null>(null);
  const [error, setError] = useState('');

  function calcular() {
    try {
      setError('');
      if (!nombre.trim()) throw new Error('Introduce tu nombre completo.');
      const letras = nombre.toLowerCase().replace(/[^a-z]/g, '');
      if (letras.length === 0) throw new Error('Introduce solo letras del alfabeto latino.');
      const suma = letras.split('').reduce((acc, l) => acc + (TABLA[l] ?? 0), 0);
      setResult({ numero: reducirNumero(suma), suma });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al calcular.');
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <p className="text-xs text-[var(--color-text-secondary)]">El número de expresión se calcula asignando un valor numérico a cada letra de tu nombre completo (Pitagórico).</p>
      <div className="space-y-1">
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">Nombre completo</label>
        <input type="text" value={nombre} onChange={(e) => { setNombre(e.target.value); setResult(null); }} placeholder="Ej. Juan García López" className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" />
      </div>
      <button onClick={calcular} className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]">Calcular</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result !== null && (
        <div className="rounded-xl bg-[var(--color-calcs-bg)] p-4 space-y-2">
          <p className="text-xs text-[var(--color-text-secondary)]">Número de expresión</p>
          <p className="text-4xl font-extrabold text-[var(--color-text)]">{result.numero}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{SIGNIFICADOS[result.numero] ?? ''}</p>
        </div>
      )}
    </div>
  );
}
