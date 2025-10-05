'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  audioEnabled: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
}

const AudioController = ({ 
  audioEnabled, 
  isMuted, 
  onMuteToggle
}: AudioControllerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  const [showEnableButton, setShowEnableButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio enabled by default - no user interaction required - FORCE DEPLOYMENT

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio properties for autoplay
    audio.volume = 0.3;
    audio.loop = true;
    audio.muted = false;
    audio.preload = 'auto';

    // Ultra-aggressive autoplay strategy
    const startAudio = () => {
      console.log('Attempting to start theme song...');
      
      const tryPlay = () => {
        audio.volume = 0.3;
        audio.muted = false;
        
        return audio.play().then(() => {
          console.log('Theme song started successfully');
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Theme song play failed:', error);
          setIsPlaying(false);
          return Promise.reject(error);
        });
      };

      // Try multiple strategies
      tryPlay().catch(() => {
        // Strategy 1: Simulate user interaction
        console.log('Strategy 1: Simulating user interaction...');
        const events = ['click', 'touchstart', 'mousedown', 'keydown'];
        events.forEach(eventType => {
          const event = new Event(eventType, { bubbles: true, cancelable: true });
          document.dispatchEvent(event);
        });
        
        setTimeout(() => tryPlay().catch(() => {
          // Strategy 2: Try with different audio properties
          console.log('Strategy 2: Trying different audio properties...');
          audio.muted = true;
          audio.play().then(() => {
            audio.muted = false;
            setIsPlaying(true);
          }).catch(() => {
            // Strategy 3: Create new audio element
            console.log('Strategy 3: Creating new audio element...');
            const newAudio = new Audio(audio.src);
            newAudio.volume = 0.3;
            newAudio.loop = true;
            newAudio.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              console.log('All autoplay strategies failed');
            });
          });
        }), 50);
      });
    };

    // Start immediately
    startAudio();
    
    // Try multiple times with different delays
    setTimeout(startAudio, 50);
    setTimeout(startAudio, 100);
    setTimeout(startAudio, 200);
    setTimeout(startAudio, 500);
    setTimeout(startAudio, 1000);
    setTimeout(startAudio, 2000);

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          setWasPlayingBeforeHidden(true);
          audio.pause();
          setIsPlaying(false);
        }
      } else if (wasPlayingBeforeHidden) {
        startAudio();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try to start audio immediately without user interaction
    const enableAudioOnInteraction = () => {
      console.log('User interaction detected, enabling audio...');
      startAudio();
    };

    document.addEventListener('click', enableAudioOnInteraction, { once: true });
    document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
    document.addEventListener('keydown', enableAudioOnInteraction, { once: true });

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', enableAudioOnInteraction);
      document.removeEventListener('touchstart', enableAudioOnInteraction);
      document.removeEventListener('keydown', enableAudioOnInteraction);
    };
  }, []); // No dependencies - start immediately

  // Handle mute state changes - but don't interfere with autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Pause when muted
      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      // Resume when unmuted - but only if it was playing before
      if (wasPlayingBeforeHidden || isPlaying) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Resume audio failed:', error);
        });
      }
    }
  }, [isMuted, wasPlayingBeforeHidden, isPlaying]);

  // Always show the audio controller button

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/theme-song/Game of Thrones Edit - A Song of Ice and Fire.mp3"
        preload="auto"
        className="hidden"
        onError={() => {
          console.log('Audio file not found, continuing without theme music');
        }}
      />
      
      
      {/* Mute/Unmute Button - Always visible */}
      <button
        onClick={onMuteToggle}
        className={`fixed bottom-4 right-4 z-[99999] p-3 backdrop-blur-sm rounded-lg transition-colors duration-200 border ${
          isMuted 
            ? 'bg-black/90 text-gray-400 border-gray-600' 
            : isPlaying 
            ? 'bg-black/90 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20' 
            : 'bg-black/90 text-blue-400 border-blue-400/30 hover:bg-blue-400/20'
        }`}
        title={isMuted ? 'Unmute' : 'Mute'}
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
          position: 'fixed',
          zIndex: 99999,
        }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      
    </>
  );
};

export default AudioController; 