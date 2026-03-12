import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { useLanguage } from '../context/LanguageContext'

const SAMPLE_QUERIES = [
  'Enakku என்ன job suitable?',
  'Maternity leave எவ்வளவு நாள்?',
  'Mujhe loan kaise milega business ke liye?',
  'I feel unsafe at work — what are my rights?',
]

export function VaaniPage() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [listening, setListening] = useState(false)
  const { language } = useLanguage()

  const sendQuery = async () => {
    if (!query.trim()) return
    setResponse('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query, language }),
      })
      if (!res.ok) {
        setResponse('VaaniBot could not answer right now.')
        return
      }
      const data = await res.json()
      setResponse(data.reply || '')
    } catch {
      setResponse('VaaniBot could not reach the server.')
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            VaaniBot
          </h1>
          <p className="mt-2 font-subhead text-lg text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
            Voice-first vernacular career chatbot. Ask in Tamil, Hindi, Telugu, Bengali, Marathi, or English.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10"
        >
          <GlassCard hover={false} className="p-6 md:p-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type or speak your question..."
                className="flex-1 rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/50 focus:border-[#c9a84c] focus:outline-none"
              />
              <button
                onClick={() => setListening(!listening)}
                className={`rounded-full px-5 py-3 ${listening ? 'bg-[#b5485d]' : 'bg-white/10'} text-[#f5f0e8] hover:bg-[#b5485d]/80`}
                aria-label={listening ? 'Stop listening' : 'Start voice input'}
              >
                🎤
              </button>
              <button
                onClick={sendQuery}
                className="rounded bg-[#c9a84c] px-5 py-3 text-[#0a0a0a] hover:bg-[#d4b85c]"
              >
                Ask
              </button>
            </div>
            {response && (
              <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4 text-[#f5f0e8]/90">
                {response}
              </div>
            )}
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <p className="text-sm text-[#c9a84c]">Example queries</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-[#f5f0e8]/80 hover:border-[#c9a84c]/50 hover:text-[#f5f0e8]"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        <GlassCard hover={false} className="mt-8 p-6">
          <h2 className="font-display text-lg font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
            Intents supported (Dialogflow)
          </h2>
          <ul className="mt-3 list-inside list-disc text-sm text-[#f5f0e8]/80">
            <li>Job search and recommendations</li>
            <li>Government schemes: PMKVY, Lakhpati Didi, MUDRA, Stand Up India, PMAY, Drone Didi</li>
            <li>Work-life balance advice</li>
            <li>Workplace harassment rights</li>
            <li>Career guidance for non-literate users</li>
          </ul>
        </GlassCard>
      </div>
    </main>
  )
}
