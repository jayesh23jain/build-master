'use client';

import { motion } from 'framer-motion';

interface VendorRequestsProps {
  onOpenModal: (reqId: string) => void;
  showToast: (message: string) => void;
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
    id: 'req-003', matched: false,
    phase: 'Foundation & Groundwork', project: 'Powai Villa',
    title: 'Foundation for Luxury Villa — Raft Foundation',
    desc: 'Raft foundation for a luxury 5BHK villa on soft soil. Soil report available. Requires geotechnical expertise.',
    budget: '₹20L – ₹30L', bids: 2, posted: '1d ago',
    tags: ['Raft Foundation', 'Soft Soil', 'Excavation']
  },
  {
    id: 'req-004', matched: false,
    phase: 'Interiors & Woodwork', project: 'Bandra Apartment',
    title: 'Custom Modular Kitchen & Wardrobes',
    desc: 'Full modular kitchen with island, 3 bedrooms wardrobes in Italian finish. Samples and mood board shared.',
    budget: '₹8L – ₹14L', bids: 9, posted: '5d ago',
    tags: ['Modular', 'Italian Finish', 'Wardrobes']
  },
  {
    id: 'req-005', matched: true,
    phase: 'Structural Framing', project: 'Juhu Duplex',
    title: 'Prefab Steel Structure — Duplex Extension',
    desc: 'Prefabricated steel extension for existing duplex. Structural drawings ready. Access constraints — crane required.',
    budget: '₹18L – ₹25L', bids: 3, posted: '4h ago',
    tags: ['Prefab', 'Steel', 'Crane Required']
  },
  {
    id: 'req-006', matched: false,
    phase: 'Electrical & MEP', project: 'Thane Office Complex',
    title: 'Full MEP Works — IT Office Fit-out',
    desc: 'Complete MEP package for 12,000 sqft office. HVAC, fire suppression, structured cabling included.',
    budget: '₹35L – ₹55L', bids: 6, posted: '1d ago',
    tags: ['MEP', 'HVAC', 'Structured Cabling']
  },
];

function RequestCard({ request, onBid }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#161c28] border border-[#1e2a3a] p-6 relative overflow-hidden transition-all cursor-pointer hover:border-[#a855f744] hover:bg-[#1a2235] hover:translate-x-1 ${request.matched ? 'border-[#a855f733]' : ''}`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] scale-x-0 hover:scale-x-100 transition-transform origin-left"
        style={{ boxShadow: '0 0 10px rgba(168,85,247,0.14)' }} />

      {request.matched && (
        <div className="absolute top-3 right-3 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7] bg-[#a855f70d] border border-[#a855f733] px-2 py-0.5">
          MATCHES YOUR TRADE
        </div>
      )}

      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7] mb-2">{request.phase} · {request.project}</div>
          <h3 className="font-['Syne'] text-xl font-semibold text-[#e2eef5] mb-2">{request.title}</h3>
          <p className="text-base text-[#7a9aaa] leading-relaxed font-light">{request.desc}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-6">
          <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] mb-1">Budget</div>
          <div className="font-['Syne'] text-2xl font-bold tracking-tight text-[#e2eef5]">{request.budget}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#1e2a3a]">
        <div className="flex gap-2 flex-wrap">
          {request.tags.map((tag: string, i: number) => (
            <span key={i} className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#7a9aaa] border border-[#2a3d52] px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 ml-4">
          <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">{request.posted}</div>
          <div className="font-['JetBrains_Mono'] text-xs text-[#7a9aaa]">{request.bids} bids</div>
          <button
            onClick={() => onBid(request.id)}
            className="px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              boxShadow: '0 0 10px rgba(168,85,247,0.14)'
            }}
          >
            PLACE BID →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function VendorRequests({ onOpenModal, showToast }: VendorRequestsProps) {
  const matchedFirst = [...REQUESTS].sort((a, b) => (b.matched ? 1 : 0) - (a.matched ? 1 : 0));
  const matched = REQUESTS.filter(r => r.matched).length;

  return (
    <div>
      <div className="flex gap-4 mb-6 items-center">
        <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
          {REQUESTS.length} open requests — {matched} match your trade
        </div>
        <button
          onClick={() => showToast('Filter coming soon')}
          className="ml-auto px-3 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
        >
          ⊞ Filter by Trade
        </button>
      </div>

      <div className="space-y-3">
        {matchedFirst.map((request) => (
          <RequestCard key={request.id} request={request} onBid={onOpenModal} />
        ))}
      </div>
    </div>
  );
}
