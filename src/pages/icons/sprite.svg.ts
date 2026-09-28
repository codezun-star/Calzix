import type { APIRoute } from 'astro';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { LucideIcon } from 'lucide-react';
import { APP_ICONS } from '@/components/ui/appIcons';
import { DEFAULT_GROUP_ICON, GROUP_ICONS } from '@/components/ui/groupIcons';

/**
 * /icons/sprite.svg — sprite con los iconos Lucide de la interfaz de la app
 * (cabecera, barra inferior, hojas). Es un archivo aparte para que el navegador
 * y el service worker lo guarden una vez para todo el sitio, en lugar de
 * repetir los SVG en cada página. Se usa con <Icon name="…" /> (Icon.astro).
 *
 * Solo se guarda el contenido de cada SVG de Lucide (los trazos): el grosor,
 * el color y el tamaño los pone cada <Icon>.
 */
export const GET: APIRoute = () => {
  const entries: Array<[string, LucideIcon]> = [
    ...Object.entries(APP_ICONS),
    ...Object.entries(GROUP_ICONS).map(([id, Icon]): [string, LucideIcon] => [`g-${id}`, Icon]),
    ['g-default', DEFAULT_GROUP_ICON],
  ];

  const symbols = entries
    .map(([id, Icon]) => {
      const body = renderToStaticMarkup(createElement(Icon)).replace(/^<svg[^>]*>|<\/svg>$/g, '');
      return `<symbol id="i-${id}" viewBox="0 0 24 24">${body}</symbol>`;
    })
    .join('');

  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
