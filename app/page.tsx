'use client';
import { useEffect } from 'react';
import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import StatsBanner from '@/components/StatsBanner';
import PhaseShowcase from '@/components/PhaseShowcase';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="bg-transparent min-h-screen">
      <HeroCanvasAnimation />
      <StatsBanner />
      <PhaseShowcase />
      <FeatureSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
