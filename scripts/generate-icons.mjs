// Genera los iconos de la app (PWA) en public/icons/ rasterizando un SVG con sharp.
// Uso: node scripts/generate-icons.mjs
//
//  - icon-192.png / icon-512.png   → manifiesto (purpose "any"), esquinas redondeadas
//  - icon-maskable-512.png         → manifiesto (purpose "maskable"), a sangre y con
//                                    el logotipo dentro de la zona segura (círculo 80 %)
//  - apple-touch-icon.png (180)    → iOS, a sangre: el sistema redondea las esquinas
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

// Paleta Calzix (ver src/styles/global.css y scripts/generate-og.mjs)
const INK = '#0A1E14';
const INK_2 = '#0F3820';
const ACCENT_LIGHT = '#6EE09A';
const FONT = 'DejaVu Sans, FreeSans, sans-serif';

/**
 * @param {object} opts
 * @param {boolean} opts.rounded  esquinas redondeadas (false = a sangre)
 * @param {number}  opts.scale    tamaño del logotipo respecto al lienzo
 */
function svg({ rounded, scale }) {
  const S = 512;
  const rx = rounded ? 112 : 0;
  // Logotipo "C." centrado: la C en blanco y el punto en el verde de la marca.
  const logo = `
    <text x="224" y="376" text-anchor="middle" font-family="${FONT}" font-weight="bold"
          font-size="330" fill="#FFFFFF">C</text>
    <circle cx="372" cy="352" r="28" fill="${ACCENT_LIGHT}"/>`;
  const t = (S * (1 - scale)) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="1" stop-color="${INK_2}"/>
    </linearGradient>
  </defs>
  <rect width="${S}" height="${S}" rx="${rx}" fill="url(#bg)"/>
  <g transform="translate(${t} ${t}) scale(${scale})">${logo}</g>
</svg>`;
}

const ICONS = [
  { file: 'icon-192.png',          size: 192, rounded: true,  scale: 1 },
  { file: 'icon-512.png',          size: 512, rounded: true,  scale: 1 },
  { file: 'icon-maskable-512.png', size: 512, rounded: false, scale: 0.72 },
  { file: 'apple-touch-icon.png',  size: 180, rounded: false, scale: 0.9 },
];

for (const icon of ICONS) {
  await sharp(Buffer.from(svg(icon)))
    .resize(icon.size, icon.size)
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, icon.file));
  console.log(`public/icons/${icon.file}`);
}
