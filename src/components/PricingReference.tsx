'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const pricingData = [
  { phase: 'Before 28th Dec', female: 1999, male: 2499, couple: 3999 },
  { phase: '28th–30th Dec', female: 2499, male: 2999, couple: 4499 },
  { phase: '31st Dec', female: 2999, male: 3499, couple: 5999 },
];

export default function PricingReference() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 md:mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-black/30 border border-[#FFD700]/20 rounded-lg hover:border-[#FFD700]/40 transition-all"
      >
        <span className="text-base md:text-lg font-medium text-[#FFD700]">
          See all phase prices
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#FFD700]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#FFD700]" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 bg-black/30 border border-[#FFD700]/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-[#FFD700]/10 border-b border-[#FFD700]/20">
                  <th className="px-4 py-3 text-left text-[#FFD700] font-bold">Phase</th>
                  <th className="px-4 py-3 text-center text-[#FFD700] font-bold">Female</th>
                  <th className="px-4 py-3 text-center text-[#FFD700] font-bold">Male</th>
                  <th className="px-4 py-3 text-center text-[#FFD700] font-bold">Couple</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#FFD700]/10 last:border-b-0 hover:bg-[#FFD700]/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium">{row.phase}</td>
                    <td className="px-4 py-3 text-center text-[#FFD700] font-semibold">
                      ₹{row.female.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-center text-[#FFD700] font-semibold">
                      ₹{row.male.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-center text-[#FFD700] font-semibold">
                      ₹{row.couple.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

