'use client';

export default function EventHero() {
  return (
    <div className="text-center mb-6 md:mb-8 pt-24 md:pt-28" id="hero">
      {/* Main Heading */}
      <h1 
        className="text-4xl md:text-5xl font-bold mb-2 text-[#FFD700]"
        style={{
          fontFamily: 'Game of Thrones, serif',
          textShadow: '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)'
        }}
      >
        NEW YEAR EVENT
      </h1>

      {/* Subheading */}
      <p className="text-base md:text-lg text-gray-300 font-medium mb-4">
        31st Night • December 31st
      </p>

      {/* Chips Row */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-xs md:text-sm text-[#FFD700]">
          Unlimited Food & Drinks
        </span>
        <span className="px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-xs md:text-sm text-[#FFD700]">
          Imported Drinks
        </span>
        <span className="px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-xs md:text-sm text-[#FFD700]">
          Limited Tickets
        </span>
      </div>
    </div>
  );
}
