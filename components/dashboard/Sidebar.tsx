'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const mainNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '◉', badge: null },
    { label: 'Phases', href: '/phases', icon: '◆', badge: { text: '4', color: 'bg-[#00D9FF]' } },
    { label: 'Vendors', href: '/vendors', icon: '◈', badge: { text: '2 NEW', color: 'bg-[#FF6B35]' } },
    { label: 'Quotes', href: '/quotes', icon: '◊', badge: { text: '5', color: 'bg-[#FF3333]' } },
    { label: 'Documents', href: '/documents', icon: '⬜', badge: null },
  ];

  const toolsItems = [
    { label: 'Budget', href: '/budget', icon: '⬜' },
    { label: 'Schedule', href: '/schedule', icon: '⬜' },
    { label: 'Settings', href: '/settings', icon: '⬜' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 lg:hidden z-40 p-2 rounded-lg bg-[#0A1628] border border-[#00D9FF]/30 text-[#00D9FF]"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0A1628] via-[#0D1E33] to-[#0A1628] border-r border-[#00D9FF]/20 pt-20 overflow-hidden lg:relative lg:translate-x-0 lg:h-auto z-30 lg:z-0 flex flex-col"
      >
        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-[#00D9FF]/20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-[#00D9FF] rounded-sm"></div>
            <h1 className="text-sm font-bold text-white font-['JetBrains_Mono'] tracking-widest">BUILD.MASTER</h1>
          </div>
        </div>

        {/* Current Project Section */}
        <div className="px-6 py-4 border-b border-[#00D9FF]/20">
          <p className="text-xs text-[#7BA3C0] font-['JetBrains_Mono'] uppercase tracking-widest mb-2">CURRENT PROJECT</p>
          <h2 className="text-lg font-bold text-white mb-1">Greenfield Residence</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00CC66]"></div>
            <p className="text-xs text-[#7BA3C0]">Phase 2 Active</p>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="px-6 py-6">
            <p className="text-xs text-[#7BA3C0] font-['JetBrains_Mono'] uppercase tracking-widest mb-4">MAIN</p>
            <nav className="space-y-2">
              {mainNavItems.map((item, idx) => {
                const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard');
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'border border-[#00D9FF] bg-[#00D9FF]/10 text-[#00D9FF]'
                          : 'text-[#7BA3C0] hover:text-[#00D9FF] hover:border border-[#00D9FF]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-sm font-['JetBrains_Mono'] uppercase tracking-widest">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-xs px-2 py-1 rounded font-bold text-white ${item.badge.color}`}>
                          {item.badge.text}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Tools Section */}
          <div className="px-6 py-6 border-t border-[#00D9FF]/20">
            <p className="text-xs text-[#7BA3C0] font-['JetBrains_Mono'] uppercase tracking-widest mb-4">TOOLS</p>
            <nav className="space-y-2">
              {toolsItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (mainNavItems.length + idx) * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#7BA3C0] hover:text-[#00D9FF] hover:border border-[#00D9FF]/30 transition-all"
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm font-['JetBrains_Mono'] uppercase tracking-widest">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom User Profile */}
        <div className="border-t border-[#00D9FF]/20 p-6 bg-[#0D1E33]/50">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00D9FF] rounded flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[#0A1628] font-['JetBrains_Mono']">JM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">Jayesh Jain</p>
              <p className="text-xs text-[#7BA3C0]">PROJECT OWNER</p>
            </div>
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 border border-[#00D9FF]/40 text-[#7BA3C0] text-xs font-['JetBrains_Mono'] uppercase tracking-widest rounded hover:border-[#00D9FF]/70 hover:text-[#00D9FF] transition-all"
          >
            ← LOGOUT
          </motion.button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-20 top-20"
        />
      )}
    </>
  );
}
