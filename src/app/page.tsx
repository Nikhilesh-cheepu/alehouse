'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import AudioController from '@/components/AudioController';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BookTableSection from '@/components/BookTableSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  const [audioEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVoiceStart = () => {
    // Voice started
  };

  const handleVoiceEnd = () => {
    // Voice ended
  };

  return (
    <main className="bg-charcoal-900 m-0 p-0">
      <Navigation />

      <Hero
        audioEnabled={audioEnabled}
        hasUserChosen={true}
        isMuted={isMuted}
        onVoiceStart={handleVoiceStart}
        onVoiceEnd={handleVoiceEnd}
      />

      <CTASection />
      <BookTableSection />
      <AboutSection />
      <MenuSection />

      <AudioController
        audioEnabled={audioEnabled}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
      />

      <Footer />

    </main>
  );
}
