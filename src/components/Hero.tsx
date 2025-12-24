'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  hasUserChosen: boolean;
  heroVoiceRef: React.RefObject<HTMLAudioElement | null>;
  showOverlay?: boolean;
  onExploreClick?: () => void;
  onNavClick?: () => void; // New prop for navigation clicks
}

const Hero = ({ hasUserChosen, heroVoiceRef, showOverlay, onExploreClick, onNavClick }: HeroProps) => {
  const [textAnimationStarted, setTextAnimationStarted] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [exploreClicked, setExploreClicked] = useState(true);
  
  // Easter egg state for secret redirect
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Start videos immediately when component mounts with optimized loading
  useEffect(() => {
    const startVideos = () => {
      // Start mobile video if it exists
      if (mobileVideoRef.current) {
        const video = mobileVideoRef.current;
        video.muted = true;
        video.setAttribute('playsinline', 'true');
        (video as unknown as HTMLVideoElement & { setAttribute: (k: string, v: string) => void }).setAttribute('webkit-playsinline', 'true');
        video.controls = false;
        
        // Load and play with error handling
        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Mobile video play failed:', error);
            // Retry once
            setTimeout(() => {
              video.play().catch(() => {});
            }, 200);
          });
        }
      }
      
      // Start desktop video if it exists
      if (desktopVideoRef.current) {
        const video = desktopVideoRef.current;
        video.muted = true;
        video.setAttribute('playsinline', 'true');
        (video as unknown as HTMLVideoElement & { setAttribute: (k: string, v: string) => void }).setAttribute('webkit-playsinline', 'true');
        video.controls = false;
        
        // Load and play with error handling
        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Desktop video play failed:', error);
            // Retry once
            setTimeout(() => {
              video.play().catch(() => {});
            }, 200);
          });
        }
      }
    };

    // Start videos immediately
    startVideos();
    
    return () => {
      // Cleanup
    };
  }, []);

  // Start hero voice immediately
  useEffect(() => {
    if (heroVoiceRef.current) {
      const forcePlayHeroVoice = () => {
        if (heroVoiceRef.current) {
          heroVoiceRef.current.volume = 0.7;
          heroVoiceRef.current.muted = false;
          heroVoiceRef.current.loop = false;
          heroVoiceRef.current.play()
            .then(() => {
              console.log('Hero voice started successfully');
            })
            .catch(() => {
              console.log('Hero voice play failed, retrying...');
              setTimeout(forcePlayHeroVoice, 100);
            });
        }
      };
      forcePlayHeroVoice();
    }
  }, [heroVoiceRef]);


  // Pause/Resume audio when switching tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (heroVoiceRef.current) {
        if (document.hidden) {
          // Tab is hidden, pause audio
          heroVoiceRef.current.pause();
        } else {
          // Tab is visible again, resume audio if it was playing
          if (exploreClicked && heroVoiceRef.current.currentTime > 0) {
            heroVoiceRef.current.play().catch(() => {});
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [exploreClicked, heroVoiceRef]);

  // Text animations start immediately

  // Handle text animation sequence
  useEffect(() => {
    if (!textAnimationStarted) {
      return;
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
      <div 
        className="absolute inset-0 m-0 p-0" 
        style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
      >
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
              console.error('Mobile video failed to load');
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
              console.error('Desktop video failed to load');
            }}
          />
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10 m-0 p-0" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }} />




      {/* Cinematic Text Content */}
      <div 
        className="relative z-20 flex items-center justify-center px-4" 
        style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
      >
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

      {/* Hero Voice Audio */}
      <audio
        ref={heroVoiceRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/hero-assets/hero-voice.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
};

export default Hero; 