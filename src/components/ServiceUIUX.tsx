import React, { useState, useRef } from 'react';
import { Sliders, Eye, Layout, Compass, Sparkles, Check } from 'lucide-react';

export const ServiceUIUX: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState<'all' | 'wireframe' | 'system'>('all');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  return (
    <section
      id="service-ui-ux"
      className="relative py-32 px-6 md:px-12 bg-[#050508] overflow-hidden cyber-grid border-t border-white/[0.04]"
    >
      {/* Ambient background glow */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/4 -right-40" />

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span>// 04 DISCIPLINE DEEP DIVE</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs tracking-[0.25em] text-slate-500 uppercase mb-3">
              02 • HUMAN INTERACTION ARCHITECTURE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
              DESIGNED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-slate-100 to-purple-400">
                AROUND PEOPLE.
              </span>
            </h2>
            <p className="mt-6 text-slate-300 text-lg font-light leading-relaxed">
              We design spatial interfaces and comprehensive design systems where every pixel, transition, and micro-interaction feels deliberate, intuitive, and unforgettable.
            </p>
          </div>

          {/* Interactive Layer Filters */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#12121c] border border-white/10 shrink-0">
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all ${
                activeLayer === 'all'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL LAYERS
            </button>
            <button
              onClick={() => setActiveLayer('wireframe')}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all ${
                activeLayer === 'wireframe'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              WIREFRAME
            </button>
            <button
              onClick={() => setActiveLayer('system')}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all ${
                activeLayer === 'system'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DESIGN SYSTEM
            </button>
          </div>
        </div>

        {/* Floating Layered 3D UI Showcase Arena */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[540px] md:h-[620px] rounded-3xl bg-[#08080f]/70 border border-white/[0.08] p-6 md:p-12 overflow-hidden flex items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
        >
          {/* Depth background grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* LAYER 1: Core Dashboard Panel (Deep Layer) */}
          <div
            style={{
              transform: `perspective(1000px) translate3d(${mouse.x * 25}px, ${mouse.y * 25}px, 0px) rotateX(${-mouse.y * 8}deg) rotateY(${mouse.x * 8}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className={`absolute w-full max-w-2xl h-[360px] md:h-[400px] rounded-2xl bg-[#0f0f18]/90 border border-white/10 p-6 backdrop-blur-xl shadow-2xl transition-opacity duration-500 ${
              activeLayer === 'wireframe' ? 'opacity-20' : 'opacity-100'
            }`}
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="font-display font-bold text-white text-sm tracking-wider">NEURAL ANALYTICS CONSOLE</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>USER INTERACTION TELEMETRY: 98.4%</span>
              </div>
            </div>

            {/* Simulated Live Visuals */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-mono text-[10px] text-slate-400">COGNITIVE LOAD</div>
                <div className="font-display text-2xl font-bold text-white mt-1">14.2%</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1">OPTIMIZED</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-mono text-[10px] text-slate-400">TASK COMPLETION</div>
                <div className="font-display text-2xl font-bold text-purple-300 mt-1">99.7%</div>
                <div className="text-[10px] font-mono text-purple-400 mt-1">+18% FASTER</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-mono text-[10px] text-slate-400">MICRO-PHYSICS</div>
                <div className="font-display text-2xl font-bold text-slate-200 mt-1">60 Hz</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">SPRING DAMPED</div>
              </div>
            </div>

            {/* Interactive Bar Chart Graphic */}
            <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/[0.05]">
              <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-slate-400">
                <span>INTERACTION DURATION SPECTRUM</span>
                <span className="text-purple-400">MILLISECONDS</span>
              </div>
              <div className="flex items-end gap-2 h-16 w-full">
                {[35, 60, 45, 80, 65, 95, 70, 85, 100, 75, 90, 80, 95].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t bg-gradient-to-t from-purple-900/60 via-purple-500 to-purple-300 hover:brightness-125 transition-all"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* LAYER 2: Floating Mobile Interface (Mid Layer - offset right) */}
          <div
            style={{
              transform: `perspective(1000px) translate3d(${mouse.x * 50 + 160}px, ${mouse.y * 50 - 20}px, 60px) rotateX(${-mouse.y * 12}deg) rotateY(${mouse.x * 12}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className={`hidden md:block absolute right-16 w-64 h-[380px] rounded-3xl bg-[#141422]/95 border border-purple-500/40 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-opacity duration-500 ${
              activeLayer === 'system' ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
              <span className="font-mono text-[10px] text-purple-300">SPATIAL APP</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>

            <div className="mt-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-700 to-white/20 p-0.5 mb-3">
                <div className="w-full h-full rounded-full bg-[#12121e] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="font-display font-bold text-white text-base">BIOMETRIC PASS</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1">SESSION AUTHENTICATED</div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Gesture Engine</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Haptic Feedback</span>
                <span className="text-purple-400">TUNED</span>
              </div>
            </div>
          </div>

          {/* LAYER 3: Wireframe Component Overlay (Front Layer - offset left) */}
          <div
            style={{
              transform: `perspective(1000px) translate3d(${mouse.x * 65 - 180}px, ${mouse.y * 65 + 40}px, 90px) rotateX(${-mouse.y * 14}deg) rotateY(${mouse.x * 14}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className={`hidden lg:block absolute left-12 w-72 rounded-2xl bg-[#090912]/95 border-2 border-purple-500/40 border-dashed p-5 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-opacity duration-500 ${
              activeLayer === 'wireframe' || activeLayer === 'all' ? 'opacity-100' : 'opacity-20'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-purple-400 tracking-widest uppercase">
                // DESIGN TOKENS
              </span>
              <span className="text-[10px] font-mono bg-purple-950/80 px-2 py-0.5 rounded text-purple-300 border border-purple-800">
                v4.0
              </span>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">$color-primary</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                  <span>#8B5CF6</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">$font-heading</span>
                <span className="text-purple-300">Space Grotesk</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">$blur-glass</span>
                <span className="text-purple-300">24px saturate(1.8)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">$physics-spring</span>
                <span className="text-emerald-400">stiffness: 300</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>BOUNDING BOX: 288x340</span>
              <span className="text-purple-400">PIXEL SNAPPED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
