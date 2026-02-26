'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PERK_LINES = [
  'Live DJ Nights — Every day from 8 PM',
  'Happy Hours — Daily 12 PM to 8 PM',
  'Game of Thrones themed interiors',
  'Curated food & drink pairings',
];

const ROTATE_INTERVAL_MS = 2500;

const AboutSection = () => {
  const [perkIndex, setPerkIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPerkIndex((i) => (i + 1) % PERK_LINES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="about"
      className="relative w-full flex items-center justify-center overflow-hidden bg-black pt-[64px] md:pt-[72px] pb-16 md:pb-20"
    >
      {/* Subtle dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(10,0,2,0.96) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 md:px-8">
        {/* Optional thin gold gradient divider above Open Hours */}
        <div
          className="w-full max-w-[320px] h-px mx-auto mb-8"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
          }}
        />
        {/* Open Hours - compact horizontal layout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div
            className="w-full max-w-[900px] rounded-xl border px-5 py-4 md:py-5 backdrop-blur-md"
            style={{
              background: 'rgba(0,0,0,0.45)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            <p
              className="text-amber-400/80 text-xs font-medium tracking-wider mb-3 text-center"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Open Hours
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-6 gap-1 text-center md:text-left">
              <p
                className="text-white font-semibold text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                12:00 PM – 11:30 PM <span className="text-white/55 font-normal">(Sun–Thu)</span>
              </p>
              <span className="hidden md:inline w-px h-4 bg-white/30 self-center" />
              <p
                className="text-white font-semibold text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                12:00 PM – 12:30 AM <span className="text-white/55 font-normal">(Fri–Sat)</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rotating perk text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="h-10 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={perkIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-white/60 text-sm text-center"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {PERK_LINES[perkIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
