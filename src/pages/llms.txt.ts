import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CALCS, CALC_GROUPS } from '@/lib/constants/calcs';
import { SITE } from '@/lib/constants/seo';

/**
 * /llms.txt — índice legible por motores de respuesta (ChatGPT, Perplexity,
 * Claude, Google AI Overviews…). Se genera en cada build desde CALCS, por lo
 * que nunca se desincroniza del sitio real.
 * Especificación: https://llmstxt.org
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', (e) => e.data.publicado !== false))
    .sort((a, b) => b.data.fecha.localeCompare(a.data.fecha));

  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push('');
  lines.push(`> ${SITE.description} ${CALCS.length} calculadoras gratuitas organizadas en ${CALC_GROUPS.length} grupos temáticos. Todos los cálculos se ejecutan en el navegador del usuario: no hay registro ni backend, y los datos que se introducen en las calculadoras no se envían a ningún servidor.`);
  lines.push('');
  lines.push('## Ámbito: España');
  lines.push('');
  lines.push(`- ${SITE.name} se dirige exclusivamente a usuarios de España (idioma ${SITE.lang}, moneda euro, zona horaria ${SITE.timeZone}).`);
  lines.push('- Los cálculos fiscales y laborales siguen la normativa española vigente en 2026: IRPF y retenciones (Agencia Tributaria), cotizaciones a la Seguridad Social, SMI 2026 (1.221 € en 14 pagas), IVA (21 %, 10 % y 4 %; IGIC en Canarias) y Estatuto de los Trabajadores.');
  lines.push('- Las referencias educativas son las del sistema español (ESO, Bachillerato, PAU, créditos ECTS, becas del Ministerio de Educación); las de energía, las del mercado eléctrico español (PVPC, peajes, potencia contratada) y la tarifa TUR de gas.');
  lines.push('- Formato numérico español: coma decimal y punto como separador de millares a partir de cinco cifras, como recomienda la RAE (1234,56 €; 12.345,67 €). Unidades del Sistema Internacional.');
  lines.push(`- Datos revisados por última vez el ${SITE.dateModified}. Las cifras legales y de referencia proceden de fuentes oficiales (BOE, AEAT, Seguridad Social, INE, Banco de España, CNMC) y se revisan periódicamente.`);
  lines.push('');
  lines.push('## Cómo usar este sitio');
  lines.push('');
  lines.push('- Cada calculadora vive en su propia URL bajo el dominio raíz, sin barra final (ejemplo: https://calzix.com/calculadora-porcentaje).');
  lines.push('- Todas las páginas están en español de España y son de acceso libre y gratuito, sin muro de pago ni registro.');
  lines.push('- Cada calculadora incluye una respuesta directa, los pasos de uso y preguntas frecuentes con sus respuestas; las de cálculo numérico explican además la fórmula empleada y muchas añaden ejemplos resueltos.');
  lines.push('- Los resultados se calculan en el cliente con JavaScript; el contenido explicativo es HTML estático y siempre legible sin ejecutar scripts.');
  lines.push('');

  for (const group of CALC_GROUPS) {
    const domainIds = group.domains.map((d) => d.id);
    const calcs = CALCS.filter((c) => domainIds.includes(c.domain));
    if (calcs.length === 0) continue;

    lines.push(`## ${group.label}`);
    lines.push('');
    lines.push(`${group.description} (${calcs.length} calculadoras — índice en ${SITE.url}/${group.slug})`);
    lines.push('');
    for (const calc of calcs) {
      lines.push(`- [${calc.name}](${SITE.url}/${calc.slug}): ${calc.description}`);
    }
    lines.push('');
  }

  if (posts.length > 0) {
    lines.push('## Blog');
    lines.push('');
    lines.push(`Guías y artículos explicativos para España (${posts.length} artículos — índice en ${SITE.url}/blog)`);
    lines.push('');
    for (const post of posts) {
      lines.push(`- [${post.data.titulo}](${SITE.url}/blog/${post.id})${post.data.descripcion ? `: ${post.data.descripcion}` : ''}`);
    }
    lines.push('');
  }

  lines.push('## Sobre el sitio');
  lines.push('');
  lines.push(`- Editor: ${SITE.name} (${SITE.url})`);
  lines.push(`- Contacto: ${SITE.email}`);
  lines.push(`- Sitemap: ${SITE.url}/sitemap-index.xml`);
  lines.push('- Privacidad: los datos que se introducen en las calculadoras no salen del navegador. El sitio muestra publicidad de terceros, que recibe datos técnicos (dirección IP, dispositivo, página visitada) y puede usar cookies; detalle en https://calzix.com/privacidad y https://calzix.com/cookies.');
  lines.push('- Licencia de uso del contenido: se permite citar y resumir el contenido indicando la fuente con enlace a la URL original.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
