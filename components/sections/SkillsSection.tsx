'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILL_GROUPS } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function CircuitBackground() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="circuit-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(123,47,255,0.04)" strokeWidth="0.6" />
        </pattern>
        <pattern id="circuit-dots" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1.2" fill="rgba(123,47,255,0.07)" />
          <circle cx="60" cy="0" r="1.2" fill="rgba(123,47,255,0.07)" />
          <circle cx="0" cy="60" r="1.2" fill="rgba(123,47,255,0.07)" />
          <circle cx="60" cy="60" r="1.2" fill="rgba(123,47,255,0.07)" />
          <circle cx="30" cy="30" r="0.8" fill="rgba(0,212,255,0.04)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-grid)" />
      <rect width="100%" height="100%" fill="url(#circuit-dots)" />
      {/* Decorative circuit traces */}
      <g opacity="0.06">
        <polyline points="0,120 80,120 80,200 200,200" fill="none" stroke="#7b2fff" strokeWidth="1.5" />
        <circle cx="80" cy="120" r="4" fill="none" stroke="#7b2fff" strokeWidth="1.2" />
        <circle cx="80" cy="200" r="4" fill="none" stroke="#7b2fff" strokeWidth="1.2" />
        <polyline points="100%,180 calc(100% - 120),180 calc(100% - 120),280" fill="none" stroke="#00d4ff" strokeWidth="1.5" />
        <polyline points="0,400 160,400 160,320 320,320" fill="none" stroke="#7b2fff" strokeWidth="1.2" />
        <circle cx="160" cy="400" r="3" fill="none" stroke="#7b2fff" strokeWidth="1" />
        <circle cx="160" cy="320" r="3" fill="none" stroke="#7b2fff" strokeWidth="1" />
        <polyline points="calc(100% - 60),0 calc(100% - 60),100 calc(100% - 180),100 calc(100% - 180),200" fill="none" stroke="#00d4ff" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

function SkillCard({ group, index }: { group: typeof SKILL_GROUPS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      className="skill-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--glass-bg)',
        border: `1px solid ${hovered ? group.borderColor : 'var(--glass-border)'}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s var(--ease-spring)',
        boxShadow: hovered ? `0 0 40px ${group.glowColor}, 0 8px 40px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        cursor: 'default',
      }}
    >
      {/* Accent corner */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '60px', height: '60px',
        borderTopRightRadius: 'var(--radius-lg)',
        background: `linear-gradient(225deg, ${group.accentColor}18 0%, transparent 60%)`,
        transition: 'opacity 0.4s',
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Icon + category */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '38px', height: '38px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '10px',
          background: `${group.accentColor}18`,
          border: `1px solid ${group.borderColor}`,
          fontSize: '1.1rem',
          transition: 'box-shadow 0.4s',
          boxShadow: hovered ? `0 0 16px ${group.glowColor}` : 'none',
        }}>
          {group.icon}
        </div>
        <div>
          <h3 className="font-display" style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: hovered ? group.accentColor : 'var(--text-primary)',
            transition: 'color 0.3s',
            letterSpacing: '-0.01em',
          }}>
            {group.category}
          </h3>
          <p className="font-mono" style={{
            fontSize: '0.58rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: '0.15rem',
          }}>
            {group.skills.length} skills
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, ${group.accentColor}40, transparent)`,
        marginBottom: '1.25rem',
        transition: 'opacity 0.4s',
        opacity: hovered ? 1 : 0.4,
      }} />

      {/* Skills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {group.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={false}
            animate={{ scale: hovered ? 1 : 0.98 }}
            transition={{ duration: 0.2, delay: si * 0.02 }}
            className="font-mono"
            style={{
              fontSize: '0.64rem',
              letterSpacing: '0.04em',
              padding: '0.28rem 0.65rem',
              borderRadius: '100px',
              background: hovered ? `${group.accentColor}14` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hovered ? group.borderColor : 'rgba(255,255,255,0.06)'}`,
              color: hovered ? group.accentColor : 'var(--text-muted)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header-el', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-header',
          start: 'top 78%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 80% 60% at 10% 40%, rgba(123,47,255,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 90% 60%, rgba(0,212,255,0.03) 0%, transparent 60%),
          var(--bg-deep)
        `,
        overflow: 'hidden',
      }}
    >
      <CircuitBackground />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="skills-header" style={{ marginBottom: '4rem' }}>
          <div className="section-label skills-header-el">Capabilities</div>
          <h2 className="section-title skills-header-el" style={{ marginTop: '0.5rem' }}>
            Skills &{' '}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle skills-header-el">
            A fusion of ECE fundamentals and cutting-edge AI — built through hands-on
            work with leading industry platforms and research institutions.
          </p>
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}
          className="skills-grid"
        >
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div style={{
          marginTop: '4rem',
          padding: '1.5rem 2rem',
          background: 'rgba(123,47,255,0.04)',
          border: '1px solid rgba(123,47,255,0.1)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <div className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Certified by
          </div>
          {['DeepLearning.AI', 'Anthropic', 'AWS', 'NVIDIA', 'Qualcomm', 'Microsoft', 'MIT', 'IIT Roorkee'].map(org => (
            <span key={org} className="font-mono" style={{
              fontSize: '0.68rem',
              letterSpacing: '0.06em',
              color: 'var(--text-secondary)',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>{org}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
