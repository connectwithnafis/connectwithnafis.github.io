import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, MapPin } from 'lucide-react'
import { profile, navLinks } from '../data/content'
import ThemeToggle from './ThemeToggle'

/* Typewriter over the rotating roles */
function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let t
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      t = setTimeout(
        () =>
          setText((p) =>
            deleting ? current.slice(0, p.length - 1) : current.slice(0, p.length + 1),
          ),
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

export default function Sidebar({ theme, toggleTheme }) {
  const typed = useTypewriter(profile.roles)
  const [active, setActive] = useState('about')

  // Scroll-spy: highlight the nav item for the section in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const socials = [
    { icon: Github, href: profile.socials.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ]

  return (
    <header className="pt-16 pb-8 sm:pt-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-14 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Availability */}
        <span className="chip mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          Open to opportunities
        </span>

        {/* Name */}
        <h1 className="font-display text-[2.75rem] leading-[1.05] font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          MD Nahid <span className="text-gradient">Uddin</span>
        </h1>

        {/* Rotating role */}
        <h2 className="mt-3 flex min-h-[2rem] items-center font-display text-xl font-semibold text-slate-600 sm:text-2xl dark:text-slate-300">
          <span>{typed}</span>
          <span className="ml-1 inline-block h-6 w-[3px] animate-pulse bg-brand-500" />
        </h2>

        {/* Tagline */}
        <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {profile.tagline}
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={16} className="text-brand-500" />
          {profile.location}
        </p>

        {profile.now && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white/50 px-3.5 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
            <span className="mt-px font-mono text-[10px] font-bold tracking-[0.15em] text-brand-600 uppercase dark:text-brand-400">
              Now
            </span>
            <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {profile.now}
            </span>
          </div>
        )}

        {/* Desktop vertical nav */}
        <nav className="mt-14 hidden lg:block" aria-label="Section navigation">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="group flex items-center py-2"
                  >
                    <span
                      className={`mr-4 h-px transition-all duration-300 ${
                        isActive
                          ? 'w-16 bg-brand-500 dark:bg-brand-400'
                          : 'w-8 bg-slate-300 group-hover:w-12 group-hover:bg-slate-500 dark:bg-slate-700 dark:group-hover:bg-slate-400'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold tracking-[0.18em] uppercase transition-colors ${
                        isActive
                          ? 'text-brand-600 dark:text-brand-300'
                          : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200'
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile horizontal nav */}
        <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 lg:hidden" aria-label="Section navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Bottom: socials + resume + theme */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={label}
            className="text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            <Icon size={22} />
          </a>
        ))}

        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            download="MD_Nahid_Uddin_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:text-brand-400"
          >
            <Download size={16} />
            Résumé
          </a>
        )}

        <div className="ml-auto">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </motion.div>
    </header>
  )
}
