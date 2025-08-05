'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroModalProps {
  onAudioChoice: (withAudio: boolean) => void;
}

const IntroModal = ({ onAudioChoice }: IntroModalProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleChoice = (withAudio: boolean) => {
    setIsVisible(false);
    setTimeout(() => {
      onAudioChoice(withAudio);
    }, 500); // Delay to allow modal animation to complete
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-radial from-black via-[#1f1300] to-[#4e3a0a] backdrop-blur-sm"
        >
          {/* Glowing frame effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-50"></div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-md w-full mx-4 p-8 bg-gradient-to-b from-black/90 via-[#1a0f00]/95 to-black/90 border border-gold/30 rounded-lg shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Decorative glowing elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-40"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-40"></div>

            {/* Content */}
            <div className="text-center space-y-6 relative z-10">
              {/* Main Title */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-4"
                style={{
                  fontFamily: 'GameOfThrones, serif',
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
                  filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
                }}
              >
                WELCOME TO ALEHOUSE
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg font-cinzel text-[#f5deb3] leading-relaxed"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                This realm is best experienced with music.
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-base font-cinzel text-[#f5deb3]/80"
                style={{
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                }}
              >
                Would you like to enter with sound?
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col gap-4 pt-6"
              >
                {/* Primary Button - Enter with Music */}
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(true)}
                  className="px-8 py-4 bg-[#d4af37] text-black font-bold text-lg rounded-lg transition-all duration-300 relative overflow-hidden group"
                  style={{
                    fontFamily: 'GameOfThrones, serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10">Enter with Music</span>
                </motion.button>

                {/* Secondary Button - Enter Silently */}
                <motion.button
                  whileHover={{ 
                    scale: 1.01,
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)'
                  }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleChoice(false)}
                  className="px-6 py-3 border border-[#d4af37]/40 text-[#f5deb3] font-cinzel text-sm rounded-lg transition-all duration-300 hover:bg-[#d4af37]/10"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Enter Silently
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroModal; 