'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  const perks = [
    {
      icon: '🎧',
      title: 'Live DJ Nights',
      caption: 'Every Day 8PM Onward'
    },
    {
      icon: '🍹',
      title: 'Free Drinks for Ladies',
      caption: 'Every Day'
    },
    {
      icon: '🍻',
      title: 'Happy Hours',
      caption: 'Daily 12PM–8PM'
    },
    {
      icon: '👑',
      title: 'Game of Thrones-Themed Interiors',
      caption: 'Immersive Experience'
    },
    {
      icon: '🎭',
      title: 'Themed Events & Shows',
      caption: 'Weekly Specials'
    },
    {
      icon: '🍕',
      title: 'Curated Food & Drink Pairings',
      caption: 'Expert Recommendations'
    },
    {
      icon: '🔥',
      title: 'Grand Ale Throne Setup',
      caption: 'Photo-Worthy Moments'
    },
    {
      icon: '🐉',
      title: 'House of Dragons Decor',
      caption: 'Fantasy Atmosphere'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen m-0 p-0 py-16"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/about_bg.jpeg)',
        }}
      >
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Opening Hours Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Dimmed overlay behind the content */}
            <div className="absolute inset-0 bg-black/30 rounded-3xl -m-8" />
            
            <div className="relative z-10">
              {/* Header with clock icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center justify-center mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-4 shadow-lg shadow-yellow-400/30">
                  <span className="text-2xl">🕐</span>
                </div>
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
                  style={{ 
                    fontFamily: 'Bebas Neue, sans-serif',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))'
                  }}
                >
                  OPENING HOURS
                </h2>
              </motion.div>
              
              <p 
                className="text-lg text-gray-300 mb-12"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Plan your visit to the realm
              </p>
              
              {/* Glassmorphism card container */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl shadow-black/50">
                  <div className="space-y-8">
                    {/* Weekday Hours */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mr-3 shadow-lg shadow-blue-400/50"></div>
                        <p 
                          className="text-3xl md:text-4xl font-bold text-white"
                          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          Sunday to Thursday
                        </p>
                      </div>
                      <p 
                        className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        12:00 PM – 11:30 PM
                      </p>
                    </motion.div>
                    
                    {/* Animated Divider with flame icon */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center"
                    >
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                      <div className="mx-4 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/50">
                        <span className="text-sm">🔥</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                    </motion.div>
                    
                    {/* Weekend Hours */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 mr-3 shadow-lg shadow-red-400/50"></div>
                        <p 
                          className="text-3xl md:text-4xl font-bold text-white"
                          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          Friday & Saturday
                        </p>
                      </div>
                      <p 
                        className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-400"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        12:00 PM – 12:30 AM
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Perks Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dimmed overlay behind perks */}
            <div className="absolute inset-0 bg-black/20 rounded-3xl -m-4" />
            
            <div className="relative z-10 flex flex-wrap justify-center gap-x-6 gap-y-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(255, 215, 0, 0.2)'
                }}
                className="group relative bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-all duration-300 cursor-pointer
                  w-full max-w-xs
                  sm:w-[calc(50%-12px)] sm:max-w-none
                  md:w-[calc(33.333%-16px)] md:max-w-none
                  lg:w-[calc(25%-18px)] lg:max-w-none
                  xl:w-[calc(25%-18px)] xl:max-w-none
                  min-h-[200px] flex flex-col justify-center"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {perk.icon}
                  </div>
                  
                  <h3 
                    className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300 flex-shrink-0"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {perk.title}
                  </h3>
                  
                  <p 
                    className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex-shrink-0"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {perk.caption}
                  </p>
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
