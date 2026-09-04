import { Database, Cloud, ShieldCheck, TrendingUp, Rocket, Layers } from 'lucide-react'
import { profile, stats, techStack, systemDesign } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Marquee from './ui/Marquee'

// Impact-focused highlights for the top marquee
const highlights = [
  {
    icon: Database,
    title: 'BI Reporting Engine',
    text: 'Architected a NestJS + Clean Architecture reporting engine from the ground up.',
  },
  {
    icon: Cloud,
    title: 'Cloud ETL Migration',
    text: 'Led an Oracle → PostgreSQL AWS pipeline with zero data loss.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platforms',
    text: 'CQRS modular monolith with JWT rotation & role-based access control.',
  },
  {
    icon: TrendingUp,
    title: 'Fast Growth',
    text: 'Grew from Junior to Software Engineer II in under three years.',
  },
  {
    icon: Rocket,
    title: 'Cloud-Native Delivery',
    text: 'Dockerized services shipped on AWS with automated CI/CD.',
  },
  {
    icon: Layers,
    title: 'Architecture-First',
    text: 'Clean Architecture, DDD and CQRS at the core of everything I build.',
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      {/* Highlights — continuous marquee above the section title */}
      <Reveal>
        <div className="mb-14">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-400">
            Highlights
          </p>
          <Marquee
            items={highlights}
            speed={42}
            renderItem={(h) => (
              <article className="flex h-full w-[16.5rem] flex-col rounded-2xl glass p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <h.icon size={18} />
                </span>
                <h3 className="mt-3.5 font-display text-[15px] font-semibold text-slate-900 dark:text-white">
                  {h.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {h.text}
                </p>
              </article>
            )}
          />
        </div>
      </Reveal>

      <SectionHeading eyebrow="01 — About" title="The engineering behind systems that scale" />

      {/* Condensed bio */}
      <Reveal>
        <p className="mt-8 text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          {profile.summary}
        </p>
      </Reveal>

      {/* System-design chips — hidden for now (uncomment to re-enable)
      <Reveal delay={0.05}>
        <div className="mt-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-400">
            System design
          </p>
          <div className="flex flex-wrap gap-2">
            {systemDesign.map((k) => (
              <span
                key={k}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-accent2-500" />
                {k}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      */}

      {/* Tech marquee */}
      <Reveal delay={0.1}>
        <div className="mt-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-400">
            Tech I work with
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
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

      {/* Stats */}
      <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="rounded-2xl glass px-3 py-5 text-center sm:px-5 sm:py-6">
              <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] font-medium tracking-wide text-slate-500 uppercase sm:text-xs dark:text-slate-400">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
