'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Removed isScrolled state as it's not used in the new design
  
  // Easter egg state for secret redirect
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimeout, setLogoClickTimeout] = useState<NodeJS.Timeout | null>(null);

  // Scroll effect removed as it's not used in the new design

  // Secret Easter egg function for logo - triple click to open production site
  const handleLogoSecretClick = () => {
    setLogoClickCount(prev => prev + 1);
    
    // Clear existing timeout
    if (logoClickTimeout) {
      clearTimeout(logoClickTimeout);
    }
    
    // Set new timeout to reset click count after 2 seconds
    const newTimeout = setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);
    setLogoClickTimeout(newTimeout);
    
    // Check if user clicked 3 times within 2 seconds
    if (logoClickCount + 1 === 3) {
      // Reset click count
      setLogoClickCount(0);
      if (logoClickTimeout) {
        clearTimeout(logoClickTimeout);
      }
      
      // Open production Alehouse site in new tab
      window.open('https://alehouse.thesmmhub.com/home/', '_blank');
      
      // Optional: Show a subtle notification
      console.log('🏰 Logo Easter egg activated! Welcome to the real realm...');
    }
  };

  // Handle menu open/close
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    
    // Disable/enable body scroll
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

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
  }, [isMenuOpen, toggleMenu]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cleanup logo timeout on unmount
  useEffect(() => {
    return () => {
      if (logoClickTimeout) {
        clearTimeout(logoClickTimeout);
      }
    };
  }, [logoClickTimeout]);

  // Handle smooth scroll to sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'unset';
    }
    
    // Simple scroll function
    const scrollToElement = () => {
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop - 100; // 100px offset for fixed nav
        
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      } else {
        // Fallback: try getElementById
        const elementById = document.getElementById(href.replace('#', ''));
        if (elementById) {
          const rect = elementById.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const elementTop = rect.top + scrollTop - 100; // 100px offset for fixed nav
          
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Execute immediately for desktop, with delay for mobile
    if (isMenuOpen) {
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  // New Book Table button handler
  const handleBookTableClick = () => {
    const element = document.getElementById('book-table');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 bg-[rgba(0,0,0,0.4)] backdrop-blur-md rounded-xl shadow-lg"
        style={{
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Alehouse Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group cursor-pointer"
              onClick={handleLogoSecretClick}
              title="The crown holds secrets... 👑"
            >
              <Image
                src="/logo/alehouse-logo.png"
                alt="Alehouse Logo"
                width={96}
                height={96}
                className="w-20 md:w-24 h-auto transition-all duration-500 group-hover:scale-110"
                priority
              />
            </motion.div>

            {/* Right Side - Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-medium text-base px-4 py-2 transition-all duration-300 relative text-[#f4f4f4] group-hover:text-[#FFD700]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      textTransform: 'none'
                    }}
                  >
                    {/* Text */}
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Hover underline effect */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-3/4 rounded-full"></div>
                  </a>
                  
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-[#FFD700]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                </motion.div>
              ))}
              
              {/* New Book Table Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                onClick={handleBookTableClick}
                className="relative group px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 text-[#FFD700] bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/50 shadow-lg hover:shadow-xl hover:scale-105"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  textTransform: 'none',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                  animation: 'pulse 2s infinite'
                }}
              >
                <span className="relative z-10">Book Table</span>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/30 to-[#FFA500]/30 rounded-lg opacity-100 blur-sm animate-pulse"></div>
              </motion.button>
            </div>

            {/* Mobile Hamburger Menu */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={toggleMenu}
              className="md:hidden p-3 text-[#f4f4f4] hover:text-[#FFD700] transition-all duration-300 rounded-lg relative group"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-[#FFD700]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden"
            onClick={toggleMenu}
          >
            {/* Dramatic gold glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d1a954]/5 via-transparent to-[#6b1f1f]/5 pointer-events-none"></div>
            
            {/* Mobile Menu Content */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: 'Game of Thrones, serif'
              }}
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="p-3 text-[#f4f4f4] hover:text-[#FFD700] transition-all duration-300 rounded-lg relative group"
                  aria-label="Close menu"
                >
                  <X size={28} />
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-[#FFD700]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                </motion.button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    className="w-full"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-center w-full py-6 px-8 font-medium text-2xl transition-all duration-300 text-center rounded-2xl relative group text-[#f4f4f4] hover:text-[#FFD700] hover:bg-[#FFD700]/10"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        textTransform: 'none'
                      }}
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/10 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
                      
                      {/* Text */}
                      <span className="relative z-10">{link.name}</span>
                      
                      {/* Hover underline effect */}
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-[#FFD700] transition-all duration-300 group-hover:w-3/4 rounded-full"></div>
                    </a>
                  </motion.div>
                ))}
                
                {/* Mobile Book Table Button */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="w-full"
                >
                  <button
                    onClick={() => {
                      handleBookTableClick();
                      setIsMenuOpen(false);
                      document.body.style.overflow = 'unset';
                    }}
                    className="flex items-center justify-center w-full py-6 px-8 font-bold text-3xl transition-all duration-300 text-center rounded-2xl relative group text-[#FFD700] bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700]/50 shadow-2xl"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      textTransform: 'none',
                      textShadow: '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/40 to-[#FFA500]/40 rounded-2xl opacity-100 blur-sm animate-pulse"></div>
                    
                    {/* Text */}
                    <span className="relative z-10">Book Table</span>
                  </button>
                </motion.div>
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