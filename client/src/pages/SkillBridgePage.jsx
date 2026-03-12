import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { useLanguage } from '../context/LanguageContext'

export function SkillBridgePage() {
  const { language } = useLanguage()
  const [mode, setMode] = useState('whatsapp')
  const [lessons, setLessons] = useState([])
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')

  const load = async () => {
    try {
      const params = new URLSearchParams({ language, mode })
      const res = await fetch(`/api/skillbridge/lessons?${params.toString()}`)
      const data = await res.json()
      setLessons(data)
    } catch {
      setLessons([])
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, mode])

  const enrol = async () => {
    setStatus('')
    try {
      const res = await fetch('/api/skillbridge/enrol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, language, mode }),
      })
      if (res.ok) setStatus('Enrolled! You will receive lessons via ' + mode.toUpperCase())
      else setStatus('Could not enrol')
    } catch {
      setStatus('Could not enrol')
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
          SkillBridge – WhatsApp / SMS lessons
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Low-data, vernacular learning delivered directly to your phone.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Choose mode</h2>
            <div className="mt-4 flex gap-3">
              {['whatsapp', 'sms'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    mode === m ? 'bg-[#c9a84c] text-[#0a0a0a]' : 'bg-white/10 text-[#f5f0e8]/80'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm text-[#c9a84c]">Phone number</label>
              <input
                className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91…"
              />
              <button
                onClick={enrol}
                className="mt-3 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]"
              >
                Enrol
              </button>
              {status && <p className="mt-2 text-xs text-[#f5f0e8]/70">{status}</p>}
            </div>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Upcoming lessons</h2>
            {lessons.length === 0 && (
              <p className="mt-3 text-sm text-[#f5f0e8]/70">No demo lessons found for this combination yet.</p>
            )}
            <ul className="mt-3 space-y-2">
              {lessons.map((l) => (
                <li key={l.id} className="text-sm text-[#f5f0e8]/80">
                  Day {l.day}: {l.title}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

