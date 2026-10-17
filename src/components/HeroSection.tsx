import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#050508]">
      {/* 3D Interactive Canvas Background */}
      <Hero3DCanvas />

      {/* Subtle radial gradient overlay to preserve typographic contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent pointer-events-none z-10 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-[#050508]/80 pointer-events-none z-10" />

      {/* Top telemetry spacer */}
      <div className="relative z-20 pt-24 sm:pt-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">INITIALIZED // QUANTUM 3D PIPELINE</span>
          <span className="sm:hidden">QUANTUM 3D // ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-slate-400">
          <span className="hidden md:inline">SPATIAL COMPUTING READY</span>
          <span className="text-purple-400">v2.4.0</span>
        </div>
      </div>

      {/* Center Hero Typographic Statement */}
      <div className="relative z-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 pointer-events-none">
        <div className="max-w-4xl">
          {/* Subtle category chip */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/25 mb-4 sm:mb-6 backdrop-blur-md pointer-events-auto max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-purple-200 uppercase truncate">
              NEXT-GEN DIGITAL CRAFTSMANSHIP
            </span>
          </div>

          {/* Large Hero Headline */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tight leading-[0.94] text-white">
            WE BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]">
              WHAT’S NEXT.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed tracking-wide">
            Digital products, immersive experiences and future-ready technology engineered for ambitious ideas.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pointer-events-auto max-w-md sm:max-w-none">
            <button
              onClick={() => scrollTo('services-overview')}
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase hover:bg-slate-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] text-center"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown className="w-4 h-4 text-black group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#12121c]/80 border border-purple-500/30 text-white font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] font-medium uppercase hover:border-purple-400 hover:bg-purple-950/40 transition-all duration-300 backdrop-blur-md text-center"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Scroll Prompt */}
      <div className="relative z-20 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full flex justify-between items-end pointer-events-none gap-4">
        <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 flex flex-col gap-0.5 sm:gap-1">
          <span className="text-slate-400">SAHVION DIGITAL CORE</span>
          <span className="hidden sm:inline text-slate-500">INTERACTIVE 3D ROTATION: ACTIVE</span>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('intro')}
          className="pointer-events-auto flex flex-col items-center gap-1.5 sm:gap-2 group text-slate-400 hover:text-white transition-colors"
          aria-label="Scroll to introduction"
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase">SCROLL</span>
          <div className="w-4 sm:w-5 h-7 sm:h-9 rounded-full border border-white/20 flex items-start justify-center p-1 sm:p-1.5 group-hover:border-purple-400 transition-colors">
            <div className="w-1 h-2 rounded-full bg-purple-400 animate-bounce" />
          </div>
        </button>

        <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 text-right">
          <span className="hidden sm:block">LATENCY // 12MS</span>
          <div className="text-purple-400">60 FPS WEBGL</div>
        </div>
      </div>
    </section>
  );
};
