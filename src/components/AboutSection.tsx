'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative w-full flex items-center justify-center overflow-hidden bg-black my-24 md:my-16"
      style={{
        padding: '0 0 4rem 0',
        minHeight: '36vh'
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        

        {/* Opening Hours - minimal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-4 flex justify-center"
        >
          <div
            className="inline-block rounded-lg border px-4 py-3 text-center backdrop-blur-md max-w-sm"
            style={{
              background: 'rgba(0,0,0,0.5)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            <p className="text-amber-400/90 text-xs font-medium uppercase tracking-wider mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Opening Hours
            </p>
            <p className="text-white/95 text-sm leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Sun–Thu · 12:00 PM – 11:30 PM
            </p>
            <p className="text-white/95 text-sm leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Fri–Sat · 12:00 PM – 12:30 AM
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2"
        >
          <div className="text-center p-1 md:p-2 bg-black/60 backdrop-blur-sm rounded-lg border border-yellow-500/40 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(40,40,40,0.6) 50%, rgba(0,0,0,0.7) 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="text-lg md:text-2xl mb-1 md:mb-2 relative z-10">🎧</div>
            <h3 className="text-xs md:text-base font-bold text-yellow-300 mb-1 md:mb-2 relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Live DJ Nights</h3>
            <p className="text-white text-xs md:text-sm font-bold relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Every Day 8PM+</p>
          </div>

          <div className="text-center p-1 md:p-2 bg-black/60 backdrop-blur-sm rounded-lg border border-yellow-500/40 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(40,40,40,0.6) 50%, rgba(0,0,0,0.7) 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="text-lg md:text-2xl mb-1 md:mb-2 relative z-10">🍻</div>
            <h3 className="text-xs md:text-base font-bold text-yellow-300 mb-1 md:mb-2 relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Happy Hours</h3>
            <p className="text-white text-xs md:text-sm font-bold relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Daily 12PM–8PM</p>
          </div>

          <div className="text-center p-1 md:p-2 bg-black/60 backdrop-blur-sm rounded-lg border border-yellow-500/40 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(40,40,40,0.6) 50%, rgba(0,0,0,0.7) 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="text-lg md:text-2xl mb-1 md:mb-2 relative z-10">👑</div>
            <h3 className="text-xs md:text-base font-bold text-yellow-300 mb-1 md:mb-2 relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Game of Thrones</h3>
            <p className="text-white text-xs md:text-sm font-bold relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Immersive Experience</p>
          </div>

          <div className="text-center p-1 md:p-2 bg-black/60 backdrop-blur-sm rounded-lg border border-yellow-500/40 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(40,40,40,0.6) 50%, rgba(0,0,0,0.7) 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="text-lg md:text-2xl mb-1 md:mb-2 relative z-10">🍕</div>
            <h3 className="text-xs md:text-base font-bold text-yellow-300 mb-1 md:mb-2 relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Curated Food</h3>
            <p className="text-white text-xs md:text-sm font-bold relative z-10" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Expert Pairings</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;