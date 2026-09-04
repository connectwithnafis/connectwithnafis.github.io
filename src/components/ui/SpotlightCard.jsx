import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Card wrapper with a subtle mouse-following spotlight + gentle lift on hover.
 * Kept restrained on purpose — a soft accent, not a glow bomb.
 */
export default function SpotlightCard({
  children,
  className = '',
  lift = -4,
  glow = 'rgba(59,130,246,0.10)',
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
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      className={`group/spot relative overflow-hidden ${className}`}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
