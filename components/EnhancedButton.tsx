'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
}: EnhancedButtonProps) {
  const baseStyles = 'font-bold tracking-[0.2em] font-[\'JetBrains_Mono\'] uppercase transition-all duration-300 relative overflow-hidden group';

  const variants = {
    primary: 'px-8 py-3 bg-[#1FE0E4] text-[#050505] hover:bg-[#00D9E0]',
    secondary: 'px-8 py-3 bg-transparent border-2 border-[#1FE0E4] text-[#1FE0E4] hover:bg-[#1FE0E4] hover:text-[#050505]',
    tertiary: 'px-6 py-2 border border-[#334155]/50 bg-transparent hover:bg-white/5 hover:border-[#1FE0E4]/50 text-[#889EAA] hover:text-[#1FE0E4]',
  };

  const sizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-[12px]',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const shineContent = (
    <>
      {/* Shine effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6, ease: 'easeInOut' },
        }}
      />

      {/* Animated gradient border for secondary variant */}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#1FE0E4] via-[#3B82F6] to-[#9333EA] opacity-0 group-hover:opacity-100 rounded-sm"
          style={{ zIndex: -1 }}
        />
      )}

      {/* Content */}
      <motion.span
        className="relative z-10 block"
        initial={{ y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          className={buttonClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {shineContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {shineContent}
    </motion.button>
  );
}
