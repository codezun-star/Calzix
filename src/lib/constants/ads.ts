// Configuración central de la publicidad de Calzix.
//
// Todo el sitio lee de este archivo: ninguna página lleva claves ni scripts de
// anuncios escritos a mano. Poniendo `ADS_ENABLED = false` desaparece toda la
// publicidad del sitio (banners, nativo, barra fija y social bar) sin tocar
// ninguna otra línea de código.

/** Interruptor global de la publicidad. */
export const ADS_ENABLED = true;

/** Distancia en píxeles a la que se precarga un anuncio antes de entrar en pantalla. */
export const AD_LAZY_OFFSET = 400;

/** Banner fijo inferior en móvil y tablet (descartable por el usuario). */
export const ADS_STICKY_MOBILE = true;

/** Columna lateral fija en pantallas grandes de las páginas de calculadora. */
export const ADS_RAIL = true;

/** Social bar / popunder del proveedor. Se carga una vez por página. */
export const ADS_SOCIAL_BAR = true;

/** Servidor que sirve los banners de tipo iframe. */
export const AD_BANNER_HOST = 'https://www.highrevenueformat.com';

export interface AdUnit {
  /** Clave del bloque en el panel del proveedor. */
  readonly key: string;
  readonly width: number;
  readonly height: number;
}

export interface AdVariant extends AdUnit {
  /** Ancho de viewport (px) hasta el que se sirve esta variante. */
  readonly maxViewport: number;
}

/** Sin límite superior — última variante de cada lista. */
const ANY_VIEWPORT = 999_999;

/** Bloques contratados, tal cual están dados de alta en el proveedor. */
export const AD_UNITS = {
  leaderboard: { key: '18a5024113bb6761f91a3ee6c44ebe2b', width: 728, height: 90 },
  banner:      { key: 'bd51c0942132bd029aeb83d4be234d10', width: 468, height: 60 },
  mobile:      { key: '952859d0befc6a19f90d95d5f8b207a0', width: 320, height: 50 },
  rectangle:   { key: '2b09539dba3d8d9ba6ba8f4f506cc664', width: 300, height: 250 },
  tower:       { key: 'ac8502cf6df9b765a4539120ed3c7831', width: 160, height: 600 },
  halfTower:   { key: '125904dc041ddf7679cfb97446f460d0', width: 160, height: 300 },
} as const satisfies Record<string, AdUnit>;

export type AdPlacement = 'horizontal' | 'rectangle' | 'tower' | 'halfTower' | 'sticky';

/**
 * Cada emplazamiento declara sus variantes ordenadas de menor a mayor viewport.
 * El motor elige en el navegador la primera cuyo `maxViewport` cubre el ancho
 * real de la pantalla: un móvil nunca descarga un 728x90 ni provoca scroll
 * horizontal, y un escritorio nunca se queda con un 320x50.
 */
export const AD_PLACEMENTS: Record<AdPlacement, readonly AdVariant[]> = {
  horizontal: [
    { ...AD_UNITS.mobile,      maxViewport: 639 },
    { ...AD_UNITS.banner,      maxViewport: 1023 },
    { ...AD_UNITS.leaderboard, maxViewport: ANY_VIEWPORT },
  ],
  rectangle:  [{ ...AD_UNITS.rectangle, maxViewport: ANY_VIEWPORT }],
  tower:      [{ ...AD_UNITS.tower,     maxViewport: ANY_VIEWPORT }],
  halfTower:  [{ ...AD_UNITS.halfTower, maxViewport: ANY_VIEWPORT }],
  sticky:     [{ ...AD_UNITS.mobile,    maxViewport: ANY_VIEWPORT }],
};

/**
 * Banner nativo asíncrono. El proveedor lo inyecta en un contenedor con un id
 * fijo, así que **solo puede aparecer una vez por página**.
 */
export const AD_NATIVE = {
  id:  'c12ac9ac2d8349969d1269ff60c7c6e9',
  src: 'https://pl31073412.profitableratecpmnetwork.com/c12ac9ac2d8349969d1269ff60c7c6e9/invoke.js',
} as const;

/** Social bar / popunder — un único script para todo el sitio. */
export const AD_SOCIAL_SRC =
  'https://pl31073419.profitableratecpmnetwork.com/3e/9b/ea/3e9bea87ea6d7989350705d6635f7964.js';

/**
 * Script suelto del proveedor (formato popunder / direct link). No ocupa hueco
 * en la página: se engancha a un clic del usuario para abrir una pestaña. Por eso
 * el motor lo trata con guantes y no lo inserta como una etiqueta más:
 * espera al `load`, lo pide en un hueco de inactividad, nunca en una pestaña en
 * segundo plano, lo salta en las páginas legales y lo limita a una vez cada
 * `AD_POPUNDER_EVERY_HOURS` horas por visitante.
 */
export const ADS_POPUNDER = true;

export const AD_POPUNDER_SRC =
  'https://pl29628921.profitableratecpmnetwork.com/0c/d5/92/0cd5925857a97ed12dca3ed7b1c4cf8a.js';

/** Espera (ms) desde que la página termina de cargar hasta que se pide el script. */
export const AD_POPUNDER_DELAY = 8000;

/**
 * Horas mínimas entre dos cargas para un mismo visitante. Sin este tope, recorrer
 * cinco calculadoras significaría cinco popunders.
 */
export const AD_POPUNDER_EVERY_HOURS = 6;

/** Rutas donde nunca se carga: legales y contacto son páginas de confianza. */
export const AD_POPUNDER_EXCLUDED = [
  '/privacidad',
  '/terminos',
  '/cookies',
  '/aviso-legal',
  '/contacto',
] as const satisfies readonly string[];

/** Formato que el motor recibe en `data-ad` (nombres cortos para no inflar el HTML). */
export interface AdVariantPayload {
  readonly k: string;
  readonly w: number;
  readonly h: number;
  readonly m: number;
}

export function variantsPayload(placement: AdPlacement): AdVariantPayload[] {
  return AD_PLACEMENTS[placement].map((v) => ({ k: v.key, w: v.width, h: v.height, m: v.maxViewport }));
}

/** Altura que ocupará el anuncio en un viewport dado. Sirve para reservar sitio y evitar CLS. */
export function heightAt(placement: AdPlacement, viewport: number): number {
  const variants = AD_PLACEMENTS[placement];
  const fallback = variants[variants.length - 1] as AdVariant;
  return (variants.find((v) => viewport <= v.maxViewport) ?? fallback).height;
}

/** Variables CSS con la altura reservada por breakpoint (móvil / tablet / escritorio). */
export function reservedSpace(placement: AdPlacement): string {
  return [
    `--ad-h-sm:${heightAt(placement, 480)}px`,
    `--ad-h-md:${heightAt(placement, 800)}px`,
    `--ad-h-lg:${heightAt(placement, 1400)}px`,
  ].join(';');
}
