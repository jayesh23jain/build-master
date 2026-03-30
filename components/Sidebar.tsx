'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const mainNavItems = [
    { label: 'DASHBOARD', href: '/dashboard', icon: '⬡', badge: null },
    { label: 'PHASES', href: '/phases', icon: '◈', badge: { text: '4', color: 'bg-[#00D9FF]/10 text-[#00D9FF]' } },
    { label: 'VENDORS', href: '/vendors', icon: '◉', badge: { text: '2 NEW', color: 'bg-[#FF8800]/10 text-[#FF8800]' } },
    { label: 'QUOTES', href: '/quotes', icon: '◫', badge: { text: '3', color: 'bg-[#FF007F]/10 text-[#FF007F]' } },
    { label: 'DOCUMENTS', href: '/documents', icon: '▤', badge: null },
  ];

  const toolsItems = [
    { label: 'BUDGET', href: '/budget', icon: '◩' },
    { label: 'SCHEDULE', href: '/schedule', icon: '◪' },
    { label: 'SETTINGS', href: '/settings', icon: '▧' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 lg:hidden z-50 p-2 rounded bg-[#090E17] border border-[#1A2634] text-[#00D9FF]"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar Container */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 bg-[#090E17] border-r border-[#1A2634] lg:relative lg:translate-x-0 shrink-0 z-40 flex flex-col font-['JetBrains_Mono',monospace]"
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-[#1A2634] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#00D9FF] to-[#007799] text-black font-black text-xl rounded-sm">
            BM
          </div>
          <h1 className="text-lg font-bold text-white tracking-widest">BUILD.MASTER</h1>
        </div>

        {/* Current Project */}
        <div className="px-6 py-6 border-b border-[#1A2634] shrink-0">
          <p className="text-[10px] text-[#5A728A] uppercase tracking-[0.2em] mb-2">CURRENT PROJECT</p>
          <h2 className="text-sm font-bold text-white mb-2 font-sans">Greenfield Residence</h2>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00CC66] shadow-[0_0_8px_#00CC66]"></div>
            <p className="text-[10px] text-[#5A728A]">Phase 2 Active</p>
          </div>
        </div>

        {/* Navigation (This part scrolls internally if menus get too long) */}
        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className="px-4 mb-8">
            <p className="text-[10px] text-[#5A728A] uppercase tracking-[0.2em] mb-4 px-2">MAIN</p>
            <nav className="space-y-1">
              {mainNavItems.map((item, idx) => {
                const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded transition-all ${
                      isActive
                        ? 'bg-[#00D9FF]/5 border-l-2 border-[#00D9FF] text-[#00D9FF]'
                        : 'text-[#5A728A] hover:text-white border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs tracking-wider">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border border-current ${item.badge.color}`}>
                        {item.badge.text}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="px-4">
            <p className="text-[10px] text-[#5A728A] uppercase tracking-[0.2em] mb-4 px-2">TOOLS</p>
            <nav className="space-y-1">
              {toolsItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded text-[#5A728A] hover:text-white border-l-2 border-transparent transition-all"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs tracking-wider">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* User Profile (Fixed at bottom of sidebar) */}
        <div className="p-4 border-t border-[#1A2634] shrink-0">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-[#0F1620] border border-[#1A2634] flex items-center justify-center text-[#00D9FF] font-bold">
              JM
            </div>
            <div>
              <p className="text-xs font-bold text-white font-sans">Jayesh Jain</p>
              <p className="text-[9px] text-[#5A728A] tracking-wider">PROJECT OWNER</p>
            </div>
          </div>
          <button className="w-full py-2 text-[10px] text-[#5A728A] hover:text-white bg-[#0F1620] border border-[#1A2634] hover:border-[#5A728A] transition-all tracking-widest flex justify-center items-center gap-2">
            <span>←</span> LOGOUT
          </button>
        </div>
      </motion.aside>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 lg:hidden z-30" />
      )}
    </>
  );
}