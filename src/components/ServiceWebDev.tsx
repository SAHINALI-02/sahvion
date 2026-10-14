import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, CheckCircle2, Terminal, Activity, ArrowRight } from 'lucide-react';

export const ServiceWebDev: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the section the user has scrolled
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      setScrollProgress(progress);

      // Auto switch or morph based on scroll position
      if (progress > 0.55 && deviceMode === 'desktop') {
        setDeviceMode('mobile');
      } else if (progress <= 0.45 && deviceMode === 'mobile') {
        setDeviceMode('desktop');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [deviceMode]);

  return (
    <section
      id="service-web-app"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-[#07070b] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[550px] h-[550px] top-1/3 -left-48" />

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span>// 03 DISCIPLINE DEEP DIVE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Typography & Specifications */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="font-mono text-xs tracking-[0.25em] text-slate-500 uppercase mb-3">
              01 • ENGINEERING PRACTICE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              DIGITAL PRODUCTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-slate-400">
                THAT PERFORM.
              </span>
            </h2>

            <p className="mt-6 text-slate-300 text-lg font-light leading-relaxed">
              “From responsive websites to scalable applications, we create digital experiences engineered for performance and growth.”
            </p>

            {/* Interactive Mode Toggle */}
            <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#12121c] border border-white/10">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                  deviceMode === 'desktop'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>DESKTOP SUITE</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                  deviceMode === 'mobile'
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>MOBILE HYBRID</span>
              </button>
            </div>

            {/* Architectural Highlights */}
            <div className="mt-10 space-y-4">
              {[
                { label: 'Latency Benchmark', val: 'Sub-40ms TTFB across edge regions' },
                { label: 'Graphics Pipeline', val: 'WebGL 2.0 / R3F with fallback DOM tree' },
                { label: 'Resilience Architecture', val: 'Zero-downtime micro-service distribution' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs text-white uppercase tracking-wider block">{item.label}</span>
                    <span className="text-slate-400 text-sm font-light">{item.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Floating Window / Phone Transformation */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-xl h-[460px] md:h-[520px] flex items-center justify-center">
              
              {/* Outer atmospheric aura */}
              <div className="absolute inset-0 bg-purple-600/10 rounded-3xl blur-2xl transform rotate-3" />

              {/* The Floating Transforming 3D Device Container */}
              <div
                style={{
                  transform:
                    deviceMode === 'desktop'
                      ? 'perspective(1200px) rotateY(-8deg) rotateX(6deg) scale(1)'
                      : 'perspective(1200px) rotateY(12deg) rotateX(4deg) scale(0.95)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`relative overflow-hidden border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
                  deviceMode === 'desktop'
                    ? 'w-full max-w-lg h-[340px] md:h-[380px] rounded-2xl bg-[#0b0b12]/90'
                    : 'w-[280px] md:w-[320px] h-[460px] md:h-[480px] rounded-[40px] bg-[#0c0c16]/95 border-purple-500/30'
                }`}
              >
                {/* Device Header Bar */}
                {deviceMode === 'desktop' ? (
                  // Desktop Browser Header
                  <div className="h-9 px-4 bg-white/[0.04] border-b border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-white/[0.06] font-mono text-[10px] text-slate-300">
                      <span className="text-purple-400">https://</span>
                      <span>sahvion.network/core-platform</span>
                    </div>
                    <div className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE</span>
                    </div>
                  </div>
                ) : (
                  // Smartphone Dynamic Island & Speaker Notch
                  <div className="pt-3 px-6 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-slate-400">9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-purple-900/60 mr-2" />
                      <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-purple-400">
                      <span>5G</span>
                      <Activity className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {/* Viewport Interior Content */}
                <div className="p-6 h-[calc(100%-40px)] flex flex-col justify-between overflow-hidden">
                  <div>
                    {/* Simulated App Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
                      <div className="flex items-center gap-2 font-display font-bold text-white text-sm tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>SAHVION OS</span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-purple-300">
                        LATENCY: 8MS
                      </span>
                    </div>

                    {/* Simulated Live Analytics / 3D Telemetry inside the screen */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="font-mono text-[9px] text-slate-400 uppercase">GPU ACCELERATION</span>
                        <div className="font-display font-bold text-lg text-white mt-1">60.0 FPS</div>
                        <div className="w-full bg-white/10 h-1 rounded mt-2">
                          <div className="bg-purple-400 h-full w-[95%]" />
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="font-mono text-[9px] text-slate-400 uppercase">NODE RESPONSE</span>
                        <div className="font-display font-bold text-lg text-emerald-400 mt-1">0.03 SEC</div>
                        <div className="w-full bg-white/10 h-1 rounded mt-2">
                          <div className="bg-emerald-400 h-full w-[98%]" />
                        </div>
                      </div>
                    </div>

                    {/* Futuristic Code Snippet / Wireframe Visual */}
                    <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/[0.05] font-mono text-[10px] text-slate-300 space-y-1">
                      <div className="text-purple-400 flex items-center gap-1">
                        <Terminal className="w-3 h-3" />
                        <span>// RENDER_PIPELINE.TS</span>
                      </div>
                      <p className="text-slate-400">
                        <span className="text-blue-400">const</span> engine = <span className="text-yellow-300">createKernel</span>({'{'}
                      </p>
                      <p className="pl-4 text-purple-300">physics: <span className="text-emerald-300">'deterministic'</span>,</p>
                      <p className="pl-4 text-purple-300">mesh: <span className="text-emerald-300">'hyper-curved'</span></p>
                      <p className="text-slate-400">{'}'});</p>
                    </div>
                  </div>

                  {/* Device Bottom Status */}
                  <div className="pt-2 flex justify-between items-center font-mono text-[10px] text-slate-500 border-t border-white/[0.05]">
                    <span>STATUS: OPERATIONAL</span>
                    <span className="text-purple-400">AUTO-SCROLL SYNCED</span>
                  </div>
                </div>

                {/* Mobile Bottom Home Bar */}
                {deviceMode === 'mobile' && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
