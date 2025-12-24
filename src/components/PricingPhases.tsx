'use client';

interface PricingPhase {
  phase: string;
  period: string;
  tickets: {
    type: string;
    price: number;
  }[];
  featured?: boolean;
}

const pricingData: PricingPhase[] = [
  {
    phase: 'Phase 1',
    period: 'BEFORE 28TH DEC',
    tickets: [
      { type: 'Female', price: 1999 },
      { type: 'Male', price: 2499 },
      { type: 'Couple', price: 3999 },
    ],
  },
  {
    phase: 'Phase 2',
    period: '28TH - 30TH DEC',
    tickets: [
      { type: 'Female', price: 2499 },
      { type: 'Male', price: 2999 },
      { type: 'Couple', price: 4499 },
    ],
  },
  {
    phase: 'Phase 3',
    period: '31ST DEC',
    tickets: [
      { type: 'Female', price: 2999 },
      { type: 'Male', price: 3499 },
      { type: 'Couple', price: 5999 },
    ],
    featured: true,
  },
];

export default function PricingPhases() {
  return (
    <div className="mb-12 md:mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
        {pricingData.map((phase, index) => (
          <div
            key={index}
            className={`p-6 md:p-8 rounded-xl border-2 transition-all ${
              phase.featured
                ? 'bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                : 'bg-black/50 border-[#FFD700]/30 hover:border-[#FFD700]/50'
            }`}
          >
            {/* Phase Header */}
            <div className="mb-6">
              <div className="text-sm md:text-base text-[#FFD700]/70 font-medium mb-2">
                {phase.phase}
              </div>
              <div className="text-lg md:text-xl font-bold text-white">
                {phase.period}
              </div>
              {phase.featured && (
                <div className="mt-2 text-xs md:text-sm text-[#FFD700] font-medium">
                  ⭐ Recommended
                </div>
              )}
            </div>

            {/* Ticket Prices */}
            <div className="space-y-4">
              {phase.tickets.map((ticket, ticketIndex) => (
                <div
                  key={ticketIndex}
                  className="flex justify-between items-center py-3 border-b border-[#FFD700]/20 last:border-b-0"
                >
                  <span className="text-base md:text-lg text-gray-300 font-medium">
                    {ticket.type}:
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-[#FFD700]">
                    ₹{ticket.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-center text-sm md:text-base text-gray-400 italic">
        Pricing increases as dates pass
      </p>
    </div>
  );
}

