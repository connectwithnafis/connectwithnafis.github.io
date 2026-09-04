import Reveal from './Reveal'

/**
 * Consistent section header: small mono eyebrow + large display title + optional lead.
 */
export default function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <span className="font-mono text-sm font-medium tracking-widest text-brand-600 uppercase dark:text-brand-400">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {lead}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.15}>
        <div
          className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-brand-500 to-accent2-500 ${
            centered ? 'mx-auto' : ''
          }`}
        />
      </Reveal>
    </div>
  )
}
