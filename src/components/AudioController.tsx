'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  audioEnabled: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
}

const AudioController = ({ 
  audioEnabled, 
  isMuted, 
  onMuteToggle, 
  onVoiceStart, 
  onVoiceEnd 
}: AudioControllerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioEnabled) return;

    // Set up audio properties
    audio.volume = 0.5;
    audio.loop = true;
    audio.muted = isMuted;

    // Start playing when audio is enabled and not muted
    const playAudio = () => {
      if (audio.paused && !isMuted && !document.hidden) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
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

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      
      if (document.hidden) {
        // Tab is hidden - pause and remember state
        if (!audio.paused) {
          setWasPlayingBeforeHidden(true);
          pauseAudio();
        } else {
          setWasPlayingBeforeHidden(false);
        }
      } else {
        // Tab is visible - resume if conditions are met
        if (wasPlayingBeforeHidden && !isMuted && audioEnabled) {
          playAudio();
        }
      }
    };

    // Handle window focus/blur (switching windows)
    const handleWindowFocus = () => {
      // Resume if it was playing before and not muted
      if (wasPlayingBeforeHidden && !isMuted && audioEnabled) {
        playAudio();
      }
    };

    const handleWindowBlur = () => {
      // Remember state and pause
      if (!audio.paused) {
        setWasPlayingBeforeHidden(true);
        pauseAudio();
      } else {
        setWasPlayingBeforeHidden(false);
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    // Start playing if not muted and tab is visible
    if (!isMuted && !document.hidden) {
      playAudio();
    }

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [audioEnabled, isMuted, isPlaying, wasPlayingBeforeHidden]);

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
        }).catch((error) => {
        });
      }
    }
  }, [isMuted, audioEnabled, wasPlayingBeforeHidden]);

  // Temporary debug - always show mute button for testing
  // if (!audioEnabled) return null;

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/theme-song/Game of Thrones Edit - A Song of Ice and Fire.mp3"
        preload="auto"
        className="hidden"
        onError={(e) => {
          console.log('Audio file not found, continuing without theme music');
        }}
      />
      
      {/* Mute/Unmute Button - Always visible for debugging */}
      <button
        onClick={onMuteToggle}
        className="fixed bottom-4 right-4 z-[99999] p-3 bg-black/90 backdrop-blur-sm rounded-lg text-gold hover:bg-gold/20 transition-colors duration-200 border border-gold/30"
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