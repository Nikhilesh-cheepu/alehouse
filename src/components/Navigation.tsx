'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Disable/enable body scroll
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Realms', href: '#realms' },
    { name: 'Menu', href: '#menu' },
    { name: 'Events', href: '#events' },
    { name: 'Book Table', href: '#book' },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-aleblack/95 backdrop-blur-sm' 
            : 'bg-aleblack/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img
                src="/logo/alehouse-logo.png"
                alt="Alehouse Logo"
                className="w-24 md:w-32 h-auto"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                }}
              />
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-[#d4af37] font-bold text-lg hover:text-gold/80 transition-colors duration-200 relative group"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {link.name}
                  {/* Hover underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Hamburger Menu */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={toggleMenu}
              className="md:hidden p-2 text-[#d4af37] hover:text-gold/80 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden"
            onClick={toggleMenu}
          >
            {/* Mobile Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="p-2 text-[#d4af37] hover:text-gold/80 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </motion.button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    onClick={toggleMenu}
                    className="text-[#d4af37] font-bold text-2xl hover:text-gold/80 transition-colors duration-200 text-center"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Bottom Spacing */}
              <div className="h-20"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 