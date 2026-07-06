'use client'

export default function ScrollProgress() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 1000,
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <div className="scroll-progress" />
    </div>
  )
}
