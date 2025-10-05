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

  // Ultra-aggressive autoplay strategy for theme song
  useEffect(() => {
    const startThemeSong = () => {
      if (themeSongRef.current) {
        console.log('🎵 Attempting to start theme song...');
        console.log('🎵 Theme song element:', themeSongRef.current);
        console.log('🎵 Theme song src:', themeSongRef.current.src);
        
        // Set initial volume and muted state
        themeSongRef.current.volume = 0.4;
        themeSongRef.current.muted = false; // Start unmuted
        themeSongRef.current.loop = true;
        
        console.log('🎵 Theme song volume:', themeSongRef.current.volume);
        console.log('🎵 Theme song muted:', themeSongRef.current.muted);
        
        // Try to play immediately
        themeSongRef.current.play().then(() => {
          console.log('🎵 Theme song started successfully!');
          setIsMuted(false);
        }).catch((error) => {
          console.log('🎵 Theme song autoplay failed:', error);
          
          // Try with muted first, then unmute
          themeSongRef.current!.muted = true;
          themeSongRef.current!.play().then(() => {
            console.log('🎵 Theme song started muted, will unmute in 100ms');
            setTimeout(() => {
              themeSongRef.current!.muted = false;
              console.log('🎵 Theme song unmuted!');
            }, 100);
          }).catch((err) => {
            console.log('🎵 Theme song muted autoplay also failed:', err);
          });
        });
      } else {
        console.log('🎵 Theme song ref is null');
      }
    };

    // Start immediately
    startThemeSong();
    
    // Retry with delays
    setTimeout(startThemeSong, 100);
    setTimeout(startThemeSong, 500);
    setTimeout(startThemeSong, 1000);

    // Simulate user interaction for autoplay
    const simulateUserInteraction = () => {
      const events = ['click', 'touchstart', 'keydown'];
      events.forEach(eventType => {
        document.dispatchEvent(new Event(eventType, { bubbles: true }));
      });
    };

    setTimeout(simulateUserInteraction, 50);
    setTimeout(simulateUserInteraction, 200);
    setTimeout(simulateUserInteraction, 500);

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
