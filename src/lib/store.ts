import { create } from 'zustand'

interface AppState {
  scrollProgress: number
  isHeroComplete: boolean
  setScrollProgress: (progress: number) => void
  setHeroComplete: (complete: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  isHeroComplete: false,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setHeroComplete: (complete) => set({ isHeroComplete: complete }),
})) 