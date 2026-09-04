import { motion } from 'framer-motion'
import { GraduationCap, Award, ExternalLink } from 'lucide-react'
import { education, certifications } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeading
        eyebrow="05 — Education & Certifications"
        title="Foundations & continuous learning"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
            <GraduationCap size={20} className="text-brand-500" />
            Education
          </h3>
          <div className="space-y-5">
            {education.map((ed, i) => (
              <Reveal key={ed.school} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="rounded-2xl glass p-6 transition-shadow hover:shadow-lg hover:shadow-brand-500/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                      {ed.school}
                    </h4>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      {ed.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                    {ed.degree}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {ed.location} · {ed.detail}
                  </p>
                  {ed.extra && (
                    <p className="mt-3 border-t border-slate-200/70 pt-3 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:text-slate-400">
                      {ed.extra}
                    </p>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
            <Award size={20} className="text-brand-500" />
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 rounded-2xl glass p-5 transition-shadow hover:shadow-lg hover:shadow-brand-500/10"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent2-500/15 text-brand-600 dark:text-brand-400">
                    <Award size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-white">{cert.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {cert.issuer} · {cert.period}
                    </p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="shrink-0 text-slate-300 transition-colors group-hover:text-brand-500 dark:text-slate-600"
                  />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
