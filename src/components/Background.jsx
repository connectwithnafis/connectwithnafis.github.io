/**
 * Fixed decorative background: soft aurora blobs + a subtle grid.
 * Purely presentational, sits behind all content (-z-10) and adapts to theme.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)',
        }}
      />

      {/* Aurora blobs */}
      <div className="absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/15" />
      <div className="absolute top-1/3 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent2-400/15 blur-3xl dark:bg-accent2-500/10" />
      <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-brand-300/15 blur-3xl dark:bg-brand-600/10" />
    </div>
  )
}
