import React, { useState } from 'react';
import { BrandWordmark, BrandTagline } from './BrandWordmark';
import { ArrowUp, Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterStatus('loading');
    setNewsletterMsg('');

    try {
      const res = await api.subscribeNewsletter(newsletterEmail.trim());
      setNewsletterStatus('success');
      setNewsletterMsg(res.message || 'Subscribed successfully.');
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterStatus('error');
      setNewsletterMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="relative bg-[#040407] border-t border-white/[0.06] pt-14 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-white/[0.06]">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <BrandWordmark size="md" withGlow={true} />
              <BrandTagline className="mt-2.5 sm:mt-3" />

              <p className="mt-4 sm:mt-6 text-slate-400 text-xs sm:text-sm max-w-sm font-light leading-relaxed">
                Bespoke digital products, spatial 3D interactive experiences, and future-ready technology architectures engineered for ambitious founders and enterprises.
              </p>

              {/* Newsletter Subscription Widget */}
              <div className="mt-6 sm:mt-8 max-w-sm">
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-purple-400 uppercase mb-2">
                  // TECHNOLOGICAL RADAR NEWSLETTER
                </div>
                <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-600 text-xs font-sans focus:outline-none focus:border-purple-400 transition-colors pr-11"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="absolute right-1.5 p-1.5 sm:p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {newsletterStatus === 'success' && (
                  <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{newsletterMsg}</span>
                  </div>
                )}
                {newsletterStatus === 'error' && (
                  <div className="mt-2 text-xs font-mono text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{newsletterMsg}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0" />
              <span className="truncate">SYSTEM STATUS // FASTAPI CORE ACTIVE</span>
            </div>
          </div>

          {/* Navigation & Contact Matrix */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 font-mono text-xs">
            {/* Services */}
            <div>
              <div className="text-white font-semibold uppercase tracking-widest mb-3 sm:mb-4 text-xs sm:text-sm">
                Services
              </div>
              <ul className="space-y-2.5 sm:space-y-3 text-slate-400 text-[11px] sm:text-xs">
                <li><a href="#service-web-app" className="hover:text-purple-400 transition-colors">Web & App Dev</a></li>
                <li><a href="#service-ui-ux" className="hover:text-purple-400 transition-colors">UI/UX Design</a></li>
                <li><a href="#service-branding" className="hover:text-purple-400 transition-colors">Branding & Design</a></li>
                <li><a href="#service-custom-products" className="hover:text-purple-400 transition-colors">Custom Products</a></li>
              </ul>
            </div>

            {/* Methodology */}
            <div>
              <div className="text-white font-semibold uppercase tracking-widest mb-3 sm:mb-4 text-xs sm:text-sm">
                Methodology
              </div>
              <ul className="space-y-2.5 sm:space-y-3 text-slate-400 text-[11px] sm:text-xs">
                <li><a href="#process" className="hover:text-purple-400 transition-colors">01 Discover</a></li>
                <li><a href="#process" className="hover:text-purple-400 transition-colors">02 Define</a></li>
                <li><a href="#process" className="hover:text-purple-400 transition-colors">03 Design</a></li>
                <li><a href="#process" className="hover:text-purple-400 transition-colors">04 Develop</a></li>
                <li><a href="#process" className="hover:text-purple-400 transition-colors">05 Launch</a></li>
                <li><a href="#process" className="hover:text-purple-400 transition-colors">06 Evolve</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="col-span-2 sm:col-span-1">
              <div className="text-white font-semibold uppercase tracking-widest mb-3 sm:mb-4 text-xs sm:text-sm">
                Contact
              </div>
              <ul className="space-y-2.5 sm:space-y-3 text-slate-300 text-[11px] sm:text-xs">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <a
                    href="mailto:sahvion26@gmail.com"
                    className="hover:text-purple-400 transition-colors underline-offset-4 hover:underline truncate"
                  >
                    sahvion26@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <a
                    href="tel:+918531833975"
                    className="hover:text-purple-400 transition-colors underline-offset-4 hover:underline"
                  >
                    +91 8531833975
                  </a>
                </li>
                <li className="pt-1 text-slate-500 text-[10px]">
                  UTC+05:30 // GLOBAL EDGE
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 font-mono text-[10px] sm:text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © 2026 SAHVION. All rights reserved.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden xs:inline">MODULAR BRANDING</span>
            <span className="hidden xs:inline">•</span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
