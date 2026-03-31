'use client';

interface VendorTopbarProps {
  currentPage: string;
  showToast: (message: string) => void;
  onOpenModal: (reqId: string | null) => void;
}

const PAGE_TITLES: { [key: string]: string } = {
  overview: 'Vendor Overview',
  requests: 'Open Requests',
  myquotes: 'My Quotes',
  active: 'Active Projects',
  earnings: 'Earnings',
  notifications: 'Notifications',
  profile: 'My Profile',
};

export default function VendorTopbar({ currentPage, showToast, onOpenModal }: VendorTopbarProps) {
  const title = PAGE_TITLES[currentPage] || currentPage;

  return (
    <div style={{ padding: '1.2rem 2.5rem' }} className="flex items-center justify-between border-b border-[#1e2a3a] bg-[#0d0f14]/95 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h2 style={{ fontSize: '1.1rem' }} className="font-['Syne'] font-bold tracking-tight text-[#e2eef5]">{title}</h2>
        <div style={{ fontSize: '.52rem' }} className="flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070]">
          <span>Build Master</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span className="text-[#a855f7]">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            showToast('4 new notifications');
            // Navigation is handled by parent
          }}
          style={{ padding: '0.45rem 1rem', fontSize: '.55rem' }}
          className="flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7] relative"
        >
          🔔
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#f87171] rounded-full"
            style={{
              boxShadow: '0 0 6px rgba(248,113,113,.5)',
              animation: 'pulse 1.8s ease-in-out infinite'
            }} />
        </button>

        <button
          onClick={() => showToast('Browsing open requests')}
          style={{ padding: '0.45rem 1rem', fontSize: '.55rem' }}
          className="font-['JetBrains_Mono'] uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
        >
          Browse Requests
        </button>

        <button
          onClick={() => onOpenModal(null)}
          style={{ padding: '0.45rem 1rem', fontSize: '.55rem', boxShadow: '0 0 18px rgba(168,85,247,0.14)' }}
          className="font-['JetBrains_Mono'] uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 font-medium"
        >
          + Submit Quote
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
