'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const TOTAL_FRAMES = 120; // Adjust based on your frame count
const FRAME_PATH = '/frames'; // Folder containing ezgif-frame-001.jpg to ezgif-frame-120.jpg

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const scrollVelocity = useVelocity(scrollYProgress);
  const yOffset = useTransform(scrollVelocity, [-1, 0, 1], [15, 0, -15]);
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = `${FRAME_PATH}/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
          img.onload = () => {
            setLoadProgress((prev) => prev + (100 / TOTAL_FRAMES));
            resolve(img);
          };
          img.onerror = () => {
            // Silently resolve failed image loads to not block execution completely but continue. Normally would reject.
            setLoadProgress((prev) => prev + (100 / TOTAL_FRAMES));
            resolve(new Image()); // return empty image
          };
        });
      });
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
      setImagesLoaded(true);
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = () => {
      const currentFrame = Math.round(frameIndex.get());
      const img = images[Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1))];
      if (img && img.src) {
        // Adjust responsive dimensions if needed later on
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        // Draw grid placeholder safely
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const unsubscribe = frameIndex.on('change', renderFrame);
    renderFrame();
    const handleResize = () => renderFrame();
    window.addEventListener('resize', handleResize);
    return () => { unsubscribe(); window.removeEventListener('resize', handleResize); };
  }, [imagesLoaded, images, frameIndex]);

  const section1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.2, 0.35, 0.5], [0, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.5, 0.65, 0.8], [0, 1, 0]);
  const section4Opacity = useTransform(smoothProgress, [0.8, 0.95, 1], [0, 1, 1]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <>
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-[#0d0f14] flex flex-col items-center justify-center z-50">
          {/* Logo */}
          <div className="text-[#F4F6F8] font-black tracking-[0.15em] uppercase text-4xl md:text-5xl font-[var(--font-syne)] mb-12">
            BUILD<span className="text-[#1FE0E4]">.</span>MA<span className="text-[#D911E3]">S</span>TER
          </div>

          {/* Divider Line */}
          <div className="w-96 h-px bg-gradient-to-r from-transparent via-[#334155] to-transparent mb-12" />

          {/* Progress Bar */}
          <div className="w-80 h-1 bg-[#1F1F1F] rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1FE0E4] via-[#3B82F6] to-[#9333EA]"
              initial={{ width: '0%' }}
              animate={{ width: `${loadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading Text */}
          <p className="text-[#889EAA] text-xs font-['JetBrains_Mono'] uppercase tracking-widest">
            INITIALIZING SYSTEMS... {Math.round(loadProgress)}%
          </p>
        </div>
      )}

      <div ref={containerRef} className="relative h-[800vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <motion.div style={{ y: yOffset }} className="w-full h-full opacity-60">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Blending Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505] opacity-90 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div style={{ opacity: section1Opacity }} className="absolute w-full flex flex-col items-start justify-center text-left px-4 md:px-[5%] lg:px-[6%]">
            <div className="border border-[#1FE0E4]/30 px-4 py-1.5 mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1FE0E4] animate-pulse"></div>
              <span className="text-[#1FE0E4] text-[0.6rem] md:text-xs font-['JetBrains_Mono'] tracking-[0.2em] font-medium uppercase">
                Construction Management Platform
              </span>
            </div>
            <div className="flex flex-col items-start leading-[0.85] md:leading-[0.8] tracking-tight mb-8 md:mb-10 w-full font-[var(--font-syne)]">
              <h1 className="text-[20vw] md:text-[10vw] lg:text-[8vw] font-black text-[#F4F6F8]">
                Build
              </h1>
              <h1 className="text-[20vw] md:text-[10vw] lg:text-[8vw] font-black text-[#1FE0E4]">
                Master
              </h1>
            </div>
            <p className="text-[#889EAA] text-sm md:text-lg lg:text-xl max-w-[28rem] font-['Inter'] leading-relaxed">
              Manage your entire build from blueprints to final <br className="hidden md:block" /> walkthrough — one unified platform.
            </p>
          </motion.div>

          <motion.div style={{ opacity: section2Opacity }} className="absolute w-full flex flex-col items-start justify-center text-left px-4 md:px-[5%] lg:px-[6%]">
            <div className="border border-[#86198F]/50 px-4 py-1.5 mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#86198F] animate-pulse"></div>
              <span className="text-[#86198F] text-[0.6rem] md:text-xs font-['JetBrains_Mono'] tracking-[0.2em] font-medium uppercase">
                PHASE 01 — DESIGN
              </span>
            </div>

            <div className="flex flex-col items-start leading-[0.9] tracking-tight mb-8 w-full font-[var(--font-syne)]">
              <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-bold md:font-extrabold text-[#F4F6F8]">
                From <span className="text-[#86198F]">Blueprint</span>
              </h1>
              <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-bold md:font-extrabold text-[#F4F6F8]">
                to Reality
              </h1>
            </div>

            <p className="text-[#889EAA] text-sm md:text-lg lg:text-xl max-w-[34rem] font-['Inter'] leading-relaxed mb-8 md:mb-12">
              Watch structural plans transition seamlessly into physical materials with precision engineering oversight.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="border border-[#889EAA]/20 bg-black/40 backdrop-blur-sm px-4 py-2">
                <span className="text-[#889EAA] text-[0.6rem] md:text-[10px] font-['JetBrains_Mono'] tracking-[0.15em] uppercase">
                  AUTOCAD INTEGRATION
                </span>
              </div>
              <div className="border border-[#889EAA]/20 bg-black/40 backdrop-blur-sm px-4 py-2">
                <span className="text-[#889EAA] text-[0.6rem] md:text-[10px] font-['JetBrains_Mono'] tracking-[0.15em] uppercase">
                  3D MODELING
                </span>
              </div>
              <div className="border border-[#889EAA]/20 bg-black/40 backdrop-blur-sm px-4 py-2">
                <span className="text-[#889EAA] text-[0.6rem] md:text-[10px] font-['JetBrains_Mono'] tracking-[0.15em] uppercase">
                  PERMIT FILING
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: section3Opacity }} className="absolute w-full flex flex-col items-end justify-center text-right px-4 md:px-[5%] lg:px-[6%]">
            <div className="border border-[#EA580C]/50 px-4 py-1.5 mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></div>
              <span className="text-[#EA580C] text-[0.6rem] md:text-xs font-['JetBrains_Mono'] tracking-[0.2em] font-medium uppercase">
                PHASE 02 — EXECUTION
              </span>
            </div>

            <div className="flex flex-col items-end leading-[0.9] tracking-tight mb-8 w-full font-[var(--font-syne)]">
              <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-bold md:font-extrabold text-[#EA580C]">
                Engineering
              </h1>
              <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-bold md:font-extrabold text-[#F4F6F8]">
                Precision
              </h1>
            </div>

            <p className="text-[#889EAA] text-sm md:text-lg lg:text-xl max-w-[34rem] font-['Inter'] leading-relaxed mb-8 md:mb-12">
              Compare competitive bids, vet licensed contractors, <br className="hidden md:block" /> and track every milestone to the millimeter.
            </p>

            <div className="flex flex-wrap items-center justify-end gap-3 md:gap-4 w-full">
              <div className="border border-[#889EAA]/20 bg-black/40 backdrop-blur-sm px-4 py-2">
                <span className="text-[#889EAA] text-[0.6rem] md:text-[10px] font-['JetBrains_Mono'] tracking-[0.15em] uppercase">
                  BID MANAGEMENT
                </span>
              </div>
              <div className="border border-[#889EAA]/20 bg-black/40 backdrop-blur-sm px-4 py-2">
                <span className="text-[#889EAA] text-[0.6rem] md:text-[10px] font-['JetBrains_Mono'] tracking-[0.15em] uppercase">
                  LIVE TRACKING
                </span>
              </div>
              <div className="border border-[#889EAA]/20 bg-black/40 backdrop-blur-sm px-4 py-2">
                <span className="text-[#889EAA] text-[0.6rem] md:text-[10px] font-['JetBrains_Mono'] tracking-[0.15em] uppercase">
                  COST CONTROLS
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ opacity: section4Opacity }} className="absolute w-full flex flex-col items-center justify-center text-center px-4">
            <div className="border border-[#D911E3]/30 px-4 py-1.5 mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D911E3] animate-pulse"></div>
              <span className="text-[#D911E3] text-[0.6rem] md:text-xs font-['JetBrains_Mono'] tracking-[0.2em] font-medium uppercase">
                INITIALIZE PROJECT
              </span>
            </div>

            <div className="flex flex-col items-center leading-[0.9] tracking-tight mb-8 w-full font-[var(--font-syne)]">
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-bold md:font-extrabold text-[#F4F6F8]">
                Ready to Break
              </h1>
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-bold md:font-extrabold text-[#F4F6F8]">
                Ground?
              </h1>
            </div>

            <p className="text-[#889EAA] text-sm md:text-lg lg:text-xl max-w-[34rem] font-['Inter'] leading-relaxed mb-10">
              Join 2,400+ project managers building smarter today.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-[#0891B2] to-[#2DE2E6] text-[#050505] font-['JetBrains_Mono'] tracking-[0.2em] uppercase text-[0.6rem] md:text-xs font-bold pointer-events-auto transition-all hover:shadow-[0_0_30px_rgba(45,226,230,0.4)]"
            >
              START BUILDING →
            </motion.button>
          </motion.div>
        </div>

        <motion.div style={{ opacity: scrollIndicatorOpacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-[#6B6B6B] text-[10px] font-['JetBrains_Mono'] tracking-[0.2em] uppercase">
            Scroll to Construct
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#5E6AD2] to-transparent opacity-50" />
        </motion.div>
      </div>
    </div>
    </>
  );
}
