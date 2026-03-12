import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { INDIA_CITIES } from '../data/indiaCities'

export function VolunteerPage() {
  const [form, setForm] = useState({ name: '', type: 'individual', orgName: '', city: '', email: '' })
  const [list, setList] = useState([])

  const load = async () => {
    const res = await fetch('/api/volunteer')
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch('/api/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm({ name: '', type: 'individual', orgName: '', city: '', email: '' })
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
          Volunteer with SheRise
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Join as an individual mentor or an association to reach more women in need.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
              Register as volunteer / association
            </h2>
            <form onSubmit={submit} className="mt-4 space-y-3 text-sm text-[#f5f0e8]">
              <div>
                <label className="block text-xs text-[#c9a84c]">Name</label>
                <input
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-[#c9a84c]">You are joining as</label>
                <select
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="individual">Individual volunteer</option>
                  <option value="association">NGO / Association / College cell</option>
                </select>
              </div>
              {form.type === 'association' && (
                <div>
                  <label className="block text-xs text-[#c9a84c]">Organisation / group name</label>
                  <input
                    className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                    value={form.orgName}
                    onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-xs text-[#c9a84c]">City</label>
                <select
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  <option value="">Select city</option>
                  {INDIA_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#c9a84c]">Contact email (optional)</label>
                <input
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <button className="mt-2 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">
                Submit
              </button>
            </form>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
              Recent volunteers
            </h2>
            <div className="mt-3 max-h-72 space-y-3 overflow-y-auto text-sm text-[#f5f0e8]/80">
              {list.map((v) => (
                <div key={v.id} className="border-b border-white/10 pb-2">
                  <p className="font-medium text-[#f5f0e8]">
                    {v.name} {v.type === 'association' && v.orgName ? `· ${v.orgName}` : ''}
                  </p>
                  {v.city && <p className="text-xs text-[#f5f0e8]/70">{v.city}</p>}
                  {v.email && <p className="text-xs text-[#f5f0e8]/60">{v.email}</p>}
                </div>
              ))}
              {!list.length && <p className="text-sm text-[#f5f0e8]/70">No volunteers yet.</p>}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

