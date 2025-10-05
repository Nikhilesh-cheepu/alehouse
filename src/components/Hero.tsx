'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  audioEnabled: boolean;
  hasUserChosen: boolean;
  isMuted: boolean;
  onVoiceStart: () => void;
  onVoiceEnd: () => void;
}

const Hero = ({ audioEnabled, hasUserChosen, isMuted, onVoiceStart, onVoiceEnd }: HeroProps) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const [voiceStarted, setVoiceStarted] = useState(false);
  const [voiceCompleted, setVoiceCompleted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Easter egg state for secret redirect
  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Start videos immediately when component mounts
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

  // Start voice and animations immediately on mount
  useEffect(() => {
    const startExperience = () => {
      // Start voice immediately if audio is enabled, not muted, and hasn't completed
      if (audioRef.current && !audioPlayed && audioEnabled && !isMuted && !voiceCompleted) {
        audioRef.current.volume = 0.3; // Lower volume for better autoplay success
        audioRef.current.muted = false;
        
        audioRef.current.play().then(() => {
          setAudioPlayed(true);
          setVoiceStarted(true);
          onVoiceStart(); // Notify parent that voice has started
          
          // Start text animations after voice starts
          setTextAnimationStarted(true);
        }).catch((error) => {
          console.log('Hero voice autoplay failed:', error);
          // If voice fails, still start animations
          setTextAnimationStarted(true);
        });
      } else {
        // If no audio, muted, or voice completed, start animations immediately
        setTextAnimationStarted(true);
      }
    };

    // Start immediately
    startExperience();
    
    // Also try after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(startExperience, 100);
    
    return () => clearTimeout(timeoutId);
  }, [audioPlayed, textAnimationStarted, audioEnabled, isMuted, voiceCompleted]);

  // Handle text animation sequence
  useEffect(() => {
    if (!textAnimationStarted) return;

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

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (audioRef.current) {
        if (document.hidden) {
          // Pause voice when tab is hidden (only if it's playing and not completed)
          if (!audioRef.current.paused && !voiceCompleted) {
            audioRef.current.pause();
          }
        } else {
          // Resume voice when tab becomes visible (only if it was playing, not completed, not muted)
          if (audioPlayed && voiceStarted && !voiceCompleted && !isMuted && audioEnabled) {
            audioRef.current.play().catch((error) => {
              console.log('Hero voice resume failed:', error);
            });
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [audioPlayed, voiceStarted, voiceCompleted, isMuted]);

  // Handle mute state changes
  useEffect(() => {
    if (audioRef.current && voiceStarted && !voiceCompleted) {
      if (isMuted) {
        // Pause voice when muted
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        }
      } else {
        // Resume voice when unmuted (only if tab is visible and not completed)
        if (!document.hidden && audioEnabled) {
          audioRef.current.play().catch((error) => {
            console.log('Hero voice resume after unmute failed:', error);
          });
        }
      }
    }
  }, [isMuted, voiceStarted, voiceCompleted, audioEnabled]);

  // Handle voice end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setVoiceCompleted(true);
      onVoiceEnd();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [onVoiceEnd]);

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
          {/* Fallback image that shows immediately */}
          <img 
            src="/hero-assets/hero-bg-mobile.png" 
            alt="Hero background" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
          />
          <video
            ref={mobileVideoRef}
            src="/hero-assets/hero-mobile-video.mp4"
            className="hero-video w-full h-full object-cover relative z-10"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadStart={() => console.log('Mobile video started loading')}
            onCanPlay={() => {
              console.log('Mobile video can play');
              // Hide fallback image when video starts playing
              const fallbackImg = mobileVideoRef.current?.parentElement?.querySelector('img');
              if (fallbackImg) {
                fallbackImg.style.display = 'none';
              }
            }}
            onError={(e) => {
              console.log('Mobile video failed to load, keeping fallback image');
              // Keep the fallback image visible
            }}
          />
        </div>
        
        {/* Desktop Background (Landscape) - Video */}
        <div className="hidden md:block" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}>
          {/* Fallback image that shows immediately */}
          <img 
            src="/hero-assets/hero-bg-desktop.png" 
            alt="Hero background" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }}
          />
          <video
            ref={desktopVideoRef}
            src="/hero-assets/hero-desktop-video.mp4"
            className="hero-video w-full h-full object-cover relative z-10"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadStart={() => console.log('Desktop video started loading')}
            onCanPlay={() => {
              console.log('Desktop video can play');
              // Hide fallback image when video starts playing
              const fallbackImg = desktopVideoRef.current?.parentElement?.querySelector('img');
              if (fallbackImg) {
                fallbackImg.style.display = 'none';
              }
            }}
            onError={(e) => {
              console.log('Desktop video failed to load, keeping fallback image');
              // Keep the fallback image visible
            }}
          />
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10 m-0 p-0" style={{ height: '100vh', minHeight: '100vh', maxHeight: '100vh' }} />

      {/* Voice-over Audio Element */}
      <audio
        ref={audioRef}
        src="/hero-assets/hero-voice.mp3"
        preload="auto"
        className="hidden"
      />

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