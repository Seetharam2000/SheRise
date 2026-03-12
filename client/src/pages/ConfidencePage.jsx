import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function ConfidencePage() {
  const [scenario, setScenario] = useState('')
  const [feeling, setFeeling] = useState('')
  const [entries, setEntries] = useState([])

  const load = async () => {
    try {
      const res = await fetch('/api/confidence/entries')
      const data = await res.json()
      setEntries(data)
    } catch {
      setEntries([])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/confidence/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario, feeling }),
      })
      setScenario('')
      setFeeling('')
      load()
    } catch {
      // ignore
    }
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
          ConfidenceOS – Coaching log
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Log your practice scenarios and track your confidence growth.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>New scenario</h2>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-[#c9a84c]">Scenario</label>
                <textarea
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#c9a84c]">How did you feel?</label>
                <input
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                />
              </div>
              <button type="submit" className="mt-2 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">
                Save entry
              </button>
            </form>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Past entries</h2>
            <div className="mt-3 space-y-3 max-h-80 overflow-y-auto">
              {entries.map((e) => (
                <div key={e.id} className="border-b border-white/10 pb-2 text-sm text-[#f5f0e8]/80">
                  <p>{e.scenario}</p>
                  {e.feeling && <p className="mt-1 text-xs text-[#f5f0e8]/60">Feeling: {e.feeling}</p>}
                </div>
              ))}
              {!entries.length && <p className="text-sm text-[#f5f0e8]/70">No entries yet.</p>}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

