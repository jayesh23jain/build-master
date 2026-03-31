'use client';
import { useEffect, useRef } from 'react';
import { PROJECT } from '@/data/dashboardData';

export default function BudgetPage() {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return; mounted.current = true;
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-bw]').forEach(el => { el.style.width = el.dataset.bw + '%'; });
    }, 100);
  }, []);

  const spentPct = Math.round(PROJECT.spent / PROJECT.budget * 100);
  const remaining = PROJECT.budget - PROJECT.spent;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
      {/* Budget breakdown */}
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bdr)]">
          <div className="flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--amber)] pulse-dot"/>Budget Breakdown
          </div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[var(--muted)]">FY 2024–25</span>
        </div>
        <div className="px-6 py-5">
          <div className="flex flex-col gap-5 mb-6">
            {PROJECT.budget_cats.map((b,i)=>{
              const pct=Math.round(b.spent/b.total*100);
              return (
                <div key={b.label}>
                  <div className="flex justify-between mb-2">
                    <span className="font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.1em] text-[var(--muted-l)]">{b.label}</span>
                    <span className="font-['JetBrains_Mono',monospace] text-[.52rem] text-[var(--text)]">₹{(b.spent/100000).toFixed(1)}L / ₹{(b.total/100000).toFixed(0)}L</span>
                  </div>
                  <div className="bgt-bar">
                    <div className="bgt-fill" data-bw={pct} style={{width:'0%',background:b.color,transitionDelay:`${i*.15}s`}}/>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Summary grid */}
          <div className="grid grid-cols-2 gap-[1px] bg-[var(--bdr)] border border-[var(--bdr)]">
            {[
              ['Total Budget','₹'+(PROJECT.budget/100000).toFixed(0)+'L','var(--text)'],
              ['Spent','₹'+(PROJECT.spent/100000).toFixed(1)+'L','var(--amber)'],
              ['Remaining','₹'+(remaining/100000).toFixed(1)+'L','var(--green)'],
              ['% Used',spentPct+'%','var(--cyan)'],
            ].map(([l,v,c])=>(
              <div key={l} className="bg-[var(--card)] px-4 py-3">
                <div className="font-['JetBrains_Mono',monospace] text-[.47rem] uppercase tracking-[.12em] text-[var(--muted)] mb-1">{l}</div>
                <div className="font-['Syne',sans-serif] text-[1.1rem] font-[700]" style={{color:c as string}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline sidebar */}
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bdr)]">
          <div className="flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--amber)] pulse-dot"/>Milestones
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="tl-wrap flex flex-col">
            {PROJECT.timeline.map((t,i)=>(
              <div key={i} className="flex gap-4 items-start py-3 relative">
                <div className={`w-[9px] h-[9px] rounded-full mt-[5px] shrink-0 relative z-[1] border ${t.state==='done'?'bg-[var(--green)] border-[var(--green)] shadow-[0_0_8px_rgba(52,211,153,.4)]':t.state==='active'?'bg-[var(--cyan)] border-[var(--cyan)] shadow-[0_0_8px_var(--cyan-gl)] pulse-dot':'bg-transparent border-[var(--bdr-h)]'}`}/>
                <div>
                  <div className="text-[.82rem] text-[var(--text)] mb-[2px]">{t.name}</div>
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
