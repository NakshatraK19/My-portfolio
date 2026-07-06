'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollToSection } from '@/lib/lenis'

const NAV_ITEMS = [
  { label: 'About', id: 'hero' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 500,
          padding: '0 2.5rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(3,3,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(123,47,255,0.08)' : '1px solid transparent',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.55rem',
            background: 'none', border: 'none', cursor: 'none', padding: 0,
          }}
        >
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--neon-violet), #3300aa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif',
            fontSize: '0.78rem', fontWeight: 800,
            color: '#fff',
            boxShadow: '0 0 16px rgba(123,47,255,0.4)',
            flexShrink: 0,
          }}>NK</div>
          <span style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800, fontSize: '1rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            Nakshatra<span style={{ color: 'var(--neon-violet)' }}>.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: '0.2rem', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  style={{
                    position: 'relative',
                    background: 'none', border: 'none',
                    padding: '0.5rem 1rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    transition: 'color 0.3s',
                    cursor: 'none',
                  }}
                  className="nav-item-btn"
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      style={{
                        position: 'absolute',
                        bottom: '4px', left: '50%',
                        width: '4px', height: '4px',
                        borderRadius: '50%',
                        background: 'var(--neon-cyan)',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 0 8px var(--neon-cyan)',
                      }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="https://github.com/NakshatraK19"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px',
              borderRadius: '8px',
              border: '1px solid rgba(123,47,255,0.2)',
              color: 'var(--text-muted)',
              transition: 'all 0.3s',
            }}
            className="nav-github-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
            </svg>
          </a>

          <button
            onClick={() => handleNav('contact')}
            style={{
              padding: '0.45rem 1.2rem',
              background: 'transparent',
              border: '1px solid var(--neon-violet)',
              borderRadius: '6px',
              color: 'var(--neon-violet)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 0.3s',
            }}
            className="nav-cta-btn"
          >
            Hire Me
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', flexDirection: 'column', gap: '5px',
              padding: '0.5rem', cursor: 'none',
              background: 'none', border: 'none',
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px',
                background: 'var(--text-secondary)',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '72px', left: 0, right: 0,
              background: 'rgba(3,3,15,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(123,47,255,0.1)',
              zIndex: 490,
              padding: '1rem 2rem 1.5rem',
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(item.id)}
                style={{
                  display: 'flex',
                  width: '100%',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(123,47,255,0.06)',
                  background: 'none', border: 'none',
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.3rem', fontWeight: 700,
                  color: activeSection === item.id ? 'var(--neon-violet)' : 'var(--text-secondary)',
                  cursor: 'none',
                  textAlign: 'left',
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'rgba(123,47,255,0.06)',
                  borderBottomWidth: '1px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .nav-github-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        .nav-github-btn:hover {
          border-color: var(--neon-violet) !important;
          color: var(--neon-violet) !important;
          background: var(--neon-violet-dim) !important;
        }
        .nav-cta-btn:hover {
          background: var(--neon-violet-dim) !important;
          box-shadow: 0 0 20px rgba(123,47,255,0.2) !important;
        }
        .nav-item-btn:hover { color: var(--text-primary) !important; }
      `}</style>
    </>
  )
}
