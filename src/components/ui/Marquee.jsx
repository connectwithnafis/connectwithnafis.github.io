/**
 * Continuous, slow, seamless marquee. Duplicates the items and translates
 * the track -50%, so it loops forever with no jump. Pauses on hover and
 * respects reduced-motion (the global CSS neutralizes the animation).
 *
 * props:
 *   items       — array of data
 *   renderItem  — (item, index) => node
 *   speed       — seconds for one full loop (higher = slower)
 */
export default function Marquee({ items, renderItem, speed = 45, className = '' }) {
  const loop = [...items, ...items]
  return (
    <div
      className={`group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] ${className}`}
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animationName: 'marquee',
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {loop.map((item, i) => (
          <div key={i} className="shrink-0 pr-4" aria-hidden={i >= items.length}>
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  )
}
