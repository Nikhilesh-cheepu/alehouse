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
  const [showEnableButton, setShowEnableButton] = useState(true);
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

    // Aggressive autoplay strategy
    const startAudio = () => {
      console.log('Attempting to start theme song...');
      
      // Try multiple approaches
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

      // Try immediately
      tryPlay().catch(() => {
        // Try with user gesture simulation
        console.log('Trying with simulated user interaction...');
        
        // Simulate user interaction
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        
        document.body.dispatchEvent(clickEvent);
        
        setTimeout(() => {
          tryPlay().catch(() => {
            console.log('All autoplay attempts failed');
          });
        }, 100);
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

    // Add global click handler to enable audio on any user interaction
    const enableAudioOnInteraction = () => {
      console.log('User interaction detected, enabling audio...');
      setShowEnableButton(false);
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
      
      {/* Enable Audio Button - Shows briefly */}
      {showEnableButton && (
        <button
          onClick={() => {
            setShowEnableButton(false);
            const audio = audioRef.current;
            if (audio) {
              audio.play().then(() => {
                setIsPlaying(true);
                console.log('Audio enabled by user click');
              }).catch((error) => {
                console.log('Audio play failed:', error);
              });
            }
          }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99999] px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-colors"
          style={{
            animation: 'pulse 2s infinite',
            zIndex: 99999,
          }}
        >
          🎵 Click to Enable Audio
        </button>
      )}
      
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