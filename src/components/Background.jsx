/**
 * Fixed decorative background: a faint grid + very subtle aurora.
 * Deliberately understated — professional restraint over flashiness.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 25%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 55% at 50% 0%, #000 25%, transparent 78%)',
        }}
      />

      {/* Faint aurora */}
      <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-brand-400/[0.07] blur-3xl dark:bg-brand-500/[0.08]" />
      <div className="absolute top-1/2 -right-40 h-[32rem] w-[32rem] rounded-full bg-accent2-400/[0.05] blur-3xl dark:bg-accent2-500/[0.06]" />
    </div>
  )
}
