import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { INDIA_CITIES } from '../data/indiaCities'

export function SheNetworkPage() {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', city: '', field: '' })

  const loadMentors = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/network/mentors')
      const data = await res.json()
      setMentors(data)
    } catch {
      setError('Could not load mentors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMentors()
  }, [])

  const submitMentor = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/network/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) return
      setForm({ name: '', city: '', field: '' })
      loadMentors()
    } catch {
      // ignore for demo
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SheNetwork – Mentors
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Bias-aware deep mentorship for women, matched by field, city, and life context.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <GlassCard hover={false} className="p-6 md:col-span-1">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Become a mentor</h2>
            <form onSubmit={submitMentor} className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-[#c9a84c]">Name</label>
                <input
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#c9a84c]">City</label>
                <input
                  list="india-cities"
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                  placeholder="Select or type a city"
                />
                <datalist id="india-cities">
                  {INDIA_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm text-[#c9a84c]">Field</label>
                <input
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="mt-2 w-full rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">
                Submit
              </button>
            </form>
          </GlassCard>

          <div className="md:col-span-2 space-y-4">
            {loading && <p className="text-sm text-[#f5f0e8]/70">Loading mentors…</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}
            {!loading && !mentors.length && <p className="text-sm text-[#f5f0e8]/70">No mentors yet.</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              {mentors.map((m) => (
                <GlassCard key={m.id} className="p-4">
                  <p className="font-medium text-[#f5f0e8]">{m.name}</p>
                  <p className="text-sm text-[#f5f0e8]/70">{m.field}</p>
                  <p className="mt-1 text-xs text-[#f5f0e8]/60">{m.city}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

