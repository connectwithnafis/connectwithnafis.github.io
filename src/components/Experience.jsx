import { Briefcase, MapPin, Clock } from 'lucide-react'
import { experience } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import SpotlightCard from './ui/SpotlightCard'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="03 — Experience"
        title="Where I've been building"
        lead="Nearly four years shipping ERP platforms, reporting engines and cloud migrations — including a Junior → SE → SE II progression at Innospace."
      />

      <div className="relative mt-14">
        {/* main vertical line */}
        <div className="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-brand-500/60 via-slate-200 to-transparent sm:left-5 dark:via-white/10" />

        <div className="space-y-10">
          {experience.map((company, i) => (
            <Reveal key={company.company} delay={i * 0.05}>
              <div className="relative pl-11 sm:pl-16">
                {/* company node */}
                <span className="absolute top-1 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-500 bg-white sm:h-10 sm:w-10 dark:bg-slate-950">
                  <Briefcase size={16} className="text-brand-500" />
                  {company.current && (
                    <span className="absolute -inset-1 animate-ping rounded-full border border-brand-400/60" />
                  )}
                </span>

                <SpotlightCard className="rounded-2xl glass p-5 transition-shadow hover:shadow-xl hover:shadow-brand-500/10 sm:p-6">
                  {/* company header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200/70 pb-4 dark:border-white/10">
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                        {company.company}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin size={12} />
                        {company.location}
                        {company.roles.length > 1 && (
                          <span className="ml-1 rounded-full bg-brand-500/10 px-2 py-0.5 font-medium text-brand-600 dark:text-brand-400">
                            {company.roles.length} roles
                          </span>
                        )}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium ${
                        company.current
                          ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400'
                          : 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'
                      }`}
                    >
                      <Clock size={12} />
                      {company.duration}
                    </span>
                  </div>

                  {/* nested role progression */}
                  <ol className="relative mt-5 space-y-6 pl-6">
                    {/* sub-line connecting roles */}
                    {company.roles.length > 1 && (
                      <span className="absolute top-2 bottom-2 left-[3px] w-px bg-slate-200 dark:bg-white/10" />
                    )}
                    {company.roles.map((role, j) => (
                      <li key={role.role} className="relative">
                        {/* role dot */}
                        <span
                          className={`absolute top-1.5 -left-6 h-[9px] w-[9px] rounded-full ring-4 ring-white dark:ring-slate-950 ${
                            role.current
                              ? 'bg-gradient-to-r from-brand-500 to-accent2-500'
                              : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                            {role.role}
                            {role.current && (
                              <span className="ml-2 align-middle text-[11px] font-medium text-brand-600 dark:text-brand-400">
                                • Current
                              </span>
                            )}
                          </h4>
                          <span className="font-mono text-xs text-slate-400">{role.period}</span>
                        </div>

                        <ul className="mt-3 space-y-2">
                          {role.points.map((point, k) => (
                            <li
                              key={k}
                              className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500/70" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </SpotlightCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
