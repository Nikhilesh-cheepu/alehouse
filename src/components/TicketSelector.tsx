'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Minus, Plus } from 'lucide-react';

interface PricingData {
  phase: string;
  period: string;
  female: number;
  male: number;
  couple: number;
}

const pricingData: PricingData[] = [
  {
    phase: 'Phase 1',
    period: 'Before 28th Dec',
    female: 1999,
    male: 2499,
    couple: 3999,
  },
  {
    phase: 'Phase 2',
    period: '28th–30th Dec',
    female: 2499,
    male: 2999,
    couple: 4499,
  },
  {
    phase: 'Phase 3',
    period: '31st Dec',
    female: 2999,
    male: 3499,
    couple: 5999,
  },
];

type TicketType = 'female' | 'male' | 'couple';

export default function TicketSelector() {
  const [selectedPhase, setSelectedPhase] = useState(2); // Default: Phase 3 (31st Dec)
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType>('male');
  const [quantity, setQuantity] = useState(1);

  const currentPhase = pricingData[selectedPhase];
  const currentPrice = currentPhase[selectedTicketType];
  const totalPrice = currentPrice * quantity;

  const handleWhatsApp = () => {
    const phaseName = currentPhase.phase;
    const ticketTypeName = selectedTicketType.charAt(0).toUpperCase() + selectedTicketType.slice(1);
    const message = `Hi Alehouse, I want to book NEW YEAR EVENT (31st Night). Phase: ${phaseName} (${currentPhase.period}). Ticket: ${ticketTypeName}. Qty: ${quantity}. Total: ₹${totalPrice.toLocaleString('en-IN')}. Please confirm availability.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918096060606?text=${encodedMessage}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+918096060606';
  };

  return (
    <div className="mb-6 md:mb-8">
      <div className="bg-black/50 border border-[#FFD700]/30 rounded-xl p-4 md:p-6 backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-bold text-[#FFD700] mb-4 text-center">
          Choose your ticket
        </h2>

        {/* Phase Selector - Segmented Tabs */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {pricingData.map((phase, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhase(index)}
                className={`px-3 py-2 text-xs md:text-sm font-medium rounded-lg transition-all ${
                  selectedPhase === index
                    ? 'bg-[#FFD700]/20 border-2 border-[#FFD700] text-[#FFD700]'
                    : 'bg-black/30 border border-[#FFD700]/20 text-gray-300 hover:border-[#FFD700]/40'
                }`}
              >
                {index === 0 ? 'Before 28th' : index === 1 ? '28th–30th' : '31st Dec'}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {currentPhase.period}
          </p>
        </div>

        {/* Ticket Type Selector */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedTicketType('female')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedTicketType === 'female'
                  ? 'bg-[#FFD700]/20 border-2 border-[#FFD700] text-[#FFD700]'
                  : 'bg-black/30 border border-[#FFD700]/20 text-gray-300 hover:border-[#FFD700]/40'
              }`}
            >
              Female
            </button>
            <button
              onClick={() => setSelectedTicketType('male')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedTicketType === 'male'
                  ? 'bg-[#FFD700]/20 border-2 border-[#FFD700] text-[#FFD700]'
                  : 'bg-black/30 border border-[#FFD700]/20 text-gray-300 hover:border-[#FFD700]/40'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setSelectedTicketType('couple')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedTicketType === 'couple'
                  ? 'bg-[#FFD700]/20 border-2 border-[#FFD700] text-[#FFD700]'
                  : 'bg-black/30 border border-[#FFD700]/20 text-gray-300 hover:border-[#FFD700]/40'
              }`}
            >
              Couple
            </button>
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">Quantity</label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 bg-black/30 border border-[#FFD700]/30 rounded-lg text-[#FFD700] hover:bg-[#FFD700]/10 transition-all"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold text-white min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 bg-black/30 border border-[#FFD700]/30 rounded-lg text-[#FFD700] hover:bg-[#FFD700]/10 transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {selectedTicketType === 'couple' && (
            <p className="text-xs text-gray-400 mt-1 text-center">
              (2 entries per ticket)
            </p>
          )}
        </div>

        {/* Price Summary */}
        <div className="mb-4 p-3 bg-black/30 border border-[#FFD700]/20 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">You selected:</p>
          <p className="text-sm text-white mb-2">
            {currentPhase.phase} • {selectedTicketType.charAt(0).toUpperCase() + selectedTicketType.slice(1)} • Qty {quantity}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Total:</span>
            <span className="text-xl md:text-2xl font-bold text-[#FFD700]">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-400 text-center mb-4 italic">
          Pricing increases as dates pass
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-bold text-white hover:shadow-lg hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp to Book</span>
          </button>
          <button
            onClick={handleCall}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-[#FFD700]/10 border-2 border-[#FFD700]/50 rounded-lg font-bold text-[#FFD700] hover:bg-[#FFD700]/20 transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

