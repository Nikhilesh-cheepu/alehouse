'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const offers = [
  {
    label: '8 PM – Closing',
    title: 'Unlimited Free Drinks for Ladies',
    vibe: 'Nightfall Royale',
    accent: '#f5d171',
  },
  {
    label: '12PM – 7PM',
    title: 'Eat & Drink Anything @127',
    vibe: 'Golden Hour Feast',
    accent: '#ffefc3',
  },
];

const LadiesDrinksPromo = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };
  return (
    <section 
      className="relative w-full py-16 md:py-28 overflow-hidden bg-black"
    >
      <div 
        aria-hidden 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 10%, rgba(255,215,0,0.08), transparent 50%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.05), transparent 45%)'
        }} 
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.95) 100%)' }} />

      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="uppercase tracking-[0.6em] text-xs md:text-sm text-white/70 font-semibold">Alehouse Signature Offer</span>
          <motion.h2
            style={{
                fontSize: 'clamp(3.5rem, 12vw, 6rem)',
                color: '#ffffff',
                fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                fontWeight: 800,
                letterSpacing: '0.04em',
                lineHeight: '1.05',
                textTransform: 'uppercase'
              }}
            >
              365 Days
            </motion.h2>
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-white/20 via-white to-white/20" />
            <p className="max-w-2xl text-white/70 font-light tracking-wide text-sm md:text-base" style={{ fontFamily: '"Manrope", sans-serif' }}>
              Your daily pass to royal indulgence. Two elite offers, crafted to keep the energy high from mid-day until close.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Mobile expandable cards */}
            <div className="md:hidden space-y-4">
              {offers.map((offer, index) => {
                const isExpanded = expandedCard === index;
                return (
                  <motion.div
                    key={`mobile-${offer.label}`}
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 'auto' }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_15px_35px_rgba(0,0,0,0.35)] cursor-pointer"
                    style={{ fontFamily: '"Manrope", sans-serif' }}
                    onClick={() => toggleCard(index)}
                  >
                    {/* Compact header - always visible */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <span className="text-[0.7rem] tracking-[0.3em] uppercase text-white/70 font-semibold block mb-1">
                          {offer.label}
                        </span>
                        <h3
                          className="text-white uppercase"
                          style={{
                            fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                            fontSize: '1.5rem',
                            letterSpacing: '0.05em',
                            lineHeight: 1.1
                          }}
                        >
                          {offer.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 text-white/70 text-2xl"
                      >
                        ▼
                      </motion.div>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-4">
                            <div className="flex items-center gap-3">
                              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Mood</span>
                              <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <p className="text-white/90 text-base font-semibold tracking-wide">
                              {offer.vibe}
                            </p>
                            <div className="pt-2 space-y-2">
                              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40 block">Daily Access</span>
                              <div className="flex gap-3">
                                <motion.button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = '/booking';
                                  }}
                                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all"
                                  style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: '#ffffff'
                                  }}
                                  whileHover={{ 
                                    background: 'rgba(255,255,255,0.15)',
                                    scale: 1.02
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Reserve
                                </motion.button>
                                <motion.button
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all"
                                  style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: `1px solid ${offer.accent}40`,
                                    color: offer.accent
                                  }}
                                  whileHover={{ 
                                    background: 'rgba(255,255,255,0.12)',
                                    scale: 1.02
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Walk In
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-2 gap-6 md:gap-8">
              {offers.map((offer) => (
                <div
                  key={offer.label}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 text-left flex flex-col gap-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
                  style={{ fontFamily: '"Manrope", sans-serif' }}
                >
                  <span className="text-sm tracking-[0.4em] uppercase text-white/70 font-semibold">{offer.label}</span>
                  <h3
                    className="text-white uppercase"
                    style={{
                      fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                      fontSize: 'clamp(2.2rem, 3vw, 3rem)',
                      letterSpacing: '0.05em',
                      lineHeight: 1.1
                    }}
                  >
                    {offer.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">Mood</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <p className="text-white/90 text-xl font-semibold tracking-wide">
                    {offer.vibe}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40 block">Daily Access</span>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => window.location.href = '/booking'}
                        className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#ffffff'
                        }}
                        whileHover={{ 
                          background: 'rgba(255,255,255,0.15)',
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Reserve
                      </motion.button>
                      <motion.button
                        className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: `1px solid ${offer.accent}40`,
                          color: offer.accent
                        }}
                        whileHover={{ 
                          background: 'rgba(255,255,255,0.12)',
                          scale: 1.02
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Walk In
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pt-6 flex justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(255, 20, 147, 0.35)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { window.location.href = '/ladies-offers'; }}
              className="rounded-full px-6 py-2 border border-pink-300/60 text-white tracking-widest uppercase font-bold"
              style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: 'clamp(0.65rem, 2.5vw, 0.85rem)',
                letterSpacing: '0.35em',
                background: 'linear-gradient(120deg, rgba(255,105,180,0.25), rgba(255,20,147,0.15))',
                whiteSpace: 'nowrap'
              }}
            >
              Only click if you are a lady 💋
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LadiesDrinksPromo;



