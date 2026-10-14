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
    <section id="about" className="relative py-32 px-6 md:px-12 bg-[#050508] border-t border-white/[0.04]">
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/2 -left-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>// 08 VALUE MATRIX</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.05]">
            WHY SAHVION.
          </h2>
          <p className="mt-6 text-slate-300 text-lg font-light leading-relaxed">
            In an era saturated with cookie-cutter SaaS templates, SAHVION engineers distinct, cinematic digital products that define their categories.
          </p>
        </div>

        {/* High-Tech Comparison Matrix Table */}
        <div className="cyber-glass rounded-3xl border border-white/10 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="grid grid-cols-12 bg-white/[0.03] p-6 border-b border-white/[0.06] font-mono text-xs uppercase tracking-widest text-slate-400">
            <div className="col-span-12 md:col-span-4">CAPABILITY / VECTOR</div>
            <div className="hidden md:block md:col-span-4 text-slate-500">STANDARD INDUSTRY AGENCIES</div>
            <div className="col-span-12 md:col-span-4 text-purple-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>THE SAHVION ADVANTAGE</span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {comparison.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-6 md:p-8 hover:bg-white/[0.02] transition-colors items-center gap-4">
                <div className="col-span-12 md:col-span-4 font-display font-bold text-white text-lg">
                  {item.feature}
                </div>
                <div className="col-span-12 md:col-span-4 text-slate-400 text-sm font-light flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <span>{item.generic}</span>
                </div>
                <div className="col-span-12 md:col-span-4 text-purple-200 text-sm font-medium flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{item.sahvion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantifiable Benchmarks */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '60 FPS', label: 'FLUID WEBGL PIPELINE' },
            { num: '< 40 MS', label: 'EDGE LATENCY THRESHOLD' },
            { num: '100%', label: 'BESPOKE TAILORED CODE' },
            { num: '99.98%', label: 'PRODUCTION RELIABILITY' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0a0a14] border border-white/[0.06] flex flex-col justify-between">
              <div className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-400">
                {stat.num}
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-[11px] tracking-widest text-slate-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
