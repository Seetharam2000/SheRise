import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { end: 2000000, suffix: '+', label: 'Women Helped' },
  { end: 15, suffix: '', label: 'Languages' },
  { end: 500, suffix: '+', label: 'Cities' },
  { end: 50000, suffix: '', label: 'Jobs Listed' },
]

function AnimatedNumber({ end, suffix, duration = 2 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [end, duration])
  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="border-y border-white/10 bg-[#111] py-12 md:py-16" aria-label="Impact statistics">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-[#c9a84c] md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                <AnimatedNumber end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-[#f5f0e8]/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
