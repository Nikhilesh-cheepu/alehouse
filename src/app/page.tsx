'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import IntroModal from '@/components/IntroModal';
import AudioController from '@/components/AudioController';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [hasUserChosen, setHasUserChosen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  const handleAudioChoice = (withAudio: boolean) => {
    setAudioEnabled(withAudio);
    setHasUserChosen(true);
    setShowModal(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVoiceStart = () => {
    setVoiceActive(true);
  };

  const handleVoiceEnd = () => {
    setVoiceActive(false);
  };

  return (
    <main className="bg-aleblack">
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

      <AudioController
        audioEnabled={audioEnabled}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
        onVoiceStart={handleVoiceStart}
        onVoiceEnd={handleVoiceEnd}
      />
    </main>
  );
}
