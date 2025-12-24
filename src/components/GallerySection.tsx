'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight, FaInstagram } from 'react-icons/fa';

interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  category?: string;
  gridClass: string;
  isInstagram?: boolean;
  permalink?: string;
  caption?: string;
}

const staticGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (1).jpeg',
    alt: 'AleHouse night lights',
    category: 'Nights',
    gridClass: 'md:col-span-6 md:row-span-2 h-[320px]'
  },
  {
    id: 2,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (2).jpeg',
    alt: 'Pouring cocktails',
    category: 'Craft Bar',
    gridClass: 'md:col-span-3 h-[220px]'
  },
  {
    id: 3,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (3).jpeg',
    alt: 'Live band session',
    category: 'Experience',
    gridClass: 'md:col-span-3 h-[220px]'
  },
  {
    id: 4,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (4).jpeg',
    alt: 'Candle lit table',
    category: 'Dining',
    gridClass: 'md:col-span-4 md:row-span-2 h-[320px]'
  },
  {
    id: 5,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (6).jpeg',
    alt: 'DJ console',
    category: 'Music',
    gridClass: 'md:col-span-4 h-[220px]'
  },
  {
    id: 6,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (7).jpeg',
    alt: 'Signature shot line',
    category: 'Bar',
    gridClass: 'md:col-span-4 h-[220px]'
  },
  {
    id: 7,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (9).jpeg',
    alt: 'Happy guests',
    category: 'People',
    gridClass: 'md:col-span-6 md:row-span-2 h-[320px]'
  },
  {
    id: 8,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (11).jpeg',
    alt: 'AleHouse facade',
    category: 'Exterior',
    gridClass: 'md:col-span-3 h-[220px]'
  },
  {
    id: 9,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (12).jpeg',
    alt: 'Dance floor energy',
    category: 'Nights',
    gridClass: 'md:col-span-3 h-[220px]'
  },
  {
    id: 10,
    src: '/gallery/WhatsApp Image 2025-08-23 at 00.27.41 (14).jpeg',
    alt: 'Intimate booth',
    category: 'Lounge',
    gridClass: 'md:col-span-4 md:row-span-2 h-[320px]'
  }
];

// Grid classes for Instagram posts (rotating pattern)
const instagramGridClasses = [
  'md:col-span-6 md:row-span-2 h-[320px]',
  'md:col-span-3 h-[220px]',
  'md:col-span-3 h-[220px]',
  'md:col-span-4 md:row-span-2 h-[320px]',
  'md:col-span-4 h-[220px]',
  'md:col-span-4 h-[220px]',
  'md:col-span-6 md:row-span-2 h-[320px]',
  'md:col-span-3 h-[220px]',
  'md:col-span-3 h-[220px]',
  'md:col-span-4 md:row-span-2 h-[320px]',
  'md:col-span-4 h-[220px]',
  'md:col-span-4 h-[220px]',
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(staticGalleryImages);
  const [loadingInstagram, setLoadingInstagram] = useState(true);

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => 
        prev! < galleryImages.length - 1 ? prev! + 1 : 0
      );
      setImageLoading(true);
    }
  }, [selectedImage]);

  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => 
        prev! > 0 ? prev! - 1 : galleryImages.length - 1
      );
      setImageLoading(true);
    }
  }, [selectedImage]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Fetch Instagram posts
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoadingInstagram(true);
        const response = await fetch('/api/instagram');
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          // Transform Instagram posts to gallery format
          const instagramPosts: GalleryImage[] = data.data
            .filter((post: any) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
            .slice(0, 12) // Limit to 12 posts
            .map((post: any, index: number) => ({
              id: `instagram-${post.id}`,
              src: post.media_url,
              alt: post.caption ? post.caption.substring(0, 100) : 'Instagram post',
              gridClass: instagramGridClasses[index % instagramGridClasses.length],
              isInstagram: true,
              permalink: post.permalink,
              caption: post.caption,
            }));

          // Combine Instagram posts with static images
          // You can adjust this logic - here we're showing Instagram posts first, then static images
          setGalleryImages([...instagramPosts, ...staticGalleryImages]);
        } else {
          // If Instagram fails, just use static images
          setGalleryImages(staticGalleryImages);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        // Fallback to static images on error
        setGalleryImages(staticGalleryImages);
      } finally {
        setLoadingInstagram(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, nextImage, prevImage, closeModal]);

  return (
    <section 
      id="gallery"
      className="relative w-full py-16 md:py-24 overflow-hidden bg-black"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 65%), radial-gradient(circle at 80% 0%, rgba(255,215,0,0.08), transparent 60%)'
        }}
      />
      <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none hidden lg:block" />

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#ffffff',
              fontFamily: 'Game of Thrones, serif',
              marginBottom: '1rem',
              fontWeight: '400'
            }}
          >
            Gallery
          </h2>
          <p 
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              color: '#999999',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            Explore the medieval ambiance and royal experience at AleHouse
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {loadingInstagram ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-[32px] overflow-hidden border border-white/10 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[200px] gap-0">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden cursor-pointer group ${image.gridClass || 'md:col-span-3'} h-full`}
                  style={{
                    background: 'rgba(0,0,0,0.35)'
                  }}
                >
                  <Image
                    src={image.isInstagram ? image.src : encodeURI(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    unoptimized={image.isInstagram} // Instagram images are already optimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {image.isInstagram && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaInstagram className="text-white text-xl drop-shadow-lg" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Image Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-3 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {/* Navigation Buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/70 rounded-full text-white text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              )}

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src={galleryImages[selectedImage].isInstagram 
                    ? galleryImages[selectedImage].src 
                    : encodeURI(galleryImages[selectedImage].src)}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  sizes="90vw"
                  unoptimized={galleryImages[selectedImage].isInstagram}
                />
                {galleryImages[selectedImage].isInstagram && galleryImages[selectedImage].permalink && (
                  <a
                    href={galleryImages[selectedImage].permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaInstagram />
                    View on Instagram
                  </a>
                )}
                {galleryImages[selectedImage].caption && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 px-4 py-2 bg-black/70 rounded-lg text-white text-sm max-h-20 overflow-y-auto">
                    {galleryImages[selectedImage].caption}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

