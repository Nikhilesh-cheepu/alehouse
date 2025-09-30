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
        

        {/* Opening Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="bg-black/80 backdrop-blur-sm border border-yellow-500/50 rounded-lg p-2 md:p-4 shadow-lg relative" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,20,0.8) 50%, rgba(0,0,0,0.9) 100%)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
          }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-lg">🕐</span>
                </div>
                <h3 
                  className="text-lg md:text-xl font-bold text-yellow-400"
                  style={{ 
                    fontFamily: 'Game of Thrones, serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.9)'
                  }}
                >
                  Opening Hours
                </h3>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
                <div>
                  <p className="text-yellow-300 text-sm font-semibold mb-1" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Sun - Thu</p>
                  <p className="text-white font-bold text-base" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>12:00 PM - 11:30 PM</p>
                </div>
                <div className="hidden sm:block w-px h-8 bg-yellow-500/60"></div>
                <div>
                  <p className="text-yellow-300 text-sm font-semibold mb-1" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Fri - Sat</p>
                  <p className="text-white font-bold text-base" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>12:00 PM - 12:30 AM</p>
                </div>
              </div>
            </div>
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