'use client';

interface VendorMyQuotesProps {
  onOpenModal: (projectName: string | null) => void;
  showToast: (message: string) => void;
  data?: any;
}

const MY_QUOTES = [
  { project: 'Greenfield Residence', phase: 'Structural Framing', price: '₹42,00,000', date: 'Jan 08, 2025', status: 'review' },
  { project: 'Versova Townhouses', phase: 'Structural Framing', price: '₹28,50,000', date: 'Dec 28, 2024', status: 'pending' },
  { project: 'Borivali Row Houses', phase: 'Structural Framing', price: '₹15,00,000', date: 'Dec 20, 2024', status: 'accepted' },
  { project: 'Dadar Commercial', phase: 'Structural Framing', price: '₹62,00,000', date: 'Dec 10, 2024', status: 'rejected' },
  { project: 'Colaba Heritage Reno', phase: 'Structural Framing', price: '₹19,00,000', date: 'Nov 30, 2024', status: 'pending' },
];

const statusColors = {
  pending: 'text-[#f59e4a] border-[#f59e4a7f] bg-[#f59e4a0f]',
  accepted: 'text-[#34d399] border-[#34d3997f] bg-[#34d3990f]',
  rejected: 'text-[#f87171] border-[#f871717f] bg-[#f8717110]',
  review: 'text-[#a855f7] border-[#a855f77f] bg-[#a855f70f]',
};

export default function VendorMyQuotes({ onOpenModal, showToast, data }: VendorMyQuotesProps) {
  const displayQuotes = data?.activeQuotes || MY_QUOTES;
  return (
    <div className="bg-[#111520] border border-[#1e2a3a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(245,158,74,.12), transparent)',
        }} />
      
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2a3a]">
        <div className="flex items-center gap-2 font-['Syne'] text-sm font-semibold text-[#e2eef5]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f59e4a]"
            style={{ boxShadow: '0 0 6px rgba(245,158,74,.4)' }} />
          My Submitted Quotes
        </div>
        <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">
          {MY_QUOTES.length} total
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-[#1e2a3a]">
              <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Project</th>
              <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Phase</th>
              <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Price</th>
              <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Submitted</th>
              <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal">Status</th>
              <th className="text-left px-6 py-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070] font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {displayQuotes.map((quote: any, i: number) => (
              <tr key={i} className="border-b border-[#0d0f144d] hover:bg-[#161c28] cursor-pointer transition-all">
                <td className="px-6 py-4 text-[#e2eef5] font-['Syne'] font-semibold">{quote.project?.title || quote.project || 'Project'}</td>
                <td className="px-6 py-4">
                  <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#4a6070]">{quote.request?.phase || quote.phase}</div>
                </td>
                <td className="px-6 py-4 font-['Syne'] font-bold text-[#e2eef5]">
                  {typeof quote.amount === 'number' ? `₹${(quote.amount / 100000).toFixed(1)}L` : quote.price}
                </td>
                <td className="px-6 py-4 font-['JetBrains_Mono'] text-xs text-[#4a6070]">
                  {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : quote.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-['JetBrains_Mono'] text-xs uppercase tracking-widest px-3 py-2 border rounded ${statusColors[(quote.status?.toLowerCase() as keyof typeof statusColors) || 'pending']}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onOpenModal(quote.project?.title || quote.project)}
                    className="px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
                  >
                    Revise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
