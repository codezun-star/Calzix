import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, 'src/pages');

// Respuestas expandidas por patrones de pregunta
const expandedAnswers = {
  '¿Cómo se calcula': `El proceso de cálculo sigue una metodología precisa que garantiza resultados exactos en cada ocasión. Cada paso se ejecuta en orden lógico, considerando todas las variables relevantes para obtener un resultado preciso. La fórmula exacta depende del contexto específico, pero generalmente incluye operaciones matemáticas fundamentales combinadas de manera estratégica. Es fundamental comprender cada etapa del proceso para poder verificar los resultados manualmente cuando lo necesites. Nuestra calculadora automatiza completamente este proceso, eliminando cualquier posibilidad de errores humanos mientras ahorra tiempo valioso. Los cálculos se realizan instantáneamente utilizando algoritmos optimizados que garantizan exactitud matemática total. Puedes usar los resultados con total confianza en contextos financieros, académicos, profesionales o personales. La precisión es una característica fundamental de nuestra herramienta, diseñada especialmente para usuarios que requieren resultados fiables.`,

  '¿Por qué': `La metodología aplicada se basa en principios establecidos a nivel internacional y normativas específicas del contexto hispanohablante. Entender el razonamiento detrás de cada regla es absolutamente fundamental para aplicarla correctamente en diferentes situaciones y contextos. La razón de ser de este procedimiento es maximizar la equidad, claridad y consistencia en todos los cálculos realizados. Aunque puede parecer complejo al principio, una vez comprendes la lógica subyacente, resulta mucho más fácil aplicarlo en casos similares y variaciones. Nuestra herramienta facilita este aprendizaje proporcionar resultados instantáneos que puedes correlacionar directamente con el proceso explicado. Esto crea una experiencia educativa donde cada cálculo refuerza tu comprensión del concepto subyacente. La transparencia en el proceso es uno de nuestros valores fundamentales.`,

  '¿Puedo': `La flexibilidad de esta calculadora está diseñada específicamente para casos de uso comunes y frecuentes, pero siempre tienes la opción de adaptar los pasos según tus necesidades específicas. Si requieres cálculos más complejos, una estrategia efectiva y ampliamente utilizada es dividir el problema en pasos más pequeños y manageable. Usar la calculadora múltiples veces para abordar diferentes componentes de un problema es una aproximación que muchos usuarios encuentran muy efectiva. Esto es especialmente útil cuando tienes variables interrelacionadas que necesitan calcularse de forma secuencial y ordenada. Muchos usuarios descubren que este enfoque modular es incluso más educativo que un cálculo único, porque permite entender cada componente por separado. La descomposición de problemas complejos es una habilidad valiosa que puedes desarrollar usando nuestra herramienta de forma creativa.`,

  '¿Cuánto': `Para entender mejor las diferencias relativas y porcentuales, considera usar la calculadora con múltiples ejemplos y diferentes montos base para observar patrones. Observarás patrones matemáticos interesantes que demuestran cómo los porcentajes funcionan de manera no lineal y compleja. Esta comprensión es increíblemente valiosa no solo para cálculos matemáticos puros, sino también para decisiones cotidianas de consumo y finanzas personales. Experiencia con varios escenarios te permitirá desarrollar intuición numérica que es útil en muchas áreas profesionales y personales. La herramienta está diseñada específicamente para permitir este tipo de exploración sin ningún límite de cálculos realizados. Experimenta libremente con diferentes valores para descubrir relaciones numéricas que te ayuden a comprender mejor el tema.`,

  '¿Para qué sirve': `En contextos empresariales, esta opción es especialmente valiosa porque permite presentar presupuestos y facturas con total transparencia sobre el coste final para el cliente. Los clientes aprecian profundamente poder ver exactamente cuánto pagarán incluyendo todos los impuestos desde el principio de la transacción. Para emprendedores y profesionales independientes, esta claridad genera confianza y credibilidad, reduciendo significativamente disputas posteriores sobre precios. En contextos educativos, entender cómo se aplica esta opción refuerza el conocimiento sobre sistemas tributarios y estructura de precios. La herramienta simplifica un proceso que de otro modo requeriría cálculos manuales complejos y repetitivos altamente propensos a errores. La transparencia en los precios es cada vez más importante en el comercio moderno y digital.`,

  '¿Hay diferencia': `Aunque matemáticamente son completamente equivalentes en términos numéricos, conceptualmente hay una diferencia importante en cómo expresamos y comunicamos estas ideas. Un "descuento del 50%" enfatiza psicológicamente que estás recibiendo una reducción del precio original. "Pagar la mitad" es una forma más directa y simple de expresar exactamente lo mismo desde una perspectiva de costo final. En marketing y comunicación, estas diferencias psicológicas importan significativamente y afectan cómo los consumidores perciben las ofertas. Los descuentos psicológicamente parecen más atractivos que simplemente bajar el precio, aunque el resultado financiero sea idéntico. Para propósitos matemáticos y de cálculo puro, son idénticos, como podrás verificar fácilmente usando nuestra calculadora. Esta equivalencia es un ejemplo útil de cómo diferentes formas de expresar números pueden causar confusión innecesaria, por eso herramientas como esta son tan valiosas para educación.`,

  '¿Qué es': `Se trata de un concepto fundamental que aparece en muchos contextos diferentes incluyendo matemáticas, finanzas, educación y la vida cotidiana. Comprender esta definición es absolutamente esencial para trabajar con nuestra herramienta de forma efectiva y segura. El concepto tiene raíces históricas y ha evolucionado a lo largo del tiempo según el contexto y la aplicación. En la actualidad, se aplica universalmente en contextos profesionales, académicos y personales alrededor del mundo. Diferentes campos pueden tener definiciones ligeramente variadas, pero los principios fundamentales permanecen consistentes. Nuestra herramienta está diseñada para trabajar con la definición más ampliamente aceptada y utilizada. Aprender bien este concepto abre puertas a entender muchos otros temas relacionados y más complejos.`,

  'general': `Esta es una pregunta fundamental que muchos usuarios se hacen al utilizar herramientas de cálculo. La respuesta depende del contexto específico, tus objetivos personales, y cómo planeas usar esta información. En general, la mayoría de usuarios encuentran esta herramienta increíblemente útil para una amplia gama de aplicaciones prácticas. Desde contextos académicos hasta situaciones financieras reales, hay numerosos casos de uso donde esta información es valiosa. La clave es entender cómo aplicar correctamente los resultados a tu situación específica. Nuestra herramienta proporciona la base matemática sólida que necesitas para tomar decisiones informadas. Experimenta con diferentes escenarios para descubrir todas las formas creativas en que puedes utilizar esta herramienta en tu vida.`
};

const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro') && !['index', 'privacidad', 'terminos', 'cookies', 'aviso', 'contacto'].some(x => f.includes(x)));

console.log(`Expandiendo FAQs en ${files.length} archivos...\n`);

let expanded = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Buscar y reemplazar respuestas cortas con expandidas
  for (const [pattern, fullAnswer] of Object.entries(expandedAnswers)) {
    if (pattern === 'general') continue;

    // Buscar respuestas que contengan el patrón y que sean cortas (menos de 400 caracteres)
    const answerRegex = new RegExp(`a: '([^']{20,399}${pattern}[^']*)(?:,|'})`, 'g');

    content = content.replace(answerRegex, (match, oldAnswer) => {
      // Si la respuesta ya es larga, no la expandas
      if (oldAnswer.length > 400) return match;

      return `a: '${fullAnswer}',`;
    });
  }

  // Manejo de respuestas muy cortas sin patrón específico
  if (content !== originalContent) {
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
