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
  const [hasUserInteracted, setHasUserInteracted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio enabled by default - no user interaction required

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioEnabled) return;

    // Set up audio properties
    audio.volume = 0.3;
    audio.loop = true;
    audio.muted = isMuted;

    // Start playing immediately when audio is enabled and not muted
    const playAudio = () => {
      if (audio.paused && !isMuted && !document.hidden) {
        audio.volume = 0.3;
        audio.muted = false;
        
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Audio autoplay failed:', error);
          setIsPlaying(false);
        });
      }
    };

    // Function to pause audio
    const pauseAudio = () => {
      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    // Simplified visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          setWasPlayingBeforeHidden(true);
          pauseAudio();
        }
      } else if (wasPlayingBeforeHidden && !isMuted && audioEnabled) {
        playAudio();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start playing immediately if audio is enabled, not muted and tab is visible
    if (audioEnabled && !isMuted && !document.hidden) {
      // Start immediately
      playAudio();
      
      // Also try after a short delay to ensure DOM is ready
      setTimeout(() => {
        playAudio();
      }, 100);
    }

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [audioEnabled, isMuted, wasPlayingBeforeHidden]);

  // Handle mute state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Pause and remember state when muted
      if (!audio.paused) {
        setWasPlayingBeforeHidden(true);
        audio.pause();
        setIsPlaying(false);
      }
    } else if (audioEnabled && !document.hidden) {
      // Resume if it was playing before and tab is visible
      if (wasPlayingBeforeHidden) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
        });
      }
    }
  }, [isMuted, audioEnabled, wasPlayingBeforeHidden]);

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