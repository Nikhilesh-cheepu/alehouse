'use client';

import { Phone, MessageCircle, Calendar, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/918096060606?text=Hi%20Alehouse%2C%20I%20want%20to%20book%20a%20table.';
const CALL_URL = 'tel:+918096060606';

const barStyle = {
  background: 'rgba(0,0,0,0.78)',
  borderColor: 'rgba(212, 175, 55, 0.32)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
};

const pillHover = {
  boxShadow: '0 0 14px rgba(139, 0, 50, 0.35)',
  borderColor: 'rgba(212, 175, 55, 0.5)',
};

interface FloatingCTAProps {
  isMuted?: boolean;
  onMuteToggle?: () => void;
}

export default function FloatingCTA({ isMuted = true, onMuteToggle }: FloatingCTAProps) {
  const handleBook = () => {
    window.location.href = '/booking';
  };

  return (
    <div
      className="fixed left-0 right-0 z-[99998] flex items-center justify-center px-2"
      style={{
        bottom: 0,
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)',
      }}
    >
      <div
        className="flex flex-nowrap items-center gap-1.5 sm:gap-2 w-full max-w-lg rounded-full border backdrop-blur-md py-1.5 px-1.5 sm:px-2"
        style={barStyle}
      >
        {/* WhatsApp */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 min-w-0 items-center justify-center gap-1 rounded-full h-9 px-2 sm:px-3 text-white text-[12px] sm:text-xs font-medium transition-colors shrink-0"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
          }}
          whileHover={pillHover}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0 text-green-400/90" />
          <span className="hidden min-[200px]:inline truncate label">WhatsApp</span>
        </motion.a>

        {/* Call */}
        <motion.a
          href={CALL_URL}
          className="flex flex-1 min-w-0 items-center justify-center gap-1 rounded-full h-9 px-2 sm:px-3 text-white text-[12px] sm:text-xs font-medium transition-colors shrink-0"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(212, 175, 55, 0.22)',
          }}
          whileHover={pillHover}
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-4 h-4 flex-shrink-0 text-amber-400/90" />
          <span className="hidden min-[200px]:inline truncate label">Call</span>
        </motion.a>

        {/* Book (primary, slightly wider, with badge) */}
        <motion.button
          type="button"
          onClick={handleBook}
          className="relative flex flex-[1.2] min-w-0 items-center justify-center gap-1 rounded-full h-9 px-2 sm:px-3 text-white text-[12px] sm:text-xs font-medium transition-colors shrink-0"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(212, 175, 55, 0.38)',
          }}
          whileHover={pillHover}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className="absolute -top-0.5 right-0 text-[9px] font-semibold px-1 py-0 rounded border leading-tight"
            style={{
              background: 'rgba(139, 0, 50, 0.95)',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              color: '#fff',
            }}
          >
            30% OFF
          </span>
          <Calendar className="w-4 h-4 flex-shrink-0 text-amber-400/90" />
          <span className="truncate">Book</span>
        </motion.button>

        {/* Mute (same row, right) */}
        {onMuteToggle && (
          <motion.button
            type="button"
            onClick={onMuteToggle}
            title={isMuted ? 'Unmute' : 'Mute'}
            className={`flex-shrink-0 flex items-center justify-center rounded-full h-9 w-9 border transition-colors ${
              isMuted
                ? 'bg-black/80 text-gray-400 border-gray-600'
                : 'bg-black/80 text-amber-400/90 border-amber-500/30'
            }`}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.96 }}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
        )}
      </div>
    </div>
  );
}
