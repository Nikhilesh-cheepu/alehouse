'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const offers = [
  {
    meta: '8 PM — Closing',
    title: 'Unlimited Free Drinks for Ladies',
    inside: 'Available every night. Terms apply.',
  },
  {
    meta: '12 PM — 7 PM',
    title: 'Eat & Drink @ ₹127',
    inside: '₹127 menu available during offer hours.',
  },
];

const LadiesDrinksPromo = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex((i) => (i === index ? null : index));
  };

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden">
      {/* Dark gradient + soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.97) 0%, rgba(20,0,5,0.98) 50%, rgba(0,0,0,0.97) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-5"
        >
          <p
            className="text-white/60 text-xs md:text-sm tracking-wide"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            Alehouse Signature Offer
          </p>
          <h2
            className="text-white text-4xl md:text-5xl font-semibold tracking-tight"
            style={{
              fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            365 DAYS
          </h2>
          <p
            className="text-white/70 text-sm md:text-base max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            Two daily offers crafted to keep the realm alive from mid-day till close.
          </p>
        </motion.div>

        {/* Compact accordion rows */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-6 space-y-3"
        >
          {offers.map((offer, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => toggle(index)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(index)}
                className="rounded-2xl border transition-all duration-200 cursor-pointer select-none overflow-hidden"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  background: 'rgba(0,0,0,0.4)',
                  borderColor: 'rgba(212, 175, 55, 0.18)',
                  boxShadow: isOpen ? '0 0 0 1px rgba(212, 175, 55, 0.25)' : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.18)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div className="py-3.5 px-4 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-white/55 text-xs mb-0.5">{offer.meta}</p>
                    <p className="text-white font-medium text-sm md:text-base">
                      {offer.title}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 text-white/60"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <p className="py-3 px-4 text-white/70 text-sm">
                        {offer.inside}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="pt-6 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{
              boxShadow: '0 0 24px rgba(139, 0, 50, 0.4), 0 0 40px rgba(88, 28, 135, 0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/ladies-offers'}
            className="rounded-full px-5 py-2.5 text-white text-sm font-medium transition-shadow"
            style={{
              fontFamily: '"Manrope", sans-serif',
              background: 'linear-gradient(135deg, #8b0032 0%, #4a154b 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Only click if you are a lady 💋
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LadiesDrinksPromo;
