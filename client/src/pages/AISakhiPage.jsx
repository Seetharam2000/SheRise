import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function AISakhiPage() {
  const [interests, setInterests] = useState('')
  const [time, setTime] = useState('')
  const [recs, setRecs] = useState(null)

  const getRecs = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/aisakhi/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interests: interests.split(',').map((s) => s.trim()), timePerWeek: time }),
    })
    const data = await res.json()
    setRecs(data)
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
          AI Sakhi – Career ideas
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Bias‑free career paths into AI and tech, even without coding.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <form onSubmit={getRecs} className="space-y-3">
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Your interests (e.g. writing, teaching, design)"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Time per week (hours)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <button className="rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">Get suggestions</button>
            </form>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Recommendations</h2>
            {!recs && <p className="mt-3 text-sm text-[#f5f0e8]/70">Fill the form to see suggestions.</p>}
            {recs && (
              <ul className="mt-3 space-y-2 text-sm text-[#f5f0e8]/80">
                {recs.recommendations.map((r, idx) => (
                  <li key={idx} className="border-b border-white/10 pb-2">
                    <p className="font-medium text-[#f5f0e8]">{r.role}</p>
                    <p className="text-xs text-[#f5f0e8]/70">Salary: {r.salaryRange}</p>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

