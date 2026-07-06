'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '@/lib/lenis'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    setLenis(lenis)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(gsapTicker)
    gsap.ticker.lagSmoothing(0)

    // Scroll progress CSS variable
    lenis.on('scroll', () => {
      document.documentElement.style.setProperty('--scroll-progress', `${lenis.progress * 100}%`)
    })

    return () => {
      setLenis(null)
      lenis.destroy()
      gsap.ticker.remove(gsapTicker)
    }
  }, [])

  return <>{children}</>
}
