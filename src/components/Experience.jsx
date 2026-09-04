import { experience } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="03 — Experience"
        title="Where I've been building"
        lead="Nearly four years shipping ERP platforms, reporting engines and cloud migrations — including a Junior → SE → SE II progression."
      />

      <div className="mt-8 divide-y divide-slate-200 dark:divide-white/10">
        {experience.map((company, i) => (
          <Reveal key={company.company} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 py-7 sm:grid-cols-[7rem_1fr]">
              {/* Period column */}
              <div className="pt-1 font-mono text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {company.duration}
              </div>

              {/* Content column */}
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {company.company}
                  {company.current && (
                    <span className="ml-2 align-middle font-sans text-xs font-medium text-brand-600 dark:text-brand-400">
                      • Present
                    </span>
                  )}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {company.location}
                </p>

                <div className="mt-5 space-y-6">
                  {company.roles.map((role) => (
                    <div
                      key={role.role}
                      className="border-l border-slate-200 pl-5 dark:border-white/10"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                          {role.role}
                        </h4>
                        <span className="font-mono text-xs text-slate-400">{role.period}</span>
                      </div>
                      <ul className="mt-2.5 space-y-2">
                        {role.points.map((point, k) => (
                          <li
                            key={k}
                            className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                          >
                            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brand-500/70" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
