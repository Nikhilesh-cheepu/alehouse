'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GALLERY_IMAGES = [
  { id: 1, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (1).jpeg', alt: 'AleHouse night lights' },
  { id: 2, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (2).jpeg', alt: 'Pouring cocktails' },
  { id: 3, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (3).jpeg', alt: 'Live band session' },
  { id: 4, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (4).jpeg', alt: 'Candle lit table' },
  { id: 5, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (6).jpeg', alt: 'DJ console' },
  { id: 6, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (7).jpeg', alt: 'Signature shot line' },
  { id: 7, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (9).jpeg', alt: 'Happy guests' },
  { id: 8, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (11).jpeg', alt: 'AleHouse facade' },
  { id: 9, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (12).jpeg', alt: 'Dance floor energy' },
  { id: 10, src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (14).jpeg', alt: 'Intimate booth' },
];

const AUTOPLAY_MS = 1000;

const GallerySection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!emblaApi || autoplayPaused) return;
    const t = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(t);
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
      id="gallery"
      className="relative w-full py-12 md:py-16 overflow-hidden bg-black"
      onPointerEnter={pauseAutoplay}
      onPointerLeave={resumeAutoplay}
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2
            className="text-white text-2xl md:text-3xl font-medium"
            style={{ fontFamily: 'Game of Thrones, serif' }}
          >
            Gallery
          </h2>
        </motion.div>

        {/* Fixed 16:9 carousel - height from aspect-ratio, capped on large screens */}
        <div
          className="overflow-hidden w-full max-h-[70vh]"
          style={{ aspectRatio: '16/9' }}
          ref={emblaRef}
        >
          <div className="flex h-full touch-pan-y gap-3" style={{ marginLeft: '-0.5rem' }}>
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.id}
                className="flex-[0_0_72%] md:flex-[0_0_55%] min-w-0 pl-2 h-full"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/40">
                  <Image
                    src={encodeURI(img.src)}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 72vw, 55vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {GALLERY_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: i === selectedIndex ? 'rgba(212, 175, 55, 0.9)' : 'rgba(255,255,255,0.25)',
                transform: i === selectedIndex ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
