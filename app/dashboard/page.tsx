'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar'; // Adjust path if needed

// MOCK DATA
const dashboardData = {
  stats: [
    { label: 'OVERALL PROGRESS', value: '50%', subtitle: '↑ 12% this week', color: 'text-[#00D9FF]', dot: 'bg-[#00D9FF]' },
    { label: 'BUDGET SPENT', value: '₹18.4L', subtitle: '— 44% of total budget', color: 'text-[#FF8800]', dot: 'bg-[#FF8800]' },
    { label: 'ACTIVE VENDORS', value: '3', subtitle: '↑ 2 new applicants', color: 'text-[#00CC66]', dot: 'bg-[#00CC66]' },
    { label: 'OPEN QUOTES', value: '3', subtitle: '— Awaiting review', color: 'text-[#FF007F]', dot: 'bg-[#FF007F]' },
  ],
  phases: [
    { id: '01', title: 'Foundation & Groundwork', desc: 'Excavation, concrete, grading', progress: 100, status: 'DONE', statusColor: 'border-[#00CC66] text-[#00CC66]', barColor: 'bg-[#00CC66]' },
    { id: '02', title: 'Structural Framing', desc: 'Steel & timber, load-bearing', progress: 68, status: 'ACTIVE', statusColor: 'border-[#00D9FF] text-[#00D9FF]', barColor: 'bg-[#00D9FF]' },
    { id: '03', title: 'Electrical & Plumbing', desc: 'MEP rough-in, conduit runs', progress: 32, status: 'ACTIVE', statusColor: 'border-[#00D9FF] text-[#00D9FF]', barColor: 'bg-[#FF8800]' },
    { id: '04', title: 'Interiors & Woodwork', desc: 'Carpentry, finishes, flooring', progress: 0, status: 'PENDING', statusColor: 'border-[#3A4A5A] text-[#5A728A]', barColor: 'bg-[#1A2634]' },
  ],
  activities: [
    { id: 1, name: 'Ravi Sharma', action: 'completed Foundation Phase — signed off by site engineer.', time: '2H AGO', type: 'success', color: 'border-[#00CC66] text-[#00CC66]' },
    { id: 2, name: '3 new quotes', action: 'received for Structural Framing. Review pending.', time: '5H AGO', type: 'info', color: 'border-[#00D9FF] text-[#00D9FF]' },
    { id: 3, name: 'Budget alert', action: '— Electrical phase estimate updated to ₹18.4L.', time: '1D AGO', type: 'warning', color: 'border-[#FF8800] text-[#FF8800]' },
    { id: 4, name: 'Kapil Patel', action: 'sent revised material list for framing phase.', time: '1D AGO', type: 'file', color: 'border-[#FF007F] text-[#FF007F]' },
    { id: 5, name: 'Permit MCD/2024/0892', action: 'approved and uploaded to Vault.', time: '2D AGO', type: 'success', color: 'border-[#00CC66] text-[#00CC66]' },
    { id: 6, name: 'Inspection', action: 'for Phase 2 scheduled — 15 Jan 2025', time: '2D AGO', type: 'calendar', color: 'border-[#FF3333] text-[#FF3333]' },
  ],
  vendors: [
    { id: 'RS', name: 'Ravi Sharma', role: 'FOUNDATION & EXCAVATION', rating: 4.9, stars: 4.5, tags: ['CONCRETE', 'GRADING'] },
    { id: 'KP', name: 'Kapil Patel', role: 'STRUCTURAL FRAMING', rating: 5.0, stars: 5, tags: ['STEEL', 'TIMBER'] },
    { id: 'AM', name: 'Arjun Mehta', role: 'ELECTRICAL & MEP', rating: 4.7, stars: 4.5, tags: ['MEP', 'CONDUIT'] },
  ],
  timeline: [
    { title: 'Foundation Complete', date: 'DEC 28, 2024', status: 'done' },
    { title: 'Frame — 70% Target', date: 'JAN 20, 2025', status: 'active' },
    { title: 'MEP Rough-in', date: 'FEB 10, 2025', status: 'pending' },
    { title: 'Interior Works Begin', date: 'MAR 01, 2025', status: 'pending' },
    { title: 'Final Handover', date: 'MAY 15, 2025', status: 'pending' },
  ],
  quotes: [
    { phase: '02', title: 'STRUCTURAL FRAMING', count: 3, status: 'REVIEW', type: 'action' },
    { phase: '03', title: 'ELECTRICAL & MEP', count: 1, status: 'NEW', type: 'warning' },
  ],
  documents: [
    { name: 'Site Survey Report', type: 'PDF', size: '2.4 MB', date: '12 Dec 2024' },
    { name: 'Architectural Blueprint', type: 'DWG', size: '8.1 MB', date: '15 Dec 2024' },
    { name: 'Foundation Completion', type: 'PDF', size: '1.1 MB', date: '02 Jan 2025' },
    { name: 'MCD Permit — 0892', type: 'PDF', size: '0.6 MB', date: '05 Jan 2025' },
  ]
};

export default function DashboardPage() {
  return (
    // ROOT WRAPPER: Locks to screen height, hides body scroll
    <div className="h-screen w-full bg-[#06090E] flex font-sans text-white overflow-hidden">
      
      {/* SIDEBAR: Inherits screen height from flex parent */}
      <Sidebar />

      {/* RIGHT SIDE CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP HEADER: Fixed height (h-20), shrink-0 so it doesn't get crushed */}
        <header className="h-20 shrink-0 border-b border-[#1A2634] bg-[#090E17] flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-wide">Dashboard</h1>
            <div className="h-4 w-px bg-[#1A2634]"></div>
            <p className="text-[10px] text-[#00D9FF] font-['JetBrains_Mono'] tracking-[0.2em] uppercase hidden sm:block">BUILD MASTER / DASHBOARD</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-[#5A728A] hover:text-white transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF3333] rounded-full border border-[#090E17]"></span>
            </button>
            <div className="relative hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A728A] text-sm">⌕</span>
              <input 
                type="text" 
                placeholder="SEARCH" 
                className="bg-[#0F1620] border border-[#1A2634] text-xs font-['JetBrains_Mono'] text-white px-8 py-2 w-48 focus:outline-none focus:border-[#00D9FF] transition-colors placeholder-[#3A4A5A]"
              />
            </div>
            <button className="bg-[#00D9FF] hover:bg-[#00b3d6] text-[#06090E] text-[10px] font-bold font-['JetBrains_Mono'] px-4 py-2.5 tracking-widest transition-colors">
              + NEW REQUEST
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE DASHBOARD AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
          
          {/* STATS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#1A2634] bg-[#0A0F15]">
            {dashboardData.stats.map((stat, i) => (
              <div key={i} className={`p-6 ${i !== dashboardData.stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#1A2634]' : ''}`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${stat.dot}`}></div>
                  <p className="text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase">{stat.label}</p>
                </div>
                {/* Simulated thick display font using Tailwind */}
                <h3 className={`text-5xl font-black tracking-tighter mb-2 ${stat.color}`} style={{ WebkitTextStroke: '1px currentColor', color: 'transparent', backgroundImage: `linear-gradient(${stat.color.replace('text-','').replace(']','').replace('[','')}, ${stat.color.replace('text-','').replace(']','').replace('[','')})`, WebkitBackgroundClip: 'text' }}>
                  {stat.value}
                </h3>
                <p className="text-[10px] text-[#00D9FF] font-['JetBrains_Mono'] tracking-widest">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* MIDDLE ROW (Phases + Activity) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Construction Phases */}
            <div className="lg:col-span-2 border border-[#1A2634] bg-[#0A0F15] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]"></div>
                  <h2 className="text-sm font-bold tracking-wider">Construction Phases</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] uppercase">4 PHASES TOTAL</p>
                </div>
              </div>

              <div className="flex-1 space-y-0">
                {dashboardData.phases.map((phase, idx) => (
                  <div key={idx} className="border-b border-[#1A2634] last:border-0 py-6 first:pt-0 last:pb-0 group">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-4xl font-black text-[#1A2634] group-hover:text-[#2A3B4C] transition-colors">{phase.id}</span>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-2 gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-white mb-1">{phase.title}</h3>
                            <p className="text-[11px] text-[#5A728A]">{phase.desc}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[11px] text-[#5A728A] font-['JetBrains_Mono']">{phase.progress}%</span>
                            <span className={`text-[9px] px-2 py-0.5 border font-['JetBrains_Mono'] tracking-widest ${phase.statusColor}`}>
                              {phase.status}
                            </span>
                          </div>
                        </div>
                        <div className="h-[2px] w-full bg-[#1A2634] mt-3">
                          <div className={`h-full ${phase.barColor}`} style={{ width: `${phase.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="border border-[#1A2634] bg-[#0A0F15] p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF007F]"></div>
                  <h2 className="text-sm font-bold tracking-wider">Activity Feed</h2>
                </div>
                <p className="text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em]">LAST 7 DAYS</p>
              </div>

              <div className="space-y-6">
                {dashboardData.activities.map((act) => (
                  <div key={act.id} className="flex items-start gap-4">
                    <div className={`w-6 h-6 shrink-0 border flex items-center justify-center text-[10px] mt-0.5 ${act.color}`}>
                      {act.type === 'success' && '✓'}
                      {act.type === 'info' && '◇'}
                      {act.type === 'warning' && '▲'}
                      {act.type === 'file' && '✉'}
                      {act.type === 'calendar' && '⚑'}
                    </div>
                    <div>
                      <p className="text-[13px] leading-relaxed text-[#8A9EB0]">
                        <span className={`font-bold ${act.type === 'info' || act.type === 'calendar' ? 'text-[#00D9FF]' : 'text-white'}`}>{act.name}</span> {act.action}
                      </p>
                      <p className="text-[9px] text-[#5A728A] font-['JetBrains_Mono'] mt-1.5 tracking-wider">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW (Vendors, Timeline, Quotes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Active Vendors */}
            <div className="border border-[#1A2634] bg-[#0A0F15] p-6">
               <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00CC66]"></div>
                  <h2 className="text-sm font-bold tracking-wider">Active Vendors</h2>
                </div>
                <p className="text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em]">3 VERIFIED</p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {dashboardData.vendors.map(v => (
                  <div key={v.id} className="min-w-[160px] border border-[#1A2634] p-4 hover:border-[#3A4A5A] transition-colors shrink-0">
                    <div className="w-10 h-10 bg-[#1A2634] text-[#5A728A] flex items-center justify-center font-bold text-sm mb-4">{v.id}</div>
                    <h3 className="text-sm font-bold text-white mb-1">{v.name}</h3>
                    <p className="text-[9px] text-[#5A728A] font-['JetBrains_Mono'] tracking-widest mb-3">{v.role}</p>
                    <div className="flex items-center gap-2 mb-4 text-[#FF8800] text-[10px]">
                      <span>{'★'.repeat(Math.floor(v.stars))}{v.stars % 1 !== 0 ? '½' : ''}</span>
                      <span className="text-[#5A728A]">{v.rating}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {v.tags.map(t => (
                        <span key={t} className="text-[8px] font-['JetBrains_Mono'] border border-[#00D9FF]/30 text-[#00D9FF] px-1.5 py-0.5 tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-[#1A2634] bg-[#0A0F15] p-6">
               <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF8800]"></div>
                  <h2 className="text-sm font-bold tracking-wider">Milestone Timeline</h2>
                </div>
                <p className="text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em]">JAN - MAY 25</p>
              </div>
              <div className="relative border-l border-[#1A2634] ml-2 space-y-6">
                {dashboardData.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[#0A0F15] ${item.status === 'done' ? 'bg-[#00CC66]' : item.status === 'active' ? 'bg-[#00D9FF]' : 'bg-[#1A2634]'}`}></div>
                    <h3 className={`text-sm mb-1 ${item.status === 'pending' ? 'text-[#5A728A]' : 'text-white font-bold'}`}>{item.title}</h3>
                    <p className="text-[9px] text-[#5A728A] font-['JetBrains_Mono'] tracking-widest">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Requests */}
            <div className="border border-[#1A2634] bg-[#0A0F15] p-6 flex flex-col md:col-span-2 lg:col-span-1">
               <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF3333]"></div>
                  <h2 className="text-sm font-bold tracking-wider">Quote Requests</h2>
                </div>
                <p className="text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em]">3 PENDING</p>
              </div>
              <div className="space-y-3 flex-1">
                {dashboardData.quotes.map((q, idx) => (
                  <div key={idx} className="border border-[#1A2634] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-[#1A2634]">{q.phase}</span>
                      <div>
                        <h3 className="text-[11px] font-bold text-white tracking-widest">{q.title}</h3>
                        <p className="text-[10px] text-[#00D9FF] font-['JetBrains_Mono'] mt-1">{q.count} quotes</p>
                      </div>
                    </div>
                    <button className={`text-[9px] px-3 py-1 font-['JetBrains_Mono'] tracking-widest border ${q.type === 'action' ? 'border-[#00D9FF] text-[#00D9FF]' : 'border-[#FF8800] text-[#FF8800]'}`}>
                      {q.status}
                    </button>
                  </div>
                ))}
                <button className="w-full border border-dashed border-[#1A2634] py-4 text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-widest hover:text-white hover:border-[#3A4A5A] transition-colors mt-2">
                  + POST NEW REQUEST...
                </button>
              </div>
            </div>
          </div>

          {/* RECENT DOCUMENTS TABLE */}
          <div className="border border-[#1A2634] bg-[#0A0F15] p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <h2 className="text-sm font-bold tracking-wider">Recent Documents</h2>
                </div>
                <button className="text-[10px] text-[#00D9FF] font-['JetBrains_Mono'] tracking-[0.2em] hover:text-white transition-colors">VIEW ALL →</button>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#1A2634]">
                    <th className="pb-3 text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] font-normal">DOCUMENT</th>
                    <th className="pb-3 text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] font-normal">TYPE</th>
                    <th className="pb-3 text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] font-normal">SIZE</th>
                    <th className="pb-3 text-[10px] text-[#5A728A] font-['JetBrains_Mono'] tracking-[0.2em] font-normal">DATE</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.documents.map((doc, idx) => (
                    <tr key={idx} className="border-b border-[#1A2634]/50 last:border-0 hover:bg-[#0F1620] transition-colors">
                      <td className="py-4 flex items-center gap-3">
                        <span className="text-[#5A728A]">📄</span>
                        <span className="text-[13px] text-white">{doc.name}</span>
                      </td>
                      <td className="py-4 text-[11px] text-[#5A728A]">{doc.type}</td>
                      <td className="py-4 text-[11px] text-[#5A728A] font-['JetBrains_Mono']">{doc.size}</td>
                      <td className="py-4 text-[11px] text-[#5A728A] font-['JetBrains_Mono']">{doc.date}</td>
                      <td className="py-4 text-right">
                        <button className="text-[9px] text-[#00D9FF] border border-[#00D9FF]/30 px-3 py-1 font-['JetBrains_Mono'] tracking-widest hover:bg-[#00D9FF]/10 transition-colors">
                          ↓ GET
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}