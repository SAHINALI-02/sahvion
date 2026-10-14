import React, { useState, useEffect } from 'react';
import { BrandWordmark } from './BrandWordmark';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'particles' | 'light' | 'reveal' | 'ready'>('particles');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Phase 1: Particles appear (0-300ms)
    const t1 = setTimeout(() => setPhase('light'), 400);
    // Phase 2: Subtle light emerges (400-800ms)
    const t2 = setTimeout(() => setPhase('reveal'), 900);

    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setPhase('ready');
      const timer = setTimeout(() => {
        setIsFading(true);
        const exitTimer = setTimeout(onComplete, 800);
        return () => clearTimeout(exitTimer);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040407] transition-all duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background radial ambient purple flare */}
      <div
        className={`absolute w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[120px] transition-all duration-1000 ${
          phase === 'particles' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        }`}
      />

      {/* Floating subtle particle sparks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-400/40 animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Subtle high-tech protocol badge */}
        <div
          className={`mb-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-slate-400 uppercase transition-all duration-700 ${
            phase !== 'particles' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
          <span>SYSTEM KERNEL // INITIALIZING</span>
        </div>

        {/* Wordmark SAHVION */}
        <div
          className={`transition-all duration-1000 transform ${
            phase === 'reveal' || phase === 'ready'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <BrandWordmark size="xl" withGlow={true} />
        </div>


        {/* High-tech Loading Bar & Counter */}
        <div className="mt-12 w-64 md:w-80 flex flex-col items-center">
          <div className="w-full flex justify-between items-center font-mono text-[11px] text-slate-400 mb-2">
            <span className="tracking-widest">CALIBRATING 3D ENVIRONMENT</span>
            <span className="text-purple-400 font-semibold">{progress}%</span>
          </div>

          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-purple-700 via-purple-400 to-white transition-all duration-150 ease-out shadow-[0_0_12px_#c084fc]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-3 text-[10px] font-mono text-slate-400 tracking-wider">
            <span className="inline-block w-2 h-2 border border-purple-500/50 border-t-purple-400 rounded-full animate-spin" />
            <span>PRE-RENDERING GEOMETRIC CORES</span>
          </div>
        </div>

        {/* Skip button for immediate entry */}
        <button
          onClick={onComplete}
          className="mt-8 text-[11px] font-mono tracking-widest text-slate-400 hover:text-white transition-colors duration-200 uppercase cursor-pointer"
        >
          [ CLICK TO ENTER IMMEDIATE EXPERIENCE ]
        </button>
      </div>
    </div>
  );
};
