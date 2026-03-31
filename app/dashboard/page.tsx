'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECT } from '@/data/dashboardData';
import PhasesPage from '@/components/dashboard/pages/PhasesPage';
import VendorsPage from '@/components/dashboard/pages/VendorsPage';
import QuotesPage from '@/components/dashboard/pages/QuotesPage';
import DocumentsPage from '@/components/dashboard/pages/DocumentsPage';
import BudgetPage from '@/components/dashboard/pages/BudgetPage';
import SchedulePage from '@/components/dashboard/pages/SchedulePage';
import SettingsPage from '@/components/dashboard/pages/SettingsPage';

// ─── Types ────────────────────────────────────────────────────────────────────
type Page = 'dashboard'|'phases'|'vendors'|'quotes'|'documents'|'budget'|'schedule'|'settings';

const NAV_MAIN = [
  { id:'dashboard' as Page, label:'Dashboard', icon:'⬡', badge:null },
  { id:'phases'    as Page, label:'Phases',    icon:'◈', badge:'4',   bdCls:'bg-[rgba(34,211,238,.1)] text-[#22d3ee] border border-[rgba(34,211,238,.2)]' },
  { id:'vendors'   as Page, label:'Vendors',   icon:'◉', badge:'2 New', bdCls:'bg-[rgba(245,158,74,.1)] text-[#f59e4a] border border-[rgba(245,158,74,.2)]' },
  { id:'quotes'    as Page, label:'Quotes',    icon:'◫', badge:'3',   bdCls:'bg-[rgba(248,113,113,.1)] text-[#f87171] border border-[rgba(248,113,113,.2)]' },
  { id:'documents' as Page, label:'Documents', icon:'▣', badge:null },
];
const NAV_TOOLS = [
  { id:'budget'   as Page, label:'Budget',   icon:'◰' },
  { id:'schedule' as Page, label:'Schedule', icon:'◱' },
  { id:'settings' as Page, label:'Settings', icon:'◲' },
];
const PAGE_TITLES:Record<Page,string> = {
  dashboard:'Dashboard',phases:'Phases',vendors:'Vendors',
  quotes:'Quotes',documents:'Documents',budget:'Budget',
  schedule:'Schedule',settings:'Settings',
};

// ─── Inline Dashboard Overview ─────────────────────────────────────────────────
function DashOverview({ onNav, onModal, onToast }:{ onNav:(p:Page)=>void; onModal:()=>void; onToast:(m:string)=>void }) {
  const mounted = useRef(false);
  useEffect(()=>{
    if(mounted.current) return; mounted.current=true;
    setTimeout(()=>{ document.querySelectorAll<HTMLElement>('[data-pw]').forEach(el=>{ el.style.width=el.dataset.pw+'%'; }); },100);
  },[]);

  const totalPct = Math.round(PROJECT.phases.reduce((s,p)=>s+p.pct,0)/PROJECT.phases.length);
  const spentPct = Math.round(PROJECT.spent/PROJECT.budget*100);

  const kpis = [
    {label:'Overall Progress', value:totalPct+'%', color:'#22d3ee', delta:'↑ 12% this week', dCls:'text-[#34d399]'},
    {label:'Budget Spent', value:'₹'+(PROJECT.spent/100000).toFixed(1)+'L', color:'#f59e4a', delta:spentPct+'% of total budget', dCls:'text-[#7a9aaa]'},
    {label:'Active Vendors', value:'3', color:'#34d399', delta:'↑ 2 new applicants', dCls:'text-[#34d399]'},
    {label:'Open Quotes', value:'3', color:'#d946ef', delta:'— Awaiting review', dCls:'text-[#7a9aaa]'},
  ];

  const actCls=(c:string)=>({
    green:'text-[#34d399] border-[rgba(52,211,153,.2)] bg-[rgba(52,211,153,.05)]',
    cyan:'text-[#22d3ee] border-[rgba(34,211,238,.2)] bg-[rgba(34,211,238,.05)]',
    amber:'text-[#f59e4a] border-[rgba(245,158,74,.2)] bg-[rgba(245,158,74,.05)]',
    mag:'text-[#d946ef] border-[rgba(217,70,239,.2)] bg-[rgba(217,70,239,.05)]',
    red:'text-[#f87171] border-[rgba(248,113,113,.2)] bg-[rgba(248,113,113,.05)]',
  } as Record<string,string>)[c] || '';

  const statusCls=(s:string)=>s==='done'?'text-[#34d399] border-[rgba(52,211,153,.25)] bg-[rgba(52,211,153,.06)]':s==='active'?'text-[#22d3ee] border-[rgba(34,211,238,.25)] bg-[rgba(34,211,238,.06)]':'text-[#4a6070] border-[#1e2a3a] bg-transparent';

  return (<>
    {/* KPI Strip */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#1e2a3a] border border-[#1e2a3a] mb-6">
      {kpis.map((k,i)=>(
        <div key={i} className="kpi-card">
          <div className="flex items-center gap-2 mb-3 font-['JetBrains_Mono',monospace] text-[.5rem] uppercase tracking-[.14em] text-[#4a6070]">
            <div className="w-[5px] h-[5px] rounded-full pulse-dot" style={{background:k.color,boxShadow:`0 0 6px ${k.color}50`}}/>
            {k.label}
          </div>
          <div className="font-['Syne',sans-serif] text-[2rem] font-[800] tracking-[-0.04em] leading-none mb-2" style={{color:k.color}}>{k.value}</div>
          <div className={`font-['JetBrains_Mono',monospace] text-[.48rem] tracking-[.08em] ${k.dCls}`}>{k.delta}</div>
        </div>
      ))}
    </div>

    {/* Phases + Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-5">
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2"><span className="w-[5px] h-[5px] rounded-full bg-[#22d3ee] pulse-dot shadow-[0_0_6px_#22d3ee]"/><span className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[#e2eef5]">Construction Phases</span></div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#4a6070]">4 phases total</span>
        </div>
        <div className="p-5 flex flex-col gap-3">
          {PROJECT.phases.map(p=>(
            <div key={p.num} className="phase-row" onClick={()=>onNav('phases')}>
              <div className="ph-num font-['Syne',sans-serif] text-[1.4rem] font-[800] text-[#2a3d52] shrink-0 w-8 transition-all">{p.num}</div>
              <div className="flex-1 min-w-0">
                <div className="ph-name font-['Syne',sans-serif] text-[.82rem] font-[600] text-[#e2eef5] mb-1 transition-colors">{p.name}</div>
                <div className="text-[.72rem] text-[#4a6070] font-light">{p.sub}</div>
              </div>
              <div className="w-32 shrink-0">
                <div className="h-[2px] bg-[#1e2a3a] mb-1"><div data-pw={p.pct} className="h-full" style={{width:'0%',background:p.color,transition:'width 1.2s cubic-bezier(.16,1,.3,1)'}}/></div>
                <div className="font-['JetBrains_Mono',monospace] text-[.47rem] text-[#7a9aaa] text-right">{p.pct}%</div>
              </div>
              <span className={`font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.1em] px-2 py-[.18rem] border whitespace-nowrap shrink-0 ${statusCls(p.status)}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2"><span className="w-[5px] h-[5px] rounded-full bg-[#d946ef] pulse-dot"/><span className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[#e2eef5]">Activity Feed</span></div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#4a6070]">Last 7 days</span>
        </div>
        <div className="p-5">
          {PROJECT.activity.map((a,i)=>(
            <div key={i} className="flex items-start gap-3 py-3 border-b border-[#1e2a3a] last:border-0 cursor-default">
              <div className={`w-7 h-7 shrink-0 border flex items-center justify-center text-[.7rem] mt-[2px] ${actCls(a.cls)}`}>{a.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[.82rem] text-[#e2eef5] leading-[1.4] mb-[2px] font-light"><strong className="font-medium text-[#22d3ee]">{a.name}</strong> {a.action}</div>
                <div className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[#4a6070]">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Vendors + Timeline + Quotes */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
      {/* Vendors */}
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2"><span className="w-[5px] h-[5px] rounded-full bg-[#34d399] pulse-dot"/><span className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[#e2eef5]">Active Vendors</span></div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#4a6070]">3 verified</span>
        </div>
        <div className="grid grid-cols-3 gap-[1px] bg-[#1e2a3a] border-t border-[#1e2a3a]">
          {PROJECT.vendors.map(v=>(
            <div key={v.initials} className="vendor-card p-4 cursor-pointer" onClick={()=>onNav('vendors')}>
              <div className="v-avatar w-9 h-9 bg-[#161c28] border border-[#2a3d52] flex items-center justify-center font-['Syne',sans-serif] text-[.65rem] font-[700] text-[#7a9aaa] mb-3 transition-all">{v.initials}</div>
              <div className="v-name font-['Syne',sans-serif] text-[.8rem] font-[600] text-[#e2eef5] mb-1 transition-colors leading-tight">{v.name}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[.42rem] uppercase tracking-[.08em] text-[#4a6070] mb-2">{v.trade}</div>
              <div className="text-[#f59e4a] text-[.65rem]">{'★'.repeat(Math.floor(v.rating))}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2"><span className="w-[5px] h-[5px] rounded-full bg-[#f59e4a] pulse-dot"/><span className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[#e2eef5]">Milestones</span></div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#4a6070]">Jan–May 2025</span>
        </div>
        <div className="p-5">
          <div className="tl-wrap flex flex-col">
            {PROJECT.timeline.map((t,i)=>(
              <div key={i} className="flex gap-4 items-start py-[.65rem]">
                <div className={`w-[9px] h-[9px] rounded-full mt-[5px] shrink-0 relative z-[1] border ${t.state==='done'?'bg-[#34d399] border-[#34d399]':t.state==='active'?'bg-[#22d3ee] border-[#22d3ee] pulse-dot':'bg-transparent border-[#2a3d52]'}`}/>
                <div><div className="text-[.8rem] text-[#e2eef5] mb-[2px]">{t.name}</div><div className="font-['JetBrains_Mono',monospace] text-[.43rem] uppercase tracking-[.1em] text-[#4a6070]">{t.date}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes */}
      <div className="phase-page-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2"><span className="w-[5px] h-[5px] rounded-full bg-[#f87171] pulse-dot"/><span className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[#e2eef5]">Quote Requests</span></div>
          <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#4a6070]">3 pending</span>
        </div>
        <div className="p-5 flex flex-col gap-2">
          {PROJECT.quotes.slice(0,2).map((q,i)=>(
            <div key={i} className="q-row" onClick={()=>onNav('quotes')}>
              <div className="font-['Syne',sans-serif] text-[1rem] font-[800] text-[#2a3d52] w-6">{q.phase}</div>
              <div className="flex-1 font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.1em] text-[#4a6070]">{q.title}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[.52rem]"><strong className="text-[#22d3ee]">{q.vendors.length}</strong> <span className="text-[#e2eef5]">quotes</span></div>
              <span className={`font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.08em] px-2 py-[.15rem] border ${q.status==='review'?'text-[#22d3ee] border-[rgba(34,211,238,.2)] bg-[rgba(34,211,238,.06)]':'text-[#f59e4a] border-[rgba(245,158,74,.2)] bg-[rgba(245,158,74,.06)]'}`}>{q.status}</span>
            </div>
          ))}
          <button onClick={onModal} className="w-full border border-dashed border-[#1e2a3a] py-3 font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#4a6070] hover:text-[#22d3ee] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,.04)] transition-all">+ Post New Request…</button>
        </div>
      </div>
    </div>

    {/* Documents table */}
    <div className="phase-page-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2a3a]">
        <div className="flex items-center gap-2"><span className="w-[5px] h-[5px] rounded-full bg-[#7a9aaa]"/><span className="font-['Syne',sans-serif] text-[.88rem] font-[600] text-[#e2eef5]">Recent Documents</span></div>
        <span className="font-['JetBrains_Mono',monospace] text-[.48rem] uppercase tracking-[.12em] text-[#22d3ee] cursor-pointer hover:text-[#e2eef5] transition-colors" onClick={()=>onNav('documents')}>View all →</span>
      </div>
      <table className="doc-tbl">
        <thead><tr><th>Document</th><th>Type</th><th>Size</th><th>Date</th><th></th></tr></thead>
        <tbody>
          {PROJECT.docs.slice(0,4).map((d,i)=>(
            <tr key={i} onClick={()=>onToast('Opening: '+d.name)}>
              <td><div className="flex items-center gap-2"><div className="w-6 h-6 bg-[#161c28] border border-[#1e2a3a] flex items-center justify-center text-[.55rem] text-[#7a9aaa] shrink-0">{d.icon}</div><span className="text-[#e2eef5]">{d.name}</span></div></td>
              <td><span className="font-['JetBrains_Mono',monospace] text-[.47rem] uppercase tracking-[.1em] text-[#4a6070]">{d.type}</span></td>
              <td><span className="font-['JetBrains_Mono',monospace] text-[.48rem] text-[#4a6070]">{d.size}</span></td>
              <td><span className="font-['JetBrains_Mono',monospace] text-[.48rem] text-[#7a9aaa]">{d.date}</span></td>
              <td><button className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[#22d3ee] px-2 py-1 border border-[rgba(34,211,238,.2)] bg-[rgba(34,211,238,.04)] hover:bg-[rgba(34,211,238,.12)] transition-all">↓ Get</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>);
}

// ─── MAIN EXPORT ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [page, setPage] = useState<Page>('dashboard');
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const toastT = useRef<NodeJS.Timeout|null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg:string)=>{
    if(toastT.current) clearTimeout(toastT.current);
    setToast(msg); setToastShow(true);
    toastT.current = setTimeout(()=>setToastShow(false),3000);
  },[]);

  useEffect(()=>{
    const handler=(e:MouseEvent)=>{
      if(glowRef.current){ glowRef.current.style.left=e.clientX+'px'; glowRef.current.style.top=e.clientY+'px'; }
    };
    document.addEventListener('mousemove',handler);
    return ()=>document.removeEventListener('mousemove',handler);
  },[]);

  const nav=(p:Page)=>setPage(p);

  return (
    <div style={{display:'flex',height:'100vh',width:'100%',overflow:'hidden',background:'var(--bg)',color:'var(--text)'}}>
      {/* Cursor glow */}
      <div ref={glowRef} id="cursor-glow"/>

      {/* ── SIDEBAR ─────────────────────────────────── */}
      <aside className="bm-sidebar">
        <div className="sidebar-grid"/>
        {/* Brand */}
        <div className="relative z-[1] px-5 py-6 pb-5 flex items-center gap-3 border-b border-[#1e2a3a] shrink-0">
          <div className="w-7 h-7 bg-gradient-to-br from-[#0e7490] to-[#22d3ee] flex items-center justify-center font-['Syne',sans-serif] text-[.7rem] font-[800] text-[#0d0f14] shrink-0 shadow-[0_0_12px_rgba(34,211,238,.2)]">BM</div>
          <span className="font-['Syne',sans-serif] text-[.9rem] font-[800] tracking-[.1em] uppercase text-[#e2eef5]">BUILD<span className="text-[#22d3ee]">.</span>MASTER</span>
        </div>
        {/* Project switcher */}
        <div className="relative z-[1] mx-4 mt-4 mb-1 bg-[#161c28] border border-[#1e2a3a] p-3 px-4 cursor-pointer hover:border-[#2a3d52] hover:bg-[#1a2235] transition-all">
          <div className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.14em] text-[#4a6070] mb-1">Current Project</div>
          <div className="font-['Syne',sans-serif] text-[.82rem] font-[600] text-[#e2eef5] mb-1">Greenfield Residence</div>
          <div className="font-['JetBrains_Mono',monospace] text-[.48rem] text-[#4a6070] flex items-center gap-2">
            <div className="w-[5px] h-[5px] rounded-full bg-[#34d399] pulse-dot"/>Phase 2 Active
          </div>
        </div>
        {/* Main nav */}
        <div className="relative z-[1] font-['JetBrains_Mono',monospace] text-[.43rem] uppercase tracking-[.16em] text-[#4a6070] px-5 pt-4 pb-2 shrink-0">Main</div>
        <ul className="relative z-[1] list-none overflow-y-auto" style={{scrollbarWidth:'thin'}}>
          {NAV_MAIN.map(item=>(
            <li key={item.id} className="mx-2 my-[1px]">
              <div className={`nav-lnk ${page===item.id?'active':''}`} onClick={()=>nav(item.id)}>
                <span className="w-[14px] text-center shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge&&<span className={`ml-auto font-['JetBrains_Mono',monospace] text-[.42rem] tracking-[.08em] px-[.5rem] py-[.12rem] ${'bdCls' in item?item.bdCls:''}`}>{item.badge}</span>}
              </div>
            </li>
          ))}
        </ul>
        {/* Tools nav */}
        <div className="relative z-[1] font-['JetBrains_Mono',monospace] text-[.43rem] uppercase tracking-[.16em] text-[#4a6070] px-5 pt-4 pb-2 shrink-0">Tools</div>
        <ul className="relative z-[1] list-none shrink-0">
          {NAV_TOOLS.map(item=>(
            <li key={item.id} className="mx-2 my-[1px]">
              <div className={`nav-lnk ${page===item.id?'active':''}`} onClick={()=>nav(item.id)}>
                <span className="w-[14px] text-center shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* User */}
        <div className="relative z-[1] mt-auto p-4 border-t border-[#1e2a3a] shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0e7490] to-[#22d3ee] flex items-center justify-center font-['Syne',sans-serif] text-[.65rem] font-[700] text-[#0d0f14] border border-[rgba(34,211,238,.3)]">JM</div>
            <div><div className="font-['Syne',sans-serif] text-[.8rem] font-[600] text-[#e2eef5]">Jayesh Jain</div><div className="font-['JetBrains_Mono',monospace] text-[.45rem] uppercase tracking-[.1em] text-[#4a6070]">Project Owner</div></div>
          </div>
          <button className="w-full py-2 font-['JetBrains_Mono',monospace] text-[.5rem] uppercase tracking-[.1em] bg-transparent border border-[#2a3d52] text-[#4a6070] cursor-pointer transition-all hover:border-[#f87171] hover:text-[#f87171]">← Logout</button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────── */}
      <div style={{flex:1,display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden',minWidth:0}}>
        {/* Topbar */}
        <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem 2rem',borderBottom:'1px solid #1e2a3a',background:'rgba(13,15,20,.96)',backdropFilter:'blur(8px)',flexShrink:0,zIndex:50}}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'1.1rem',fontWeight:700,letterSpacing:'-.015em',color:'#e2eef5'}}>{PAGE_TITLES[page]}</h1>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.5rem',textTransform:'uppercase',letterSpacing:'.1em',color:'#4a6070',display:'flex',alignItems:'center',gap:'.4rem'}}>
              <span>Build Master</span><span style={{opacity:.4}}>/</span><span style={{color:'#22d3ee'}}>{PAGE_TITLES[page]}</span>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'.8rem'}}>
            <button onClick={()=>showToast('3 new notifications')} style={{padding:'.45rem .8rem',fontFamily:'JetBrains Mono,monospace',fontSize:'.55rem',textTransform:'uppercase',letterSpacing:'.1em',background:'transparent',border:'1px solid #2a3d52',color:'#7a9aaa',cursor:'pointer',transition:'all .2s',position:'relative'}} className="hover:border-[#22d3ee] hover:text-[#22d3ee]">
              🔔<span style={{position:'absolute',top:'4px',right:'4px',width:'6px',height:'6px',background:'#f87171',borderRadius:'50%',boxShadow:'0 0 6px rgba(248,113,113,.5)'}}/>
            </button>
            <button onClick={()=>showToast('Search coming soon')} style={{padding:'.45rem 1rem',fontFamily:'JetBrains Mono,monospace',fontSize:'.55rem',textTransform:'uppercase',letterSpacing:'.1em',background:'transparent',border:'1px solid #2a3d52',color:'#7a9aaa',cursor:'pointer',transition:'all .2s'}} className="hover:border-[#22d3ee] hover:text-[#22d3ee]">⌕ Search</button>
            <button onClick={()=>setModal(true)} style={{padding:'.45rem 1rem',fontFamily:'JetBrains Mono,monospace',fontSize:'.55rem',textTransform:'uppercase',letterSpacing:'.1em',background:'linear-gradient(135deg,#0e7490,#22d3ee)',border:'none',color:'#0d0f14',cursor:'pointer',transition:'all .2s',fontWeight:500}} className="hover:shadow-[0_0_18px_rgba(34,211,238,.35)] hover:-translate-y-[1px]">+ New Request</button>
          </div>
        </header>

        {/* Page content */}
        <main style={{flex:1,overflowY:'auto',padding:'2rem',background:'var(--bg)'}} key={page}>
          {page==='dashboard'  && <DashOverview onNav={nav} onModal={()=>setModal(true)} onToast={showToast}/>}
          {page==='phases'     && <PhasesPage   onModal={()=>setModal(true)}/>}
          {page==='vendors'    && <VendorsPage  onModal={()=>setModal(true)} onToast={showToast}/>}
          {page==='quotes'     && <QuotesPage   onModal={()=>setModal(true)}/>}
          {page==='documents'  && <DocumentsPage onToast={showToast}/>}
          {page==='budget'     && <BudgetPage/>}
          {page==='schedule'   && <SchedulePage/>}
          {page==='settings'   && <SettingsPage  onToast={showToast}/>}
        </main>
      </div>

      {/* ── MODAL ────────────────────────────────────── */}
      <div className={`bm-modal-bg ${modal?'open':''}`} onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
        <div className="bm-modal">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1.5rem 2rem',borderBottom:'1px solid #1e2a3a'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontSize:'1.1rem',fontWeight:700,color:'#e2eef5'}}>Submit Project Quote</div>
            <button onClick={()=>setModal(false)} style={{width:'28px',height:'28px',background:'#161c28',border:'1px solid #1e2a3a',color:'#4a6070',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.8rem',transition:'all .2s'}} className="hover:border-[#f87171] hover:text-[#f87171]">✕</button>
          </div>
          <div style={{padding:'2rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
            {[
              {label:'Phase',type:'select',opts:['Foundation & Groundwork','Structural Framing','Electrical & Plumbing','Interiors & Woodwork']},
              {label:'Estimated Price (₹)',type:'number',ph:'e.g. 250000'},
              {label:'Work Description',type:'textarea',ph:'Describe the scope of work...'},
              {label:'Raw Materials Required',type:'textarea',ph:'Cement, Bricks, Steel rods...'},
            ].map(f=>(
              <div key={f.label}>
                <label style={{display:'block',fontFamily:'JetBrains Mono,monospace',fontSize:'.48rem',textTransform:'uppercase',letterSpacing:'.14em',color:'#4a6070',marginBottom:'.4rem'}}>{f.label}</label>
                {f.type==='select'?(
                  <select style={{width:'100%',padding:'.7rem 1rem',background:'#0d0f14',border:'1px solid #1e2a3a',color:'#7a9aaa',fontFamily:'DM Sans,sans-serif',fontSize:'.85rem',outline:'none'}}>
                    {f.opts?.map(o=><option key={o}>{o}</option>)}
                  </select>
                ):f.type==='textarea'?(
                  <textarea rows={3} placeholder={f.ph} style={{width:'100%',padding:'.7rem 1rem',background:'#0d0f14',border:'1px solid #1e2a3a',color:'#e2eef5',fontFamily:'DM Sans,sans-serif',fontSize:'.85rem',outline:'none',resize:'vertical'}}/>
                ):(
                  <input type={f.type} placeholder={f.ph} style={{width:'100%',padding:'.7rem 1rem',background:'#0d0f14',border:'1px solid #1e2a3a',color:'#e2eef5',fontFamily:'DM Sans,sans-serif',fontSize:'.85rem',outline:'none'}}/>
                )}
              </div>
            ))}
          </div>
          <div style={{padding:'1.2rem 2rem',borderTop:'1px solid #1e2a3a',display:'flex',gap:'.8rem',justifyContent:'flex-end'}}>
            <button onClick={()=>setModal(false)} style={{padding:'.65rem 1.5rem',fontFamily:'JetBrains Mono,monospace',fontSize:'.55rem',textTransform:'uppercase',letterSpacing:'.1em',background:'transparent',border:'1px solid #2a3d52',color:'#7a9aaa',cursor:'pointer',transition:'all .2s'}}>Cancel</button>
            <button onClick={()=>{setModal(false);showToast('Quote submitted successfully!');}} style={{padding:'.65rem 1.5rem',fontFamily:'JetBrains Mono,monospace',fontSize:'.55rem',textTransform:'uppercase',letterSpacing:'.1em',background:'linear-gradient(135deg,#0e7490,#22d3ee)',border:'none',color:'#0d0f14',cursor:'pointer',transition:'all .2s',fontWeight:500}} className="hover:shadow-[0_0_20px_rgba(34,211,238,.4)]">Submit Quote →</button>
          </div>
        </div>
      </div>

      {/* ── TOAST ─────────────────────────────────────── */}
      <div className={`bm-toast ${toastShow?'show':''}`}>
        <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#34d399',flexShrink:0}}/>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.55rem',textTransform:'uppercase',letterSpacing:'.1em',color:'#e2eef5'}}>{toast}</div>
      </div>
    </div>
  );
}