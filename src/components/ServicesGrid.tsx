import React, { useRef, useState } from 'react';
import { ArrowUpRight, Code, Palette, Sparkles, Cpu } from 'lucide-react';

interface ServiceCardData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  anchor: string;
  icon: React.ElementType;
  gradient: string;
}

const serviceCards: ServiceCardData[] = [
  {
    id: 'web-app',
    number: '01',
    title: 'WEB & APP DEVELOPMENT',
    tagline: 'High-Performance Spatial Codebases',
    description: 'Engineering responsive web applications, immersive 3D platforms, and high-load architectures built for maximum velocity.',
    tags: ['Next.js / React', 'Three.js / WebGL', 'Edge Infrastructure', 'Scalable APIs'],
    anchor: '#service-web-app',
    icon: Code,
    gradient: 'from-purple-500/20 to-indigo-500/10',
  },
  {
    id: 'ui-ux',
    number: '02',
    title: 'UI/UX DESIGN',
    tagline: 'Engineered Around Human Perception',
    description: 'Sculpting intuitive spatial interfaces, cohesive design systems, and micro-interactions that resonate on an emotional level.',
    tags: ['Design Systems', 'Spatial Interfaces', 'Micro-Interactions', 'User Telemetry'],
    anchor: '#service-ui-ux',
    icon: Palette,
    gradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    id: 'branding',
    number: '03',
    title: 'BRANDING & DESIGN',
    tagline: 'Futuristic Visual Laboratories',
    description: 'Crafting bold visual identities, typographic precision, and generative brand systems that command attention and longevity.',
    tags: ['Visual Identity', 'Kinetic Typography', 'Brand Architecture', 'Generative Art'],
    anchor: '#service-branding',
    icon: Sparkles,
    gradient: 'from-fuchsia-500/20 to-purple-500/10',
  },
  {
    id: 'custom-products',
    number: '04',
    title: 'CUSTOM DIGITAL PRODUCTS',
    tagline: 'Connected Cybernetic Ecosystems',
    description: 'Full-cycle conception and orchestration of proprietary software ecosystems, AI integrations, and mission-critical digital flagships.',
    tags: ['AI Integrations', 'Cross-Platform Cores', 'Proprietary Engines', 'Data Visualization'],
    anchor: '#service-custom-products',
    icon: Cpu,
    gradient: 'from-purple-500/20 to-cyan-500/10',
  },
];

// Single Magnetic 3D Service Card
const MagneticServiceCard: React.FC<{ item: ServiceCardData; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only enable 3D tilt on devices that support hover / desktop
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(item.anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.3s ease'
          : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.4s ease',
      }}
      className="group relative cursor-pointer rounded-2xl bg-[#09090f]/90 border border-white/[0.08] hover:border-purple-500/50 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_rgba(168,85,247,0.2)] transition-colors duration-300"
    >
      {/* Dynamic Cursor Light Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 300px at ${((tilt.y / 16) + 0.5) * 100}% ${((-tilt.x / 16) + 0.5) * 100}%, rgba(168,85,247,0.18), transparent 70%)`,
        }}
      />

      {/* Background Subtle Gradient */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.gradient} rounded-full blur-3xl opacity-30 pointer-events-none`} />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-slate-500 group-hover:text-purple-400 transition-colors">
            {item.number}
          </span>
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-purple-300 group-hover:border-purple-500/40 group-hover:bg-purple-950/30 transition-all duration-300">
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Category Tagline */}
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-purple-400 uppercase mb-2">
          {item.tagline}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
          {item.description}
        </p>
      </div>

      {/* Card Footer: Tags & Arrow */}
      <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {item.tags.slice(0, 2).map((tag, tIndex) => (
            <span
              key={tIndex}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-mono tracking-wider bg-white/[0.04] text-slate-300 border border-white/[0.05]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 font-mono text-xs text-purple-400 group-hover:translate-x-1 transition-transform shrink-0">
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase">DEEP DIVE</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services-overview" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 bg-[#050508] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-purple-400 mb-2 sm:mb-3 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>// 02 CAPABILITIES MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight">
              CORE DISCIPLINES.
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-md font-light leading-relaxed">
            Four specialized technology practices designed to deliver comprehensive digital dominance from conception to scale.
          </p>
        </div>

        {/* Grid of 4 Physical-feel Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {serviceCards.map((service, index) => (
            <MagneticServiceCard key={service.id} item={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
