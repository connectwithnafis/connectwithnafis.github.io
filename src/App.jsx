import { lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Deferred: the chat/WhatsApp dock isn't needed for first paint.
const FloatingDock = lazy(() => import('./components/FloatingDock'))

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <div className="relative min-h-screen">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-500 to-accent2-500"
      />

      <Background />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Floating AI assistant + WhatsApp widgets (lazy-loaded) */}
      <Suspense fallback={null}>
        <FloatingDock />
      </Suspense>
    </div>
  )
}
