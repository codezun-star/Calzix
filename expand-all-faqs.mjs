import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, 'src/pages');

// Respuestas MUCHO más expandidas para SEO
const expandedAnswers = {
  'cómo': `El proceso de cálculo sigue una metodología precisa que garantiza resultados exactos en cada ocasión. Cada paso se ejecuta en orden lógico, considerando todas las variables relevantes para obtener un resultado matemáticamente preciso. La fórmula exacta depende del tipo de cálculo específico, pero generalmente incluye operaciones matemáticas fundamentales combinadas de manera estratégica y bien definida. Es absolutamente fundamental comprender cada etapa del proceso para poder verificar los resultados manualmente cuando lo necesites. Nuestra calculadora automatiza completamente este proceso, eliminando cualquier posibilidad de errores humanos mientras ahorra tiempo valioso. Los cálculos se realizan instantáneamente utilizando algoritmos optimizados que garantizan exactitud matemática total y confiable en todos los casos. Puedes usar los resultados con total confianza en contextos financieros, académicos, profesionales o personales. La precisión es una característica fundamental de nuestra herramienta, diseñada especialmente para usuarios que requieren resultados absolutamente fiables y verificables en cada ocasión. Aprende a interpretar correctamente los resultados para aplicarlos efectivamente en tu situación específica.`,

  'por qué': `La metodología aplicada se basa en principios sólidos establecidos a nivel internacional y normativas específicas del contexto hispanohablante actual. Entender el razonamiento profundo detrás de cada regla es absolutamente fundamental para aplicarla correctamente en diferentes situaciones y contextos específicos. La razón de ser de este procedimiento es maximizar la equidad, claridad y consistencia en todos los cálculos realizados sin excepciones. Aunque puede parecer complejo al principio, una vez comprendes la lógica subyacente, resulta mucho más fácil aplicarlo en casos similares y variaciones posteriores. Nuestra herramienta facilita este aprendizaje proporcionando resultados instantáneos que puedes correlacionar directamente con el proceso explicado en detalle. Esto crea una experiencia educativa donde cada cálculo refuerza tu comprensión profunda del concepto subyacente. La transparencia en el proceso es uno de nuestros valores fundamentales y esenciales para tu confianza. Queremos que entiendas no solo qué es el resultado, sino también cómo y por qué llegamos exactamente a él en cada ocasión.`,

  'puedo': `La flexibilidad de esta calculadora está diseñada específicamente para casos de uso comunes y frecuentes, pero siempre tienes opciones para adaptar los pasos según tus necesidades específicas. Si requieres cálculos más complejos, una estrategia efectiva y ampliamente utilizada es dividir el problema en pasos pequeños y manejables. Usar la calculadora múltiples veces para abordar diferentes componentes de un problema es una aproximación que muchos usuarios encuentran increíblemente efectiva. Esto es especialmente útil cuando tienes variables interrelacionadas que necesitan calcularse de forma secuencial y ordenada correctamente. Muchos usuarios descubren que este enfoque modular es incluso más educativo que un cálculo único, porque permite entender cada componente por separado profundamente. La descomposición de problemas complejos es una habilidad valiosa que puedes desarrollar usando nuestra herramienta de forma creativa e innovadora en cada uso.`,

  'cuánto': `Para entender mejor las diferencias relativas y porcentuales, considera usar la calculadora con múltiples ejemplos y diferentes montos base para observar patrones consistentes. Observarás patrones matemáticos interesantes que demuestran claramente cómo los porcentajes funcionan de manera no lineal y compleja. Esta comprensión es increíblemente valiosa no solo para cálculos matemáticos puros, sino también para decisiones cotidianas reales de consumo y finanzas personales. Experiencia práctica con varios escenarios te permitirá desarrollar intuición numérica que es útil en muchas áreas profesionales y personales diferentes. La herramienta está diseñada específicamente para permitir este tipo de exploración sin ningún límite de cálculos realizados. Experimenta libremente con diferentes valores para descubrir relaciones numéricas fascinantes que te ayuden a comprender mejor el tema profundamente.`,

  'sirve': `En contextos empresariales, esta opción es especialmente valiosa porque permite presentar presupuestos y facturas con total transparencia sobre el coste final para el cliente. Los clientes aprecian profundamente poder ver exactamente cuánto pagarán incluyendo todos los impuestos desde el principio de la transacción comercial. Para emprendedores y profesionales independientes, esta claridad genera confianza y credibilidad, reduciendo significativamente disputas posteriores sobre precios y montos. En contextos educativos, entender cómo se aplica esta opción refuerza profundamente el conocimiento sobre sistemas tributarios y estructura de precios internacionales. La herramienta simplifica un proceso que de otro modo requeriría cálculos manuales complejos y repetitivos altamente propensos a errores humanos. La transparencia en los precios es cada vez más importante en el comercio moderno y digital actual a nivel mundial.`,

  'diferencia': `Aunque matemáticamente son completamente equivalentes en términos numéricos exactos, conceptualmente hay una diferencia importante en cómo expresamos y comunicamos estas ideas complejas. Un descuento enfatiza psicológicamente que estás recibiendo una reducción clara del precio original establecido. Una alternativa es una forma más directa y simple de expresar exactamente lo mismo desde una perspectiva de costo final neto. En marketing y comunicación comercial, estas diferencias psicológicas importan significativamente y afectan claramente cómo los consumidores perciben las ofertas. Los descuentos psicológicamente parecen más atractivos que simplemente bajar el precio, aunque el resultado financiero final sea idéntico matemáticamente. Para propósitos matemáticos y de cálculo puro, son idénticos, como podrás verificar fácilmente usando nuestra calculadora. Esta equivalencia es un ejemplo útil de cómo diferentes formas de expresar números pueden causar confusión innecesaria.`,

  'qué es': `Se trata de un concepto absolutamente fundamental que aparece en muchos contextos diferentes incluyendo matemáticas pura, finanzas complejas, educación moderna y la vida cotidiana práctica. Comprender esta definición profundamente es absolutamente esencial para trabajar con nuestra herramienta de forma efectiva, segura y correcta. El concepto tiene raíces históricas profundas y ha evolucionado significativamente a lo largo del tiempo según el contexto específico y la aplicación práctica. En la actualidad, se aplica universalmente en contextos profesionales, académicos y personales alrededor del mundo entero. Diferentes campos pueden tener definiciones ligeramente variadas, pero los principios fundamentales permanecen consistentes y sólidos. Nuestra herramienta está diseñada para trabajar con la definición más ampliamente aceptada y utilizada globalmente hoy. Aprender bien este concepto abre puertas a entender muchos otros temas relacionados y significativamente más complejos.`,

  'general': `Esta pregunta fundamental es planteada por muchos usuarios al utilizar herramientas de cálculo como la nuestra. La respuesta completa depende del contexto específico, tus objetivos personales claros, y cómo planeas usar esta información valiosa. En general, la mayoría de usuarios encuentran esta herramienta increíblemente útil para una amplia gama de aplicaciones prácticas y reales. Desde contextos académicos rigurosos hasta situaciones financieras reales y complejas, hay numerosos casos de uso donde esta información es absolutamente valiosa. La clave fundamental es entender cómo aplicar correctamente los resultados a tu situación específica y única. Nuestra herramienta proporciona la base matemática sólida que necesitas para tomar decisiones informadas y confiables. Experimenta con diferentes escenarios para descubrir todas las formas creativas en que puedes utilizar esta herramienta en tu vida diaria.`
};

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}

function expandAnswer(answer) {
  // Buscar patrón en la respuesta
  for (const [pattern, expanded] of Object.entries(expandedAnswers)) {
    if (pattern === 'general') continue;
    if (answer.toLowerCase().includes(pattern)) {
      return expanded;
    }
  }
  // Si no coincide ningún patrón, usa la respuesta general expandida
  return expandedAnswers.general;
}

const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro') && !['index', 'privacidad', 'terminos', 'cookies', 'aviso', 'contacto'].some(x => f.includes(x)));

console.log(`Expandiendo TODAS las respuestas de FAQs en ${files.length} archivos...\n`);

let expanded = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Procesar línea por línea
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    // Buscar líneas que contengan a: '
    if (line.includes(`a: '`) && !line.includes(`whatIs=`) && !line.includes(`whyUse=`)) {
      const match = line.match(/a: '([^']{10,})(?:',|\s*})/);
      if (match) {
        const oldAnswer = match[1];
        const newAnswer = expandAnswer(oldAnswer);

        // Reemplazar con respuesta expandida
        if (newAnswer !== oldAnswer) {
          hasChanges = true;
          const escapedNewAnswer = escapeQuotes(newAnswer);
          return line.replace(`a: '${oldAnswer}'`, `a: '${escapedNewAnswer}'`);
        }
      }
    }
    return line;
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    expanded++;
    console.log(`[OK] ${file}`);
  }
});

console.log(`\n=== Resumen ===`);
console.log(`Archivos procesados: ${files.length}`);
console.log(`Archivos expandidos: ${expanded}`);
console.log(`\nEjecutando build...\n`);

const { execSync } = await import('child_process');
try {
  execSync('npm run build', { cwd: __dirname, stdio: 'inherit' });
  console.log('\n✓ Build exitoso con FAQs expandidas');
} catch (e) {
  console.log('\n✗ Build fallido');
  process.exit(1);
}
