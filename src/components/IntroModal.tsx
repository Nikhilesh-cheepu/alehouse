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
    onAudioChoice(withAudio);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="modal-overlay fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center"
        >
          {/* Logo at the top */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <img
              src="/logo/alehouse-logo.png"
              alt="Alehouse Logo"
              className="w-32 md:w-40 h-auto mx-auto"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white text-2xl md:text-3xl mb-12 text-center px-4"
            style={{
              fontFamily: 'GameOfThrones, serif',
              letterSpacing: '0.05em'
            }}
          >
            This realm is best with music
          </motion.h1>

          {/* Button Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col md:flex-row gap-6 w-full max-w-2xl px-4"
          >
            {/* Enter with Music - White Card */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice(true)}
              className="flex-1 bg-white text-black py-6 px-8 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden group"
              style={{
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Enter with Music</span>
            </motion.button>

            {/* Enter Silently - Black Card */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoice(false)}
              className="flex-1 bg-black border-2 border-white text-white py-6 px-8 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden group"
              style={{
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Enter Silently</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroModal; 