'use client';
import { PROJECT } from '@/data/dashboardData';

export default function DocumentsPage({ onToast }:{ onToast:(m:string)=>void }) {
  return (
    <div className="phase-page-card">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bdr)]">
        <div className="flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--muted-l)]"/>Project Vault
        </div>
        <button onClick={()=>onToast('Upload coming soon')} className="px-4 py-[.45rem] font-['JetBrains_Mono',monospace] text-[.52rem] uppercase tracking-[.1em] bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--cyan)] text-[var(--bg)] border-none cursor-pointer hover:shadow-[0_0_18px_var(--cyan-gl)] transition-all">+ Upload</button>
      </div>
      <div className="overflow-x-auto">
        <table className="doc-tbl">
          <thead><tr><th>Document</th><th>Type</th><th>Size</th><th>Uploaded</th><th></th></tr></thead>
          <tbody>
            {PROJECT.docs.map((d,i)=>(
              <tr key={i} onClick={()=>onToast('Opening: '+d.name)}>
                <td><div className="flex items-center gap-2"><div className="w-6 h-6 bg-[var(--card)] border border-[var(--bdr)] flex items-center justify-center text-[.6rem] text-[var(--muted-l)] shrink-0">{d.icon}</div><span className="text-[var(--text)]">{d.name}</span></div></td>
                <td><span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.1em] text-[var(--muted)]">{d.type}</span></td>
                <td><span className="font-['JetBrains_Mono',monospace] text-[.5rem] text-[var(--muted)]">{d.size}</span></td>
                <td><span className="font-['JetBrains_Mono',monospace] text-[.5rem] text-[var(--muted-l)]">{d.date}</span></td>
                <td><button className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[var(--cyan)] px-2 py-1 border border-[rgba(34,211,238,.2)] bg-[rgba(34,211,238,.04)] hover:bg-[rgba(34,211,238,.12)] transition-all cursor-pointer" onClick={e=>{e.stopPropagation();onToast('Downloading: '+d.name)}}>↓ Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
