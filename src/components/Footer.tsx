'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaMapMarkerAlt, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-yellow-500/30">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Terms & Conditions / Club Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 
            className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center"
            style={{ 
              fontFamily: 'Game of Thrones, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '0.1em'
            }}
          >
            House  Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Legal Age & Identification */}
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">🆔</span>
                <span>1. Legal Age &amp; Identification</span>
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>All guests must be 21 or older with a valid photo ID to purchase or consume alcohol.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Guests under 21 are permitted entry only when accompanied by a parent or legal guardian.</span>
                </li>
              </ul>
            </div>

            {/* Dress Code */}
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">👔</span>
                <span>2. Dress Code</span>
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Smart casual, formal, or party wear is required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Management reserves the right to deny entry for inappropriate attire.</span>
                </li>
              </ul>
            </div>

            {/* Right of Admission Reserved */}
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚪</span>
                <span>3. Right of Admission Reserved</span>
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Management has the final say and can refuse entry or service to any individual at their discretion.</span>
                </li>
              </ul>
            </div>

            {/* Dry Days */}
            <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span>4. Dry Days</span>
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Alcohol will not be served on specific days as mandated by notices from the Telangana Excise and Police Departments.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <div className="text-gray-400 text-sm md:text-base text-center md:text-left">
            © Alehouse 2025. All Rights Reserved.
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base">
            <a 
              href="/privacy-policy" 
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
            >
              <FaShieldAlt className="text-yellow-500" />
              Privacy Policy
            </a>
            
            <a 
              href="mailto:alehousesccm@gmail.com" 
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
            >
              <FaEnvelope className="text-yellow-500" />
              Contact Us
            </a>
            
            <a 
              href="https://www.instagram.com/alehouse.club?igsh=bW56NGR4YWRlZzNm&utm_source=qr" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
            >
              <FaInstagram className="text-yellow-500" />
              Instagram
            </a>
            
            <a 
              href="https://maps.app.goo.gl/your-google-maps-link" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2"
            >
              <FaMapMarkerAlt className="text-yellow-500" />
              Google Maps
            </a>
          </div>
        </motion.div>

        {/* Mobile-optimized links */}
        <div className="mt-6 md:hidden">
          <div className="flex flex-col items-center gap-3 text-sm">
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/alehouse.club?igsh=bW56NGR4YWRlZzNm&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a 
                href="https://maps.app.goo.gl/your-google-maps-link" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                <FaMapMarkerAlt className="text-2xl" />
              </a>
              <a 
                href="mailto:alehousesccm@gmail.com" 
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
