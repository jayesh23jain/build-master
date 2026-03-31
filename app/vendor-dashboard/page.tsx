'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import VendorSidebar from '@/components/vendor/VendorSidebar';
import VendorTopbar from '@/components/vendor/VendorTopbar';
import VendorOverview from '@/components/vendor/pages/VendorOverview';
import VendorRequests from '@/components/vendor/pages/VendorRequests';
import VendorMyQuotes from '@/components/vendor/pages/VendorMyQuotes';
import VendorActiveProjects from '@/components/vendor/pages/VendorActiveProjects';
import VendorEarnings from '@/components/vendor/pages/VendorEarnings';
import VendorNotifications from '@/components/vendor/pages/VendorNotifications';
import VendorProfile from '@/components/vendor/pages/VendorProfile';
import VendorQuoteModal from '@/components/vendor/VendorQuoteModal';

export default function VendorDashboard() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3200);
  };

  const openQuoteModal = (reqId: string | null = null) => {
    setSelectedRequest(reqId);
    setShowQuoteModal(true);
  };

  const pages: { [key: string]: ReactNode } = {
    overview: <VendorOverview onOpenModal={openQuoteModal} showToast={showToast} />,
    requests: <VendorRequests onOpenModal={openQuoteModal} showToast={showToast} />,
    myquotes: <VendorMyQuotes onOpenModal={openQuoteModal} showToast={showToast} />,
    active: <VendorActiveProjects showToast={showToast} />,
    earnings: <VendorEarnings showToast={showToast} />,
    notifications: <VendorNotifications showToast={showToast} />,
    profile: <VendorProfile showToast={showToast} />,
  };

  return (
    <div className="flex h-screen bg-[#0d0f14] text-[#e2eef5] font-['DM_Sans']">
      {/* Cursor glow effect */}
      <div id="cursor-glow" className="fixed w-[280px] h-[280px] rounded-full pointer-events-none z-[9999] mix-blend-screen" 
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          transition: 'left .12s ease, top .12s ease'
        }} />

      <VendorSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} showToast={showToast} />

      <main className="flex-1 h-screen overflow-y-auto flex flex-col bg-[#0d0f14]">
        <VendorTopbar currentPage={currentPage} showToast={showToast} onOpenModal={openQuoteModal} />
        
        <div style={{ padding: '2rem 2.5rem' }} className="content flex-1">
          {pages[currentPage]}
        </div>
      </main>

      {/* Quote Modal */}
      {showQuoteModal && (
        <VendorQuoteModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          requestId={selectedRequest}
          showToast={showToast}
        />
      )}

      {/* Toast Notification */}
      <motion.div
        animate={{ y: toast.show ? 0 : 100, opacity: toast.show ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 right-8 z-[9999] bg-[#111520] border border-[#1e2a3a] px-6 py-4 flex items-center gap-3 min-w-[260px]"
        style={{
          borderImage: 'linear-gradient(to right, transparent, rgba(168,85,247,0.3), transparent) 1',
          boxShadow: '0 0 12px rgba(168,85,247,0.1)'
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] flex-shrink-0" />
        <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#e2eef5]">
          {toast.message}
        </div>
      </motion.div>

      <style>{`
        #cursor-glow {
          position: fixed;
        }
        .content {
          padding: 2rem 2.5rem;
        }
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #2a3d52;
          border-radius: 2px;
        }
      `}</style>

      <script>{`
        var cg = document.getElementById('cursor-glow');
        if (cg) {
          document.addEventListener('mousemove', function(e) {
            cg.style.left = e.clientX + 'px';
            cg.style.top = e.clientY + 'px';
          });
        }
      `}</script>
    </div>
  );
}
