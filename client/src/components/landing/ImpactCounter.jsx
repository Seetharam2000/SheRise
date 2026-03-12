import { motion } from 'framer-motion'

const impacts = [
  { value: '50K+', label: 'Schemes navigated' },
  { value: '₹2Cr+', label: 'Loans unlocked' },
  { value: '12K+', label: 'Jobs placed' },
]

export function ImpactCounter() {
  return (
    <section className="border-t border-white/10 bg-[#1a3a2a] py-12 md:py-16" aria-label="Impact">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="grid grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {impacts.map((i) => (
            <div key={i.label}>
              <p className="font-display text-2xl font-semibold text-[#c9a84c] md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                {i.value}
              </p>
              <p className="mt-1 text-sm text-[#f5f0e8]/80">{i.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
