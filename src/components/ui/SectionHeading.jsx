import Reveal from './Reveal'

/**
 * Refined section header: a small mono eyebrow with a hairline rule, a tight
 * display title, and an optional lead. Editorial and understated.
 */
export default function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : ''}>
      {eyebrow && (
        <Reveal>
          <div className={`mb-4 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
              {eyebrow}
            </span>
            {!centered && <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem] dark:text-white">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}
