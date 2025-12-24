'use client';

import { motion } from 'framer-motion';

const offers = [
  {
    time: '8 PM – Closing',
    title: 'Unlimited Free Drinks for Ladies',
    description: 'Unlimited cocktails, mocktails, craft beers, rum, whisky, vodka and everything in between. No passes, no awkward questions—just show up, own the night, and sip what you love.',
    vibe: 'Nightfall Royale',
  },
];

const whatsappLink = 'https://wa.me/918096060606?text=Hey%20AleHouse!%20Tell%20me%20more%20about%20the%20ladies%20offers.';
const instagramLink = 'https://www.instagram.com/alehouse.club?igsh=bW56NGR4YWRlZzNm&utm_source=qr';

const LadiesOffersPage = () => {
  const handleWhatsApp = () => {
    window.open(whatsappLink, '_blank');
  };

  const handleInstagram = () => {
    window.open(instagramLink, '_blank');
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        className="relative w-full overflow-hidden py-24 md:py-32"
        style={{
          background: 'radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 55%)',
          paddingTop: 'clamp(9rem, 18vw, 11rem)'
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255,105,180,0.15), transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,20,147,0.15), transparent 50%)' }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6"
          >
            <p className="uppercase tracking-[0.5em] text-xs text-white/70 font-semibold">AleHouse Privée</p>
            <h1
              className="text-white"
              style={{
                fontFamily: '"Game of Thrones", serif',
                fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
                letterSpacing: '0.15em',
              }}
            >
              Ladies Only Realm
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-base md:text-lg" style={{ fontFamily: '"Manrope", sans-serif' }}>
              Unlimited cocktails, mocktails, beers, rum, whisky, vodka—365 days a year. Free entry, free pours, zero exceptions. It&apos;s the one promise we make to every queen who walks in.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(37, 211, 102, 0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold tracking-[0.2em] uppercase text-sm"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                }}
              >
                WhatsApp Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(214, 41, 118, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleInstagram}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold tracking-[0.2em] uppercase text-sm"
                style={{
                  fontFamily: '"Manrope", sans-serif',
                  background: 'linear-gradient(120deg, rgba(254,218,117,0.25), rgba(214,41,118,0.25))',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                Instagram DM
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-4"
            >
              {['Free entry for queens', 'Unlimited drinks all night', '365 days • No blackout dates'].map((badge) => (
                <span
                  key={badge}
                  className="px-5 py-1.5 rounded-full text-xs tracking-[0.25em] uppercase text-white"
                  style={{
                    fontFamily: '"Manrope", sans-serif',
                    border: '1px solid transparent',
                    background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))`,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.35), inset 0 0 18px rgba(255,255,255,0.08)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.3em'
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/70 text-xs md:text-sm uppercase tracking-[0.2em]"
              style={{ fontFamily: '"Manrope", sans-serif', marginTop: '0.5rem' }}
            >
              Arrive before 10:30 PM to glide straight in; post 10:30 it&apos;s just ₹400 to keep the unlimited story going.
            </motion.p>
          </motion.div>

          <div className="flex justify-center">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-transparent backdrop-blur-2xl p-8 flex flex-col gap-5 shadow-[0_25px_60px_rgba(0,0,0,0.55)] w-full max-w-3xl"
                style={{ fontFamily: '"Manrope", sans-serif' }}
              >
                <p className="uppercase tracking-[0.35em] text-xs text-white/60">{offer.time}</p>
                <h2
                  className="text-white uppercase"
                  style={{
                    fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {offer.title}
                </h2>
                <p className="text-white/75 text-base leading-relaxed">
                  No passes, no awkward questions—just show up before 10:30 PM and the night is fully on us. Running fashionably late? A simple ₹400 keeps the unlimited pours flowing.
                </p>
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Mood</span>
                  <p className="text-white text-lg font-semibold mt-2">{offer.vibe}</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.location.href = '/booking'}
                    className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    Reserve Table
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleInstagram}
                    className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    Ask on Instagram
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <p className="text-white/60 text-sm uppercase tracking-[0.4em]" style={{ fontFamily: '"Manrope", sans-serif' }}>
              Questions? Doubts? Just curious?
            </p>
            <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto" style={{ fontFamily: '"Manrope", sans-serif' }}>
              Slide into our DM or ping us on WhatsApp. We will confirm your booking, prep your bottle, and keep the throne ready.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default LadiesOffersPage;

