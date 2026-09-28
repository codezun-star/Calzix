// Configuración de la experiencia "app" en móvil: barra de pestañas inferior,
// hojas deslizables (buscador, categorías, menú) y PWA instalable.
import type { AppIconName } from '@/components/ui/appIcons';

/** Pestaña activa de la barra inferior. */
export type AppSection = 'inicio' | 'categorias' | 'blog' | 'mas';

/** Calculadoras sugeridas en el buscador antes de escribir nada. */
export const APP_POPULAR_SLUGS = [
  'calculadora-hipoteca',
  'calculadora-porcentaje',
  'calculadora-iva',
  'irpf-retencion',
  'consumo-electrico',
  'diferencia-horaria',
] as const satisfies readonly string[];

/** Enlaces secundarios de la hoja "Más" (legales y contacto). `icon`: id del sprite (appIcons.ts). */
export const APP_MENU_LINKS = [
  { label: 'Contacto',    href: '/contacto',    icon: 'mail' },
  { label: 'Privacidad',  href: '/privacidad',  icon: 'shield-check' },
  { label: 'Términos',    href: '/terminos',    icon: 'file-text' },
  { label: 'Cookies',     href: '/cookies',     icon: 'cookie' },
  { label: 'Aviso legal', href: '/aviso-legal', icon: 'scale' },
] as const satisfies ReadonlyArray<{ label: string; href: string; icon: AppIconName }>;

/** Entrada del índice de búsqueda servido en /search-index.json (claves cortas). */
export interface SearchEntry {
  /** slug */
  s: string;
  /** nombre */
  n: string;
  /** descripción corta */
  d: string;
  /** subcategoría legible (p. ej. "Hipoteca y alquiler") */
  c: string;
  /** id del grupo (p. ej. "hogar") */
  g: string;
}
