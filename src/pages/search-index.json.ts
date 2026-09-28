import type { APIRoute } from 'astro';
import { CALCS, getDomainGroup } from '@/lib/constants/calcs';
import type { SearchEntry } from '@/lib/constants/app';

/**
 * /search-index.json — índice del buscador de la app (src/scripts/app-shell.ts).
 * Se genera en cada build desde CALCS y se descarga solo al abrir el buscador,
 * así que no engorda ninguna página. El service worker lo guarda para que el
 * buscador funcione también sin conexión.
 */
export const GET: APIRoute = () => {
  const entries: SearchEntry[] = CALCS.map((calc) => {
    const group = getDomainGroup(calc.domain);
    const domain = group?.domains.find((d) => d.id === calc.domain);
    return {
      s: calc.slug,
      n: calc.name,
      d: calc.description,
      c: domain?.label ?? calc.category,
      g: group?.id ?? '',
    };
  });

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
