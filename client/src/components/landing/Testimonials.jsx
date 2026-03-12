import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../ui/GlassCard'

const testimonials = [
  { name: 'Priya M.', city: 'Chennai', outcome: 'Landed a data analyst role after a 5-year break with ReStart.', quote: 'ReStart gave me a clear 12-week path. I completed two Coursera courses and got my confidence back.' },
  { name: 'Sunita K.', city: 'Lucknow', outcome: 'MUDRA loan approved; started tailoring unit.', quote: 'FundHer explained schemes in simple Hindi. I got ₹50,000 under Shishu and bought my first machine.' },
  { name: 'Lakshmi R.', city: 'Coimbatore', outcome: 'SkillBridge → matched to Kaabil job in same district.', quote: 'I only had WhatsApp. Daily lessons in Tamil and within 3 months I was shortlisted for a nearby factory job.' },
  { name: 'Anita S.', city: 'Mumbai', outcome: 'Negotiated 20% raise using ConfidenceOS role-plays.', quote: 'The salary negotiation simulator felt real. I used the exact phrases in my meeting and it worked.' },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="border-t border-white/10 bg-[#111] py-20 md:py-28" aria-label="Testimonials">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.h2
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Real stories. Real impact.
        </motion.h2>
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard hover={false} className="p-8 md:p-10">
                <p className="font-subhead text-lg italic text-[#f5f0e8]/90 md:text-xl" style={{ fontFamily: 'var(--font-subhead)' }}>
                  "{testimonials[index].quote}"
                </p>
                <p className="mt-4 font-medium text-[#c9a84c]">{testimonials[index].outcome}</p>
                <p className="mt-2 text-sm text-[#f5f0e8]/60">
                  — {testimonials[index].name}, {testimonials[index].city}
                </p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-4">
            <button onClick={prev} className="rounded-full border border-white/20 p-2 text-[#f5f0e8] hover:border-[#c9a84c] hover:text-[#c9a84c]" aria-label="Previous testimonial">
              ←
            </button>
            <button onClick={next} className="rounded-full border border-white/20 p-2 text-[#f5f0e8] hover:border-[#c9a84c] hover:text-[#c9a84c]" aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
