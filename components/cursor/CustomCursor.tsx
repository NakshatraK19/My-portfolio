'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringRef2 = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const isMounted = useRef(false)
  const TRAIL_COUNT = 8

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return
    isMounted.current = true

    const dot = dotRef.current!
    const ring = ringRef.current!

    // ── Mouse move (dot snaps instantly) ──
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

      // Spawn trail particle
      spawnTrail(e.clientX, e.clientY)
    }

    // ── Trail particles ──
    let trailPool: { el: HTMLDivElement; life: number; x: number; y: number }[] = []

    const spawnTrail = (x: number, y: number) => {
      const el = document.createElement('div')
      el.className = 'cursor-trail-particle'
      el.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--neon-violet);
        pointer-events: none;
        z-index: 9990;
        transform: translate(${x}px, ${y}px) translate(-50%, -50%);
        opacity: 0.6;
        will-change: transform, opacity;
        transition: opacity 0.4s ease;
      `
      document.body.appendChild(el)
      trailPool.push({ el, life: 1, x, y })

      // auto-fade
      requestAnimationFrame(() => {
        el.style.opacity = '0'
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(0.2)`
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
      })

      setTimeout(() => {
        el.remove()
        trailPool = trailPool.filter(p => p.el !== el)
      }, 450)
    }

    // ── Ring trails with lerp ──
    const animate = () => {
      if (!isMounted.current) return
      const { x: mx, y: my } = mouseRef.current
      const { x: rx, y: ry } = ringRef2.current

      ringRef2.current.x = rx + (mx - rx) * 0.12
      ringRef2.current.y = ry + (my - ry) * 0.12

      ring.style.transform = `translate(${ringRef2.current.x}px, ${ringRef2.current.y}px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    // ── Context-aware states ──
    const onEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      dot.classList.add('cursor-hover')
      ring.classList.add('cursor-hover')

      // Magnetic effect
      if (target.classList.contains('btn-magnetic') || target.closest('.btn-magnetic')) {
        ring.classList.add('cursor-magnetic')
      }
    }

    const onLeaveInteractive = () => {
      dot.classList.remove('cursor-hover', 'cursor-magnetic')
      ring.classList.remove('cursor-hover', 'cursor-magnetic')
    }

    const bindInteractive = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    // Re-bind after any DOM mutations
    const mutationObs = new MutationObserver(() => bindInteractive())
    mutationObs.observe(document.body, { childList: true, subtree: true })
    bindInteractive()

    // ── Visibility ──
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousemove', onMove)

    return () => {
      isMounted.current = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      mutationObs.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: 'var(--neon-violet)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-100px, -100px) translate(-50%, -50%)',
          boxShadow: '0 0 6px var(--neon-violet)',
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.05s',
          willChange: 'transform',
        }}
        className="cursor-dot"
      />

      {/* Ring — trailing */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '36px', height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(123, 47, 255, 0.7)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-100px, -100px) translate(-50%, -50%)',
          willChange: 'transform',
          mixBlendMode: 'difference',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
        }}
        className="cursor-ring"
      />

      <style>{`
        .cursor-dot.cursor-hover {
          background: var(--neon-cyan) !important;
          box-shadow: 0 0 10px var(--neon-cyan) !important;
          transform: translate(var(--cx, -100px), var(--cy, -100px)) translate(-50%, -50%) scale(1.5) !important;
        }
        .cursor-ring.cursor-hover {
          width: 52px !important;
          height: 52px !important;
          border-color: rgba(0, 212, 255, 0.8) !important;
          background: rgba(0, 212, 255, 0.04) !important;
        }
        .cursor-ring.cursor-magnetic {
          width: 60px !important;
          height: 60px !important;
          border-color: var(--neon-violet) !important;
          background: rgba(123, 47, 255, 0.05) !important;
          border-width: 2px !important;
        }
      `}</style>
    </>
  )
}
