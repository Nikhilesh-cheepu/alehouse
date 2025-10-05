'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  hasUserChosen: boolean;
  heroVoiceRef: React.RefObject<HTMLAudioElement | null>;
  onExploreClick?: () => void;
}

const Hero = ({ hasUserChosen, heroVoiceRef, onExploreClick }: HeroProps) => {
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [exploreClicked, setExploreClicked] = useState(false);
  const [showExploreOverlay, setShowExploreOverlay] = useState(true);
  
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

  // NUCLEAR AUTOPLAY STRATEGY FOR HERO VOICE - FORCE PLAY AT ANY COST
  useEffect(() => {
    const forcePlayHeroVoice = () => {
      if (heroVoiceRef.current) {
        
        // Set properties
        heroVoiceRef.current.volume = 0.3;
        heroVoiceRef.current.muted = false;
        heroVoiceRef.current.loop = false;
        
        // FORCE PLAY - multiple strategies
        const playStrategies = [
          // Strategy 1: Direct play
          () => heroVoiceRef.current!.play(),
          
          // Strategy 2: Muted then unmute
          () => {
            heroVoiceRef.current!.muted = true;
            return heroVoiceRef.current!.play().then(() => {
              setTimeout(() => {
                heroVoiceRef.current!.muted = false;
              }, 50);
            });
          },
          
          // Strategy 3: Force reload and play
          () => {
            if (heroVoiceRef.current) {
              heroVoiceRef.current.load();
              return heroVoiceRef.current.play();
            }
            return Promise.reject('No audio element');
          }
        ];
        
        // Try all strategies
        let strategyIndex = 0;
        const tryNextStrategy = () => {
          if (strategyIndex < playStrategies.length) {
            playStrategies[strategyIndex]()
              .then(() => {
              })
              .catch(() => {
                strategyIndex++;
                setTimeout(tryNextStrategy, 100);
              });
          } else {
            setTimeout(forcePlayHeroVoice, 500);
          }
        };
        
        tryNextStrategy();
      }
    };

    // AGGRESSIVE SIMULATION OF USER INTERACTION
    const simulateMassiveUserInteraction = () => {
      // Create and dispatch multiple types of user events
      const events = ['click', 'touchstart', 'touchend', 'mousedown', 'mouseup', 'keydown', 'keyup'];
      const targets = [document, document.body, document.documentElement];
      
      events.forEach(eventType => {
        targets.forEach(target => {
          // Dispatch synthetic events
          const event = new Event(eventType, { bubbles: true, cancelable: true });
          target.dispatchEvent(event);
          
          // Also try MouseEvent and TouchEvent
          if (eventType === 'click' || eventType === 'mousedown') {
            const mouseEvent = new MouseEvent(eventType, { bubbles: true, cancelable: true });
            target.dispatchEvent(mouseEvent);
          }
          
          if (eventType.includes('touch')) {
            try {
              const touchEvent = new TouchEvent(eventType, { bubbles: true, cancelable: true });
              target.dispatchEvent(touchEvent);
            } catch {
              // TouchEvent not supported, skip
            }
          }
        });
      });
      
    };

    // IMMEDIATE EXECUTION
    forcePlayHeroVoice();
    simulateMassiveUserInteraction();
    
    // AGGRESSIVE RETRY SCHEDULE
    const retryTimes = [50, 100, 200, 500, 1000, 2000, 3000];
    retryTimes.forEach(delay => {
      setTimeout(() => {
        forcePlayHeroVoice();
        simulateMassiveUserInteraction();
      }, delay);
    });

    // CONTINUOUS RETRY EVERY 3 SECONDS (less frequent for hero voice)
    const continuousRetry = setInterval(() => {
      if (heroVoiceRef.current && heroVoiceRef.current.paused && heroVoiceRef.current.currentTime < 1) {
        forcePlayHeroVoice();
      }
    }, 3000);

    return () => {
      clearInterval(continuousRetry);
    };

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
  }, [exploreClicked]);

  // Start text animations only when Explore button is clicked
  useEffect(() => {
    if (exploreClicked) {
      setTextAnimationStarted(true);
    }
  }, [exploreClicked]);

  // Handle text animation sequence - START ONLY WHEN EXPLORE IS CLICKED
  useEffect(() => {
    if (!textAnimationStarted || !exploreClicked) {
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

  }, [textAnimationStarted, exploreClicked]);


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
      {/* Full-Screen Explore Overlay - Blocks all interaction until clicked */}
      {showExploreOverlay && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={(e) => {
            // Only allow clicks on the Explore button, not the overlay background
            e.stopPropagation();
          }}
        >
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Alehouse Logo/Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 
                className="text-4xl md:text-6xl font-bold text-[#e6c87a] mb-4"
                style={{
                  fontFamily: 'GameOfThrones, serif',
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(230, 200, 122, 0.3)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))'
                }}
              >
                ALEHOUSE
              </h1>
              <p 
                className="text-lg md:text-xl text-[#e6c87a]/80"
                style={{
                  fontFamily: 'GameOfThrones, serif',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                The Realm of Alehouse
              </p>
            </motion.div>

            {/* Explore Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            >
              <button
                onClick={() => {
                  setExploreClicked(true);
                  setShowExploreOverlay(false);
                  if (onExploreClick) {
                    onExploreClick();
                  }
                }}
                className="group relative px-12 py-6 bg-gradient-to-r from-[#e6c87a] to-[#d4af37] text-black font-bold text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(230,200,122,0.6)] active:scale-95"
                style={{
                  fontFamily: 'GameOfThrones, serif',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 8px 25px rgba(230, 200, 122, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '2px solid rgba(230, 200, 122, 0.3)',
                  background: 'linear-gradient(135deg, #e6c87a 0%, #d4af37 50%, #b8941f 100%)',
                }}
              >
                <span className="relative z-10">EXPLORE ALEHOUSE</span>
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(230,200,122,0.3) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                    transform: 'scale(1.2)'
                  }}
                />
                
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                    animation: 'shine 2s infinite'
                  }}
                />
              </button>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-6"
            >
              <p className="text-sm text-gray-400">
                Click to begin your journey into the realm
              </p>
            </motion.div>
          </div>
        </div>
      )}
      {/* Responsive Background Videos */}
      <div 
        className="absolute inset-0 m-0 p-0" 
        style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
        onClick={(e) => {
          // Block all clicks when overlay is shown
          if (showExploreOverlay) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
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
      <div 
        className="relative z-20 flex items-center justify-center px-4" 
        style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
        onClick={(e) => {
          // Block all clicks when overlay is shown
          if (showExploreOverlay) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Text Lines with AnimatePresence */}
          <AnimatePresence mode="wait">
            {hasUserChosen && textAnimationStarted && exploreClicked && currentTextIndex >= 0 && (
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