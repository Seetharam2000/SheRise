import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

const ROLES = [
  { role: 'Fresher – Customer Support', domain: 'Service', q1: 'Introduce yourself in 60 seconds.', q2: 'How would you calm an angry customer on call?' },
  { role: 'Career Returner – Data Analyst', domain: 'Tech', q1: 'How did you stay in touch with data skills during your break?', q2: 'Explain a time you used data to make a decision.' },
  { role: 'Career Switcher – Teacher to UX', domain: 'Design', q1: 'Why are you moving from teaching to UX?', q2: 'Describe a classroom experience that shows your empathy for users.' },
]

export function SimuLearnPage() {
  const [current, setCurrent] = useState(ROLES[0])

  const randomize = () => {
    const idx = Math.floor(Math.random() * ROLES.length)
    setCurrent(ROLES[idx])
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SimuLearn – Interview simulator
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Practice real interview scenarios, then deepen skills with Coursera.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
              Today&apos;s random scenario
            </h2>
            <p className="mt-3 text-sm text-[#f5f0e8]/80">
              Role: <span className="font-semibold text-[#f5f0e8]">{current.role}</span> · Domain:{' '}
              <span className="text-[#c9a84c]">{current.domain}</span>
            </p>
            <ol className="mt-4 list-decimal list-inside space-y-2 text-sm text-[#f5f0e8]/80">
              <li>{current.q1}</li>
              <li>{current.q2}</li>
            </ol>
            <p className="mt-4 text-xs text-[#f5f0e8]/60">
              Tip: Record your answer on your phone, then listen back and note where you hesitated or used filler words.
            </p>
            <button
              onClick={randomize}
              className="mt-4 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a] hover:bg-[#d4b85c]"
            >
              Try another scenario
            </button>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
              Continue practice on Coursera
            </h2>
            <p className="mt-3 text-sm text-[#f5f0e8]/80">
              After you finish a few mock answers here, open Coursera to take a full course on interviews, communication,
              or your target domain.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.coursera.org"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded bg-[#c9a84c] px-6 py-3 text-sm font-medium text-[#0a0a0a] hover:bg-[#d4b85c]"
              >
                Open Coursera
              </a>
              <a
                href="https://kaabilprogram.org/jobs"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded border border-[#c9a84c] px-6 py-3 text-sm font-medium text-[#c9a84c] hover:bg-[#c9a84c]/10"
              >
                Open Kaabil by Mahindra
              </a>
            </div>
            <p className="mt-3 text-xs text-[#f5f0e8]/60">
              In the full SheRise version, this section will show specific Coursera interview and reskilling paths that
              match your SimuLearn performance.
            </p>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

