import React, { useState, useEffect } from 'react';
import { BrandWordmark } from './BrandWordmark';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#services-overview' },
    { name: 'SERVICES', href: '#services-overview' },
    { name: 'PROCESS', href: '#process' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-2.5 sm:py-3 bg-[#08080c]/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 sm:py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark (Modular text mark) */}
          <a
            href="#"
            className="group flex items-center gap-2 sm:gap-3 transition-opacity duration-200 hover:opacity-90"
            aria-label="SAHVION Home"
          >
            <BrandWordmark size="md" withGlow={isScrolled} />
          </a>

          {/* Desktop & Tablet Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-mono text-[11px] lg:text-xs tracking-[0.2em] lg:tracking-[0.25em] text-slate-300 hover:text-white transition-colors duration-200 relative group py-1"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* CTA Pill button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="group relative inline-flex items-center gap-1.5 lg:gap-2 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full border border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/40 hover:border-purple-400/60 transition-all duration-300 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="font-mono text-[10px] lg:text-xs tracking-[0.18em] lg:tracking-[0.2em] text-purple-200 uppercase group-hover:text-white">
                START PROJECT
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#07070b]/98 backdrop-blur-3xl transition-all duration-500 md:hidden flex flex-col justify-between overflow-y-auto px-6 py-20 sm:px-10 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6 my-auto">
          <div className="font-mono text-[11px] tracking-[0.3em] text-purple-400 uppercase">
            // DIRECTORY
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-2xl sm:text-3xl font-display font-medium tracking-[0.15em] sm:tracking-[0.2em] text-slate-200 hover:text-purple-400 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-6 border-t border-white/10 mt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-purple-600/30 border border-purple-500/50 text-white font-mono text-xs sm:text-sm tracking-widest uppercase hover:bg-purple-600/50 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              START A PROJECT
            </a>
          </div>
        </div>

        <div className="pt-8 text-center font-mono text-[10px] tracking-widest text-slate-500">
          SAHVION // SPATIAL ARCHITECTURE
        </div>
      </div>
    </>
  );
};
