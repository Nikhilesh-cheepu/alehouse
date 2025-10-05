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
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio enabled by default - no user interaction required - FORCE DEPLOYMENT

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio properties - IMMEDIATE START
    audio.volume = 0.3;
    audio.loop = true;
    audio.muted = false; // Never muted for autoplay

    // Start playing immediately - NO CONDITIONS AT ALL
    const startAudio = () => {
      console.log('Starting theme song...');
      audio.volume = 0.3;
      audio.muted = false;
      
      audio.play().then(() => {
        console.log('Theme song started successfully');
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Theme song autoplay failed:', error);
        setIsPlaying(false);
        
        // Try again after a delay
        setTimeout(() => {
          audio.play().then(() => {
            console.log('Theme song started on retry');
            setIsPlaying(true);
          }).catch((retryError) => {
            console.log('Theme song retry failed:', retryError);
          });
        }, 1000);
      });
    };

    // Start immediately
    startAudio();
    
    // Try multiple times to ensure it starts
    setTimeout(startAudio, 100);
    setTimeout(startAudio, 500);
    setTimeout(startAudio, 1000);

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

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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