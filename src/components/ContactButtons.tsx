'use client';

import { Phone, MessageCircle } from 'lucide-react';

const phoneNumbers = [
  '+91 8096060606',
  '+91 7601 026534',
  '+91 6371 717 826',
  '+91 99493 88821',
];

const whatsappLink = 'https://wa.me/918096060606';

export default function ContactButtons() {
  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg md:text-xl font-bold text-[#FFD700] mb-4 text-center">
        Book via Call / WhatsApp
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {phoneNumbers.map((phone, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-black/30 border border-[#FFD700]/20 rounded-lg"
          >
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex-1 flex items-center gap-2 hover:text-[#FFD700] transition-colors"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700] flex-shrink-0" />
              <span className="text-sm md:text-base text-white font-medium">{phone}</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg border border-green-500/50 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
