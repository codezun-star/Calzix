import {
  // Finanzas / existentes
  TrendingUp, Percent, PiggyBank, DollarSign, CreditCard,
  Activity, Heart, Scale, Apple, Flame,
  Calculator, Sigma, Triangle, BarChart2, Divide,
  ArrowRightLeft, Thermometer, Ruler, Weight, Clock,
  Calendar, CalendarDays, Timer, Hourglass,
  SquareFunction,
  // Matemáticas / Ciencias
  Shuffle, Zap, FlaskConical,
  // Conversión
  Gauge, LayoutGrid, Box, Battery, Wind, HardDrive, Compass,
  // Hogar
  Hammer, Paintbrush, Home, Leaf, Sprout,
  // Trabajo
  Receipt, Tag, Briefcase, ListChecks,
  // Educación
  GraduationCap, BookMarked, BookOpen,
  // Viaje
  Car, MapPin, Globe, Package, Wallet,
  // Naturaleza
  Droplets, Sun, Recycle,
  // Ocio
  Star, Hash, Moon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CalcMeta } from '@/lib/constants/calcs';

const ICONS: Record<string, LucideIcon> = {
  TrendingUp, Percent, PiggyBank, DollarSign, CreditCard,
  Activity, Heart, Scale, Apple, Flame,
  Calculator, Sigma, Triangle, BarChart2, Divide,
  ArrowRightLeft, Thermometer, Ruler, Weight, Clock,
  Calendar, CalendarDays, Timer, Hourglass,
  SquareFunction,
  Shuffle, Zap, FlaskConical,
  Gauge, LayoutGrid, Box, Battery, Wind, HardDrive, Compass,
  Hammer, Paintbrush, Home, Leaf, Sprout,
  Receipt, Tag, Briefcase, ListChecks,
  GraduationCap, BookMarked, BookOpen,
  Car, MapPin, Globe, Package, Wallet,
  Droplets, Sun, Recycle,
  Star, Hash, Moon,
};

interface Props {
  calc: CalcMeta;
}

export default function CalcCard({ calc }: Props) {
  const Icon = ICONS[calc.icon] ?? SquareFunction;

  return (
    <a
      href={`/${calc.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-calcs-border)] bg-[var(--color-surface)] p-5 transition-all hover:border-[var(--color-accent)] hover:shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-calcs-bg)]">
        <Icon
          size={20}
          strokeWidth={1.75}
          className="text-[var(--color-calcs-icon)] transition-colors group-hover:text-[var(--color-accent)]"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text)] leading-snug">
          {calc.name}
        </h3>
        <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {calc.description}
        </p>
      </div>
    </a>
  );
}
