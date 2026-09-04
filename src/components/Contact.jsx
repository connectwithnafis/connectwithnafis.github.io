import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/content'
import Reveal from './ui/Reveal'

export default function Contact() {
  const channels = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
  ]

  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-14 text-center backdrop-blur-md sm:px-14 dark:border-white/10 dark:bg-white/[0.04]">
          {/* decorative glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-accent2-500/15 blur-3xl" />

          <div className="relative">
            <span className="font-mono text-sm font-medium tracking-widest text-brand-600 uppercase dark:text-brand-400">
              06 — Contact
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Let's build something{' '}
              <span className="text-gradient">reliable</span> together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Have a project, a role, or an idea worth discussing? My inbox is always open —
              I'll get back to you as soon as I can.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent2-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:-translate-y-0.5"
              >
                <Mail size={18} />
                Say hello
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: profile.socials.github, label: 'GitHub' },
                  { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-brand-400"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* contact cards */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {channels.map((c, i) => {
                const inner = (
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="flex h-full items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/50 p-4 text-left dark:border-white/10 dark:bg-white/[0.02]"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      <c.icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                        {c.label}
                      </p>
                      <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {c.value}
                      </p>
                    </div>
                  </motion.div>
                )
                return c.href ? (
                  <a key={c.label} href={c.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                )
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
