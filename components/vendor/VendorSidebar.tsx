'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VendorSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  showToast: (message: string) => void;
}

const VENDOR_DATA = {
  name: 'Kapil Patel',
  initials: 'KP',
  trade: 'Structural Framing',
  license: 'GC-2024-00881',
  rating: 5.0,
  reviews: 14,
};

export default function VendorSidebar({ currentPage, setCurrentPage, showToast }: VendorSidebarProps) {
  const handleNavClick = (page: string) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    showToast('Logging out...');
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 800);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '⬡', badge: null },
    { id: 'requests', label: 'Open Requests', icon: '◈', badge: { count: 6, color: 'purple' } },
    { id: 'myquotes', label: 'My Quotes', icon: '◫', badge: { count: 3, color: 'amber' } },
    { id: 'active', label: 'Active Projects', icon: '◉', badge: { count: 2, color: 'green' } },
  ];

  const accountItems = [
    { id: 'earnings', label: 'Earnings', icon: '◰' },
    { id: 'notifications', label: 'Notifications', icon: '◱', badge: { count: 4, color: 'red' } },
    { id: 'profile', label: 'My Profile', icon: '◲' },
  ];

  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-[#111520] border-r border-[#1e2a3a] flex flex-col relative z-[100] overflow-hidden">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, #a855f7, transparent)',
          boxShadow: '0 0 20px rgba(168,85,247,0.14)',
        }}
      />

      {/* Animated background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(168,85,247,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          animation: 'sbg 30s linear infinite',
        }}
      />

      {/* Brand Header */}
      <div className="px-7 py-6 border-b border-[#1e2a3a] relative z-10 flex items-center gap-2.5">
        <div className="w-7 h-7 bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center font-['Syne'] text-xs font-bold text-white rounded flex-shrink-0"
          style={{ boxShadow: '0 0 12px rgba(168,85,247,0.14)' }}>
          BM
        </div>
        <span className="font-['Syne'] text-sm font-bold tracking-wider text-[#e2eef5] uppercase">
          BUILD<span className="text-[#a855f7]">.</span>MASTER
        </span>
        <div className="ml-auto inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#a855f7] border border-[#a855f733] px-2 py-1 rounded bg-[#a855f70f] flex-shrink-0">
          <div className="w-1 h-1 bg-[#a855f7] rounded-full animate-pulse" />
          Vendor
        </div>
      </div>

      {/* Vendor Profile Card */}
      <div style={{ margin: '1rem 1rem 0.4rem', padding: '1rem' }} className="bg-[#161c28] border border-[#1e2a3a] relative z-10 transition-colors hover:border-[#2a3d52]">
        <div className="flex items-center gap-2.5 mb-3">
          <div style={{ width: '36px', height: '36px', fontSize: '.72rem' }} className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center font-['Syne'] font-bold text-white border border-[#a855f74d] flex-shrink-0">
            {VENDOR_DATA.initials}
          </div>
          <div>
            <div style={{ fontSize: '.82rem' }} className="font-['Syne'] font-semibold text-[#e2eef5]">{VENDOR_DATA.name}</div>
            <div style={{ fontSize: '.48rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070]">{VENDOR_DATA.trade}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ fontSize: '.52rem' }} className="text-[#f59e4a] tracking-widest">★★★★★</span>
          <span style={{ fontSize: '.52rem' }} className="font-['JetBrains_Mono'] text-[#7a9aaa]">{VENDOR_DATA.rating} ({VENDOR_DATA.reviews} reviews)</span>
        </div>
        <div style={{ fontSize: '.48rem', marginTop: '.35rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#34d399] rounded-full animate-pulse"
            style={{ boxShadow: '0 0 5px rgba(52,211,153,.5)' }} />
          License: {VENDOR_DATA.license}
        </div>
      </div>

      {/* Work Navigation Section */}
      <div style={{ fontSize: '.45rem', padding: '1rem 1.4rem 0.5rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] relative z-10">Work</div>
      
      <ul style={{ margin: '1px 0.6rem' }} className="flex-1 overflow-y-auto relative z-10 space-y-px">
        {navItems.map((item) => (
          <li key={item.id}>
            <div
              onClick={() => handleNavClick(item.id)}
              style={{ padding: '0.62rem 0.8rem', fontSize: '.58rem' }}
              className={`flex items-center gap-2.5 font-['JetBrains_Mono'] uppercase tracking-widest cursor-pointer transition-all rounded border ${
                currentPage === item.id
                  ? 'text-[#a855f7] bg-[#a855f706] border-[#a855f733] relative'
                  : 'text-[#4a6070] border-transparent hover:text-[#e2eef5] hover:bg-[#161c28] hover:border-[#1e2a3a]'
              }`}
            >
              {currentPage === item.id && (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7c3aed] to-[#a855f7]"
                    style={{ boxShadow: '1px 0 8px rgba(168,85,247,0.14)' }} />
                </>
              )}
              <span className="w-3.5 text-center flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize: '.42rem', padding: '0.15rem 0.5rem' }} className={`ml-auto rounded font-['JetBrains_Mono'] uppercase tracking-widest border ${
                  item.badge.color === 'purple' ? 'text-[#a855f7] border-[#a855f733] bg-[#a855f70f]' :
                  item.badge.color === 'amber' ? 'text-[#f59e4a] border-[#f59e4a33] bg-[#f59e4a0f]' :
                  'text-[#34d399] border-[#34d39933] bg-[#34d3990f]'
                }`}>
                  {item.badge.count}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Account Navigation Section */}
      <div style={{ fontSize: '.45rem', padding: '1rem 1.4rem 0.5rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] relative z-10 border-t border-[#1e2a3a]">Account</div>
      
      <ul style={{ margin: '1px 0.6rem 1rem' }} className="relative z-10 space-y-px">
        {accountItems.map((item) => (
          <li key={item.id}>
            <div
              onClick={() => handleNavClick(item.id)}
              style={{ padding: '0.62rem 0.8rem', fontSize: '.58rem' }}
              className={`flex items-center gap-2.5 font-['JetBrains_Mono'] uppercase tracking-widest cursor-pointer transition-all rounded border ${
                currentPage === item.id
                  ? 'text-[#a855f7] bg-[#a855f706] border-[#a855f733] relative'
                  : 'text-[#4a6070] border-transparent hover:text-[#e2eef5] hover:bg-[#161c28] hover:border-[#1e2a3a]'
              }`}
            >
              {currentPage === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7c3aed] to-[#a855f7]"
                  style={{ boxShadow: '1px 0 8px rgba(168,85,247,0.14)' }} />
              )}
              <span style={{ width: '14px' }} className="text-center flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 rounded text-xs font-['JetBrains_Mono'] uppercase tracking-widest border text-[#f87171] border-[#f871713a] bg-[#f8717110]">
                  {item.badge.count}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* User Profile Section */}
      <div style={{ padding: '1rem 1rem 1.2rem' }} className="border-t border-[#1e2a3a] relative z-10">
        <div style={{ gap: '0.7rem', marginBottom: '0.8rem' }} className="flex items-center">
          <div style={{ width: '32px', height: '32px', fontSize: '.65rem' }} className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center font-['Syne'] font-bold text-white border border-[#a855f74d]">
            {VENDOR_DATA.initials}
          </div>
          <div>
            <div style={{ fontSize: '.8rem' }} className="font-['Syne'] font-semibold text-[#e2eef5]">{VENDOR_DATA.name}</div>
            <div style={{ fontSize: '.48rem' }} className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#a855f7]">Vendor</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{ padding: '0.5rem', fontSize: '.52rem' }}
          className="w-full font-['JetBrains_Mono'] uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#4a6070] cursor-pointer transition-all hover:border-[#f87171] hover:text-[#f87171]"
        >
          ← Logout
        </button>
      </div>

      <style>{`
        @keyframes sbg {
          0% { background-position: 0 0; }
          100% { background-position: 24px 24px; }
        }
      `}</style>
    </aside>
  );
}
