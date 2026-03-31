'use client';
import { useEffect, useRef } from 'react';
import { PROJECT } from '@/data/dashboardData';

const schedule = [
  { phase:'Foundation & Groundwork', start:'Oct 15, 2024', end:'Dec 28, 2024', status:'done', pct:100, color:'#34d399' },
  { phase:'Structural Framing', start:'Jan 05, 2025', end:'Mar 15, 2025', status:'active', pct:68, color:'#22d3ee' },
  { phase:'Electrical & Plumbing', start:'Feb 01, 2025', end:'Apr 10, 2025', status:'active', pct:32, color:'#f59e4a' },
  { phase:'Interiors & Woodwork', start:'Mar 01, 2025', end:'May 15, 2025', status:'pending', pct:0, color:'#4a6070' },
];
const sClsBadge=(s:string)=>s==='done'?'text-[var(--green)] border-[rgba(52,211,153,.3)] bg-[rgba(52,211,153,.06)]':s==='active'?'text-[var(--cyan)] border-[rgba(34,211,238,.3)] bg-[rgba(34,211,238,.06)]':'text-[var(--muted)] border-[var(--bdr)] bg-transparent';

export default function SchedulePage() {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return; mounted.current = true;
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-sw]').forEach(el => { el.style.width = el.dataset.sw + '%'; });
    }, 100);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bdr)]">
          <div className="flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--cyan)] pulse-dot"/>Project Schedule
          </div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[var(--muted)]">Oct 2024 – May 2025</span>
        </div>
        <div className="px-6 py-5 flex flex-col gap-5">
          {schedule.map((s,i)=>(
            <div key={i} className="p-4 bg-[var(--card)] border border-[var(--bdr)] hover:border-[var(--bdr-h)] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="font-['Syne',sans-serif] text-[.85rem] font-[600] text-[var(--text)]">{s.phase}</div>
                <span className={`font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] px-[.5rem] py-[.18rem] border ${sClsBadge(s.status)}`}>{s.status}</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1 h-[3px] bg-[var(--bdr)] overflow-hidden">
                  <div data-sw={s.pct} className="h-full" style={{width:'0%',background:s.color,transition:'width 1.3s cubic-bezier(.16,1,.3,1)',transitionDelay:`${i*.15}s`}}/>
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-[.48rem] text-[var(--muted-l)] shrink-0">{s.pct}%</span>
              </div>
              <div className="flex gap-6">
                <div><div className="font-['JetBrains_Mono',monospace] text-[.42rem] uppercase tracking-[.12em] text-[var(--muted)] mb-[2px]">Start</div><div className="font-['JetBrains_Mono',monospace] text-[.52rem] text-[var(--text)]">{s.start}</div></div>
                <div><div className="font-['JetBrains_Mono',monospace] text-[.42rem] uppercase tracking-[.12em] text-[var(--muted)] mb-[2px]">End</div><div className="font-['JetBrains_Mono',monospace] text-[.52rem] text-[var(--text)]">{s.end}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone timeline */}
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bdr)]">
          <div className="flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--amber)] pulse-dot"/>Milestones
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="tl-wrap flex flex-col">
            {PROJECT.timeline.map((t,i)=>(
              <div key={i} className="flex gap-4 items-start py-3">
                <div className={`w-[9px] h-[9px] rounded-full mt-[5px] shrink-0 z-[1] border ${t.state==='done'?'bg-[var(--green)] border-[var(--green)]':t.state==='active'?'bg-[var(--cyan)] border-[var(--cyan)] pulse-dot':'bg-transparent border-[var(--bdr-h)]'}`}/>
                <div className="flex-1 flex justify-between items-center">
                  <div className="text-[.82rem] text-[var(--text)]">{t.name}</div>
                  <div className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[var(--muted)]">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
