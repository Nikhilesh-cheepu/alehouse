'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import BookTableSection from '@/components/BookTableSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {


  return (
    <main className="bg-charcoal-900 m-0 p-0">
      <Navigation />

      <Hero
        hasUserChosen={true}
      />

      <CTASection />
      <BookTableSection />
      <AboutSection />
      <MenuSection />


      <Footer />

    </main>
  );
}
