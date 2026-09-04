import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Card wrapper with a smooth mouse-following spotlight glow + springy lift on hover.
 * Tracks the cursor via CSS custom properties (--mx / --my) so the glow follows it.
 */
export default function SpotlightCard({
  children,
  className = '',
  lift = -6,
  glow = 'rgba(16,185,129,0.16)',
  ...props
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: lift }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`group/spot relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Spotlight layer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)`,
        }}
      />
      {/* Content sits above the glow */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
