import { Layers, Code2, Database, Cloud, GitBranch } from 'lucide-react'
import { skills } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

const iconMap = { Layers, Code2, Database, Cloud, GitBranch }

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="02 — Skills"
        title="A toolkit built for the backend"
        lead="From architecture patterns to cloud infrastructure — the technologies I reach for to design, build and ship dependable systems."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = iconMap[group.icon] || Code2
          return (
            <Reveal key={group.title} delay={i * 0.07}>
              <SpotlightCard className="group h-full rounded-2xl glass p-6 transition-shadow hover:shadow-xl hover:shadow-brand-500/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent2-500/15 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:text-brand-400">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-600 transition-colors group-hover:border-brand-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:group-hover:border-brand-500/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
