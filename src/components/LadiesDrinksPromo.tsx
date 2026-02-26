'use client';

import { motion } from 'framer-motion';

const offers = [
  {
    time: '8 PM – Close',
    title: 'Unlimited Free Drinks for Ladies',
    note: 'Ladies Night — every day',
  },
  {
    time: '12 PM – 7 PM',
    title: 'Eat & Drink @ ₹127',
    note: 'From the ₹127 menu',
  },
];

const LadiesDrinksPromo = () => {
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden">
      {/* Dark gradient overlay for readability */}
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
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p
            className="text-white/60 text-xs md:text-sm tracking-wide"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            Alehouse Signature Offer
          </p>
          <h2
            className="text-white text-3xl md:text-4xl font-semibold tracking-tight"
            style={{
              fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            365 Days
          </h2>
          <p
            className="text-white/70 text-sm max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            Two daily offers. Every day. No exceptions.
          </p>
        </motion.div>

        {/* Compact premium offer cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-6 space-y-3"
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className="rounded-xl border px-4 py-3 transition-all duration-200"
              style={{
                fontFamily: '"Manrope", sans-serif',
                background: 'rgba(0,0,0,0.5)',
                borderColor: 'rgba(212, 175, 55, 0.25)',
                boxShadow: '0 0 0 1px rgba(212, 175, 55, 0.08), inset 0 1px 0 rgba(255,255,255,0.03)',
              }}
            >
              <p className="text-white/50 text-xs mb-0.5">{offer.time}</p>
              <p className="text-white font-semibold text-sm md:text-base">
                {offer.title}
              </p>
              <p className="text-white/50 text-xs mt-0.5">{offer.note}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA with breathing space */}
        <motion.div
          className="pt-6 pb-10 flex justify-center"
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
