'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'PHASES', href: '#phases' },
    { label: 'FEATURES', href: '#features' },
    { label: 'PROCESS', href: '#process' },
    { label: 'GET STARTED', href: '#cta' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 pointer-events-auto"
        variants={hamburgerVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-6 h-0.5 bg-[#F4F6F8]"
          animate={isOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-6 h-0.5 bg-[#F4F6F8]"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-6 h-0.5 bg-[#F4F6F8]"
          animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-20 left-0 right-0 bg-[#0A0D14]/95 backdrop-blur-md border-b border-[#334155]/30 pointer-events-auto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col p-6 space-y-4"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {menuItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#889EAA] hover:text-[#1FE0E4] text-sm font-bold uppercase tracking-[0.2em] font-['JetBrains_Mono'] transition-colors duration-300 relative group"
                  variants={itemVariants}
                >
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-[#1FE0E4]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              <motion.hr
                className="my-2 border-[#334155]/30"
                variants={itemVariants}
              />

              <motion.button
                className="w-full border border-[#2563EB] bg-transparent px-4 py-2 text-[#F4F6F8] hover:bg-[#2563EB]/10 text-sm font-bold uppercase tracking-[0.2em] font-['JetBrains_Mono'] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START PROJECT
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
