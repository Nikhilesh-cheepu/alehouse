'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { beers } from '@/data/beers';

const AUTOPLAY_INTERVAL = 4000;

const CTASection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi || autoplayPaused) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [emblaApi, autoplayPaused]);

  const pauseAutoplay = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    setAutoplayPaused(true);
  }, []);
  const resumeAutoplay = useCallback(() => {
    resumeTimeoutRef.current = setTimeout(() => setAutoplayPaused(false), 600);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('pointerDown', pauseAutoplay);
    return () => {
      emblaApi.off('pointerDown', pauseAutoplay);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [emblaApi, pauseAutoplay]);

  return (
    <section
      className="relative w-full py-12 md:py-16 overflow-hidden"
      onPointerEnter={pauseAutoplay}
      onPointerLeave={resumeAutoplay}
    >
      {/* Dark matte + subtle crimson ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,0,2,0.98) 0%, rgba(20,0,5,0.97) 50%, rgba(10,0,2,0.98) 100%)',
          boxShadow: 'inset 0 0 80px rgba(139, 0, 50, 0.06)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2
            className="text-white text-xl md:text-2xl font-medium tracking-wide"
            style={{ fontFamily: '"Manrope", sans-serif' }}
          >
            Craft Beers & Bottle Beers
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-4 md:gap-6" style={{ marginLeft: '-0.5rem' }}>
            {beers.map((beer) => (
              <div
                key={beer.id}
                className="flex-[0_0_72%] md:flex-[0_0_52%] min-w-0 pl-2"
              >
                <div
                  className="rounded-xl overflow-hidden border bg-black/40 transition-shadow"
                  style={{
                    borderColor: 'rgba(212, 175, 55, 0.25)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="relative aspect-[4/5] md:aspect-[3/4]">
                    <video
                      src={beer.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="py-3 px-3 text-center"
                    style={{ fontFamily: '"Manrope", sans-serif' }}
                  >
                    <p className="text-white font-medium text-sm md:text-base">
                      {beer.name}
                    </p>
                    <p className="text-white/55 text-xs mt-0.5">{beer.descriptor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {beers.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background: i === selectedIndex ? 'rgba(212, 175, 55, 0.9)' : 'rgba(255,255,255,0.25)',
                transform: i === selectedIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Arrows - desktop only */}
        <div className="hidden md:flex absolute top-[38%] left-2 right-2 -translate-y-1/2 pointer-events-none justify-between">
          <button
            type="button"
            aria-label="Previous"
            onClick={scrollPrev}
            className="pointer-events-auto p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-amber-500/40 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={scrollNext}
            className="pointer-events-auto p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-amber-500/40 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
