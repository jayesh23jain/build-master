'use client';
import { useEffect, useRef } from 'react';
import { PROJECT } from '@/data/dashboardData';

export default function PhasesPage({ onModal }: { onModal: () => void }) {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-w]').forEach(el => {
        el.style.width = el.dataset.w + '%';
      });
    }, 100);
  }, []);

  const statusStyle = (s: string) =>
    s === 'done'
      ? 'text-[var(--green)] border-[rgba(52,211,153,.3)] bg-[rgba(52,211,153,.06)]'
      : s === 'active'
      ? 'text-[var(--cyan)] border-[rgba(34,211,238,.3)] bg-[rgba(34,211,238,.06)]'
      : 'text-[var(--muted)] border-[var(--bdr)] bg-transparent';

  return (
    <div className="flex flex-col gap-4">
      {PROJECT.phases.map((p, i) => (
        <div key={p.num} className="phase-page-card" style={{ animationDelay: `${i * 0.08}s` }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bdr)]">
            <div className="flex items-center gap-3">
              <span
                className="w-[9px] h-[9px] rounded-full pulse-dot"
                style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
              />
              <span
                className="font-['Syne',sans-serif] text-[1rem] font-[600] text-[var(--text)]"
              >
                {p.num} — {p.name}
              </span>
            </div>
            <span
              className={`font-['JetBrains_Mono',monospace] text-[0.48rem] uppercase tracking-[.12em] px-[.6rem] py-[.2rem] border ${statusStyle(p.status)}`}
            >
              {p.status}
            </span>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {/* Progress bar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-[3px] bg-[var(--bdr)] overflow-hidden">
                <div
                  data-w={p.pct}
                  className="h-full rounded-sm"
                  style={{ width: '0%', background: p.color, transition: 'width 1.3s cubic-bezier(.16,1,.3,1)' }}
                />
              </div>
              <span className="font-['JetBrains_Mono',monospace] text-[.5rem] text-[var(--muted-l)] shrink-0">
                {p.pct}% complete
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {p.tags.map(t => (
                <span
                  key={t}
                  className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[var(--cyan)] bg-[rgba(34,211,238,.06)] border border-[rgba(34,211,238,.18)] px-[.5rem] py-[.18rem]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--bdr)]">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.14em] text-[var(--muted)] mb-[.3rem]">
                  Est. Cost
                </div>
                <div className="font-['Syne',sans-serif] text-[1rem] font-[600] text-[var(--text)]">
                  {p.cost}
                </div>
              </div>
              <button
                onClick={onModal}
                className="px-5 py-[.6rem] font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.12em] bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--cyan)] text-[var(--bg)] border-none cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(34,211,238,.4)] hover:-translate-y-[1px]"
              >
                Request Quote →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
