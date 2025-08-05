import { create } from 'zustand'

interface KingdomState {
  activeKingdom: string | null
  scrollProgress: number
  isHeroComplete: boolean
  setActiveKingdom: (kingdom: string | null) => void
  setScrollProgress: (progress: number) => void
  setHeroComplete: (complete: boolean) => void
}

export const useKingdomStore = create<KingdomState>((set) => ({
  activeKingdom: null,
  scrollProgress: 0,
  isHeroComplete: false,
  setActiveKingdom: (kingdom) => set({ activeKingdom: kingdom }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setHeroComplete: (complete) => set({ isHeroComplete: complete }),
})) 