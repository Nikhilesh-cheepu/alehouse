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
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle user interaction to enable audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

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
        // Set audio properties for better compatibility
        audio.volume = 0.3; // Lower volume for autoplay
        audio.muted = false;
        
        audio.play().then(() => {
          setIsPlaying(true);
          console.log('Audio started successfully');
        }).catch((error) => {
          console.log('Audio autoplay failed:', error);
          setIsPlaying(false);
          // Try again after user interaction
          document.addEventListener('click', () => {
            if (audio.paused && audioEnabled && !isMuted) {
              audio.play().then(() => {
                setIsPlaying(true);
                console.log('Audio started after user interaction');
              }).catch(() => {
                setIsPlaying(false);
              });
            }
          }, { once: true });
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

    // Start playing if audio is enabled, not muted and tab is visible
    // Also try to start after user interaction if autoplay fails
    if (audioEnabled && !isMuted && !document.hidden) {
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        playAudio();
      }, 100);
    }

    // Try to start audio after user interaction if it failed initially
    if (hasUserInteracted && audioEnabled && !isMuted && audio.paused) {
      playAudio();
    }

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [audioEnabled, isMuted, isPlaying, wasPlayingBeforeHidden, hasUserInteracted]);

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
        title={
          isMuted 
            ? 'Unmute' 
            : isPlaying 
            ? 'Mute' 
            : 'Click to enable audio'
        }
        style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
          position: 'fixed',
          zIndex: 99999,
        }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      
      {/* Audio prompt for first-time users */}
      {!hasUserInteracted && !isPlaying && (
        <div className="fixed bottom-16 right-4 z-[99998] p-3 bg-blue-600/90 backdrop-blur-sm rounded-lg text-white text-sm max-w-[200px] border border-blue-400/30">
          <p className="text-xs">
            🎵 Click anywhere to enable background music
          </p>
        </div>
      )}
    </>
  );
};

export default AudioController; 