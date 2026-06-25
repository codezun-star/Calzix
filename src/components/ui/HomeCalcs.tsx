import { useState, useEffect, useRef } from 'react';
import { CALC_GROUPS, CALCS } from '@/lib/constants/calcs';
import CalcCard from './CalcCard';
import {
  Calculator, FlaskConical, ArrowRightLeft, Home,
  Briefcase, GraduationCap, MapPin, Leaf, Star, ArrowRight,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const GROUP_ICONS: Record<string, LucideIcon> = {
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

const VALID_IDS = CALC_GROUPS.map(g => g.id);

function getGroupFromHash(): string {
  if (typeof window === 'undefined') return CALC_GROUPS[0].id;
  const hash = window.location.hash.slice(1);
  return VALID_IDS.includes(hash) ? hash : CALC_GROUPS[0].id;
}

function getGroupCalcs(groupId: string) {
  const group = CALC_GROUPS.find(g => g.id === groupId);
  if (!group) return [];
  const domainIds = new Set(group.domains.map(d => d.id));
  return CALCS.filter(c => domainIds.has(c.domain));
}

const GRID = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';

function VerTodas({ href, count, label }: { href: string; count: number; label: string }) {
  return (
    <div className="mt-8 flex justify-center">
      <a
        href={href}
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-text)] text-[var(--color-text)] font-semibold text-sm hover:bg-[var(--color-text)] hover:text-white transition-colors rounded-xl"
      >
        Ver todas las calculadoras de {label} ({count})
        <ArrowRight size={16} />
      </a>
    </div>
  );
}

export default function HomeCalcs() {
  const [active, setActive] = useState<string>(getGroupFromHash);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    const el = scrollRef.current;
    updateArrows();
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  useEffect(() => {
    const onHash = () => setActive(getGroupFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Centra la pestaña activa y recalcula las flechas al cambiar de grupo
  useEffect(() => {
    const el = scrollRef.current;
    const activeBtn = el?.querySelector<HTMLElement>('[data-active="true"]');
    activeBtn?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    updateArrows();
  }, [active]);

  function scrollByDir(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });
  }

  function selectTab(id: string) {
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  }

  const arrowBtn = 'absolute top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] shadow-md hover:bg-[var(--color-calcs-bg)] hover:text-[var(--color-accent)] transition-colors';

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-14 z-40 bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Flecha izquierda */}
            {canLeft && (
              <>
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 z-10 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <button type="button" aria-label="Categorías anteriores" onClick={() => scrollByDir(-1)} className={`${arrowBtn} left-0`}>
                  <ChevronLeft size={18} />
                </button>
              </>
            )}
            {/* Flecha derecha */}
            {canRight && (
              <>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />
                <button type="button" aria-label="Más categorías" onClick={() => scrollByDir(1)} className={`${arrowBtn} right-0`}>
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <div
              ref={scrollRef}
              className="flex gap-1 py-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CALC_GROUPS.map((group) => {
                const Icon = GROUP_ICONS[group.id] ?? Calculator;
                const count = getGroupCalcs(group.id).length;
                const isActive = active === group.id;
                return (
                  <button
                    key={group.id}
                    data-active={isActive}
                    onClick={() => selectTab(group.id)}
                    className={[
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0',
                      isActive
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-calcs-bg)] hover:text-[var(--color-text)]',
                    ].join(' ')}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{group.label}</span>
                    <span
                      className={[
                        'text-xs px-1.5 py-0.5 rounded-full font-medium',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[var(--color-calcs-bg)] text-[var(--color-text-muted)]',
                      ].join(' ')}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[var(--color-calcs-bg)] border-b border-[var(--color-calcs-border)] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {CALC_GROUPS.map((group) => {
            if (active !== group.id) return null;
            const calcs = getGroupCalcs(group.id);
            const featured = calcs.slice(0, 12);
            return (
              <div key={group.id}>
                <div className={GRID}>
                  {featured.map(c => <CalcCard key={c.slug} calc={c} />)}
                </div>
                <VerTodas href={`/${group.slug}`} count={calcs.length} label={group.label} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
