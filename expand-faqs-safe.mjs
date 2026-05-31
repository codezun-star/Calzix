import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, 'src/pages');

// Respuestas expandidas
const expandedAnswers = {
  'cómo': `El proceso de cálculo sigue una metodología precisa que garantiza resultados exactos. Cada paso se ejecuta en orden lógico, considerando todas las variables relevantes para obtener un resultado preciso y verificable. La fórmula exacta depende del contexto específico, pero generalmente incluye operaciones matemáticas fundamentales combinadas estratégicamente. Es fundamental comprender cada etapa para poder verificar resultados manualmente cuando lo necesites. Nuestra calculadora automatiza este proceso, eliminando errores humanos y ahorrando tiempo valioso. Los cálculos se realizan instantáneamente usando algoritmos optimizados garantizando exactitud total. Puedes usar resultados con confianza en contextos financieros, académicos o profesionales. La precisión es fundamental, diseñada para usuarios que requieren resultados fiables.`,

  'por qué': `La metodología se basa en principios establecidos internacionalmente y normativas específicas del contexto hispanohablante. Entender el razonamiento detrás de cada regla es fundamental para aplicarla correctamente en diferentes situaciones. La razón de ser es maximizar equidad, claridad y consistencia en todos los cálculos. Aunque parece complejo inicialmente, comprendiendo la lógica resulta mucho más fácil aplicarlo en casos similares. Nuestra herramienta facilita aprendizaje proporcionando resultados instantáneos correlacionables con procesos explicados. Esto crea experiencia educativa donde cada cálculo refuerza comprensión del concepto. La transparencia es valor fundamental. Queremos que entiendas no solo resultados, sino cómo y por qué los obtenemos.`,

  'puedo': `La flexibilidad está diseñada para casos comunes, pero siempre puedes adaptar pasos según necesidades específicas. Requiriendo cálculos complejos, estrategia efectiva es dividir problemas en pasos pequeños. Usar calculadora múltiples veces abordando componentes diferentes es aproximación que muchos encuentran efectiva. Especialmente útil cuando variables interrelacionadas necesitan calcularse secuencialmente. Muchos descubren enfoque modular es más educativo que cálculo único, permitiendo entender componentes separadamente. Descomposición de problemas complejos es habilidad valiosa desarrollable usando herramienta creativamente.`,

  'cuánto': `Para entender diferencias relativas, usa calculadora con múltiples ejemplos y montos base diferentes observando patrones. Observarás patrones matemáticos demostrando cómo porcentajes funcionan no linealmente. Esta comprensión es valiosa para cálculos matemáticos puros y decisiones consumo y finanzas personales. Experiencia con varios escenarios permite desarrollar intuición numérica útil en áreas profesionales. Herramienta permite exploración sin límites. Experimenta libremente con valores para descubrir relaciones numéricas ayudándote comprender mejor temas.`,

  'sirve': `En contextos empresariales, esta opción es valiosa presentando presupuestos con transparencia total sobre coste final. Clientes aprecian ver exactamente pagarán incluyendo impuestos desde principio. Emprendedores y profesionales independientes, claridad genera confianza reduciendo disputas posteriores. Educativamente, entender aplicación refuerza conocimiento sobre sistemas tributarios y estructura precios. Herramienta simplifica proceso requiriendo cálculos manuales complejos propensos errores. Transparencia precios es importante comercio moderno digital.`,

  'diferencia': `Aunque matemáticamente equivalentes numéricamente, conceptualmente hay diferencia importante cómo expresamos comunicamos ideas. "Descuento 50%" enfatiza psicológicamente recibiendo reducción precio original. "Pagar mitad" es forma directa simple expresar lo mismo perspectiva coste final. Marketing comunicación, diferencias psicológicas importan significativamente afectando percepción consumidores ofertas. Descuentos psicológicamente parecen atractivos que bajar precio, aunque resultado financiero idéntico. Propósitos matemáticos cálculo puro, idénticos, verificable fácilmente. Equivalencia ejemplo útil cómo formas expresar números causan confusión.`,

  'qué es': `Concepto absolutamente fundamental apareciendo contextos diferentes: matemáticas, finanzas, educación, vida cotidiana. Comprender definición profundamente es esencial trabajar herramienta efectiva segura correctamente. Concepto tiene raíces históricas profundas evolucionado significativamente tiempo según contexto aplicación. Actualidad, aplica universalmente contextos profesionales, académicos personales mundialmente. Campos tienen definiciones ligeramente variadas, principios fundamentales permanecen consistentes. Herramienta diseñada trabajar definición ampliamente aceptada utilizada globalmente. Aprender bien concepto abre puertas entender temas relacionados complejos.`,

  'general': `Pregunta fundamental muchos usuarios hacen utilizando herramientas cálculo. Respuesta depende contexto específico, objetivos personales claros, cómo planeas usar información valiosa. General, mayoría usuarios encuentran herramienta increíblemente útil amplia gama aplicaciones prácticas. Contextos académicos rigurosos situaciones financieras reales complejas, numerosos casos uso donde información valiosa. Clave fundamental entender aplicar correctamente resultados situación específica única. Herramienta proporciona base matemática sólida necesitas decisiones informadas confiables. Experimenta diferentes escenarios descubrir formas creativas utilizar herramienta vida diaria.`
};

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}

const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro') && !['index', 'privacidad', 'terminos', 'cookies', 'aviso', 'contacto'].some(x => f.includes(x)));

console.log(`Expandiendo FAQs en ${files.length} archivos...\n`);

let expanded = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Procesar línea por línea para seguridad
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    // Buscar líneas que contengan a: ' y sean cortas (FAQs)
    if (line.includes(`a: '`) && !line.includes(`whatIs=`) && !line.includes(`whyUse=`)) {
      const match = line.match(/a: '([^']{10,300})'(?:,|\s*})/);
      if (match) {
        const oldAnswer = match[1];
        let newAnswer = oldAnswer;

        // Buscar patrón y expandir
        for (const [pattern, expanded_text] of Object.entries(expandedAnswers)) {
          if (pattern === 'general') continue;
          if (oldAnswer.toLowerCase().includes(pattern)) {
            newAnswer = expanded_text;
            break;
          }
        }

        // Si no hay patrón, usa general
        if (newAnswer === oldAnswer && oldAnswer.length < 300) {
          newAnswer = expandedAnswers.general;
        }

        // Solo reemplazar si es diferente y corto
        if (newAnswer !== oldAnswer && oldAnswer.length < 300) {
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
  console.log('\n✓ Build exitoso');
} catch (e) {
  console.log('\n✗ Build fallido');
  process.exit(1);
}
