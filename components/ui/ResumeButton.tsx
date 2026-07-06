'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ResumeButton() {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Show button after initial hero animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  // Magnetic effect
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const RADIUS = 80

      if (dist < RADIUS) {
        const force = (RADIUS - dist) / RADIUS
        btn.style.transform = `translate(${dx * force * 0.35}px, ${dy * force * 0.35}px)`
      } else {
        btn.style.transform = ''
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          ref={btnRef}
          href="/Nakshatra_Resume.docx"
          target="_blank"
          rel="noopener noreferrer"
          download="Nakshatra_Kaushik_Resume.docx"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 400,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1.4rem',
            background: hovered
              ? 'linear-gradient(135deg, var(--neon-violet), #5500cc)'
              : 'rgba(3,3,15,0.92)',
            border: `1px solid ${hovered ? 'var(--neon-violet)' : 'rgba(123,47,255,0.35)'}`,
            borderRadius: '100px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            textDecoration: 'none',
            color: hovered ? '#fff' : 'var(--neon-violet)',
            boxShadow: hovered
              ? '0 0 40px rgba(123,47,255,0.5), 0 0 80px rgba(123,47,255,0.2)'
              : '0 0 20px rgba(123,47,255,0.2)',
            transition: 'background 0.35s, border-color 0.35s, color 0.35s, box-shadow 0.35s',
            cursor: 'none',
            willChange: 'transform',
          }}
        >
          {/* Glow pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '100px',
              border: '1px solid rgba(123,47,255,0.4)',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>

          <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Resume
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
