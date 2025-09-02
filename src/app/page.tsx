'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import IntroModal from '@/components/IntroModal';
import AudioController from '@/components/AudioController';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import ConditionalDragon from '@/components/ConditionalDragon';

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [hasUserChosen, setHasUserChosen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);


  const handleAudioChoice = (withAudio: boolean) => {
    setAudioEnabled(withAudio);
    setHasUserChosen(true);
    setShowModal(false);
  };

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
      
      {showModal && (
        <IntroModal onAudioChoice={handleAudioChoice} />
      )}

      <Hero
        audioEnabled={audioEnabled}
        hasUserChosen={hasUserChosen}
        isMuted={isMuted}
        onVoiceStart={handleVoiceStart}
        onVoiceEnd={handleVoiceEnd}
      />

      <AboutSection />
      <MenuSection />

      <AudioController
        audioEnabled={audioEnabled}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
        onVoiceStart={handleVoiceStart}
        onVoiceEnd={handleVoiceEnd}
      />

      {/* Conditional Dragon - follows cursor only on Hero and About sections */}
      <ConditionalDragon />
    </main>
  );
}
