import LenisProvider from '@/components/providers/LenisProvider'
import CustomCursor from '@/components/cursor/CustomCursor'
import Navigation from '@/components/nav/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import ScrollProgress from '@/components/ui/ScrollProgress'
import SectionDots from '@/components/ui/SectionDots'
import ResumeButton from '@/components/ui/ResumeButton'

export default function Home() {
  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      <SectionDots />
      <Navigation />

      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <ResumeButton />
    </LenisProvider>
  )
}
