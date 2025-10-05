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
          
          // Strategy 3: Force reload and play
          () => {
            if (themeSongRef.current) {
              themeSongRef.current.load();
              return themeSongRef.current.play();
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
                setIsMuted(false);
              })
              .catch(() => {
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

    // Simple simulation of user interaction - less aggressive
    const simulateUserInteraction = () => {
      try {
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        document.dispatchEvent(clickEvent);
      } catch {
        // Ignore errors
      }
    };

    // IMMEDIATE EXECUTION
    forcePlayThemeSong();
    simulateUserInteraction();
    
    // Simple retry schedule - less aggressive to prevent crashes
    const retryTimes = [100, 500, 1000];
    retryTimes.forEach(delay => {
      setTimeout(() => {
        forcePlayThemeSong();
      }, delay);
    });

  }, []);

  // Pause/Resume audio when switching tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (themeSongRef.current) {
        if (document.hidden) {
          // Tab is hidden, pause audio
          themeSongRef.current.pause();
        } else {
          // Tab is visible again, resume audio if it was playing
          if (themeSongRef.current.currentTime > 0) {
            themeSongRef.current.play().catch(() => {});
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);



  return (
    <main className="bg-charcoal-900 m-0 p-0">
      <Navigation />

      <Hero
        hasUserChosen={true}
        heroVoiceRef={heroVoiceRef}
        onExploreClick={() => {
          // Enable audio when explore button is clicked
          if (themeSongRef.current) {
            themeSongRef.current.play().catch(() => {});
          }
          if (heroVoiceRef.current) {
            heroVoiceRef.current.play().catch(() => {});
          }
        }}
      />

      <CTASection />
      <BookTableSection />
      <AboutSection />
      <MenuSection />

      <AudioController
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
      />



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
