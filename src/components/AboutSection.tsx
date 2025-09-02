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
      className="relative w-full min-h-screen overflow-hidden m-0 p-0 py-16"
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
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
              style={{ 
                fontFamily: 'Bebas Neue, sans-serif',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))'
              }}
            >
              OPENING HOURS
            </h2>
            
            <p 
              className="text-lg text-gray-300 mb-8"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Plan your visit to the realm
            </p>
            
            <div className="max-w-md mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p 
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Sunday to Thursday
                </p>
                <p 
                  className="text-xl text-gray-300"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  12:00 PM – 11:30 PM
                </p>
              </motion.div>
              
              {/* Animated Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
              />
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p 
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Friday & Saturday
                </p>
                <p 
                  className="text-xl text-gray-300"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  12:00 PM – 12:30 AM
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Perks Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
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
                className="group relative bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {perk.icon}
                  </div>
                  
                  <h3 
                    className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300"
                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                  >
                    {perk.title}
                  </h3>
                  
                  <p 
                    className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {perk.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
