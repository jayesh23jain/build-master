'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VendorOverviewProps {
  onOpenModal: (reqId: string | null) => void;
  showToast: (message: string) => void;
  data?: any;
}

const REQUESTS = [
  {
    id: 'req-001', matched: true,
    phase: 'Structural Framing', project: 'Greenfield Residence',
    title: 'Steel & Timber Framework — Phase 2',
    desc: 'High-grade steel skeleton for a 3BHK residence. Foundation complete. Requires MS rods, TMT bars, and seasoned timber.',
    budget: '₹30L – ₹50L', bids: 4, posted: '2d ago',
    tags: ['Steel', 'Timber', 'MS Rods', 'Load Bearing']
  },
  {
    id: 'req-002', matched: true,
    phase: 'Structural Framing', project: 'Andheri Commercial Block',
    title: 'RCC Frame for G+4 Commercial Building',
    desc: 'Reinforced concrete frame for a commercial complex. Civil drawings available. M30 grade concrete required.',
    budget: '₹80L – ₹1.2Cr', bids: 7, posted: '3d ago',
    tags: ['RCC', 'M30 Concrete', 'Commercial', 'G+4']
  },
  {
    id: 'req-005', matched: true,
    phase: 'Structural Framing', project: 'Juhu Duplex',
    title: 'Prefab Steel Structure — Duplex Extension',
    desc: 'Prefabricated steel extension for existing duplex. Structural drawings ready. Access constraints — crane required.',
    budget: '₹18L – ₹25L', bids: 3, posted: '4h ago',
    tags: ['Prefab', 'Steel', 'Crane Required']
  },
];

const MY_QUOTES = [
  { project: 'Greenfield Residence', phase: 'Structural Framing', price: '₹42,00,000', date: 'Jan 08, 2025', status: 'review' },
  { project: 'Versova Townhouses', phase: 'Structural Framing', price: '₹28,50,000', date: 'Dec 28, 2024', status: 'pending' },
  { project: 'Borivali Row Houses', phase: 'Structural Framing', price: '₹15,00,000', date: 'Dec 20, 2024', status: 'accepted' },
  { project: 'Dadar Commercial', phase: 'Structural Framing', price: '₹62,00,000', date: 'Dec 10, 2024', status: 'rejected' },
];

const ACTIVE_PROJECTS = [
  { name: 'Borivali Row Houses', phase: 'Structural Framing', value: '₹15,00,000', pct: 55, deadline: 'Feb 15, 2025', client: 'Rahul M.' },
  { name: 'Versova Townhouses', phase: 'Frame Phase 1', value: '₹28,50,000', pct: 22, deadline: 'Mar 30, 2025', client: 'Priya S.' },
];

const NOTIFICATIONS = [
  { icon: '◈', cls: 'purple', text: '<strong>New request matching your trade</strong> — Juhu Duplex needs steel framing. 3 bids already.', time: '4h ago', unread: true },
  { icon: '✓', cls: 'green', text: 'Your quote for <strong>Borivali Row Houses</strong> was accepted! Project starts Jan 20.', time: '1d ago', unread: true },
  { icon: '⚑', cls: 'amber', text: 'Client <strong>Greenfield Residence</strong> is reviewing your quote. Expected decision by Jan 15.', time: '2d ago', unread: true },
  { icon: '✉', cls: 'purple', text: '<strong>New message</strong> from Rahul M. — "Can you adjust the timeline to 40 days?"', time: '2d ago', unread: true },
  { icon: '✗', cls: 'red', text: 'Your quote for <strong>Dadar Commercial</strong> was not selected. Another vendor offered lower.', time: '5d ago', unread: false },
];

function KpiCard({ label, value, colorClass, delta, dir, dotColor }: any) {
  return (
    <div style={{ padding: '1.6rem 1.8rem' }} className="bg-[#111520] relative overflow-hidden transition-all hover:bg-[#161c28] hover:-translate-y-1">
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(to right, transparent, #a855f7, transparent)',
          boxShadow: '0 0 20px rgba(168,85,247,0.14)'
        }} />
      
      <div style={{ fontSize: '.5rem', marginBottom: '.7rem' }} className="flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070]">
        <div className="w-1 h-1 rounded-full flex-shrink-0"
          style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}40` }} />
        {label}
      </div>
      <div style={{ fontSize: '2rem' }} className="font-['Syne'] font-bold tracking-tight mb-2">
        <span className={colorClass}>{value}</span>
      </div>
      <div style={{ fontSize: '.5rem' }} className={`font-['JetBrains_Mono'] uppercase tracking-widest flex items-center gap-1 ${
        dir === 'up' ? 'text-[#34d399]' : dir === 'warn' ? 'text-[#f59e4a]' : 'text-[#4a6070]'
      }`}>
        {dir === 'up' ? '↑' : dir === 'warn' ? '↗' : '—'} {delta}
      </div>
    </div>
  );
}

function RequestCard({ request, compact = false, onBid }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1.4rem 1.6rem' }}
      className={`bg-[#161c28] border border-[#1e2a3a] relative overflow-hidden transition-all cursor-pointer hover:border-[#a855f744] hover:bg-[#1a2235] hover:translate-x-1 ${request.matched ? 'border-[#a855f733]' : ''}`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] scale-x-0 hover:scale-x-100 transition-transform origin-left"
        style={{ boxShadow: '0 0 10px rgba(168,85,247,0.14)' }} />

      {request.matched && (
        <div className="absolute top-3 right-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7] bg-[#a855f70d] border border-[#a855f733] px-2 py-0.5">
          MATCHES YOUR TRADE
        </div>
      )}

      <div style={{ marginBottom: '.9rem' }} className="flex justify-between">
        <div>
          <div style={{ fontSize: '.5rem', marginBottom: '.4rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#a855f7]">{request.phase} · {request.project}</div>
          <h3 style={{ fontSize: '.98rem', marginBottom: '.3rem' }} className="font-['Syne'] font-semibold text-[#e2eef5]">{request.title}</h3>
          {!compact && <p style={{ fontSize: '.8rem', lineHeight: '1.55' }} className="text-[#7a9aaa] font-light">{request.desc}</p>}
        </div>
        <div style={{ textAlign: 'right' }} className="flex-shrink-0 ml-6">
          <div style={{ fontSize: '.45rem', marginBottom: '.2rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070]">Budget</div>
          <div style={{ fontSize: '1.1rem' }} className="font-['Syne'] font-bold tracking-tight text-[#e2eef5]">{request.budget}</div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '.9rem' }} className="flex items-center justify-between border-t border-[#1e2a3a]">
        <div className="flex gap-1.5 flex-wrap">
          {request.tags.map((tag: string, i: number) => (
            <span key={i} style={{ fontSize: '.46rem', padding: '.18rem .5rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#7a9aaa] border border-[#2a3d52]">
              {tag}
            </span>
          ))}
        </div>
        <div style={{ gap: '1rem' }} className="flex items-center gap-4 ml-4">
          <div style={{ fontSize: '.48rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070]">{request.posted}</div>
          <div style={{ fontSize: '.48rem' }} className="font-['JetBrains_Mono'] text-[#7a9aaa]">{request.bids} bids</div>
          <button
            onClick={() => onBid(request.id)}
            style={{ padding: '.5rem 1.2rem', fontSize: '.55rem', boxShadow: '0 0 10px rgba(168,85,247,0.14)' }}
            className="font-['JetBrains_Mono'] uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
          >
            PLACE BID →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function VendorOverview({ onOpenModal, showToast, data }: VendorOverviewProps) {
  const [barWidths, setBarWidths] = useState<number[]>([]);

  // Map dynamic data or use mocks
  const displayRequests = data?.availableRequests || REQUESTS;
  const displayQuotes = data?.activeQuotes || MY_QUOTES;
  const displayStats = data?.stats || {
    rating: 4.8,
    reviews: 12,
    activeQuotes: MY_QUOTES.length,
    portfolioCount: 5
  };

  useEffect(() => {
    setTimeout(() => {
      setBarWidths(ACTIVE_PROJECTS.map(p => p.pct));
    }, 100);
  }, []);

  const accepted = displayQuotes.filter((q:any) => q.status === 'accepted' || q.status === 'ACCEPTED').length;
  const pending = displayQuotes.filter((q:any) => ['pending', 'review', 'PENDING', 'REVIEW'].includes(q.status)).length;
  const matched = displayRequests.filter((r:any) => r.matched || true).length;

  const statusColors = {
    pending: 'text-[#f59e4a] border-[#f59e4a7f] bg-[#f59e4a0f]',
    accepted: 'text-[#34d399] border-[#34d3997f] bg-[#34d3990f]',
    rejected: 'text-[#f87171] border-[#f871717f] bg-[#f8717110]',
    review: 'text-[#a855f7] border-[#a855f77f] bg-[#a855f70f]',
  };

  return (
    <div>
      {/* KPI Grid */}
      <motion.div style={{ marginBottom: '2rem' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-px bg-[#1e2a3a] border border-[#1e2a3a] p-px mb-8">
        <KpiCard label="Open Requests" value={displayRequests.length} colorClass="text-[#a855f7]" delta={`${matched} match your trade`} dir="warn" dotColor="var(--v-accent)" />
        <KpiCard label="Quotes Sent" value={displayQuotes.length} colorClass="text-[#f59e4a]" delta={`${pending} pending review`} dir="warn" dotColor="var(--amber)" />
        <KpiCard label="Active Projects" value={ACTIVE_PROJECTS.length} colorClass="text-[#34d399]" delta="Across 2 sites" dir="neu" dotColor="var(--green)" />
        <KpiCard label="Vendor Rating" value={displayStats.rating || '4.8'} colorClass="text-[#a855f7]" delta={`${displayStats.reviews || 0} verified reviews`} dir="up" dotColor="var(--v-accent)" />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Matching Requests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(168,85,247,.12), transparent)',
            }} />
          
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #1e2a3a' }} className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"
                style={{ boxShadow: '0 0 6px rgba(168,85,247,0.6)' }} />
              Matching Requests
            </div>
            <div style={{ fontSize: '.5rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#a855f7] cursor-pointer hover:text-[#00d9e0]">
              View all {REQUESTS.length} →
            </div>
          </div>

          <div style={{ padding: '1.5rem', gap: '.8rem' }} className="space-y-3">
            {displayRequests.slice(0, 3).map((req: any) => (
              <RequestCard 
                key={req.id} 
                request={{
                  ...req,
                  matched: true,
                  title: req.title || req.phase,
                  project: req.project?.title || req.project || 'Unknown Project',
                  desc: req.description || req.desc,
                  budget: req.budget || 'Consult Client',
                  posted: 'Just now',
                  bids: req.quotes?.length || 0,
                  tags: req.tags || ['Structural', 'Urgent']
                }} 
                compact={true} 
                onBid={onOpenModal} 
              />
            ))}
          </div>
        </motion.div>

        {/* Notifications Sidebar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(248,113,113,.12), transparent)',
            }} />
          
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #1e2a3a' }} className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f87171]"
                style={{ boxShadow: '0 0 6px rgba(248,113,113,.5)' }} />
              Notifications
            </div>
            <div style={{ fontSize: '.5rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070]">
              {NOTIFICATIONS.filter(n => n.unread).length} unread
            </div>
          </div>

          <div style={{ padding: '1.5rem', gap: '.9rem' }} className="space-y-5">
            {NOTIFICATIONS.slice(0, 5).map((notif, i) => (
              <div key={i} className={`flex gap-4 ${notif.unread ? 'unread' : ''}`}>
                {notif.unread && (
                  <div className="w-1 h-1 rounded-full bg-[#a855f7] flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 5px rgba(168,85,247,0.8)' }} />
                )}
                <div className={`w-8 h-8 rounded flex items-center justify-center text-sm flex-shrink-0 ${
                  notif.cls === 'purple' ? 'bg-[#a855f70f] border border-[#a855f733] text-[#a855f7]' :
                  notif.cls === 'green' ? 'bg-[#34d3990f] border border-[#34d39933] text-[#34d399]' :
                  notif.cls === 'amber' ? 'bg-[#f59e4a0f] border border-[#f59e4a33] text-[#f59e4a]' :
                  'bg-[#f8717110] border border-[#f871713a] text-[#f87171]'
                }`}>
                  {notif.icon}
                </div>
                <div className="flex-1 text-xs">
                  <div className="text-[#e2eef5] mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: notif.text }} />
                  <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
                    {notif.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Projects & Recent Quotes */}
      <div className="grid grid-cols-2 gap-6">
        {/* Active Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(52,211,153,.12), transparent)',
            }} />
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
            <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,.5)' }} />
              Active Projects
            </div>
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
              {ACTIVE_PROJECTS.length} ongoing
            </div>
          </div>

          <div className="p-6 space-y-5">
            {ACTIVE_PROJECTS.map((project, i) => (
              <div key={i} className="bg-[#161c28] border border-[#1e2a3a] p-5 relative overflow-hidden hover:border-[#2a3d52] hover:bg-[#1a2235] transition-all">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7c3aed] to-[#a855f7]"
                  style={{ boxShadow: '2px 0 10px rgba(168,85,247,0.14)' }} />
                
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="font-['Syne'] text-base font-semibold text-[#e2eef5] mb-1">{project.name}</div>
                    <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7]">{project.phase}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-1">Contract Value</div>
                    <div className="font-['Syne'] text-xl font-bold text-[#34d399]">{project.value}</div>
                  </div>
                </div>

                <div className="h-1 bg-[#1e2a3a] mb-3">
                  <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] transition-all duration-1200 ease-out"
                    style={{
                      width: `${barWidths[i] || 0}%`,
                      boxShadow: '0 0 8px rgba(168,85,247,0.14)'
                    }} />
                </div>

                <div className="flex justify-between text-xs">
                  <div className="font-['JetBrains_Mono'] text-[#7a9aaa]">{project.pct}% complete</div>
                  <div className="font-['JetBrains_Mono'] text-[#f59e4a]">Due: {project.deadline}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Quotes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(245,158,74,.12), transparent)',
            }} />
          
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
            <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f59e4a]"
                style={{ boxShadow: '0 0 6px rgba(245,158,74,.4)' }} />
              Recent Quotes
            </div>
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7] cursor-pointer hover:text-[#00d9e0]">
              View all →
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-[#1e2a3a]">
                  <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Project</th>
                  <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Price</th>
                  <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Date</th>
                  <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayQuotes.slice(0, 4).map((quote: any, i: number) => (
                  <tr key={i} className="border-b border-[#0d0f144d] hover:bg-[#161c28] cursor-pointer transition-all">
                    <td className="px-6 py-4 text-[#e2eef5] font-semibold">
                      {quote.project?.title || quote.project || 'Project'}
                      <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mt-1">{quote.request?.phase || quote.phase}</div>
                    </td>
                    <td className="px-6 py-4 font-['Syne'] font-bold text-[#e2eef5]">₹{(quote.amount / 100000).toFixed(1)}L</td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-xs text-[#4a6070]">{new Date(quote.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`font-['JetBrains_Mono'] text-xs uppercase tracking-widest px-3 py-1.5 border rounded ${statusColors[(quote.status?.toLowerCase() as keyof typeof statusColors) || 'pending']}`}>
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
