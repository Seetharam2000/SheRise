import { motion } from 'framer-motion'

export function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      className={`
        rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl
        dark:bg-black/20 dark:border-white/10
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, borderColor: 'rgba(201, 168, 76, 0.4)' } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
