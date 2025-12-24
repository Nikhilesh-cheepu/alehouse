'use client';

import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import AudioController from '@/components/AudioController';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BookTableSection from '@/components/BookTableSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import LadiesDrinksPromo from '@/components/LadiesDrinksPromo';
import GallerySection from '@/components/GallerySection';

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


  // Setup theme song but don't autoplay - wait for user interaction
  useEffect(() => {
    if (themeSongRef.current) {
      // Set properties but don't play yet
      themeSongRef.current.volume = 0.4;
      themeSongRef.current.muted = false;
      themeSongRef.current.loop = true;
    }
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

  // Handle hash navigation (e.g., /#gallery)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to load, then scroll to section
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const elementTop = rect.top + scrollTop - 100; // 100px offset for fixed nav
          
          window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
  }, []);



  return (
    <main className="bg-charcoal-900 m-0 p-0">

      <Hero 
        hasUserChosen={true}
        heroVoiceRef={heroVoiceRef}
      />

      <LadiesDrinksPromo />
      <CTASection />
      <BookTableSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />

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
