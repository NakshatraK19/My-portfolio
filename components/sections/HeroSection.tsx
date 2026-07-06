'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL, TICKER_SKILLS } from '@/data/portfolio'

// ── Text Scramble Hook ──────────────────────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?><~^'

function useTextScramble(text: string, active: boolean) {
  const [output, setOutput] = useState('')
  useEffect(() => {
    if (!active) { setOutput(''); return }
    let frame = 0
    let rafId: number
    const FRAMES = 4
    const tick = () => {
      const revealed = Math.min(text.length, Math.floor(frame / FRAMES))
      setOutput(
        text.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealed) return ch
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join('')
      )
      frame++
      if (revealed < text.length) { rafId = requestAnimationFrame(tick) }
      else setOutput(text)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, text])
  return output
}

// ── Ambient Orbs ────────────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: '-5%', top: '10%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,255,0.14) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute', right: '5%', top: '30%',
          width: '550px', height: '550px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.09) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        style={{
          position: 'absolute', left: '35%', bottom: '15%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  )
}

// ── Skills Ticker ───────────────────────────────────────────────────────────
function SkillsTicker() {
  const items = [...TICKER_SKILLS, ...TICKER_SKILLS, ...TICKER_SKILLS]
  return (
    <div style={{
      overflow: 'hidden',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '2.5rem', width: 'max-content' }}
      >
        {items.map((item, i) => (
          <span key={i} className="font-mono" style={{
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            color: 'var(--text-dim)',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}>
            ◆ {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Canvas Neural Network ───────────────────────────────────────────────────
interface NNode { x: number; y: number; vx: number; vy: number; size: number; glow: number }
interface Particle { from: number; to: number; t: number; speed: number }

function useNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const nodesRef = useRef<NNode[]>([])
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const MAX_DIST = 155, MAX_P = 28

    const init = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas
      canvas.width = w; canvas.height = h
      if (!nodesRef.current.length) {
        nodesRef.current = Array.from({ length: 90 }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 1.6 + 0.6,
          glow: Math.random() * 7 + 4,
        }))
      }
    }

    const spawnP = () => {
      if (particlesRef.current.length >= MAX_P) return
      const a = Math.floor(Math.random() * nodesRef.current.length)
      const b = Math.floor(Math.random() * nodesRef.current.length)
      if (a === b) return
      const na = nodesRef.current[a], nb = nodesRef.current[b]
      const dx = na.x - nb.x, dy = na.y - nb.y
      if (Math.sqrt(dx * dx + dy * dy) > MAX_DIST) return
      particlesRef.current.push({ from: a, to: b, t: 0, speed: 0.0028 + Math.random() * 0.003 })
    }

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      const nodes = nodesRef.current
      const { x: mx, y: my } = mouseRef.current

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dx = n.x - mx, dy = n.y - my, d = Math.sqrt(dx * dx + dy * dy)
        if (d < 120 && d > 0) {
          const f = (120 - d) / 120 * 0.45
          n.vx += dx / d * f; n.vy += dy / d * f
        }
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (spd > 1.2) { n.vx = n.vx / spd * 1.2; n.vy = n.vy / spd * 1.2 }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(123,47,255,${(1 - dist / MAX_DIST) * 0.26})`
            ctx.lineWidth = 0.65
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.save()
        ctx.shadowBlur = n.glow; ctx.shadowColor = '#7b2fff'
        ctx.fillStyle = '#a570ff'; ctx.globalAlpha = 0.88
        ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      if (Math.random() < 0.05) spawnP()
      particlesRef.current = particlesRef.current.filter(p => {
        p.t += p.speed
        if (p.t >= 1) return false
        const fa = nodes[p.from], ta = nodes[p.to]
        if (!fa || !ta) return false
        const dx = fa.x - ta.x, dy = fa.y - ta.y
        if (Math.sqrt(dx * dx + dy * dy) > MAX_DIST) return false
        const px = fa.x + (ta.x - fa.x) * p.t, py = fa.y + (ta.y - fa.y) * p.t
        ctx.save()
        ctx.shadowBlur = 14; ctx.shadowColor = '#00d4ff'
        ctx.fillStyle = '#00d4ff'; ctx.globalAlpha = Math.sin(p.t * Math.PI) * 0.95
        ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
        return true
      })

      animRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    init()
    window.addEventListener('resize', init)
    window.addEventListener('mousemove', onMove)
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return canvasRef
}

// ── Main HeroSection ────────────────────────────────────────────────────────
const ROLES = [
  'Edge AI Engineer',
  'AIoT Engineer',
  'Generative AI Builder',
  'Multi-Agent Architect',
  'Prompt Engineer',
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function HeroSection() {
  const canvasRef = useNeuralCanvas()
  const [scrambleActive, setScrambleActive] = useState(false)
  const [roleIdx, setRoleIdx] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)
  const [show, setShow] = useState(false)

  const nameDisplay = useTextScramble('NAKSHATRA KAUSHIK', scrambleActive)

  useEffect(() => {
    // Trigger reveal on client
    const t1 = setTimeout(() => setShow(true), 80)
    const t2 = setTimeout(() => setScrambleActive(true), 700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setRoleVisible(true) }, 380)
    }, 3600)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: 0.75, pointerEvents: 'none',
        }}
      />

      {/* Animated gradient orbs */}
      <AmbientOrbs />

      {/* Vignettes */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 90% at 25% 50%, transparent 0%, rgba(3,3,15,0.55) 60%, var(--bg-void) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', pointerEvents: 'none',
        background: 'linear-gradient(to top, var(--bg-void), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '15%', pointerEvents: 'none',
        background: 'linear-gradient(to bottom, var(--bg-void), transparent)',
      }} />

      {/* ── CONTENT ── */}
      <div
        className="section-inner"
        style={{
          position: 'relative', zIndex: 1,
          paddingTop: '5.5rem', paddingBottom: '3rem',
          maxWidth: '1300px',
        }}
      >
        {/* Status badge */}
        <motion.div
          custom={0.1} variants={fadeUp} initial="hidden" animate={show ? 'show' : 'hidden'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.3rem 0.9rem',
            background: 'rgba(57,255,20,0.07)',
            border: '1px solid rgba(57,255,20,0.2)',
            borderRadius: '100px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.62rem', letterSpacing: '0.16em',
            color: 'var(--neon-lime)', textTransform: 'uppercase',
          }}>
            <span style={{ animation: 'pulse-dot 1.6s ease infinite' }}>●</span>
            Open to Opportunities
          </span>
          <span className="section-label" style={{ margin: 0, fontSize: '0.65rem' }}>
            {PERSONAL.tagline}
          </span>
        </motion.div>

        {/* ── NAME (scramble) ── */}
        <motion.div
          custom={0.25} variants={fadeUp} initial="hidden" animate={show ? 'show' : 'hidden'}
          style={{ marginBottom: '0.6rem' }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(3.2rem, 7.8vw, 8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {/* First word: white */}
            <span>
              {(nameDisplay || 'NAKSHATRA KAUSHIK').split(' ').slice(0, 1).join(' ')}
            </span>
            {' '}
            {/* Second word: gradient */}
            <span style={{
              background: 'linear-gradient(135deg, #c084ff 0%, #7b2fff 40%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {(nameDisplay || 'NAKSHATRA KAUSHIK').split(' ').slice(1).join(' ')}
            </span>
          </h1>
        </motion.div>

        {/* ── Role (rotating) ── */}
        <motion.div
          custom={0.45} variants={fadeUp} initial="hidden" animate={show ? 'show' : 'hidden'}
          style={{ height: '2.2rem', marginBottom: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <span style={{
            width: '28px', height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--neon-violet))',
            flexShrink: 0,
          }} />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono"
              style={{
                fontSize: 'clamp(0.78rem, 1.8vw, 1rem)',
                color: 'var(--neon-cyan)',
                letterSpacing: '0.06em',
              }}
            >
              {ROLES[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* ── Bio ── */}
        <motion.p
          custom={0.55} variants={fadeUp} initial="hidden" animate={show ? 'show' : 'hidden'}
          style={{
            maxWidth: '520px',
            fontSize: '0.97rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.85,
            marginBottom: '2.5rem',
          }}
        >
          {PERSONAL.bio}
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          custom={0.65} variants={fadeUp} initial="hidden" animate={show ? 'show' : 'hidden'}
          style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-magnetic btn-primary-neon"
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-ghost-neon"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
            </svg>
            GitHub
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-magnetic btn-ghost-neon"
          >
            Contact
          </button>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          custom={0.75} variants={fadeUp} initial="hidden" animate={show ? 'show' : 'hidden'}
          style={{
            display: 'flex', gap: '0', flexWrap: 'wrap',
            paddingTop: '1.75rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {PERSONAL.stats.map((stat, i) => (
            <div key={stat.label} style={{
              padding: i === 0 ? '0 3rem 0 0' : '0 3rem',
              borderLeft: i === 0 ? 'none' : '1px solid var(--border-subtle)',
            }}>
              <div className="font-display" style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                color: 'var(--neon-violet)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '0.3rem',
              }}>
                {stat.value}
              </div>
              <div className="font-mono" style={{
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Skills Ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: 'relative', zIndex: 1,
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.85rem 0',
          background: 'rgba(6,6,26,0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <SkillsTicker />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: '5.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <span className="font-mono" style={{
          fontSize: '0.55rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'var(--text-dim)',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, var(--neon-violet), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
