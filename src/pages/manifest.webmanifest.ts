import type { APIRoute } from 'astro';
import { getCalcBySlug } from '@/lib/constants/calcs';
import { SITE } from '@/lib/constants/seo';

/**
 * /manifest.webmanifest — manifiesto PWA. Permite instalar Calzix en la pantalla
 * de inicio del móvil y abrirla a pantalla completa, sin la interfaz del navegador.
 * Iconos generados con `node scripts/generate-icons.mjs` (public/icons/).
 */
const SHORTCUTS = ['calculadora-hipoteca', 'calculadora-porcentaje', 'calculadora-iva'];

export const GET: APIRoute = () => {
  const shortcutIcon = [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }];

  const manifest = {
    id: '/',
    name: `${SITE.name} — Calculadoras online gratuitas`,
    short_name: SITE.name,
    description: SITE.description,
    lang: 'es',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#F0FAF4',
    theme_color: '#FFFFFF',
    categories: ['utilities', 'education', 'finance', 'productivity'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Buscar calculadora', short_name: 'Buscar', url: '/#buscar', icons: shortcutIcon },
      ...SHORTCUTS.map((slug) => getCalcBySlug(slug))
        .filter((calc) => calc !== undefined)
        .map((calc) => ({
          name: calc.name,
          short_name: calc.name.replace(/^Calculadora (de |del )?/i, ''),
          description: calc.description,
          url: `/${calc.slug}`,
          icons: shortcutIcon,
        })),
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
