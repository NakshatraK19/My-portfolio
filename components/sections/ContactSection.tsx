'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PERSONAL } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function NeuralLines() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="contact-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7b2fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Convergence lines pointing to center */}
      <g stroke="#7b2fff" strokeWidth="0.8" fill="none">
        <line x1="0" y1="0" x2="50%" y2="50%" />
        <line x1="100%" y1="0" x2="50%" y2="50%" />
        <line x1="0" y1="100%" x2="50%" y2="50%" />
        <line x1="100%" y1="100%" x2="50%" y2="50%" />
        <line x1="50%" y1="0" x2="50%" y2="50%" />
        <line x1="0" y1="50%" x2="50%" y2="50%" />
        <line x1="100%" y1="50%" x2="50%" y2="50%" />
        <line x1="50%" y1="100%" x2="50%" y2="50%" />
        <line x1="25%" y1="0" x2="50%" y2="50%" />
        <line x1="75%" y1="0" x2="50%" y2="50%" />
        <line x1="0" y1="25%" x2="50%" y2="50%" />
        <line x1="0" y1="75%" x2="50%" y2="50%" />
        <line x1="100%" y1="25%" x2="50%" y2="50%" />
        <line x1="100%" y1="75%" x2="50%" y2="50%" />
        <line x1="25%" y1="100%" x2="50%" y2="50%" />
        <line x1="75%" y1="100%" x2="50%" y2="50%" />
      </g>

      {/* Nodes at convergence points */}
      <g fill="#00d4ff" opacity="0.4">
        <circle cx="50%" cy="50%" r="4" />
        <circle cx="0" cy="0" r="2.5" />
        <circle cx="100%" cy="0" r="2.5" />
        <circle cx="0" cy="100%" r="2.5" />
        <circle cx="100%" cy="100%" r="2.5" />
        <circle cx="50%" cy="0" r="2" />
        <circle cx="0" cy="50%" r="2" />
        <circle cx="100%" cy="50%" r="2" />
        <circle cx="50%" cy="100%" r="2" />
      </g>
    </svg>
  )
}

function EmailCard({ email, label, primary }: { email: string; label: string; primary?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        background: primary ? 'rgba(123,47,255,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${primary ? 'rgba(123,47,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '1.4rem 1.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
      onClick={copy}
      whileHover={{
        borderColor: primary ? 'rgba(123,47,255,0.6)' : 'rgba(255,255,255,0.12)',
        y: -2,
      }}
    >
      <div>
        <p className="font-mono" style={{
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: primary ? 'var(--neon-violet)' : 'var(--text-muted)',
          marginBottom: '0.35rem',
        }}>
          {label}
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}>
          {email}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.9rem',
        borderRadius: '6px',
        background: copied ? 'rgba(57,255,20,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${copied ? 'rgba(57,255,20,0.3)' : 'rgba(255,255,255,0.08)'}`,
        color: copied ? 'var(--neon-lime)' : 'var(--text-muted)',
        fontSize: '0.72rem',
        transition: 'all 0.3s',
        flexShrink: 0,
      }}>
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em' }}>Copied</span>
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.08em' }}>Copy</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -2 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.4rem',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'all 0.3s',
        flex: 1,
        minWidth: '160px',
      }}
      className="social-link"
    >
      <div style={{
        width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--text-secondary)',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          Connect
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{label}</p>
      </div>
    </motion.a>
  )
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-headline-el', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-headline',
          start: 'top 78%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,47,255,0.06) 0%, transparent 65%),
          var(--bg-deep)
        `,
        overflow: 'hidden',
      }}
    >
      <NeuralLines />
      <div className="noise-overlay" />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Headline */}
        <div className="contact-headline" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="section-label contact-headline-el" style={{ justifyContent: 'center' }}>
            Get in Touch
          </div>

          <h2
            className="section-title contact-headline-el"
            style={{ marginTop: '0.5rem', textAlign: 'center' }}
          >
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Intelligent</span>
          </h2>

          <p className="section-subtitle contact-headline-el" style={{ textAlign: 'center', margin: '1rem auto 0' }}>
            Open to collaborations, internships, and research opportunities in AI engineering and embedded intelligence.
          </p>
        </div>

        {/* Contact grid */}
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Email section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <p className="font-mono" style={{
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.85rem',
            }}>
              Email — choose either
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <EmailCard email={PERSONAL.email} label="Primary" primary />
              <EmailCard email={PERSONAL.emailAlt} label="Alternative" />
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              padding: '1.1rem 1.6rem',
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.12)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon-cyan)" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Phone</p>
              <p style={{ color: 'var(--neon-cyan)', fontSize: '0.95rem', letterSpacing: '0.02em' }}>{PERSONAL.phone}</p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono" style={{
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.85rem',
            }}>
              Socials
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <SocialLink
                href={PERSONAL.github}
                label="NakshatraK19"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                  </svg>
                }
              />
              <SocialLink
                href={PERSONAL.linkedin}
                label="nakshatrakaushik1903"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
              />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '5rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Nakshatra<span style={{ color: 'var(--neon-violet)' }}>.</span>
          </div>
          <p className="font-mono" style={{ fontSize: '0.62rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            © 2025 — Built with Next.js + Framer Motion + GSAP
          </p>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', fontSize: '0.75rem', transition: 'color 0.3s' }}
            className="footer-gh-link"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <style>{`
        .social-link:hover {
          border-color: rgba(123,47,255,0.3) !important;
          background: rgba(123,47,255,0.06) !important;
          color: var(--text-primary) !important;
        }
        .footer-gh-link:hover { color: var(--neon-violet) !important; }
      `}</style>
    </section>
  )
}
