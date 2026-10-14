import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceWebDev } from './components/ServiceWebDev';
import { ServiceUIUX } from './components/ServiceUIUX';
import { ServiceBranding } from './components/ServiceBranding';
import { ServiceDigitalProducts } from './components/ServiceDigitalProducts';
import { ProcessSection } from './components/ProcessSection';
import { WhySahvion } from './components/WhySahvion';
import { FutureStatement } from './components/FutureStatement';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll listener for ambient effects
  useEffect(() => {
    document.title = 'SAHVION — TECH • INNOVATION • FUTURE';
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050508] text-white selection:bg-purple-600 selection:text-white">
      {/* Noise Texture Overlay */}
      <div className="cyber-noise" />

      {/* Cinematic Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. About / Introduction */}
        <IntroSection />

        {/* 3. Services Overview Grid */}
        <ServicesGrid />

        {/* 4. Discipline Deep Dive: Web & App Development */}
        <ServiceWebDev />

        {/* 5. Discipline Deep Dive: UI/UX Design */}
        <ServiceUIUX />

        {/* 6. Discipline Deep Dive: Branding & Design */}
        <ServiceBranding />

        {/* 7. Discipline Deep Dive: Custom Digital Products */}
        <ServiceDigitalProducts />

        {/* 8. Process Cinematic Timeline */}
        <ProcessSection />

        {/* 9. Why SAHVION */}
        <WhySahvion />

        {/* 10. Future Statement Manifesto */}
        <FutureStatement />

        {/* 11. Contact Inquiry Builder */}
        <ContactSection />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
};

export default App;
