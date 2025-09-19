'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative w-full py-8 md:py-12"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/about_bg.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
      </div>
      
      <div className="relative z-20">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div 
              className="backdrop-blur-md border rounded-2xl p-4 md:p-6 shadow-xl" 
              style={{ 
                background: 'linear-gradient(to right, rgba(184, 134, 11, 0.2), rgba(218, 165, 32, 0.3), rgba(184, 134, 11, 0.2))',
                borderColor: 'rgba(184, 134, 11, 0.3)'
              }}
            >
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left space-y-4 md:space-y-0">
                
                <div className="flex items-center justify-center md:justify-start">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-lg" 
                    style={{
                      background: 'linear-gradient(to right, #B8860B, #DAA520)'
                    }}
                  >
                    <span className="text-lg">🕐</span>
                  </div>
                  <h2 
                    className="text-xl md:text-2xl font-bold"
                    style={{ 
                      fontFamily: 'Game of Thrones, serif',
                      background: 'linear-gradient(to right, #DAA520, #B8860B)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Opening Hours
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">Sun - Thu</p>
                    <p className="text-white font-semibold">12:00 PM - 11:30 PM</p>
                  </div>
                  <div 
                    className="hidden sm:block w-px h-8" 
                    style={{ backgroundColor: 'rgba(218, 165, 32, 0.5)' }}
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-300 mb-1">Fri - Sat</p>
                    <p className="text-white font-semibold">12:00 PM - 12:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            <motion.div className="group relative bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6 text-center transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl mb-3">🎧</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Live DJ Nights
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Every Day 8PM+
                </p>
              </div>
            </motion.div>

            <motion.div className="group relative bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6 text-center transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl mb-3">🍻</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Happy Hours
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Daily 12PM–8PM
                </p>
              </div>
            </motion.div>

            <motion.div className="group relative bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6 text-center transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl mb-3">👑</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Game of Thrones Theme
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Immersive Experience
                </p>
              </div>
            </motion.div>

            <motion.div className="group relative bg-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-6 text-center transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl mb-3">🍕</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Curated Food Pairings
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Expert Recommendations
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;