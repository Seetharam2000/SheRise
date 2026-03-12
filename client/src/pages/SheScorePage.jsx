import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function SheScorePage() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/shescore/summary')
      const data = await res.json()
      setSummary(data)
    })()
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SheScore – Career health
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Simple summary of your skills, confidence and salary growth.
        </p>

        <GlassCard hover={false} className="mt-8 p-6">
          {!summary && <p className="text-sm text-[#f5f0e8]/70">Loading…</p>}
          {summary && (
            <div className="space-y-4 text-sm text-[#f5f0e8]/80">
              <p>
                Current SheScore:{' '}
                <span className="font-display text-xl text-[#c9a84c]" style={{ fontFamily: 'var(--font-display)' }}>
                  {summary.score}
                </span>
              </p>
              <p>Skills trend: {summary.skills.join(' → ')}</p>
              <p>Confidence trend: {summary.confidence.join(' → ')}</p>
              <p>Salary index: {summary.salary.join(' → ')}</p>
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  )
}

