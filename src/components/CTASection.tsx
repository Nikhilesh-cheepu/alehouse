'use client';

import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const CTASection = () => {
  const handleCall = () => {
    window.open('tel:+918096060606', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I would like to know more about AleHouse. Can you help me?');
    window.open(`https://wa.me/918096060606?text=${message}`, '_blank');
  };

  return (
    <section 
      className="relative w-full py-12 md:py-20 flex items-center justify-center overflow-hidden bg-black my-24 md:my-16"
    >
      
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10 mt-12 md:mt-16 mb-4 md:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-row items-center justify-center gap-3 md:gap-6"
        >
          {/* Call Button */}
          <motion.button
            onClick={handleCall}
            className="group relative px-4 py-3 md:px-6 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2 md:gap-3 w-auto min-w-[140px] md:min-w-[160px] justify-center"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#000000',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}
          >
            <FaPhone className="text-base md:text-lg" />
            <span>Call Us</span>
            
            {/* Phone number tooltip */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm border border-white/20 z-50">
              +91 809 6060606
            </div>
          </motion.button>

          {/* WhatsApp Button */}
          <motion.button
            onClick={handleWhatsApp}
            className="group relative px-4 py-3 md:px-6 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2 md:gap-3 w-auto min-w-[140px] md:min-w-[160px] justify-center"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(37, 211, 102, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#000000',
              border: '1px solid rgba(37, 211, 102, 0.5)',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}
          >
            <FaWhatsapp className="text-base md:text-lg" />
            <span>WhatsApp</span>
            
            {/* WhatsApp number tooltip */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm border border-white/20 z-50">
              +91 809 6060606
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
