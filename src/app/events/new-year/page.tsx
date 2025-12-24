'use client';

import EventHero from '@/components/EventHero';
import TicketSelector from '@/components/TicketSelector';
import PricingReference from '@/components/PricingReference';
import ContactButtons from '@/components/ContactButtons';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import VenueInfo from '@/components/VenueInfo';

export default function NewYearEventPage() {
  return (
    <main className="min-h-screen bg-black text-white pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <EventHero />
        <TicketSelector />
        <PricingReference />
        <ContactButtons />
        <VenueInfo />
      </div>
      <StickyMobileCTA />
    </main>
  );
}
