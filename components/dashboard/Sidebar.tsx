'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊', desc: 'Overview & metrics' },
    { label: 'Find Vendors', href: '/marketplace', icon: '🏪', desc: 'Browse vendors' },
    { label: 'My Quotes', href: '/my-quotes', icon: '📮', desc: 'View quotes' },
    { label: 'Mood-Board', href: '/moodboard', icon: '🎨', desc: 'Design ideas' },
    { label: 'Document Vault', href: '/vault', icon: '📁', desc: 'Safe storage' },
    { label: 'Estimator', href: '/calculator', icon: '🧮', desc: 'Cost calculator' },
    { label: 'Material Prices', href: '/price-check', icon: '💰', desc: 'Market rates' },
    { label: 'Budget Tracker', href: '/budget', icon: '📈', desc: 'Track spending' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 lg:hidden z-40 p-2 rounded-lg bg-[#1a1f2e] border border-[#334155] text-[#1FE0E4]"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-[#0d0f14] via-[#0a0c10] to-[#050507] border-r border-[#334155]/30 pt-20 overflow-hidden lg:relative lg:translate-x-0 lg:h-auto z-30 lg:z-0 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-[#334155]/30 mb-6">
          <h1 className="text-xl font-bold text-[#1FE0E4] font-['JetBrains_Mono'] flex items-center gap-2">
            <span>🏗️</span> BUILD MASTER
          </h1>
          <p className="text-xs text-[#889EAA] mt-2">Construction Dashboard</p>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-3">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
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
                  className={`block px-4 py-4 rounded-lg transition-all duration-300 flex items-start gap-3 group ${
                    isActive
                      ? 'bg-[#1FE0E4]/20 border border-[#1FE0E4] shadow-lg shadow-[#1FE0E4]/10'
                      : 'border border-[#334155]/20 hover:border-[#1FE0E4]/40 hover:bg-[#1FE0E4]/5'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm transition-colors ${
                      isActive ? 'text-[#1FE0E4]' : 'text-[#F4F6F8] group-hover:text-[#1FE0E4]'
                    }`}>
                      {item.label}
                    </p>
                    <p className={`text-xs transition-colors ${
                      isActive ? 'text-[#1FE0E4]/70' : 'text-[#889EAA] group-hover:text-[#889EAA]'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </nav>


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
