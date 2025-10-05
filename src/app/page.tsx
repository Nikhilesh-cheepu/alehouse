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
        console.log('🎵 NUCLEAR: Forcing theme song to play...');
        
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
                console.log('🎵 FORCED: Theme song unmuted!');
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
              console.log('🎵 FORCED: New audio element playing!');
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
                console.log('🎵 FORCED: Theme song playing with strategy', strategyIndex + 1);
                setIsMuted(false);
              })
              .catch((error) => {
                console.log('🎵 FORCED: Strategy', strategyIndex + 1, 'failed:', error);
                strategyIndex++;
                setTimeout(tryNextStrategy, 100);
              });
          } else {
            console.log('🎵 FORCED: All strategies failed, trying again in 500ms');
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
      
      console.log('🎵 NUCLEAR: Simulated massive user interaction');
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
        console.log('🎵 NUCLEAR: Audio paused, forcing restart...');
        forcePlayThemeSong();
      }
    }, 2000);

    return () => {
      clearInterval(continuousRetry);
    };

  }, []);

  // GLOBAL USER INTERACTION LISTENER - Enable audio on ANY user action
  useEffect(() => {
    const enableAudioOnInteraction = () => {
      console.log('🔊 GLOBAL: User interaction detected, enabling audio...');
      
      // Force both audios to play
      if (themeSongRef.current && themeSongRef.current.paused) {
        themeSongRef.current.play().then(() => {
          console.log('🔊 GLOBAL: Theme song enabled by user interaction');
        }).catch(console.log);
      }
      
      if (heroVoiceRef.current && heroVoiceRef.current.paused) {
        heroVoiceRef.current.play().then(() => {
          console.log('🔊 GLOBAL: Hero voice enabled by user interaction');
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

      {/* Debug Audio Test Button */}
      <button
        onClick={() => {
          console.log('🔊 Testing audio files manually...');
          if (themeSongRef.current) {
            themeSongRef.current.play().then(() => {
              console.log('🎵 Theme song manual test successful!');
            }).catch((err) => {
              console.log('🎵 Theme song manual test failed:', err);
            });
          }
          if (heroVoiceRef.current) {
            heroVoiceRef.current.play().then(() => {
              console.log('🎤 Hero voice manual test successful!');
            }).catch((err) => {
              console.log('🎤 Hero voice manual test failed:', err);
            });
          }
        }}
        className="fixed bottom-20 right-4 z-[99999] p-2 bg-red-500 text-white text-xs rounded"
        style={{ position: 'fixed', zIndex: 99999 }}
      >
        Test Audio
      </button>

      <Footer />

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
