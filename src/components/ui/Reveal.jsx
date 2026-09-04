import { motion } from 'framer-motion'

/**
 * Scroll-triggered reveal wrapper. Fades + slides content in once it enters view.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className = '',
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </MotionTag>
  )
}
