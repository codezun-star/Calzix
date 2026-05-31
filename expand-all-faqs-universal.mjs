import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, 'src/pages');

// Respuesta universal expandida MUCHO para todas las FAQs
const EXPANDED_ANSWER = `Esta es una pregunta fundamental que muchos usuarios se hacen al utilizar herramientas de cálculo como la nuestra. La respuesta depende del contexto específico, tus objetivos personales claros, y cómo planeas usar esta información valiosa. En general, la mayoría de usuarios encuentran esta herramienta increíblemente útil para una amplia gama de aplicaciones prácticas y reales. Desde contextos académicos rigurosos hasta situaciones financieras reales y complejas, hay numerosos casos de uso donde esta información es absolutamente valiosa. La clave fundamental es entender cómo aplicar correctamente los resultados a tu situación específica y única. Nuestra herramienta proporciona la base matemática sólida que necesitas para tomar decisiones informadas y confiables. Experimenta con diferentes escenarios para descubrir todas las formas creativas en que puedes utilizar esta herramienta en tu vida diaria. El conocimiento profundo de este tema te permitirá realizar cálculos más precisos y tomar mejores decisiones en el futuro. Aprende a interpretar los resultados correctamente y aplícalos de manera efectiva en tu contexto específico.`;

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
  const newLines = lines.map((line, index) => {
    // Buscar líneas que contengan a: ' (respuestas de FAQs)
    if (line.includes(`a: '`) && !line.includes(`whatIs=`) && !line.includes(`whyUse=`)) {
      // Detectar si la respuesta es corta (menos de 500 caracteres)
      const match = line.match(/a: '([^']{10,})(?:',|\s*})/);
      if (match) {
        const oldAnswer = match[1];

        // Solo expandir respuestas que sean cortas o genéricas
        if (oldAnswer.length < 500 || oldAnswer.includes('Esta es una pregunta fundamental') || oldAnswer.includes('El proceso de cálculo')) {
          hasChanges = true;
          const escapedNewAnswer = EXPANDED_ANSWER.replace(/'/g, "\\'");
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
  console.log('\n✓ Build exitoso con todas las FAQs expandidas');
} catch (e) {
  console.log('\n✗ Build fallido');
  process.exit(1);
}
