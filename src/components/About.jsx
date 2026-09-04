import { motion } from 'framer-motion'
import { Server, ShieldCheck, Workflow, Rocket } from 'lucide-react'
import { profile, stats, techStack } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const highlights = [
  {
    icon: Server,
    title: 'Backend at the core',
    text: 'Reporting engines, modular monoliths and RESTful APIs built to scale with NestJS & .NET.',
  },
  {
    icon: Workflow,
    title: 'Architecture-first',
    text: 'Clean Architecture, DDD and CQRS to keep systems decoupled and maintainable.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & reliable',
    text: 'JWT rotation, RBAC and ACID-compliant transactions baked into the design.',
  },
  {
    icon: Rocket,
    title: 'Cloud-native delivery',
    text: 'Dockerized services, AWS pipelines and CI/CD from commit to production.',
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="01 — About"
        title="Turning complex requirements into clean, scalable systems"
      />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Bio */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {profile.summary}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">
              Based in {profile.location}, I currently work as a {profile.role} focused on
              backend architecture — from enterprise reporting engines to ETL migrations that
              move millions of rows reliably. I care about code that is easy to reason about,
              tests that give confidence, and systems that are a pleasure to operate.
            </p>
          </Reveal>

          {/* Tech marquee */}
          <Reveal delay={0.15}>
            <div className="mt-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-400">
                Tech I work with
              </p>
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
                <div className="flex w-max animate-marquee gap-2.5">
                  {[...techStack, ...techStack].map((t, i) => (
                    <span key={i} className="chip whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-2xl glass p-5 transition-shadow hover:shadow-lg hover:shadow-brand-500/10"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <h.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-slate-900 dark:text-white">
                  {h.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {h.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="rounded-2xl glass px-5 py-6 text-center">
              <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
