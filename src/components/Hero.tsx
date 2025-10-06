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
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [exploreClicked, setExploreClicked] = useState(false);
  
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
        // Ensure best autoplay compatibility on iOS/Instagram
        mobileVideoRef.current.setAttribute('playsinline', 'true');
        (mobileVideoRef.current as unknown as HTMLVideoElement & { setAttribute: (k: string, v: string) => void }).setAttribute('webkit-playsinline', 'true');
        mobileVideoRef.current.controls = false;
        mobileVideoRef.current.load(); // Ensure video is loaded
        mobileVideoRef.current.play().catch((error) => {
          console.log('Mobile video play failed:', error);
        });
      }
      
      // Start desktop video if it exists
      if (desktopVideoRef.current) {
        desktopVideoRef.current.muted = true; // Ensure muted for autoplay
        desktopVideoRef.current.setAttribute('playsinline', 'true');
        (desktopVideoRef.current as unknown as HTMLVideoElement & { setAttribute: (k: string, v: string) => void }).setAttribute('webkit-playsinline', 'true');
        desktopVideoRef.current.controls = false;
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

  // After first user interaction, force-start videos with retries (for Instagram webview)
  useEffect(() => {
    if (!exploreClicked) return;

    let cancelled = false;

    const forceStartVideos = () => {
      if (cancelled) return;
      const tryPlay = (video?: HTMLVideoElement | null) => {
        if (!video) return;
        video.muted = true;
        video.setAttribute('playsinline', 'true');
        // @ts-ignore
        video.setAttribute('webkit-playsinline', 'true');
        video.controls = false;
        video.play().catch(() => {
          // schedule a quick retry
          setTimeout(() => {
            if (!cancelled) {
              video.play().catch(() => {});
            }
          }, 100);
        });
      };

      tryPlay(mobileVideoRef.current);
      tryPlay(desktopVideoRef.current);
    };

    // immediate attempt
    forceStartVideos();
    // short retry window
    const t1 = setTimeout(forceStartVideos, 150);
    const t2 = setTimeout(forceStartVideos, 400);

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [exploreClicked]);

  // Start hero voice only after user interaction
  useEffect(() => {
    if (exploreClicked && heroVoiceRef.current) {
      const forcePlayHeroVoice = () => {
        if (heroVoiceRef.current) {
          // Set properties
          heroVoiceRef.current.volume = 0.7;
          heroVoiceRef.current.muted = false;
          heroVoiceRef.current.loop = false;

          // Try to play
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
  }, [exploreClicked]);

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

  // Start text animations only after user interaction
  useEffect(() => {
    if (exploreClicked) {
      setTextAnimationStarted(true);
    }
  }, [exploreClicked]);

  // Handle text animation sequence - START AFTER USER INTERACTION
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
      {/* Responsive Background Videos */}
      <div 
        className="absolute inset-0 m-0 p-0" 
        style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
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
            poster="/hero-assets/hero-bg-mobile.png"
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
            poster="/hero-assets/hero-bg-desktop.png"
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



      {/* Full Screen Overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={(e) => {
            // Any tap dismisses overlay and starts experience
            e.stopPropagation();
            setExploreClicked(true);
            if (onNavClick) {
              onNavClick();
            }
          }}
        >
          <div className="text-center max-w-4xl mx-auto px-8">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold text-[#e6c87a] mb-8 leading-relaxed"
              style={{
                fontFamily: 'GameOfThrones, serif',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(230, 200, 122, 0.3)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))'
              }}
            >
              A Game of Thrones–inspired nightclub and bar.
            </motion.h1>

            {/* Explore Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              onClick={(e) => {
                // Explore behaves like any overlay tap
                e.stopPropagation();
                setExploreClicked(true);
                if (onExploreClick) {
                  onExploreClick();
                }
                if (onNavClick) {
                  onNavClick();
                }
              }}
              className="group relative px-12 py-4 bg-transparent border-2 border-[#e6c87a] text-[#e6c87a] font-bold text-lg rounded-full shadow-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#e6c87a] hover:to-[#d4af37] hover:text-black hover:shadow-[0_0_30px_rgba(230,200,122,0.6)] active:scale-95"
              style={{
                fontFamily: 'GameOfThrones, serif',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                boxShadow: '0 8px 25px rgba(230, 200, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
            </motion.button>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm text-gray-400 mt-6"
            >
              Click to begin your journey into the realm
            </motion.p>
          </div>
        </div>
      )}

      {/* Cinematic Text Content */}
      <div 
        className="relative z-20 flex items-center justify-center px-4" 
        style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
        onClick={(e) => {
          if (showOverlay) {
            e.stopPropagation();
          }
        }}
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