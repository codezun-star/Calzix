import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, 'src/pages');

// Mapa de caracteres rotos → correctos
const replacements = {
  'Â¿': '¿',
  'Ã¡': 'á',
  'Ã©': 'é',
  'Ã­': 'í',
  'Ã³': 'ó',
  'Ãº': 'ú',
  'Ã±': 'ñ',
  'Ã‰': 'É',
  'Á': 'Á',
  'Ã': 'Í',
  'Ó': 'Ó',
  'Ú': 'Ú',
  'â‚¬': '€',
  'â€': '–',
  'Â': ''
};

const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro') && !['index', 'privacidad', 'terminos', 'cookies', 'aviso', 'contacto'].some(x => f.includes(x)));

console.log(`Procesando ${files.length} archivos para corregir codificación UTF-8...\n`);

let corrected = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  Object.entries(replacements).forEach(([broken, correct]) => {
    if (content.includes(broken)) {
      content = content.split(broken).join(correct);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    corrected++;
    console.log(`[OK] ${file} - caracteres corregidos`);
  }
});

console.log(`\n=== Resumen ===`);
console.log(`Total procesados: ${files.length}`);
console.log(`Corregidos: ${corrected}`);
console.log(`\nEjecutando build...`);

try {
  execSync('npm run build', { cwd: __dirname, stdio: 'inherit' });
  console.log('\n✓ Build exitoso');
} catch (e) {
  console.log('\n✗ Build fallido');
  process.exit(1);
}
