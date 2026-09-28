import {
  BookOpen, ChevronLeft, ChevronRight, Cookie, Download, FileText, History,
  Home, LayoutGrid, Mail, Menu, Scale, Search, Share, Share2, ShieldCheck, TrendingUp, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Iconos Lucide de la interfaz de la app (cabecera, barra inferior, hojas).
 * Se publican en un sprite SVG compartido (/icons/sprite.svg) y se pintan con
 * <Icon name="…" />, en lugar de repetir el SVG completo en cada página.
 * Los iconos de los 9 grupos se añaden al sprite como `g-<id del grupo>`.
 */
export const APP_ICONS = {
  'book-open':     BookOpen,
  'chevron-left':  ChevronLeft,
  'chevron-right': ChevronRight,
  cookie:          Cookie,
  download:        Download,
  'file-text':     FileText,
  history:         History,
  home:            Home,
  'layout-grid':   LayoutGrid,
  mail:            Mail,
  menu:            Menu,
  scale:           Scale,
  search:          Search,
  share:           Share,
  'share-2':       Share2,
  'shield-check':  ShieldCheck,
  'trending-up':   TrendingUp,
  x:               X,
} as const satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof APP_ICONS | `g-${string}`;
