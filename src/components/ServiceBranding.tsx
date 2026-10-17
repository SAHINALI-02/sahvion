import React, { useState } from 'react';
import { Sparkles, Hexagon, Circle, Square, Compass, RefreshCw } from 'lucide-react';

export const ServiceBranding: React.FC = () => {
  const [activeGeometry, setActiveGeometry] = useState<number>(0);
  const [activePaletteIndex, setActivePaletteIndex] = useState<number>(0);

  const abstractGeometries = [
    {
      name: 'PARAMETRIC TOROID [SPECIMEN 01]',
      type: 'Torus Manifold',
      description: 'Abstract continuous non-orientable topological surface with metallic refraction.',
      renderSvg: (
        <svg viewBox="0 0 200 200" className="w-48 h-48 animate-pulse-slow">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />
          <ellipse cx="100" cy="100" rx="80" ry="35" fill="none" stroke="#e2e8f0" strokeWidth="2" transform="rotate(-30 100 100)" />
          <ellipse cx="100" cy="100" rx="80" ry="35" fill="none" stroke="#8b5cf6" strokeWidth="2" transform="rotate(30 100 100)" />
          <ellipse cx="100" cy="100" rx="80" ry="35" fill="none" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(90 100 100)" />
          <circle cx="100" cy="100" r="16" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'HYPER-PRISM [SPECIMEN 02]',
      type: 'Polyhedral Array',
      description: 'Multi-faceted abstract volumetric construct casting crystalline specular reflections.',
      renderSvg: (
        <svg viewBox="0 0 200 200" className="w-48 h-48 animate-pulse-slow">
          <polygon points="100,20 180,70 180,150 100,190 20,150 20,70" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
          <line x1="100" y1="20" x2="100" y2="190" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20" y1="70" x2="180" y2="150" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="20" y1="150" x2="180" y2="70" stroke="#cbd5e1" strokeWidth="1" />
          <polygon points="100,55 145,85 145,135 100,160 55,135 55,85" fill="rgba(168,85,247,0.15)" stroke="#ffffff" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      name: 'ISOMETRIC WAVEFORM [SPECIMEN 03]',
      type: 'Kinetic Lattice',
      description: 'Harmonic oscillation field displaying dynamic balance and high-frequency coherence.',
      renderSvg: (
        <svg viewBox="0 0 200 200" className="w-48 h-48 animate-pulse-slow">
          {[...Array(7)].map((_, i) => (
            <path
              key={i}
              d={`M 20 ${70 + i * 10} Q 60 ${40 + i * 10} 100 ${70 + i * 10} T 180 ${70 + i * 10}`}
              fill="none"
              stroke={i % 2 === 0 ? '#c084fc' : '#e2e8f0'}
              strokeWidth={1.5}
              strokeOpacity={0.4 + (i / 7) * 0.6}
            />
          ))}
          <circle cx="100" cy="100" r="40" fill="none" stroke="#a855f7" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const colorPalettes = [
    { name: 'OBSIDIAN QUANTUM', colors: ['#050508', '#1a0933', '#3b0764', '#8b5cf6', '#f8fafc'] },
    { name: 'METALLIC CHROME', colors: ['#08080c', '#334155', '#64748b', '#cbd5e1', '#ffffff'] },
    { name: 'VIOLET LUMEN', colors: ['#0b0714', '#2e1065', '#6b21a8', '#c084fc', '#f3e8ff'] },
  ];

  return (
    <section
      id="service-branding"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 bg-[#060609] overflow-hidden cyber-grid border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/3 -left-40" />

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span>// 05 DISCIPLINE DEEP DIVE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Headline and Concept */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-slate-500 uppercase mb-2 sm:mb-3">
              03 • VISUAL IDENTITY LABORATORY
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              MAKE YOUR IDENTITY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-slate-400">
                UNFORGETTABLE.
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              We engineer generative brand systems, bespoke kinetic typography, and distinct visual worlds that pierce through digital noise and endure for decades.
            </p>

            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-purple-400 mb-1.5 sm:mb-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>LABORATORY PROTOCOL</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Notice: All geometry displayed represents modular abstract generative studies. Permanent brand marks are engineered with proprietary mathematical proportions.
              </p>
            </div>

            {/* Specimen Switcher */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400 uppercase">SPECIMEN:</span>
              <div className="flex gap-2">
                {abstractGeometries.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGeometry(i)}
                    className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg font-mono text-xs flex items-center justify-center transition-all ${
                      activeGeometry === i
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Identity Laboratory Arena */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#0a0a12]/90 border border-white/10 p-5 sm:p-8 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              
              {/* Lab Header */}
              <div className="flex flex-wrap items-center justify-between pb-4 sm:pb-6 border-b border-white/[0.08] gap-3">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-purple-400 uppercase block">
                    IDENTITY INCUBATOR // ENGINE 03
                  </span>
                  <div className="font-display font-bold text-white text-base sm:text-lg mt-0.5">
                    {abstractGeometries[activeGeometry].name}
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  <span>CALIBRATED</span>
                </div>
              </div>

              {/* Center Abstract Geometry Display */}
              <div className="py-6 sm:py-10 flex flex-col items-center justify-center relative">
                <div className="p-4 sm:p-6 rounded-2xl bg-black/50 border border-white/[0.06] shadow-inner relative flex items-center justify-center">
                  <div className="scale-75 sm:scale-100 transition-transform">
                    {abstractGeometries[activeGeometry].renderSvg}
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-mono text-slate-400 text-center max-w-sm px-2">
                  {abstractGeometries[activeGeometry].description}
                </p>
              </div>

              {/* Lab Bottom: Typography & Color Swatches */}
              <div className="pt-5 sm:pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Typography Specimen */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-slate-400 mb-2">
                    <span>TYPOGRAPHY SYSTEM</span>
                    <span className="text-purple-400">SPACE GROTESK</span>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-[0.15em] sm:tracking-[0.2em]">
                    Aa Bb Gg
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[8px] sm:text-[9px] text-slate-500">
                    <span>WEIGHT: 300 / 500 / 900</span>
                    <span>OPTICAL KERNING: STRICT</span>
                  </div>
                </div>

                {/* Color Spectrum */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-slate-400 mb-2">
                    <span>CHROMATIC PALETTE</span>
                    <span className="text-purple-400 truncate max-w-[140px] sm:max-w-none">{colorPalettes[activePaletteIndex].name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
                    {colorPalettes[activePaletteIndex].colors.map((c, cIdx) => (
                      <div key={cIdx} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                        <div
                          className="w-full h-7 sm:h-8 rounded-md sm:rounded-lg border border-white/20 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                        <span className="text-[7px] sm:text-[8px] font-mono text-slate-500 truncate w-full text-center">{c}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => setActivePaletteIndex((prev) => (prev + 1) % colorPalettes.length)}
                      className="text-[9px] font-mono text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>CYCLE PALETTE</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
