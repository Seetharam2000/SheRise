import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

const LANGUAGES = ['Tamil', 'Hindi', 'Telugu', 'Bengali', 'English', 'Marathi', 'Others']
const GOALS = [
  { id: 'job', label: 'Find Job' },
  { id: 'reskill', label: 'Reskill' },
  { id: 'restart', label: 'Restart After Break' },
  { id: 'grow', label: 'Grow Career' },
  { id: 'business', label: 'Start Business' },
  { id: 'network', label: 'Build Network' },
  { id: 'rights', label: 'Learn Rights' },
]
const FINANCIAL = ['Employed', 'Self-employed', 'Homemaker', 'Student', 'Looking for work']

export function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', age: '', state: '', district: '', language: 'English',
    education: '', lastJob: '', breakDuration: '', breakReason: '',
    goal: '', device: 'full', connectivity: 'app', financial: '',
  })

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async () => {
    // In production: POST to /api/onboarding, Claude generates dashboard + recommended path
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).catch(() => null)
      if (res?.ok) {
        const data = await res.json()
        navigate('/dashboard', { state: { recommended: data?.recommended } })
      } else {
        navigate('/dashboard', { state: { recommended: ['restart', 'shescore'] } })
      }
    } catch {
      navigate('/dashboard', { state: { recommended: ['restart', 'shescore'] } })
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Start your journey
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Step {step} of 5
        </p>
        <div className="mt-6 h-1 w-full rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-[#c9a84c]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-10"
            >
              <GlassCard hover={false} className="p-6 md:p-8">
                <label className="block text-sm text-[#c9a84c]">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                  placeholder="Your name"
                />
                <label className="mt-4 block text-sm text-[#c9a84c]">Age</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => update('age', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] focus:border-[#c9a84c] focus:outline-none"
                  placeholder="Age"
                />
                <label className="mt-4 block text-sm text-[#c9a84c]">State / District</label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => update('state', e.target.value)}
                    className="flex-1 rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => update('district', e.target.value)}
                    className="flex-1 rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                    placeholder="District"
                  />
                </div>
                <label className="mt-4 block text-sm text-[#c9a84c]">Language preference</label>
                <select
                  value={form.language}
                  onChange={(e) => update('language', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] focus:border-[#c9a84c] focus:outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </GlassCard>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-10"
            >
              <GlassCard hover={false} className="p-6 md:p-8">
                <label className="block text-sm text-[#c9a84c]">Education level</label>
                <input
                  type="text"
                  value={form.education}
                  onChange={(e) => update('education', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                  placeholder="e.g. Graduation, 12th"
                />
                <label className="mt-4 block text-sm text-[#c9a84c]">Last job / field</label>
                <input
                  type="text"
                  value={form.lastJob}
                  onChange={(e) => update('lastJob', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                  placeholder="e.g. Teaching, IT"
                />
                <label className="mt-4 block text-sm text-[#c9a84c]">Career break duration (if any)</label>
                <input
                  type="text"
                  value={form.breakDuration}
                  onChange={(e) => update('breakDuration', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                  placeholder="e.g. 3 years"
                />
                <label className="mt-4 block text-sm text-[#c9a84c]">Reason for break (optional)</label>
                <input
                  type="text"
                  value={form.breakReason}
                  onChange={(e) => update('breakReason', e.target.value)}
                  className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                  placeholder="e.g. Family care"
                />
              </GlassCard>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-10"
            >
              <p className="text-[#f5f0e8]/80">Primary goal (select one)</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => update('goal', g.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      form.goal === g.id
                        ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#f5f0e8]'
                        : 'border-white/10 bg-white/5 text-[#f5f0e8]/80 hover:border-white/20'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-10"
            >
              <GlassCard hover={false} className="p-6 md:p-8">
                <p className="text-[#f5f0e8]/80">How do you prefer to use SheRise?</p>
                <div className="mt-4 space-y-3">
                  {[
                    { id: 'app', label: 'Full app (best experience)', value: 'app' },
                    { id: 'whatsapp', label: 'WhatsApp mode', value: 'whatsapp' },
                    { id: 'sms', label: 'SMS only', value: 'sms' },
                  ].map((o) => (
                    <label key={o.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 hover:border-white/20">
                      <input
                        type="radio"
                        name="connectivity"
                        checked={form.connectivity === o.value}
                        onChange={() => update('connectivity', o.value)}
                        className="h-4 w-4 border-[#c9a84c] text-[#c9a84c] focus:ring-[#c9a84c]"
                      />
                      <span className="text-[#f5f0e8]">{o.label}</span>
                    </label>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
          {step === 5 && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-10"
            >
              <GlassCard hover={false} className="p-6 md:p-8">
                <p className="text-[#f5f0e8]/80">Financial situation (optional — for FundHer)</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {FINANCIAL.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => update('financial', form.financial === f ? '' : f)}
                      className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                        form.financial === f ? 'border-[#c9a84c] bg-[#c9a84c]/10' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="rounded border border-white/20 px-6 py-3 text-[#f5f0e8] hover:border-[#c9a84c]"
          >
            Back
          </button>
          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded bg-[#c9a84c] px-6 py-3 text-[#0a0a0a] hover:bg-[#d4b85c]"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded bg-[#c9a84c] px-6 py-3 text-[#0a0a0a] hover:bg-[#d4b85c]"
            >
              Create my dashboard
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
