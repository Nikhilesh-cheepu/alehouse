'use client';

import { MapPin, Globe } from 'lucide-react';

export default function VenueInfo() {
  return (
    <div className="text-center py-6 border-t border-[#FFD700]/20">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-[#FFD700]">
          <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base font-medium">Venue:</span>
        </div>
        <p className="text-base md:text-lg text-white font-medium">
          Sarath City Capital Mall, 5th & 6th Level
        </p>
        <p className="text-xs md:text-sm text-gray-400">
          (Opp Snow Kingdom)
        </p>
        <a
          href="https://www.alehouse.club"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#FFD700] hover:text-[#FFA500] transition-colors mt-1"
        >
          <Globe className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm">www.alehouse.club</span>
        </a>
      </div>
    </div>
  );
}
