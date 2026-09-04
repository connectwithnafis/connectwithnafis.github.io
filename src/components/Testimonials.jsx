import { Quote } from 'lucide-react'
import { testimonials } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Marquee from './ui/Marquee'

export default function Testimonials() {
  if (!testimonials?.length) return null

  return (
    <section id="recommendations" className="section">
      <SectionHeading
        eyebrow="06 — Recommendations"
        title="What people I've worked with say"
      />

      <Reveal>
        <div className="mt-10">
          <Marquee
            items={testimonials}
            speed={60}
            renderItem={(t) => (
              <figure className="flex h-full w-[19rem] flex-col rounded-2xl glass p-6 sm:w-[22rem]">
                <Quote size={22} className="text-brand-500/60" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 border-t border-slate-200/70 pt-3 dark:border-white/10">
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {t.role} · {t.company}
                  </span>
                </figcaption>
              </figure>
            )}
          />
        </div>
      </Reveal>
    </section>
  )
}
