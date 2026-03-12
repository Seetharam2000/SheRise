import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function FundHerPage() {
  const [form, setForm] = useState({ name: '', idea: '', amount: '', state: '' })
  const [apps, setApps] = useState([])

  const load = async () => {
    const res = await fetch('/api/fundher/applications')
    const data = await res.json()
    setApps(data)
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch('/api/fundher/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ name: '', idea: '', amount: '', state: '' })
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
          FundHer – Business finance
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Log your business idea and track potential scheme connections.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Your idea</h2>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <textarea
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Describe your business idea"
                rows={4}
                value={form.idea}
                onChange={(e) => setForm({ ...form, idea: e.target.value })}
                required
              />
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Amount needed (optional)"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
              <input
                className="w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="State (optional)"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
              <button className="mt-2 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">Submit</button>
            </form>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Applications</h2>
            <div className="mt-3 space-y-3 max-h-72 overflow-y-auto">
              {apps.map((a) => (
                <div key={a.id} className="border-b border-white/10 pb-2 text-sm text-[#f5f0e8]/80">
                  <p className="font-medium text-[#f5f0e8]">{a.name}</p>
                  <p className="mt-1 text-xs text-[#f5f0e8]/70">{a.idea}</p>
                  {a.amount && <p className="mt-1 text-xs text-[#c9a84c]">Amount: {a.amount}</p>}
                </div>
              ))}
              {!apps.length && <p className="text-sm text-[#f5f0e8]/70">No applications yet.</p>}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

