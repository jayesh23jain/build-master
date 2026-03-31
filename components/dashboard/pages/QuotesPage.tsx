'use client';
import { PROJECT } from '@/data/dashboardData';

const sClsBadge=(s:string)=>s==='review'?'text-[var(--cyan)] border-[rgba(34,211,238,.25)] bg-[rgba(34,211,238,.06)]':s==='new'?'text-[var(--amber)] border-[rgba(245,158,74,.25)] bg-[rgba(245,158,74,.06)]':'text-[var(--muted)] border-[var(--bdr)] bg-transparent';

export default function QuotesPage({ onModal }:{ onModal:()=>void }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-[1px] bg-[var(--bdr)] border border-[var(--bdr)] mb-2">
        {[['Total Quotes','4','var(--cyan)'],['Pending Review','3','var(--amber)'],['Accepted','1','var(--green)']].map(([l,v,c])=>(
          <div key={l} className="kpi-card">
            <div className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.14em] text-[var(--muted)] mb-3 flex items-center gap-2"><div className="w-[5px] h-[5px] rounded-full pulse-dot" style={{background:c as string}}/>{l}</div>
            <div className="font-['Syne',sans-serif] text-[1.8rem] font-[800]" style={{color:c as string}}>{v}</div>
          </div>
        ))}
      </div>
      {PROJECT.quotes.map((q,i)=>(
        <div key={i} className="phase-page-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bdr)]">
            <div className="flex items-center gap-3">
              <div className="font-['Syne',sans-serif] text-[1.2rem] font-[800] text-[var(--bdr-h)]">{q.phase}</div>
              <div>
                <div className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">{q.title}</div>
                <div className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[var(--muted)] mt-[2px]">{q.vendors.length} quote{q.vendors.length!==1?'s':''} received</div>
              </div>
            </div>
            <span className={`font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] px-[.5rem] py-[.18rem] border ${sClsBadge(q.status)}`}>{q.status==='open'?'No Quotes':q.status}</span>
          </div>
          <div className="px-6 py-4">
            {q.vendors.length>0?(
              <div className="flex flex-col gap-2">
                {q.vendors.map((vendor,vi)=>(
                  <div key={vi} className="q-row">
                    <div className="w-9 h-9 bg-gradient-to-br from-[var(--card)] to-[var(--elev)] border border-[var(--bdr-h)] flex items-center justify-center font-['Syne',sans-serif] text-[.6rem] font-[700] text-[var(--muted-l)]">{vendor.split(' ').map(w=>w[0]).join('')}</div>
                    <div className="flex-1"><div className="font-['Syne',sans-serif] text-[.82rem] font-[600] text-[var(--text)]">{vendor}</div><div className="font-['JetBrains_Mono',monospace] text-[.45rem] text-[var(--muted)] mt-[2px]">SUBMITTED 2D AGO</div></div>
                    <div className="font-['Syne',sans-serif] text-[.95rem] font-[700] text-[var(--cyan)]">{q.amounts[vi]}</div>
                    <button className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[var(--cyan)] px-2 py-1 border border-[rgba(34,211,238,.2)] bg-[rgba(34,211,238,.04)] hover:bg-[rgba(34,211,238,.12)] transition-all cursor-pointer">Review</button>
                  </div>
                ))}
              </div>
            ):(
              <div className="text-center py-6">
                <div className="font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.12em] text-[var(--muted)] mb-3">No quotes received yet</div>
                <button onClick={onModal} className="px-4 py-2 font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.1em] bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--cyan)] text-[var(--bg)] border-none cursor-pointer hover:shadow-[0_0_18px_var(--cyan-gl)] transition-all">Post Request →</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
