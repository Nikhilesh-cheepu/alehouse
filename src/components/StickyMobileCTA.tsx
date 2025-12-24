'use client';

import { MessageCircle, Phone } from 'lucide-react';

const primaryPhone = '+91 8096060606';
const whatsappLink = 'https://wa.me/918096060606';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-black/95 backdrop-blur-md border-t border-[#FFD700]/30 shadow-2xl">
        <div className="flex gap-2 p-3">
          {/* WhatsApp Button - Primary */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-bold text-white text-sm hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp to Book</span>
          </a>

          {/* Call Button - Secondary */}
          <a
            href={`tel:${primaryPhone.replace(/\s/g, '')}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#FFD700]/10 border-2 border-[#FFD700]/50 rounded-lg font-bold text-[#FFD700] text-sm hover:bg-[#FFD700]/20 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
