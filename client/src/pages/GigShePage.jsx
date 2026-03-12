import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function GigShePage() {
  const [gigs, setGigs] = useState([])
  const [income, setIncome] = useState([])
  const [month, setMonth] = useState('')
  const [amount, setAmount] = useState('')

  const load = async () => {
    const [gRes, iRes] = await Promise.all([
      fetch('/api/gigshe/gigs'),
      fetch('/api/gigshe/income'),
    ])
    setGigs(await gRes.json())
    setIncome(await iRes.json())
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch('/api/gigshe/income', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month, amount }),
    })
    setMonth('')
    setAmount('')
    load()
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GigShe – Safe gig income
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Explore curated gig types and track your monthly income.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Gig options</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#f5f0e8]/80">
              {gigs.map((g) => (
                <li key={g.id} className="border-b border-white/10 pb-2">
                  <p className="font-medium text-[#f5f0e8]">{g.type}</p>
                  <p className="text-xs text-[#f5f0e8]/70">{g.level} · {g.city}</p>
                  <p className="text-xs text-[#c9a84c]">Estimate: {g.estimate}</p>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Income tracker</h2>
            <form onSubmit={submit} className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Month (e.g. Jan 2026)"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <input
                className="w-32 rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="₹"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">Add</button>
            </form>
            <ul className="mt-4 space-y-1 text-sm text-[#f5f0e8]/80">
              {income.map((i) => (
                <li key={i.id}>
                  {i.month}: ₹{i.amount}
                </li>
              ))}
              {!income.length && <li>No income logged yet.</li>}
            </ul>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

