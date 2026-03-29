'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setIsScrolled(latest > 0.05);
    });
  }, [scrollYProgress]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none"
    >
      {/* Scroll Progress Line */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] origin-left"
      />
      {/* Left Box: Logo */}
      <div className="flex items-center pointer-events-auto w-[200px] md:w-[250px]">
        <a href="#" className="text-[#F4F6F8] font-black tracking-[0.1em] md:tracking-[0.15em] uppercase text-lg md:text-xl font-[var(--font-syne)] pt-1">
          BUILD<span className="text-[#1FE0E4]">.</span>MASTER
        </a>
      </div>

      {/* Center Links (Absolutely Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 pointer-events-auto">
        {['PHASES', 'FEATURES', 'PROCESS', 'GET STARTED'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className="text-[#6B7280] hover:text-[#F4F6F8] text-[10px] font-bold uppercase tracking-[0.2em] font-['JetBrains_Mono'] transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1FE0E4] transition-all group-hover:w-full"></span>
          </a>
        ))}
      </div>
      
      {/* Right CTA Button Wrapper */}
      <div className="flex items-center justify-end pointer-events-auto w-auto md:w-[250px] gap-4">
        <div className="hidden md:block">
          <Link href="/auth/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#2563EB] bg-transparent backdrop-blur-sm px-6 py-2.5 text-[#F4F6F8] hover:bg-[#2563EB]/10 hover:border-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.2em] font-['JetBrains_Mono'] transition-all duration-300 flex items-center gap-3 relative group overflow-hidden cursor-pointer"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                initial={{ x: '-100%' }}
                whileHover={{
                  x: '100%',
                  transition: { duration: 0.6, ease: 'easeInOut' },
                }}
              />
              <span className="relative z-10">
                START PROJECT <span className="text-[12px] leading-none ml-1">→</span>
              </span>
            </motion.div>
          </Link>
        </div>
        <MobileMenu />
      </div>
    </motion.nav>
  );
}
