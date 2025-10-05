'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  hasUserChosen: boolean;
}

const Hero = ({ hasUserChosen }: HeroProps) => {
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Easter egg state for secret redirect
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Start videos immediately when component mounts - FORCE DEPLOYMENT
  useEffect(() => {
    const startVideos = () => {
      // Start mobile video if it exists
      if (mobileVideoRef.current) {
        mobileVideoRef.current.muted = true; // Ensure muted for autoplay
        mobileVideoRef.current.load(); // Ensure video is loaded
        mobileVideoRef.current.play().catch((error) => {
          console.log('Mobile video play failed:', error);
        });
      }
      
      // Start desktop video if it exists
      if (desktopVideoRef.current) {
        desktopVideoRef.current.muted = true; // Ensure muted for autoplay
        desktopVideoRef.current.load(); // Ensure video is loaded
        desktopVideoRef.current.play().catch((error) => {
          console.log('Desktop video play failed:', error);
        });
      }
    };

    // Start videos immediately
    startVideos();
    
    // Also try again after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(startVideos, 100);
    
    // Try one more time after a longer delay
    const timeoutId2 = setTimeout(startVideos, 500);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  // Start text animations immediately
  useEffect(() => {
    setTextAnimationStarted(true);
  }, []);

  // Handle text animation sequence - START IMMEDIATELY
  useEffect(() => {
    // Start text animations immediately - no conditions
    if (!textAnimationStarted) {
      setTextAnimationStarted(true);
    }

    const textTimeline = [
      { index: 0, start: 0, end: 2.5 },    // "Legends weren't forged in palaces…"
      { index: 1, start: 2.5, end: 5.0 },  // "They began in places like this."
      { index: 2, start: 5.0, end: 7.0 }   // "Welcome to ALEHOUSE"
    ];

    // Start the text sequence
    textTimeline.forEach(({ index, start, end }) => {
      // Show text at start time
      setTimeout(() => {
        setCurrentTextIndex(index);
      }, start * 1000);

      // Hide text at end time (no fade out, just disappear)
      setTimeout(() => {
        setCurrentTextIndex(-1); // Hide all text
      }, end * 1000);
    });

  }, [textAnimationStarted]);


  const textLines = [
    "Legends weren't forged in palaces…",
    "They began in places like this.",
    "Welcome to ALEHOUSE"
  ];

  // Secret Easter egg function - triple click to open production site
  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    
    // Clear existing timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    
    // Set new timeout to reset click count after 2 seconds
    const newTimeout = setTimeout(() => {
      setClickCount(0);
    }, 2000);
    setClickTimeout(newTimeout);
    
    // Check if user clicked 3 times within 2 seconds
    if (clickCount + 1 === 3) {
      // Reset click count
      setClickCount(0);
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
      
      // Open production Alehouse site in new tab
      window.open('https://alehouse.thesmmhub.com/home/', '_blank');
      
      // Optional: Show a subtle notification
      console.log('🎉 Easter egg activated! Opening the real Alehouse...');
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="hero-section relative w-full m-0 p-0"
      style={{ zIndex: 20 }}
    >
      {/* Responsive Background Videos */}
      <div className="absolute inset-0 m-0 p-0" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        {/* Fallback black background when videos are not playing */}
        {!hasUserChosen && (
          <div className="absolute inset-0 bg-black" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }} />
        )}
        
        {/* Mobile Background (Portrait) - Video */}
        <div className="block md:hidden" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
          <video
            ref={mobileVideoRef}
            src="/hero-assets/hero-mobile-video.mp4"
            className="hero-video w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={(e) => {
              console.log('Mobile video failed to load, showing fallback image');
              // Fallback to image if video fails to load
              e.currentTarget.style.display = 'none';
              const fallbackImg = document.createElement('img');
              fallbackImg.src = '/hero-assets/hero-bg-mobile.png';
              fallbackImg.className = 'w-full h-full object-cover';
              fallbackImg.style.height = '100vh';
              fallbackImg.style.minHeight = '100vh';
              fallbackImg.style.maxHeight = '100vh';
              e.currentTarget.parentElement!.appendChild(fallbackImg);
            }}
          />
        </div>
        
        {/* Desktop Background (Landscape) - Video */}
        <div className="hidden md:block" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
          <video
            ref={desktopVideoRef}
            src="/hero-assets/hero-desktop-video.mp4"
            className="hero-video w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={(e) => {
              console.log('Desktop video failed to load, showing fallback image');
              // Fallback to image if video fails to load
              e.currentTarget.style.display = 'none';
              const fallbackImg = document.createElement('img');
              fallbackImg.src = '/hero-assets/hero-bg-desktop.png';
              fallbackImg.className = 'w-full h-full object-cover';
              fallbackImg.style.height = '100vh';
              fallbackImg.style.minHeight = '100vh';
              fallbackImg.style.maxHeight = '100vh';
              e.currentTarget.parentElement!.appendChild(fallbackImg);
            }}
          />
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10 m-0 p-0" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }} />



      {/* Cinematic Text Content */}
      <div className="relative z-20 flex items-center justify-center px-4" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Text Lines with AnimatePresence */}
          <AnimatePresence mode="wait">
            {hasUserChosen && textAnimationStarted && currentTextIndex >= 0 && (
              <motion.h1
                key={currentTextIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut"
                }}
                className="text-xs md:text-2xl font-bold text-[#e6c87a] leading-relaxed tracking-wider cursor-pointer"
                style={{
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(230, 200, 122, 0.3)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))',
                  fontFamily: 'GameOfThrones, serif'
                }}
                onClick={handleSecretClick}
                title="Something magical happens with triple clicks... 🎭"
              >
                {textLines[currentTextIndex]}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero; 