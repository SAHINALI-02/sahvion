import React, { useRef, useState } from 'react';
import { Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const pillars = [
    {
      icon: Cpu,
      title: 'COMPUTATIONAL ARCHITECTURE',
      desc: 'Engineered with strict zero-compromise performance budgets, modern WebGL pipelines, and reactive state trees.',
    },
    {
      icon: Layers,
      title: 'SPATIAL CRAFTSMANSHIP',
      desc: 'Seamless synthesis of mathematical 3D geometry, organic lighting models, and physics-driven micro-interactions.',
    },
    {
      icon: Zap,
      title: 'HIGH-FREQUENCY VELOCITY',
      desc: 'From initial prototype synthesis to resilient global edge deployments in accelerated development cycles.',
    },
  ];

  return (
    <section id="intro" className="relative py-32 px-6 md:px-12 bg-[#060609] overflow-hidden cyber-grid border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/4 -right-48" />
      <div className="ambient-glow-purple w-[400px] h-[400px] bottom-10 -left-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Indicator */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-purple-400 mb-8 uppercase">
          <span className="w-2 h-2 rounded-sm bg-purple-500 shadow-[0_0_8px_#a855f7]" />
          <span>// 01 ARCHITECTURAL PHILOSOPHY</span>
        </div>

        {/* Large Typography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05] text-white">
              WE TURN IDEAS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-slate-100 to-slate-400">
                INTO DIGITAL EXPERIENCES.
              </span>
            </h2>

            <p className="mt-8 text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
              “SAHVION combines technology, design and innovation to create digital experiences built for the future.”
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs tracking-widest text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ENTERPRISE RIGOR
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                AESTHETIC SOPHISTICATION
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                REACTIVE PERCEPTION
              </span>
            </div>
          </div>

          {/* Interactive 3D Holographic Specimen Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${-mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className="lg:col-span-4 cyber-glass rounded-2xl p-8 relative overflow-hidden group border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Shimmer light follow effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(168,85,247,0.2), transparent 60%)`,
              }}
            />

            <div className="flex justify-between items-start mb-6">
              <div className="font-mono text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                SYSTEM TELEMETRY
              </div>
              <div className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/40">
                STABLE
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 uppercase">PROCESSING CAPACITY</div>
                <div className="text-xl font-display font-semibold text-white mt-1">99.98% SPEED INDEX</div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-purple-400 h-full w-[94%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 uppercase">SPATIAL RENDER FIDELITY</div>
                <div className="text-xl font-display font-semibold text-white mt-1">120 FPS NATIVE</div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-purple-400 h-full w-[98%]" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 uppercase">SYSTEM ARCHITECTURE</div>
                <div className="text-slate-200 mt-1 font-mono text-xs flex justify-between">
                  <span>BESPOKE R3F + TS</span>
                  <span className="text-purple-400">ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.07] flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>SAHVION PARADIGM // 2026</span>
              <span className="text-purple-400 animate-pulse">● LIVE</span>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="cyber-glass rounded-xl p-8 border border-white/[0.06] hover:border-purple-500/40 transition-all duration-300 relative group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-300 group-hover:scale-110 group-hover:border-purple-400 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-mono text-[11px] tracking-[0.25em] text-slate-400 mb-2">
                  0{index + 1} // ARCHITECTURE
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
