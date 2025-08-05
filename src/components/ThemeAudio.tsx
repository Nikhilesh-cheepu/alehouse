'use client';

import { useEffect, useRef } from 'react';

const ThemeAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio properties
    audio.volume = 1.0;
    audio.loop = true;
    audio.muted = false;

    // Function to play audio with aggressive retry
    const playAudio = () => {
      if (audio.paused) {
        // Try to play immediately
        audio.play().catch(() => {
          // If failed, try with muted first then unmute
          audio.muted = true;
          audio.play().then(() => {
            audio.muted = false;
            console.log('Theme song playing successfully (muted workaround)');
          }).catch(() => {
            console.log('Theme song autoplay blocked by browser');
          });
        });
      }
    };

    // Function to pause audio
    const pauseAudio = () => {
      if (!audio.paused) {
        audio.pause();
        console.log('Theme song paused');
      }
    };

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAudio();
      } else {
        playAudio();
      }
    };

    // Handle window focus/blur (switching windows)
    const handleWindowFocus = () => {
      playAudio();
    };

    const handleWindowBlur = () => {
      pauseAudio();
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    // Try to play immediately and with delays
    playAudio();
    
    // Multiple aggressive attempts
    const attempts = [100, 200, 500, 1000, 2000, 3000];
    attempts.forEach(delay => {
      setTimeout(playAudio, delay);
    });

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/theme-song/Game of Thrones Edit - A Song of Ice and Fire.mp3"
        preload="auto"
        className="hidden"
      />
    </>
  );
};

export default ThemeAudio; 