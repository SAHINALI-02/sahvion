import React from 'react';
import { BrandWordmark, BrandTagline } from './BrandWordmark';
import { Sparkles } from 'lucide-react';

export const FutureStatement: React.FC = () => {
  return (
    <section className="relative py-40 px-6 md:px-12 bg-[#040407] overflow-hidden flex flex-col items-center justify-center text-center border-t border-white/[0.04]">
      {/* Central massive subtle radial bloom */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-900/15 blur-[160px] pointer-events-none" />

      {/* Subtle background concentric geometry rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full border border-purple-500/30" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-white/10" />
        <div className="absolute w-[1100px] h-[1100px] rounded-full border border-purple-500/10" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        {/* Futuristic manifesto tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-mono text-[10px] tracking-[0.35em] uppercase mb-10">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>FUTURE MANIFESTO // HORIZON 2030</span>
        </div>

        {/* Large Statement Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[1.0] text-white">
          THE FUTURE BELONGS TO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]">
            THOSE WHO ARCHITECT IT.
          </span>
        </h2>

        {/* Supporting Narrative */}
        <p className="mt-10 text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed tracking-wide">
          Software is transcending static rectangles. We engineer the kinetic, spatial, and intelligent digital dimensions that will define human-computer interaction for the next generation.
        </p>

        {/* Modular Wordmark & Tagline Lockup */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <BrandWordmark size="lg" withGlow={true} />
          <BrandTagline className="mt-2 text-xs" />
        </div>
      </div>
    </section>
  );
};
