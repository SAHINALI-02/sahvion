import React, { useState } from 'react';
import { Search, Compass, Palette, Code, Rocket, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    tagline: 'STRATEGIC FOUNDATION & RADAR',
    description: 'We deconstruct your domain, audience psychology, competitive vectors, and technical constraints to map uncharted territory and high-impact opportunities.',
    deliverables: ['Domain & Landscape Analysis', 'User Behavior Telemetry', 'Technical Feasibility Audits', 'Strategic Horizon Brief'],
    icon: Search,
  },
  {
    number: '02',
    title: 'DEFINE',
    tagline: 'SYSTEM BLUEPRINTS & ARCHITECTURE',
    description: 'Establishing rigid performance budgets, modular architectural schematics, interactive user flows, and milestone engineering trajectories.',
    deliverables: ['System Architecture Matrix', 'Core Information Hierarchy', 'Performance & Latency Budgets', 'Milestone Engineering Roadmap'],
    icon: Compass,
  },
  {
    number: '03',
    title: 'DESIGN',
    tagline: 'SPATIAL CRAFT & INTERACTION PHYSICS',
    description: 'Sculpting high-fidelity UI systems, spatial 3D environments, kinetic typography, and fluid micro-interactions designed to evoke awe.',
    deliverables: ['Spatial Design System', 'Interactive High-Fidelity Prototypes', 'Custom 3D Meshes & Shaders', 'Kinetic Motion Choreography'],
    icon: Palette,
  },
  {
    number: '04',
    title: 'DEVELOP',
    tagline: 'PRECISION COMPUTATION & RIGOR',
    description: 'Transforming concepts into resilient production codebases using React, Three.js/WebGL, TypeScript, and high-frequency edge services.',
    deliverables: ['Type-Safe Modular Codebase', 'WebGL Shader Optimization', 'CI/CD Pipeline Automation', 'Cross-Platform Synthetic Tests'],
    icon: Code,
  },
  {
    number: '05',
    title: 'LAUNCH',
    tagline: 'ORCHESTRATED DEPLOYMENT',
    description: 'Executing zero-downtime deployments across multi-region edge networks accompanied by comprehensive stress testing and live performance tuning.',
    deliverables: ['Multi-Region Edge Deployment', 'Stress & Security Verification', 'Global CDN & Cache Calibration', 'Telemetry Sensor Activation'],
    icon: Rocket,
  },
  {
    number: '06',
    title: 'EVOLVE',
    tagline: 'ALGORITHMIC REFINEMENT & SCALE',
    description: 'Digital flagships are living organisms. We monitor telemetry, refine user interaction vectors, and iteratively scale features into tomorrow.',
    deliverables: ['Continuous Telemetry Audits', 'Interaction Optimization', 'Feature Scaling Iterations', 'Ongoing Architecture Guard'],
    icon: RefreshCw,
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 bg-[#060609] overflow-hidden cyber-grid border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/3 -right-40" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-purple-400 mb-2 sm:mb-3 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>// 07 EXECUTION METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
              THE CINEMATIC TIMELINE.
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-md font-light leading-relaxed">
            A battle-tested 6-stage engineering trajectory engineered to de-risk complexity and deliver uncompromising technological execution.
          </p>
        </div>

        {/* Process Steps Horizon Navigation */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 mb-8 sm:mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-2.5 sm:p-4 rounded-xl text-left transition-all duration-300 relative border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#151224] border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                    : 'bg-[#0a0a12]/60 border-white/[0.06] hover:border-white/20 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <span className={`font-mono text-xs sm:text-sm font-bold ${isActive ? 'text-purple-400' : 'text-slate-500'}`}>
                    {step.number}
                  </span>
                  <Icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isActive ? 'text-purple-300' : 'text-slate-500'}`} />
                </div>
                <div className="font-display font-bold text-xs sm:text-sm tracking-wider text-white truncate">
                  {step.title}
                </div>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute -bottom-[1px] left-2 right-2 sm:left-3 sm:right-3 h-[2px] bg-gradient-to-r from-purple-500 to-white shadow-[0_0_8px_#c084fc]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Showcase Card */}
        <div className="cyber-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle stage watermark */}
          <div className="absolute right-4 sm:right-8 -bottom-6 sm:-bottom-10 text-[90px] sm:text-[140px] md:text-[220px] font-display font-black text-white/[0.02] pointer-events-none select-none">
            {steps[activeStep].number}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase mb-3 sm:mb-4 max-w-full truncate">
                STAGE {steps[activeStep].number} // {steps[activeStep].tagline}
              </div>

              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
                {steps[activeStep].title}
              </h3>

              <p className="mt-4 sm:mt-6 text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {steps[activeStep].description}
              </p>

              <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                  className="px-3.5 sm:px-4 py-2 rounded-lg bg-white/[0.05] border border-white/10 font-mono text-[11px] sm:text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ← PREV STAGE
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                  className="px-3.5 sm:px-4 py-2 rounded-lg bg-purple-600/40 border border-purple-500/50 font-mono text-[11px] sm:text-xs text-white hover:bg-purple-600/60 transition-colors"
                >
                  NEXT STAGE →
                </button>
              </div>
            </div>

            {/* Deliverables Panel */}
            <div className="lg:col-span-5 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-black/50 border border-white/[0.06]">
              <div className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-purple-400 uppercase mb-3 sm:mb-4 pb-2 border-b border-white/[0.06]">
                KEY DELIVERABLES & ARTIFACTS
              </div>
              <div className="space-y-2.5 sm:space-y-3.5">
                {steps[activeStep].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-slate-300 text-xs sm:text-sm font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
