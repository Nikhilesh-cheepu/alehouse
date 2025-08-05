'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Kingdom } from '@/data/kingdoms'

interface KingdomCardProps {
  kingdom: Kingdom
  isActive: boolean
  onActivate: (kingdomId: string) => void
  index: number
}

export default function KingdomCard({ 
  kingdom, 
  isActive, 
  onActivate, 
  index 
}: KingdomCardProps) {
  const [imageSrc, setImageSrc] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Responsive image selection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setImageSrc(mobile ? kingdom.images.mobile : kingdom.images.desktop)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [kingdom.images])

  const handleClick = () => {
    onActivate(kingdom.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-lg cursor-pointer
        transition-all duration-300 ease-out
        ${isActive 
          ? 'ring-2 ring-gold shadow-lg shadow-gold/20' 
          : 'hover:shadow-xl hover:shadow-black/30'
        }
      `}
      style={{
        background: `linear-gradient(135deg, ${kingdom.color}20, ${kingdom.accentColor}20)`,
        border: isActive ? `2px solid ${kingdom.accentColor}` : '2px solid transparent'
      }}
    >
      {/* Background Image */}
      <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
        <img
          src={imageSrc}
          alt={`${kingdom.fullName} - ${kingdom.description}`}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          }}
          onError={(e) => {
            console.error(`Failed to load image for ${kingdom.name}:`, imageSrc)
            // Fallback to a placeholder or default image
            e.currentTarget.src = '/placeholder-kingdom.jpg'
          }}
        />
        
        {/* Overlay Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          style={{
            background: `linear-gradient(to top, ${kingdom.color}CC, ${kingdom.accentColor}40, transparent)`
          }}
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{
              fontFamily: 'GameOfThrones, serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            {kingdom.fullName}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm md:text-base font-cinzel opacity-90"
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {kingdom.description}
          </motion.p>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gold"
            style={{
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
            }}
          />
        )}
      </div>
    </motion.div>
  )
} 