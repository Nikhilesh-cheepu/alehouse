'use client';

import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import FloatingCTA from '@/components/FloatingCTA';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import LadiesDrinksPromo from '@/components/LadiesDrinksPromo';
import GallerySection from '@/components/GallerySection';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true); // Audio off by default
  const themeSongRef = useRef<HTMLAudioElement>(null);

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Mute/unmute theme song only
    if (themeSongRef.current) {
      themeSongRef.current.muted = newMutedState;
      if (!newMutedState) {
        themeSongRef.current.play().catch(() => {});
      } else {
        themeSongRef.current.pause();
      }
    }
  };

  // Setup theme song (muted by default, play on first unmute)
  useEffect(() => {
    if (themeSongRef.current) {
      themeSongRef.current.volume = 0.4;
      themeSongRef.current.muted = true;
      themeSongRef.current.loop = true;
    }
  }, []);

  // Pause/Resume audio when switching tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (themeSongRef.current) {
        if (document.hidden) {
          themeSongRef.current.pause();
        } else {
          // Resume theme song only if user had unmuted
          if (!themeSongRef.current.muted) {
            themeSongRef.current.play().catch(() => {});
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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
    <main
        className="bg-charcoal-900 m-0 p-0"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 72px)' }}
      >

      <Hero />

      <LadiesDrinksPromo />
      <CTASection />
      <AboutSection />
      <MenuSection />
      <GallerySection />

      <FloatingCTA
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
