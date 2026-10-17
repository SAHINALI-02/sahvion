import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { api, ContactPayload } from '../services/api';

export const ContactSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('Web & App Development');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'transmitting' | 'confirmed' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const disciplines = [
    'Web & App Development',
    'Spatial UI/UX Design',
    'Branding & Design',
    'Custom Digital Products',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setStatusMessage('Please complete all required fields.');
      return;
    }

    setFormStatus('transmitting');
    setStatusMessage('');

    try {
      const payload: ContactPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        service: selectedService,
        message: formData.message.trim(),
      };

      const res = await api.submitContact(payload);
      setFormStatus('confirmed');
      setStatusMessage(res.confirmation_message || 'Thank you. Your project enquiry has been received.');
    } catch (err: any) {
      setFormStatus('error');
      setStatusMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    setFormStatus('idle');
    setStatusMessage('');
  };

  const scrollToForm = () => {
    const el = document.getElementById('inquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 bg-[#050508] border-t border-white/[0.04]">
      {/* Background ambient lighting */}
      <div className="ambient-glow-purple w-[600px] h-[600px] top-1/4 -right-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] text-purple-400 mb-6 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>// 09 INITIATION PROTOCOL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Official Contact Briefing & Action Buttons */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.05]">
              LET’S BUILD SOMETHING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400">
                FUTURE-READY.
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Have an ambitious vision, complex software architecture, or category-defining digital product to engineer? Reach our specialized team directly.
            </p>

            {/* Quick Action Buttons: START A PROJECT, EMAIL US, CALL US */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
              <button
                onClick={scrollToForm}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs tracking-wider uppercase font-semibold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                START A PROJECT
              </button>
              <a
                href="mailto:sahvion26@gmail.com"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#12121c] border border-white/10 hover:border-purple-400/60 font-mono text-[11px] sm:text-xs text-white tracking-wider uppercase transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>EMAIL US</span>
              </a>
              <a
                href="tel:+918148063975"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#12121c] border border-white/10 hover:border-purple-400/60 font-mono text-[11px] sm:text-xs text-white tracking-wider uppercase transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>CALL US</span>
              </a>
            </div>

            {/* Official Contact Cards (Email & Phone) */}
            <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#090912] border border-white/[0.06] hover:border-purple-500/30 transition-all">
                <div className="font-mono text-[10px] sm:text-xs tracking-widest text-purple-400 uppercase mb-1">
                  EMAIL
                </div>
                <a
                  href="mailto:sahvion26@gmail.com"
                  className="font-display font-semibold text-white text-base sm:text-lg hover:text-purple-300 transition-colors flex items-center justify-between group"
                >
                  <span className="truncate mr-2">sahvion26@gmail.com</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>

              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#090912] border border-white/[0.06] hover:border-purple-500/30 transition-all">
                <div className="font-mono text-[10px] sm:text-xs tracking-widest text-purple-400 uppercase mb-1">
                  PHONE
                </div>
                <a
                  href="tel:+918148063975"
                  className="font-display font-semibold text-white text-base sm:text-lg hover:text-purple-300 transition-colors flex items-center justify-between group"
                >
                  <span>+91 8148063975</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Connected Contact Form */}
          <div id="inquiry-form" className="lg:col-span-7 w-full">
            <div className="cyber-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl">
              
              {formStatus === 'confirmed' ? (
                // Success Confirmation
                <div className="py-8 sm:py-12 flex flex-col items-center text-center">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-300 mb-5 sm:mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
                  </div>

                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-emerald-400 uppercase mb-2">
                    TRANSMISSION SUCCESSFUL
                  </span>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white">
                    {statusMessage}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm max-w-md font-light leading-relaxed">
                    Our engineering leadership has been notified at <span className="text-purple-400 font-mono">sahvion26@gmail.com</span>. We will review your technical specifications and respond shortly.
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[11px] sm:text-xs text-white hover:bg-white/10 transition-colors uppercase tracking-widest"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                // Form Interface
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Error Notification Banner */}
                  {formStatus === 'error' && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-red-200 text-xs sm:text-sm">
                      <AlertCircle className="w-4 sm:w-5 h-4 sm:w-5 text-red-400 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {/* Discipline Selection */}
                  <div>
                    <label className="block font-mono text-[11px] sm:text-xs tracking-widest text-slate-300 uppercase mb-2.5 sm:mb-3">
                      1. SELECT SERVICE TRACK *
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {disciplines.map((d) => {
                        const isSelected = selectedService === d;
                        return (
                          <button
                            type="button"
                            key={d}
                            onClick={() => setSelectedService(d)}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-mono text-[10px] sm:text-xs tracking-wider transition-all duration-200 border ${
                              isSelected
                                ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                                : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase mb-1 sm:mb-1.5">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Elena Vance"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase mb-1 sm:mb-1.5">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@technology.com"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase mb-1 sm:mb-1.5">
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 8148063975"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase mb-1 sm:mb-1.5">
                          COMPANY / VENTURE
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Aether Robotics"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase mb-1 sm:mb-1.5">
                        PROJECT VISION & REQUIREMENTS *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your technology requirements, architecture scale, or product vision..."
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-purple-400 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission Action Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-500 text-center sm:text-left">
                      // DIRECT FASTAPI INGESTION
                    </span>

                    <button
                      type="submit"
                      disabled={formStatus === 'transmitting'}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {formStatus === 'transmitting' ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>DISPATCH ENQUIRY</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
