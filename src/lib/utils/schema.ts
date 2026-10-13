import { SITE } from '@/lib/constants/seo';

/**
 * Piezas de schema.org compartidas por todas las páginas. Concentran las
 * señales geográficas del sitio (España) en un solo sitio: si cambia el
 * mercado o la organización, se toca aquí y no en cada layout.
 */

/** España como lugar (schema.org/Country), con identificadores inequívocos. */
export const SPAIN_PLACE = {
  '@type': 'Country',
  name: SITE.countryName,
  alternateName: 'Spain',
  identifier: SITE.country,
  sameAs: 'https://www.wikidata.org/wiki/Q29',
} as const;

/** Público objetivo: personas y empresas en España. */
export const SPAIN_AUDIENCE = {
  '@type': 'Audience',
  audienceType: 'Particulares, estudiantes, autónomos y empresas en España',
  geographicArea: SPAIN_PLACE,
} as const;

/** Nodo Organization (se referencia con `{ '@id': ORG_ID }`). */
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    areaServed: SPAIN_PLACE,
    knowsLanguage: SITE.lang,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'customer support',
      availableLanguage: SITE.lang,
      areaServed: SITE.country,
    },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.lang,
    audience: SPAIN_AUDIENCE,
    publisher: { '@id': ORG_ID },
  };
}
