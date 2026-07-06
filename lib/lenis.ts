import type Lenis from 'lenis'

let _lenis: InstanceType<typeof Lenis> | null = null

export const getLenis = (): InstanceType<typeof Lenis> | null => _lenis

export const setLenis = (l: InstanceType<typeof Lenis> | null): void => {
  _lenis = l
}

export const scrollToSection = (id: string, offset = -80) => {
  const target = `#${id}`
  if (_lenis) {
    _lenis.scrollTo(target, { offset, duration: 1.4 })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}
