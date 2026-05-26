import CalcCard from './CalcCard';
import { CALC_GROUPS, getCalcsByDomain } from '@/lib/constants/calcs';

export default function HomeCalcs() {
  return (
    <div className="space-y-12">
      {CALC_GROUPS.map((group) => {
        const allCalcs = group.domains.flatMap((d) => getCalcsByDomain(d.id));
        const preview = allCalcs.slice(0, 4);

        return (
          <section key={group.id} id={group.id}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-lg font-extrabold text-[var(--color-text)] whitespace-nowrap">
                {group.label}
              </h2>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              {allCalcs.length > 0 && (
                <a
                  href={`/${group.slug}`}
                  className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] whitespace-nowrap transition-colors"
                >
                  Ver todas &rarr;
                </a>
              )}
            </div>

            {preview.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {preview.map((calc) => (
                  <CalcCard key={calc.slug} calc={calc} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--color-text-muted)]">Próximamente.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
