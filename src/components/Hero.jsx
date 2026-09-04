import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight, Github, Linkedin, Mail, MapPin, Download } from 'lucide-react'
import { profile } from '../data/content'

/* Typewriter effect over the rotating roles */
function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          )
        },
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* Left: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:col-span-7 lg:text-left"
        >
          <motion.div variants={item}>
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Available for new opportunities
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 font-mono text-sm text-brand-600 dark:text-brand-400"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-2 font-display text-[2.75rem] leading-[1.05] font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
          >
            MD Nahid <span className="text-gradient">Uddin</span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-4 flex min-h-[2.5rem] items-center justify-center font-display text-2xl font-semibold text-slate-600 sm:text-3xl lg:justify-start dark:text-slate-300"
          >
            <span>{typed}</span>
            <span className="ml-1 inline-block h-7 w-[3px] animate-pulse bg-brand-500 sm:h-8" />
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start dark:text-slate-400">
            <MapPin size={16} className="text-brand-500" />
            {profile.location}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent2-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowDownRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:text-brand-400"
            >
              <Mail size={18} />
              Get in touch
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download="MD_Nahid_Uddin_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:text-brand-400"
              >
                <Download size={18} />
                Résumé
              </a>
            )}
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            {[
              { icon: Github, href: profile.socials.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
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
          </motion.div>
        </motion.div>

        {/* Right: terminal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <TerminalCard />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-slate-400 sm:flex"
      >
        Scroll
        <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-slate-300 p-1 dark:border-slate-600">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-brand-500"
          />
        </span>
      </motion.a>
    </section>
  )
}

function TerminalCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="overflow-hidden rounded-2xl glass shadow-2xl shadow-slate-900/10 dark:shadow-black/40"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-slate-200/70 px-4 py-3 dark:border-white/10">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-2 font-mono text-xs text-slate-400">engineer.ts</span>
      </div>
      {/* code */}
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>
          <span className="text-purple-500 dark:text-purple-400">const</span>{' '}
          <span className="text-brand-600 dark:text-brand-400">engineer</span>{' '}
          <span className="text-slate-400">=</span>{' '}
          <span className="text-slate-400">{'{'}</span>
          {'\n'}
          {'  '}
          <span className="text-accent2-600 dark:text-accent2-400">name</span>
          <span className="text-slate-400">:</span>{' '}
          <span className="text-amber-600 dark:text-amber-300">'Nahid Uddin'</span>
          <span className="text-slate-400">,</span>
          {'\n'}
          {'  '}
          <span className="text-accent2-600 dark:text-accent2-400">role</span>
          <span className="text-slate-400">:</span>{' '}
          <span className="text-amber-600 dark:text-amber-300">'Software Engineer'</span>
          <span className="text-slate-400">,</span>
          {'\n'}
          {'  '}
          <span className="text-accent2-600 dark:text-accent2-400">stack</span>
          <span className="text-slate-400">:</span>{' '}
          <span className="text-slate-400">[</span>
          <span className="text-amber-600 dark:text-amber-300">'NestJS'</span>
          <span className="text-slate-400">,</span>{' '}
          <span className="text-amber-600 dark:text-amber-300">'.NET'</span>
          <span className="text-slate-400">,</span>{' '}
          <span className="text-amber-600 dark:text-amber-300">'Postgres'</span>
          <span className="text-slate-400">],</span>
          {'\n'}
          {'  '}
          <span className="text-accent2-600 dark:text-accent2-400">focus</span>
          <span className="text-slate-400">:</span>{' '}
          <span className="text-amber-600 dark:text-amber-300">'Clean Architecture'</span>
          <span className="text-slate-400">,</span>
          {'\n'}
          {'  '}
          <span className="text-accent2-600 dark:text-accent2-400">shipping</span>
          <span className="text-slate-400">:</span>{' '}
          <span className="text-brand-600 dark:text-brand-400">true</span>
          <span className="text-slate-400">,</span>
          {'\n'}
          <span className="text-slate-400">{'}'}</span>
        </code>
      </pre>
    </motion.div>
  )
}
