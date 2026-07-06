'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS, type Project } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = (e.clientY - cy) / (rect.height / 2) * 5
    const ry = (e.clientX - cx) / (rect.width / 2) * -5
    setTilt({ x: rx, y: ry })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          background: 'var(--glass-bg)',
          border: `1px solid ${hovered ? `${project.color}40` : 'var(--glass-border)'}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          transition: 'border-color 0.4s, box-shadow 0.4s',
          boxShadow: hovered
            ? `0 0 50px ${project.color}18, 0 12px 50px rgba(0,0,0,0.5)`
            : '0 4px 20px rgba(0,0,0,0.25)',
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transitionProperty: 'border-color, box-shadow',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, ${project.color}, ${project.color}40)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s',
        }} />

        {/* Header */}
        <div style={{ padding: '1.5rem 1.5rem 0' }}>
          {/* Category + status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="font-mono" style={{
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.22rem 0.65rem',
              borderRadius: '100px',
              background: `${project.color}14`,
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}>
              {project.category}
            </span>
            {project.status === 'active' && (
              <span className="tag-live" style={{ fontSize: '0.58rem' }}>Active</span>
            )}
            {project.award && (
              <span className="tag-award" style={{ fontSize: '0.58rem' }}>🏆 {project.award}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display" style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: hovered ? project.color : 'var(--text-primary)',
            transition: 'color 0.35s',
            lineHeight: 1.2,
            marginBottom: '0.85rem',
          }}>
            {project.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '1.25rem',
          }}>
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div style={{ padding: '0 1.5rem', flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tech.map(t => (
              <span key={t} className="font-mono" style={{
                fontSize: '0.6rem',
                letterSpacing: '0.04em',
                padding: '0.22rem 0.55rem',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'var(--text-muted)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.25rem',
        }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
              transition: 'color 0.3s',
              fontSize: '0.78rem',
            }}
            className="project-github-link"
          >
            <GitHubIcon />
            <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>View Code</span>
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: project.color,
                fontSize: '0.78rem',
              }}
            >
              <ExternalIcon />
              <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>Live</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header-el', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-header',
          start: 'top 78%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 90% 60% at 80% 30%, rgba(0,212,255,0.03) 0%, transparent 55%),
          radial-gradient(ellipse 70% 50% at 20% 70%, rgba(123,47,255,0.04) 0%, transparent 55%),
          var(--bg-void)
        `,
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div className="grid-overlay" style={{ opacity: 0.4 }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="projects-header" style={{ marginBottom: '4rem' }}>
          <div className="section-label projects-header-el">Selected Work</div>
          <h2 className="section-title projects-header-el" style={{ marginTop: '0.5rem' }}>
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle projects-header-el">
            Building intelligent systems at the intersection of AI research and production engineering —
            from agentic pipelines to edge-deployed models.
          </p>

          {/* GitHub CTA */}
          <a
            href="https://github.com/NakshatraK19"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-header-el github-all-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginTop: '1.5rem',
              padding: '0.6rem 1.4rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: '0.82rem',
              transition: 'all 0.3s',
              textDecoration: 'none',
            }}
          >
            <GitHubIcon />
            <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              github.com/NakshatraK19
            </span>
            <ExternalIcon />
          </a>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          alignItems: 'start',
        }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .project-github-link:hover { color: var(--neon-violet) !important; }
        .github-all-link:hover {
          border-color: rgba(123,47,255,0.3) !important;
          color: var(--text-primary) !important;
          background: rgba(123,47,255,0.06) !important;
        }
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
