import { motion } from 'framer-motion'

const partners = [
  { name: 'Kaabil by Mahindra', desc: 'Hyperlocal D&I job listings' },
  { name: 'Coursera', desc: 'Skills & certifications' },
]

export function Partners() {
  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] py-16 md:py-20" aria-label="Partners">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.p
          className="text-center text-sm uppercase tracking-wider text-[#f5f0e8]/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Proudly partnered with
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {partners.map((p) => (
            <motion.div
              key={p.name}
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm transition-all hover:border-[#c9a84c]/40 hover:shadow-[0_0_24px_rgba(201,168,76,0.15)]"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-display text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
                {p.name}
              </p>
              <p className="mt-1 text-sm text-[#f5f0e8]/70">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#0a0f0b] via-[#0a0a0a] to-[#111] px-6 py-5 text-center md:px-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#c9a84c]">
            Supported by Government of India missions
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {[
              { short: 'PMKVY', label: 'Skill India – PMKVY' },
              { short: 'MUDRA', label: 'MUDRA for women entrepreneurs' },
              { short: 'PMAY', label: 'PMAY & Asset ownership' },
              { short: 'Lakhpati Didi', label: 'Lakhpati Didi & SHGs' },
              { short: 'NaMo Drone Didi', label: 'NaMo Drone Didi' },
            ].map((g) => (
              <div
                key={g.short}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-[#f5f0e8]/80"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600/70 text-[0.6rem] font-semibold text-white">
                  {g.short}
                </span>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
