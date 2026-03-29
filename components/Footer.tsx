'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-[#111520] border-t border-[#334155]/60 py-8 relative z-10 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Logo */}
          <div className="text-[#F4F6F8] font-black tracking-[0.1em] uppercase text-lg font-[var(--font-syne)]">
            BUILD<span className="text-[#1FE0E4]">.</span>MASTER
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center gap-8 md:gap-12">
            {['ABOUT', 'PRICING', 'DOCS', 'CONTACT'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#6B7280] hover:text-[#F4F6F8] text-[10px] font-bold uppercase tracking-[0.2em] font-['JetBrains_Mono'] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right: Copyright */}
          <div className="text-[#6B7280] text-[10px] font-bold uppercase tracking-[0.2em] font-['JetBrains_Mono']">
            © 2025 BUILD MASTER. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
