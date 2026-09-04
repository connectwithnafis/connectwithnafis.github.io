import { Folder, Star } from 'lucide-react'
import { projects } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="04 — Projects"
        title="Selected work"
        lead="A few systems I've architected and shipped — from BI reporting engines to cloud ETL pipelines and cross-platform ERP apps."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={(i % 3) * 0.08}>
            <SpotlightCard
              className={`group flex h-full flex-col rounded-2xl glass p-6 transition-shadow hover:shadow-xl hover:shadow-brand-500/10 ${
                project.featured ? 'ring-1 ring-brand-500/20' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent2-500/15 text-brand-600 transition-transform duration-300 group-hover:scale-105 dark:text-brand-400">
                  <Folder size={20} />
                </span>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                      <Star size={11} className="fill-current" />
                      Featured
                    </span>
                  )}
                  <span className="font-mono text-xs text-slate-400">{project.year}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent2-600 dark:text-accent2-400">
                  {project.tag}
                </span>
              </div>

              <h3 className="mt-1 font-display text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                {project.name}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-400"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
