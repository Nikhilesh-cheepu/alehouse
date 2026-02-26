'use client';

import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  isMuted: boolean;
  onMuteToggle: () => void;
}

const AudioController = ({ 
  isMuted, 
  onMuteToggle
}: AudioControllerProps) => {
  return (
    <button
      onClick={onMuteToggle}
      className={`fixed z-[99999] p-3 backdrop-blur-sm rounded-lg transition-colors duration-200 border ${
        isMuted 
          ? 'bg-black/90 text-gray-400 border-gray-600' 
          : 'bg-black/90 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20'
      }`}
      title={isMuted ? 'Unmute' : 'Mute'}
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
        right: '1rem',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

export default AudioController;
