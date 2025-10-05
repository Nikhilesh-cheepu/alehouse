'use client';

import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import AudioController from '@/components/AudioController';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BookTableSection from '@/components/BookTableSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const themeSongRef = useRef<HTMLAudioElement>(null);
  const heroVoiceRef = useRef<HTMLAudioElement>(null);

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Mute/unmute both audios
    if (themeSongRef.current) {
      themeSongRef.current.muted = newMutedState;
    }
    if (heroVoiceRef.current) {
      heroVoiceRef.current.muted = newMutedState;
    }
  };

  // NUCLEAR AUTOPLAY STRATEGY - FORCE PLAY AT ANY COST
  useEffect(() => {
    const forcePlayThemeSong = () => {
      if (themeSongRef.current) {
        
        // Set properties
        themeSongRef.current.volume = 0.4;
        themeSongRef.current.muted = false;
        themeSongRef.current.loop = true;
        
        // FORCE PLAY - multiple strategies
        const playStrategies = [
          // Strategy 1: Direct play
          () => themeSongRef.current!.play(),
          
          // Strategy 2: Muted then unmute
          () => {
            themeSongRef.current!.muted = true;
            return themeSongRef.current!.play().then(() => {
              setTimeout(() => {
                themeSongRef.current!.muted = false;
              }, 50);
            });
          },
          
          // Strategy 3: Create new audio element
          () => {
            const newAudio = new Audio('/theme-song/Game of Thrones Edit - A Song of Ice and Fire.mp3');
            newAudio.volume = 0.4;
            newAudio.loop = true;
            newAudio.muted = false;
            return newAudio.play().then(() => {
              // Replace the ref
              themeSongRef.current = newAudio;
            });
          }
        ];
        
        // Try all strategies
        let strategyIndex = 0;
        const tryNextStrategy = () => {
          if (strategyIndex < playStrategies.length) {
            playStrategies[strategyIndex]()
              .then(() => {
                setIsMuted(false);
              })
              .catch((error) => {
                strategyIndex++;
                setTimeout(tryNextStrategy, 100);
              });
          } else {
            setTimeout(forcePlayThemeSong, 500);
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
            const touchEvent = new TouchEvent(eventType, { bubbles: true, cancelable: true });
            target.dispatchEvent(touchEvent);
          }
        });
      });
      
    };

    // IMMEDIATE EXECUTION
    forcePlayThemeSong();
    simulateMassiveUserInteraction();
    
    // AGGRESSIVE RETRY SCHEDULE
    const retryTimes = [50, 100, 200, 500, 1000, 2000, 3000];
    retryTimes.forEach(delay => {
      setTimeout(() => {
        forcePlayThemeSong();
        simulateMassiveUserInteraction();
      }, delay);
    });

    // CONTINUOUS RETRY EVERY 2 SECONDS
    const continuousRetry = setInterval(() => {
      if (themeSongRef.current && themeSongRef.current.paused) {
        forcePlayThemeSong();
      }
    }, 2000);

    return () => {
      clearInterval(continuousRetry);
    };

  }, []);

  // AUTOMATIC AUDIO ENABLER - Triggers audio without user interaction
  useEffect(() => {
    const enableAudioAutomatically = () => {
      // Force both audios to play
      if (themeSongRef.current && themeSongRef.current.paused) {
        themeSongRef.current.play().then(() => {
          setShowAudioPrompt(false);
        }).catch(console.log);
      }
      
      if (heroVoiceRef.current && heroVoiceRef.current.paused) {
        heroVoiceRef.current.play().then(() => {
          setShowAudioPrompt(false);
        }).catch(console.log);
      }
    };

    // Try to enable audio immediately
    enableAudioAutomatically();
    
    // Simulate a click event to trigger audio
    setTimeout(() => {
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      document.dispatchEvent(clickEvent);
    }, 100);
    
    // If that fails, show the prompt and try again
    setTimeout(() => {
      if (showAudioPrompt) {
        enableAudioAutomatically();
        // Try another simulated click
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        document.dispatchEvent(clickEvent);
      }
    }, 1000);

    // Auto-hide prompt after 3 seconds and force audio
    setTimeout(() => {
      setShowAudioPrompt(false);
      // Final attempt to force audio
      if (themeSongRef.current) themeSongRef.current.play().catch(() => {});
      if (heroVoiceRef.current) heroVoiceRef.current.play().catch(() => {});
    }, 3000);

  }, [showAudioPrompt]);

  // GLOBAL USER INTERACTION LISTENER - Enable audio on ANY user action
  useEffect(() => {
    const enableAudioOnInteraction = () => {
      setShowAudioPrompt(false);
      
      // Force both audios to play
      if (themeSongRef.current && themeSongRef.current.paused) {
        themeSongRef.current.play().then(() => {
        }).catch(console.log);
      }
      
      if (heroVoiceRef.current && heroVoiceRef.current.paused) {
        heroVoiceRef.current.play().then(() => {
        }).catch(console.log);
      }
    };

    // Listen for ANY user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousedown', 'scroll', 'wheel'];
    events.forEach(eventType => {
      document.addEventListener(eventType, enableAudioOnInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, enableAudioOnInteraction);
      });
    };
  }, []);

  return (
    <main className="bg-charcoal-900 m-0 p-0">
      <Navigation />

      <Hero
        hasUserChosen={true}
        heroVoiceRef={heroVoiceRef}
      />

      <CTASection />
      <BookTableSection />
      <AboutSection />
      <MenuSection />

      <AudioController
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
      />

      {/* Automatic Audio Prompt - Triggers audio without user interaction */}
      {showAudioPrompt && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => {
            setShowAudioPrompt(false);
            // Force audio to play
            if (themeSongRef.current) themeSongRef.current.play();
            if (heroVoiceRef.current) heroVoiceRef.current.play();
          }}
        >
          <div className="text-center p-8 bg-black/90 rounded-lg border border-yellow-400/30 max-w-md mx-4">
            <div className="text-yellow-400 text-4xl mb-4">🎵</div>
            <h2 className="text-yellow-400 text-xl font-bold mb-2">Enable Audio</h2>
            <p className="text-white text-sm mb-4">
              Click anywhere to start the immersive experience with theme music and hero voice.
            </p>
            <div className="text-xs text-gray-400">
              This will start automatically in a few seconds...
            </div>
          </div>
        </div>
      )}


      <Footer />

      {/* Hidden Auto-Trigger Button */}
      <button
        ref={(el) => {
          if (el) {
            // Auto-click this button to trigger audio
            setTimeout(() => {
              el.click();
            }, 200);
            setTimeout(() => {
              el.click();
            }, 1000);
          }
        }}
        onClick={() => {
          if (themeSongRef.current) themeSongRef.current.play().catch(() => {});
          if (heroVoiceRef.current) heroVoiceRef.current.play().catch(() => {});
          setShowAudioPrompt(false);
        }}
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          opacity: 0, 
          pointerEvents: 'none' 
        }}
      >
        Auto Trigger
      </button>

      {/* Theme Song Audio */}
      <audio
        ref={themeSongRef}
        preload="auto"
        loop
        style={{ display: 'none' }}
      >
        <source src="/theme-song/Game of Thrones Edit - A Song of Ice and Fire.mp3" type="audio/mpeg" />
      </audio>

    </main>
  );
}
