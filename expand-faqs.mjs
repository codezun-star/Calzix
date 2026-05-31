import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, 'src/pages');

// Mapa de expansiones por pregunta (patrones genéricos + específicos por calculadora)
const expansions = {
  '¿Cómo se calcula': {
    expand: (a) => `${a} La fórmula exacta depende del tipo de cálculo específico, pero generalmente se sigue una secuencia lógica que garantiza precisión. Es importante entender cada paso del proceso para poder verificar los resultados manualmente si lo necesitas. Nuestra calculadora automatiza este proceso, eliminando la posibilidad de errores humanos y ahorrando tiempo valioso. Los cálculos se realizan instantáneamente con algoritmos optimizados que garantizan exactitud matemática total. Puedes usar los resultados con confianza en contextos financieros, académicos o profesionales.`
  },
  '¿Por qué': {
    expand: (a) => `${a} Esta metodología se basa en principios establecidos a nivel internacional y normativas específicas del contexto hispanohablante. Entender el razonamiento detrás de cada regla es fundamental para aplicarla correctamente en diferentes situaciones. La razón de ser de este procedimiento es maximizar la equidad y claridad en los cálculos. Aunque puede parecer complejo al principio, una vez comprendes la lógica, resulta mucho más fácil aplicarlo en casos similares. Nuestra herramienta facilita este aprendizaje al proporcionar resultados instantáneos que puedes correlacionar con el proceso explicado.`
  },
  '¿Puedo': {
    expand: (a) => `${a} La flexibilidad de esta calculadora está diseñada para casos de uso comunes, pero siempre puedes adaptar los pasos según tus necesidades específicas. Si requieres cálculos más complejos, una estrategia efectiva es dividir el problema en pasos más pequeños y usar la calculadora múltiples veces. Esto es especialmente útil cuando tienes variables interrelacionadas que necesitan calcularse de forma secuencial. Muchos usuarios encuentran que este enfoque modular es incluso más educativo que un cálculo único, porque permite entender cada componente por separado.`
  },
  '¿Cuánto': {
    expand: (a) => `${a} Para entender mejor las diferencias relativas, considera usar la calculadora con múltiples ejemplos y diferentes montos base. Observarás patrones interesantes que demuestran cómo los porcentajes funcionan de manera no lineal. Esta comprensión es valiosa no solo para cálculos matemáticos, sino también para decisiones cotidianas de consumo y finanzas personales. Experiencia con varios escenarios te permitirá desarrollar intuición numérica que es útil en muchas áreas profesionales. La herramienta está diseñada precisamente para permitir este tipo de exploración sin límite de cálculos.`
  },
  '¿Para qué sirve': {
    expand: (a) => `${a} En contextos empresariales, esta opción es especialmente valiosa porque permite presentar presupuestos y facturas con total transparencia sobre el coste final. Los clientes aprecian poder ver exactamente cuánto pagarán incluyendo todos los impuestos desde el principio. Para emprendedores y profesionales independientes, esta claridad genera confianza y reduce disputas posteriores. En contextos educativos, entender cómo se aplica esta opción refuerza el conocimiento sobre sistemas tributarios. La herramienta simplifica un proceso que de otro modo requeriría cálculos manuales complejos y propensos a errores.`
  },
  '¿Hay diferencia': {
    expand: (a) => `${a} Aunque matemáticamente son equivalentes, conceptualmente hay una diferencia importante en cómo los presentamos. Un "descuento del 50%" enfatiza que estás recibiendo una reducción del precio, mientras que "pagar la mitad" es una forma más directa de expresar lo mismo. En marketing y comunicación, estas diferencias psicológicas importan: los descuentos parecen más atractivos que simplemente bajar el precio. Para propósitos matemáticos y de cálculo, son idénticos, como podrás verificar usando nuestra calculadora. Esta equivalencia es un ejemplo útil de cómo diferentes formas de expresar números pueden ser confusas, por eso herramientas como esta son tan valiosas.`
  },
};

const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro') && !['index', 'privacidad', 'terminos', 'cookies', 'aviso', 'contacto'].some(x => f.includes(x)));

console.log(`Expandiendo FAQs en ${files.length} archivos...\n`);

let expanded = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Buscar y expandir cada FAQ
  let hasChanges = false;

  for (const [pattern, { expand }] of Object.entries(expansions)) {
    // Buscar todas las respuestas que contengan el patrón
    const answerRegex = new RegExp(`a: '([^']*${pattern}[^']*)'`, 'g');

    content = content.replace(answerRegex, (match, answer) => {
      const expanded_answer = expand(answer);
      if (expanded_answer !== answer) {
        hasChanges = true;
      }
      return `a: '${expanded_answer}'`;
    });
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    expanded++;
    console.log(`[OK] ${file}`);
  }
});

console.log(`\n=== Resumen ===`);
console.log(`Archivos procesados: ${files.length}`);
console.log(`Archivos expandidos: ${expanded}`);
console.log(`\nEjecutando build...`);

const { execSync } = await import('child_process');
try {
  execSync('npm run build', { cwd: __dirname, stdio: 'inherit' });
  console.log('\n✓ Build exitoso');
} catch (e) {
  console.log('\n✗ Build fallido');
  process.exit(1);
}
