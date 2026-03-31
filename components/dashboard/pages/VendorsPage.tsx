'use client';
import { PROJECT } from '@/data/dashboardData';

export default function VendorsPage({ onModal, onToast }: { onModal:()=>void; onToast:(m:string)=>void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1px] bg-[var(--bdr)] border border-[var(--bdr)]">
      {PROJECT.vendors.map(v => (
        <div key={v.initials} className="vendor-card" style={{padding:'2rem'}}>
          <div className="v-avatar w-12 h-12 bg-gradient-to-br from-[var(--card)] to-[var(--elev)] border border-[var(--bdr-h)] flex items-center justify-center font-['Syne',sans-serif] text-[.85rem] font-[700] text-[var(--muted-l)] mb-4 transition-all">{v.initials}</div>
          <div className="v-name font-['Syne',sans-serif] text-[1rem] font-[600] text-[var(--text)] mb-1 transition-colors">{v.name}</div>
          <div className="font-['JetBrains_Mono',monospace] text-[.5rem] uppercase tracking-[.1em] text-[var(--muted)] mb-3">{v.trade}</div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[var(--amber)] text-[.9rem]">{'★'.repeat(Math.floor(v.rating))}{v.rating%1?'½':''}</span>
            <span className="font-['JetBrains_Mono',monospace] text-[.55rem] text-[var(--muted-l)]">{v.rating}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="font-['JetBrains_Mono',monospace] text-[.45rem] text-[var(--muted)]">{v.projects} projects · {v.phone}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-5">
            {v.tags.map(t=>(
              <span key={t} className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.08em] text-[var(--cyan)] bg-[rgba(34,211,238,.06)] border border-[rgba(34,211,238,.18)] px-[.4rem] py-[.15rem]">{t}</span>
            ))}
          </div>
          <div className="pt-4 border-t border-[var(--bdr)] flex gap-2">
            <button onClick={()=>onToast('Viewing '+v.name)} className="flex-1 py-2 font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.1em] bg-transparent border border-[var(--bdr-h)] text-[var(--muted-l)] cursor-pointer transition-all hover:border-[var(--cyan)] hover:text-[var(--cyan)]">View Profile</button>
            <button onClick={onModal} className="flex-1 py-2 font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.1em] bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--cyan)] text-[var(--bg)] border-none cursor-pointer transition-all hover:shadow-[0_0_18px_var(--cyan-gl)] hover:-translate-y-[1px]">Request</button>
          </div>
        </div>
      ))}
    </div>
  );
}
