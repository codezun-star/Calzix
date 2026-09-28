import {
  Calculator, FlaskConical, ArrowRightLeft, Home,
  Briefcase, GraduationCap, MapPin, Leaf, Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** Icono Lucide de cada uno de los 9 grupos (clave: `GroupMeta.id`). */
export const GROUP_ICONS: Record<string, LucideIcon> = {
  matematicas: Calculator,
  ciencias:    FlaskConical,
  conversion:  ArrowRightLeft,
  hogar:       Home,
  trabajo:     Briefcase,
  educacion:   GraduationCap,
  viaje:       MapPin,
  naturaleza:  Leaf,
  ocio:        Star,
};

export const DEFAULT_GROUP_ICON: LucideIcon = Calculator;
