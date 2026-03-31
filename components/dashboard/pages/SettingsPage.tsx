'use client';
import { useState } from 'react';

export default function SettingsPage({ onToast }:{ onToast:(m:string)=>void }) {
  const [name, setName] = useState('Jayesh Jain');
  const [email, setEmail] = useState('jayesh@buildmaster.in');
  const [project, setProject] = useState('Greenfield Residence');
  const [notifs, setNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const inp = 'w-full px-4 py-3 bg-[var(--bg)] border border-[var(--bdr)] text-[var(--text)] font-[\'DM_Sans\',sans-serif] text-[.85rem] outline-none focus:border-[var(--cyan)] transition-colors placeholder-[var(--muted)]';
  const label = 'block font-[\'JetBrains_Mono\',monospace] text-[.48rem] uppercase tracking-[.14em] text-[var(--muted)] mb-2';
  const section = 'phase-page-card mb-4';

  return (
    <div className="max-w-2xl">
      {/* Profile */}
      <div className={section}>
        <div className="px-6 py-5 border-b border-[var(--bdr)] flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--cyan)] pulse-dot"/>Profile
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center gap-4 pb-4 border-b border-[var(--bdr)]">
            <div className="w-14 h-14 bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--cyan)] flex items-center justify-center font-['Syne',sans-serif] text-[1rem] font-[700] text-[var(--bg)] border border-[rgba(34,211,238,.3)]">JM</div>
            <div><div className="font-['Syne',sans-serif] text-[.9rem] font-[600] text-[var(--text)]">{name}</div><div className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.1em] text-[var(--muted)]">Project Owner</div></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={label}>Full Name</label><input className={inp} value={name} onChange={e=>setName(e.target.value)}/></div>
            <div><label className={label}>Email</label><input className={inp} value={email} onChange={e=>setEmail(e.target.value)}/></div>
          </div>
        </div>
      </div>

      {/* Project */}
      <div className={section}>
        <div className="px-6 py-5 border-b border-[var(--bdr)] flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--green)] pulse-dot"/>Project Settings
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <div><label className={label}>Project Name</label><input className={inp} value={project} onChange={e=>setProject(e.target.value)}/></div>
          <div><label className={label}>Location</label><input className={inp} defaultValue="Mumbai, Maharashtra" placeholder="City, State"/></div>
        </div>
      </div>

      {/* Preferences */}
      <div className={section}>
        <div className="px-6 py-5 border-b border-[var(--bdr)] flex items-center gap-2 font-['Syne',sans-serif] text-[.88rem] font-[600] text-[var(--text)]">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--amber)] pulse-dot"/>Preferences
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          {[['Email Notifications', notifs, setNotifs],['Dark Mode', darkMode, setDarkMode]].map(([label,val,set])=>(
            <div key={label as string} className="flex items-center justify-between py-2 border-b border-[var(--bdr)] last:border-0">
              <span className="font-['DM_Sans',sans-serif] text-[.85rem] text-[var(--text)]">{label as string}</span>
              <button onClick={()=>(set as Function)(!val)} className={`w-10 h-5 relative border transition-colors ${val?'bg-[rgba(34,211,238,.15)] border-[var(--cyan)]':'bg-transparent border-[var(--bdr-h)]'}`}>
                <span className={`absolute top-[2px] w-3 h-3 bg-[${val?'var(--cyan)':'var(--muted)'}] transition-all ${val?'left-[calc(100%-14px)]':'left-[2px]'}`} style={{background:val?'var(--cyan)':'var(--muted)'}}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <button onClick={()=>onToast('Settings saved!')} className="px-6 py-3 font-['JetBrains_Mono',monospace] text-[.55rem] uppercase tracking-[.12em] bg-gradient-to-br from-[var(--cyan-dim)] to-[var(--cyan)] text-[var(--bg)] border-none cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(34,211,238,.4)] hover:-translate-y-[1px]">
        Save Changes →
      </button>
    </div>
  );
}
