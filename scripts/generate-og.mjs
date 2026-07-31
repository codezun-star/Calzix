// Genera imágenes Open Graph (1200x630 JPG) de marca para cada calculadora.
// Lee los nombres reales desde src/lib/constants/calcs.ts y rasteriza un SVG con sharp.
// Uso: node scripts/generate-og.mjs
//
// Regenerar tras añadir calculadoras nuevas. Las imágenes van a public/og/.
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

// Paleta Calzix (ver src/styles/global.css)
const INK = '#0A1E14';
const INK_2 = '#0F3820';
const ACCENT = '#18A357';
const ACCENT_LIGHT = '#6EE09A';
const MUTED = '#8FBFA4';
const FONT = 'DejaVu Sans, FreeSans, sans-serif';

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Parte un texto en líneas de como mucho `max` caracteres respetando palabras.
function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

function buildSvg(nombre, desc) {
  // Ajuste de tamaño de fuente y wrap según longitud del título
  let fontSize, maxChars;
  if (nombre.length <= 16) { fontSize = 88; maxChars = 16; }
  else if (nombre.length <= 30) { fontSize = 72; maxChars = 20; }
  else { fontSize = 56; maxChars = 26; }

  const lines = wrap(nombre, maxChars).slice(0, 3);
  const lineHeight = fontSize * 1.12;
  const blockHeight = lines.length * lineHeight;
  const startY = 300 - blockHeight / 2 + fontSize * 0.78;
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" y="${Math.round(startY + i * lineHeight)}">${esc(l)}</tspan>`)
    .join('');

  const descLines = wrap(desc, 62).slice(0, 2);
  const descTspans = descLines
    .map((l, i) => `<tspan x="80" y="${470 + i * 38}">${esc(l)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${INK}"/>
      <stop offset="60%" stop-color="#0D2B1A"/>
      <stop offset="100%" stop-color="${INK_2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Barra de acento superior -->
  <rect x="0" y="0" width="1200" height="8" fill="${ACCENT}"/>

  <!-- Marca -->
  <text x="80" y="118" font-family="${FONT}" font-size="30" font-weight="bold" fill="#FFFFFF">Calzix</text>
  <text x="196" y="118" font-family="${FONT}" font-size="20" fill="${MUTED}">calzix.com</text>

  <!-- Título de la calculadora -->
  <text font-family="${FONT}" font-size="${fontSize}" font-weight="bold" fill="#FFFFFF">${titleTspans}</text>

  <!-- Descripción -->
  <text font-family="${FONT}" font-size="26" fill="${MUTED}">${descTspans}</text>

  <!-- Pie -->
  <rect x="80" y="536" width="150" height="4" fill="${ACCENT_LIGHT}"/>
  <text x="80" y="586" font-family="${FONT}" font-size="24" fill="${ACCENT_LIGHT}">Gratis · Sin registro · Resultados al instante</text>
</svg>`;
}

async function render(svg, outPath) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(outPath);
}

// ── Registro de calculadoras ─────────────────────────────────────────────────
// Se importa el módulo TypeScript directamente (Node 22 elimina los tipos al
// vuelo). Así el script nunca se desincroniza del registro real: cualquier
// formato de comillas o de saltos de línea en calcs.ts da igual.
const { CALCS } = await import(new URL('../src/lib/constants/calcs.ts', import.meta.url).href);

const entries = CALCS.map(({ slug, name, description }) => ({ slug, name, desc: description }));

if (entries.length === 0) {
  console.error('El registro CALCS está vacío — revisa src/lib/constants/calcs.ts.');
  process.exit(1);
}

let generated = 0;
for (const { slug, name, desc } of entries) {
  await render(buildSvg(name, desc), join(outDir, `${slug}.jpg`));
  generated++;
}

// Imagen por defecto (home, categorías, blog y cualquier página sin OG propia)
await render(
  buildSvg('Calculadoras online gratuitas', `${entries.length} calculadoras de matemáticas, ciencias, conversión, hogar, trabajo y más.`),
  join(outDir, 'default.jpg'),
);

console.log(`OG generadas: ${generated} calculadoras + default.jpg → public/og/`);
