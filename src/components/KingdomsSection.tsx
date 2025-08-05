'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { kingdoms } from '@/data/kingdoms'
import KingdomCard from './KingdomCard'
import { useKingdomStore } from '@/lib/store'

export default function KingdomsSection() {
  const [activeKingdom, setActiveKingdom] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { setActiveKingdom: setStoreKingdom } = useKingdomStore()

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('kingdoms-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const handleKingdomActivate = (kingdomId: string) => {
    setActiveKingdom(kingdomId)
    setStoreKingdom(kingdomId)
    
    // TODO: Play kingdom-specific voiceover
    // TODO: Trigger kingdom-specific animations
    // TODO: Update scroll progress
    
    console.log(`Kingdom activated: ${kingdomId}`)
  }

  return (
    <section 
      id="kingdoms-section"
      className="min-h-screen bg-aleblack py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-gold mb-6"
            style={{
              fontFamily: 'GameOfThrones, serif',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.3)'
            }}
          >
            The Seven Kingdoms
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-gold/80 font-cinzel max-w-3xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            Choose your realm and discover the legends that forged the world of Alehouse
          </motion.p>
        </motion.div>

        {/* Kingdoms Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {kingdoms.map((kingdom, index) => (
            <KingdomCard
              key={kingdom.id}
              kingdom={kingdom}
              isActive={activeKingdom === kingdom.id}
              onActivate={handleKingdomActivate}
              index={index}
            />
          ))}
        </motion.div>

        {/* Active Kingdom Info */}
        {activeKingdom && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mt-12 text-center"
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gold/30">
              <h3 className="text-2xl font-bold text-gold mb-2">
                {kingdoms.find(k => k.id === activeKingdom)?.fullName}
              </h3>
              <p className="text-gold/80 font-cinzel">
                {kingdoms.find(k => k.id === activeKingdom)?.description}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 