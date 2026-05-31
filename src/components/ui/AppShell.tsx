import { useState, useEffect, useRef, memo, type CSSProperties } from 'react';
import { CALC_GROUPS, CALCS, getCalcsByDomain, type CalcMeta } from '@/lib/constants/calcs';
import {
  TrendingUp, Percent, PiggyBank, DollarSign, CreditCard,
  Activity, Heart, Scale, Apple, Flame,
  Calculator, Sigma, Triangle, BarChart2, Divide,
  ArrowRightLeft, Thermometer, Ruler, Weight, Clock,
  Calendar, CalendarDays, Timer, Hourglass,
  SquareFunction, Shuffle, Zap, FlaskConical,
  Gauge, LayoutGrid, Box, Battery, Wind, HardDrive, Compass,
  Hammer, Paintbrush, Home, Leaf, Sprout,
  Receipt, Tag, Briefcase, ListChecks,
  GraduationCap, BookMarked, BookOpen,
  Car, MapPin, Globe, Package, Wallet,
  Droplets, Sun, Recycle,
  Star, Hash, Moon, Menu, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ─── Icono maps ────────────────────────────────────────────────── */
const ICONS: Record<string, LucideIcon> = {
  TrendingUp, Percent, PiggyBank, DollarSign, CreditCard,
  Activity, Heart, Scale, Apple, Flame,
  Calculator, Sigma, Triangle, BarChart2, Divide,
  ArrowRightLeft, Thermometer, Ruler, Weight, Clock,
  Calendar, CalendarDays, Timer, Hourglass,
  SquareFunction, Shuffle, Zap, FlaskConical,
  Gauge, LayoutGrid, Box, Battery, Wind, HardDrive, Compass,
  Hammer, Paintbrush, Home, Leaf, Sprout,
  Receipt, Tag, Briefcase, ListChecks,
  GraduationCap, BookMarked, BookOpen,
  Car, MapPin, Globe, Package, Wallet,
  Droplets, Sun, Recycle,
  Star, Hash, Moon,
};

const GROUP_ICONS: Record<string, string> = {
  matematicas: 'ti-math-function',
  ciencias:    'ti-atom',
  conversion:  'ti-arrows-exchange',
  hogar:       'ti-home',
  trabajo:     'ti-briefcase',
  educacion:   'ti-school',
  viaje:       'ti-plane',
  naturaleza:  'ti-leaf',
  ocio:        'ti-puzzle',
};

/* ─── Paginación ────────────────────────────────────────────────── */
const PAGE_SIZE = 9;

/* ─── Hero ──────────────────────────────────────────────────────── */
function Hero() {
  return (
    <div style={{ paddingBottom: 24, marginBottom: 20, borderBottom: '1px solid #C4BBA8' }}>
      <h1 style={{
        fontSize: 30, fontWeight: 800, color: '#2B2520',
        margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em',
      }}>
        Calculadoras{' '}
        <span style={{ fontWeight: 300, fontStyle: 'italic', color: '#7A6A58' }}>
          online gratuitas
        </span>
      </h1>
      <p style={{ fontSize: 14, color: '#6b6860', margin: '10px 0 14px', lineHeight: 1.55, maxWidth: 500 }}>
        {CALCS.length} calculadoras de matemáticas, ciencias, conversión, hogar, trabajo y más.
        Sin registro. Resultados al instante.
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Sin registro', '100% gratis', 'Sin publicidad', 'Resultados al instante'].map(tag => (
          <span key={tag} style={{
            padding: '3px 10px',
            border: '1px solid #C4BBA8',
            borderRadius: 20,
            fontSize: 11,
            color: '#7A6A58',
            background: 'rgba(255,255,255,0.45)',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Paginación UI ─────────────────────────────────────────────── */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPage: (p: number) => void;
}
function Pagination({ currentPage, totalPages, onPage }: PaginationProps) {
  if (totalPages <= 1) return null;
  const btnBase: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: 6,
    border: '1px solid #C4BBA8', background: 'rgba(255,255,255,0.5)',
    cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
    color: '#3D2E22', transition: 'background 0.1s',
  };
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 24 }} aria-label="Paginación">
      <button
        style={{ ...btnBase, opacity: currentPage === 1 ? 0.35 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
        onClick={() => onPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >←</button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          style={{
            ...btnBase,
            background: p === currentPage ? '#2B2520' : 'rgba(255,255,255,0.5)',
            color: p === currentPage ? '#fff' : '#3D2E22',
            borderColor: p === currentPage ? '#2B2520' : '#C4BBA8',
            fontWeight: p === currentPage ? 700 : 400,
          }}
          onClick={() => onPage(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >{p}</button>
      ))}

      <button
        style={{ ...btnBase, opacity: currentPage === totalPages ? 0.35 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
        onClick={() => onPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >→</button>
    </nav>
  );
}

/* ─── Footer (fijo al fondo del panel) ─────────────────────────── */
function AppFooter() {
  const year = new Date().getFullYear();
  const links = [
    { label: 'Privacidad',  href: '/privacidad' },
    { label: 'Términos',    href: '/terminos' },
    { label: 'Cookies',     href: '/cookies' },
    { label: 'Aviso legal', href: '/aviso-legal' },
    { label: 'Contacto',    href: '/contacto' },
  ];
  const linkStyle: CSSProperties = { fontSize: 11, color: '#7A6A58', textDecoration: 'none' };
  return (
    <footer style={{
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '6px 14px',
      padding: '10px 28px',
      borderTop: '1px solid #C4BBA8',
      background: 'rgba(237,232,223,0.97)',
    }}>
      <p style={{ fontSize: 11, color: '#7A6A58', margin: 0 }}>
        © {year} Calzix. Todos los derechos reservados.
      </p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={linkStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#2B2520'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#7A6A58'; }}>
            {l.label}
          </a>
        ))}
        <a href="mailto:codezun@gmail.com" style={linkStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#2B2520'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#7A6A58'; }}>
          codezun@gmail.com
        </a>
      </div>
    </footer>
  );
}

/* ─── Constantes del sistema de ventanas ────────────────────────── */
const INIT_W = 700;
const INIT_H = 580;
const MIN_W  = 320;
const MIN_H  = 200;
const TBH    = 34;

/* ─── Tipos ─────────────────────────────────────────────────────── */
interface WinState {
  id: string;
  calc: CalcMeta;
  x: number; y: number;
  width: number; height: number;
  minimized: boolean; maximized: boolean;
  savedX: number; savedY: number; savedW: number; savedH: number;
  zIndex: number;
}

interface DragOp   { winId: string; sx: number; sy: number; ox: number; oy: number; ww: number; }
interface ResizeOp { winId: string; dir: string; sx: number; sy: number; ox: number; oy: number; ow: number; oh: number; }

/* ─── Handles de resize ─────────────────────────────────────────── */
const HANDLE_STYLES: Record<string, CSSProperties> = {
  s:  { bottom: 0, left: 0, right: 0, height: 5, cursor: 's-resize' },
  e:  { right: 0, top: TBH, bottom: 0, width: 5, cursor: 'e-resize' },
  w:  { left: 0, top: TBH, bottom: 0, width: 5, cursor: 'w-resize' },
  se: { bottom: 0, right: 0, width: 14, height: 14, cursor: 'se-resize', zIndex: 2 },
  sw: { bottom: 0, left: 0, width: 14, height: 14, cursor: 'sw-resize', zIndex: 2 },
};

function Handle({ dir, onStart }: { dir: string; onStart: (e: React.MouseEvent) => void }) {
  return (
    <div
      style={{ position: 'absolute', zIndex: 1, ...HANDLE_STYLES[dir] }}
      onMouseDown={(e) => { e.stopPropagation(); onStart(e); }}
    />
  );
}

/* ─── Ventana flotante ───────────────────────────────────────────── */
interface FWProps {
  win: WinState;
  layerRef: React.RefObject<HTMLDivElement>;
  onClose:       () => void;
  onFocus:       () => void;
  onUpdate:      (u: Partial<WinState>) => void;
  onStartDrag:   (e: React.MouseEvent, w: WinState) => void;
  onStartResize: (e: React.MouseEvent, w: WinState, dir: string) => void;
}

const FloatingWindow = memo(function FloatingWindow({
  win, layerRef, onClose, onFocus, onUpdate, onStartDrag, onStartResize,
}: FWProps) {
  const visH = win.minimized ? TBH : win.height;

  function toggleMin(e: React.MouseEvent) {
    e.stopPropagation();
    onUpdate({ minimized: !win.minimized, maximized: false });
  }

  function toggleMax(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (win.maximized) {
      onUpdate({ maximized: false, minimized: false, x: win.savedX, y: win.savedY, width: win.savedW, height: win.savedH });
    } else {
      const lw = layerRef.current?.clientWidth  ?? 800;
      const lh = layerRef.current?.clientHeight ?? 600;
      onUpdate({ maximized: true, minimized: false, savedX: win.x, savedY: win.y, savedW: win.width, savedH: win.height, x: 0, y: 0, width: lw, height: lh });
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: win.x, top: win.y,
        width: win.width, height: visH,
        border: '1.5px solid #1a1a18',
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: win.zIndex,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
        pointerEvents: 'auto',
      }}
      onMouseDown={onFocus}
    >
      {/* ── Titlebar ── */}
      <div
        style={{
          background: '#352B21',
          height: TBH,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          cursor: win.maximized ? 'default' : 'grab',
          userSelect: 'none',
          position: 'relative',
        }}
        onMouseDown={(e) => {
          if (win.maximized) return;
          e.stopPropagation();
          onFocus();
          onStartDrag(e, win);
        }}
        onDoubleClick={() => toggleMax()}
      >
        {/* Espacio izquierdo simétrico */}
        <div style={{ width: 54, flexShrink: 0 }} aria-hidden="true" />

        {/* Nombre centrado */}
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: 12, color: '#bbb',
          maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {win.calc.name}
        </span>

        {/* Botones de control — derecha: rojo · amarillo · verde */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Cerrar"
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: '#E05252', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7a1a1a', fontSize: 10, fontWeight: 700, lineHeight: 1,
            }}
          >✕</button>
          <button
            onClick={toggleMin}
            title={win.minimized ? 'Restaurar' : 'Minimizar'}
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: '#E0B752', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7a5a00', fontSize: 12, fontWeight: 700, lineHeight: 1,
            }}
          >−</button>
          <button
            onClick={toggleMax}
            title={win.maximized ? 'Restaurar' : 'Maximizar'}
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: '#52C152', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1a5a1a', fontSize: 10, fontWeight: 700, lineHeight: 1,
            }}
          >⊡</button>
        </div>
      </div>

      {/* ── Contenido: página completa de la calculadora en iframe ── */}
      {!win.minimized && (
        <iframe
          src={`/${win.calc.slug}`}
          title={win.calc.name}
          style={{ flex: 1, border: 'none', width: '100%', display: 'block', background: '#F5F0E8' }}
        />
      )}

      {/* ── Handles de resize ── */}
      {!win.maximized && !win.minimized && (['s','e','w','se','sw'] as const).map((dir) => (
        <Handle
          key={dir}
          dir={dir}
          onStart={(e) => { onFocus(); onStartResize(e, win, dir); }}
        />
      ))}
    </div>
  );
});

/* ─── Reloj en vivo ─────────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="rt-clock">{time}</span>;
}

/* ─── AppShell principal ─────────────────────────────────────────── */
interface Props { initialGroup?: string; }

export default function AppShell({ initialGroup = 'matematicas' }: Props) {
  const [activeGroup, setActiveGroup] = useState(initialGroup);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windows, setWindows]         = useState<WinState[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const layerRef  = useRef<HTMLDivElement>(null);
  const dragRef   = useRef<DragOp | null>(null);
  const resizeRef = useRef<ResizeOp | null>(null);
  const zRef      = useRef(10);

  const group      = CALC_GROUPS.find((g) => g.id === activeGroup);
  const allCalcs   = group ? group.domains.flatMap((d) => getCalcsByDomain(d.id)) : [];
  const totalPages = Math.max(1, Math.ceil(allCalcs.length / PAGE_SIZE));
  const calcs      = allCalcs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Resetear página al cambiar de categoría
  useEffect(() => { setCurrentPage(1); }, [activeGroup]);

  /* ── Helpers ── */
  function updateWin(id: string, u: Partial<WinState>) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...u } : w)));
  }

  function bringToFront(id: string) {
    zRef.current++;
    const z = zRef.current;
    setWindows((prev) => {
      const win = prev.find((w) => w.id === id);
      if (win) history.pushState({}, '', `/${win.calc.slug}`);
      return prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w));
    });
  }

  /* ── Abrir ventana + actualizar URL ── */
  function openCalc(calc: CalcMeta) {
    // En móvil navegamos directamente a la página completa
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.location.href = `/${calc.slug}`;
      return;
    }
    const layer = layerRef.current;
    const lw = layer?.clientWidth  ?? 700;
    const lh = layer?.clientHeight ?? 500;
    const stagger = windows.length * 24;
    const initX   = Math.max(0, Math.min((lw - INIT_W) / 2 + stagger, lw - INIT_W));
    const initY   = Math.max(0, Math.min((lh - INIT_H) / 2 + stagger, lh - INIT_H));

    zRef.current++;
    const id = `${calc.slug}-${Date.now()}`;
    const newWin: WinState = {
      id, calc,
      x: initX, y: initY, width: INIT_W, height: INIT_H,
      minimized: false, maximized: false,
      savedX: initX, savedY: initY, savedW: INIT_W, savedH: INIT_H,
      zIndex: zRef.current,
    };

    setWindows((prev) => [...prev, newWin]);
    history.pushState({}, '', `/${calc.slug}`);
  }

  /* ── Cerrar ventana + restaurar URL ── */
  function closeWin(id: string) {
    setWindows((prev) => {
      const next = prev.filter((w) => w.id !== id);
      if (next.length === 0) {
        history.pushState({}, '', '/');
      } else {
        const top = next.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
        history.pushState({}, '', `/${top.calc.slug}`);
      }
      return next;
    });
  }

  /* ── Drag ── */
  function startDrag(e: React.MouseEvent, win: WinState) {
    document.body.style.cursor     = 'grabbing';
    document.body.style.userSelect = 'none';
    dragRef.current = { winId: win.id, sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y, ww: win.width };
  }

  /* ── Resize ── */
  function startResize(e: React.MouseEvent, win: WinState, dir: string) {
    document.body.style.userSelect = 'none';
    resizeRef.current = { winId: win.id, dir, sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y, ow: win.width, oh: win.height };
  }

  /* ── Listeners globales de mouse ── */
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const layer = layerRef.current;
      if (!layer) return;
      const rect = layer.getBoundingClientRect();

      if (dragRef.current) {
        const { winId, sx, sy, ox, oy, ww } = dragRef.current;
        const newX = Math.max(0, Math.min(ox + e.clientX - sx, rect.width  - ww));
        const newY = Math.max(0, Math.min(oy + e.clientY - sy, rect.height - TBH));
        updateWin(winId, { x: newX, y: newY });
      }

      if (resizeRef.current) {
        const { winId, dir, sx, sy, ox, oy, ow, oh } = resizeRef.current;
        const dx = e.clientX - sx;
        const dy = e.clientY - sy;
        let newX = ox, newY = oy, newW = ow, newH = oh;

        if (dir.includes('e')) newW = Math.max(MIN_W, ow + dx);
        if (dir.includes('s')) newH = Math.max(MIN_H, oh + dy);
        if (dir.includes('w')) { const dw = Math.min(dx, ow - MIN_W); newX = ox + dw; newW = ow - dw; }

        newX = Math.max(0, newX);
        newY = Math.max(0, newY);
        newW = Math.min(newW, rect.width  - newX);
        newH = Math.min(newH, rect.height - newY);
        updateWin(winId, { x: newX, y: newY, width: newW, height: newH });
      }
    }

    function onUp() {
      dragRef.current = resizeRef.current = null;
      document.body.style.cursor = document.body.style.userSelect = '';
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, []);

  return (
    <div className="rt-root">

      {/* ── Topbar ── */}
      <header className="rt-topbar">
        <div className="rt-traffic">
          <span className="rt-dot rt-dot--red"    />
          <span className="rt-dot rt-dot--yellow" />
          <span className="rt-dot rt-dot--green"  />
        </div>
        <a href="/" className="rt-logo">⊞ Calzix</a>
        <div style={{ flex: 1 }} />
        <button className="rt-hamburger" onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={sidebarOpen}>
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <LiveClock />
      </header>

      {/* ── Body ── */}
      <div className="rt-body">
        <div className={`rt-overlay${sidebarOpen ? ' rt-overlay--open' : ''}`}
          onClick={() => setSidebarOpen(false)} aria-hidden="true" />

        <nav className={`rt-sidebar${sidebarOpen ? ' rt-sidebar--open' : ''}`} aria-label="Categorías">
          {CALC_GROUPS.map((g) => {
            const isActive = g.id === activeGroup;
            return (
              <button key={g.id}
                className={`rt-nav-item${isActive ? ' rt-nav-item--active' : ''}`}
                onClick={() => { setActiveGroup(g.id); setSidebarOpen(false); history.pushState({}, '', `/${g.slug}`); }}
                aria-current={isActive ? 'page' : undefined}>
                <i className={`ti ${GROUP_ICONS[g.id] ?? 'ti-calculator'} rt-nav-icon`} aria-hidden="true" />
                <span className="rt-nav-label">{g.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Panel principal — flex column: [scroll grid] + [footer fijo] */}
        <main className="rt-main" style={{
          position: 'relative',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Grid scrolleable — ocupa todo el espacio disponible */}
          <div className="rt-grid-container" style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

            {/* Hero — solo en página 1 */}
            {currentPage === 1 && <Hero />}

            {/* Título de la categoría */}
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#2B2520', margin: '0 0 2px' }}>{group?.label}</h2>
            {group?.description && (
              <p style={{ fontSize: 13, color: '#6b6860', margin: '0 0 4px' }}>{group.description}</p>
            )}
            {totalPages > 1 && (
              <p style={{ fontSize: 11, color: '#9A8A78', margin: '0 0 0' }}>
                Página {currentPage} de {totalPages} · {allCalcs.length} calculadoras
              </p>
            )}

            {/* Grid de tarjetas */}
            <div className="rt-grid">
              {calcs.map((calc) => {
                const Icon = ICONS[calc.icon] ?? SquareFunction;
                return (
                  <button key={calc.slug} className="rt-card" onClick={() => openCalc(calc)}>
                    <div className="rt-card-icon"><Icon size={16} strokeWidth={1.75} /></div>
                    <div>
                      <p className="rt-card-name">{calc.name}</p>
                      <p className="rt-card-desc">{calc.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Paginación */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPage={(p) => { setCurrentPage(p); }}
            />
          </div>

          {/* Footer fijo al fondo */}
          <AppFooter />

          {/* Capa de ventanas flotantes — cubre todo (grid + footer) */}
          <div ref={layerRef} className="rt-window-layer" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {windows.map((win) => (
              <FloatingWindow
                key={win.id}
                win={win}
                layerRef={layerRef}
                onClose={() => closeWin(win.id)}
                onFocus={() => bringToFront(win.id)}
                onUpdate={(u) => updateWin(win.id, u)}
                onStartDrag={startDrag}
                onStartResize={startResize}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
