import React from 'react';
import { ShieldCheck, Cpu, Flame, Infinity as InfinityIcon, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export const WhySahvion: React.FC = () => {
  const comparison = [
    {
      feature: 'Architectural Philosophy',
      generic: 'Template-based, bloated dependencies, generic UI libraries',
      sahvion: 'Bespoke, hand-crafted WebGL shaders, ultra-lean typed core',
    },
    {
      feature: '3D & Spatial Dimension',
      generic: 'Static images or sluggish pre-rendered videos',
      sahvion: 'Real-time 60fps GPU-accelerated interactive 3D physics',
    },
    {
      feature: 'Execution Velocity',
      generic: 'Months lost in bureaucratic design-dev handoff friction',
      sahvion: 'Tight unified engineering iterations from day one',
    },
    {
      feature: 'Scalability & Edge Deployment',
      generic: 'Monolithic servers prone to geographic latency spikes',
      sahvion: 'Distributed global edge architecture with sub-40ms TTFB',
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 bg-[#050508] border-t border-white/[0.04]">
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/2 -left-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>// 08 VALUE MATRIX</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.05]">
            WHY SAHVION.
          </h2>
          <p className="mt-4 sm:mt-6 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            In an era saturated with cookie-cutter SaaS templates, SAHVION engineers distinct, cinematic digital products that define their categories.
          </p>
        </div>

        {/* High-Tech Comparison Matrix Table */}
        <div className="cyber-glass rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="hidden md:grid grid-cols-12 bg-white/[0.03] p-6 border-b border-white/[0.06] font-mono text-xs uppercase tracking-widest text-slate-400">
            <div className="col-span-4">CAPABILITY / VECTOR</div>
            <div className="col-span-4 text-slate-500">STANDARD INDUSTRY AGENCIES</div>
            <div className="col-span-4 text-purple-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>THE SAHVION ADVANTAGE</span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {comparison.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 sm:p-6 md:p-8 hover:bg-white/[0.02] transition-colors items-start md:items-center gap-3 sm:gap-4">
                <div className="col-span-12 md:col-span-4 font-display font-bold text-white text-base sm:text-lg">
                  {item.feature}
                </div>
                <div className="col-span-12 md:col-span-4 text-slate-400 text-xs sm:text-sm font-light flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden font-mono text-[9px] text-slate-500 uppercase tracking-wider block mb-0.5">STANDARD INDUSTRY</span>
                    <span>{item.generic}</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-purple-200 text-xs sm:text-sm font-medium flex items-start gap-2.5 bg-purple-950/25 md:bg-transparent p-2.5 md:p-0 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden font-mono text-[9px] text-purple-400 uppercase tracking-wider block mb-0.5">SAHVION ADVANTAGE</span>
                    <span>{item.sahvion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantifiable Benchmarks */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {[
            { num: '60 FPS', label: 'FLUID WEBGL PIPELINE' },
            { num: '< 40 MS', label: 'EDGE LATENCY THRESHOLD' },
            { num: '100%', label: 'BESPOKE TAILORED CODE' },
            { num: '99.98%', label: 'PRODUCTION RELIABILITY' },
          ].map((stat, i) => (
            <div key={i} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0a0a14] border border-white/[0.06] flex flex-col justify-between">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-400">
                {stat.num}
              </div>
              <div className="mt-2 font-mono text-[9px] sm:text-[11px] tracking-wider sm:tracking-widest text-slate-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
