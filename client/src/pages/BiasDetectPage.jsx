import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function BiasDetectPage() {
  const [jdText, setJdText] = useState('')
  const [result, setResult] = useState(null)

  const analyse = async () => {
    const res = await fetch('/api/biasdetect/jd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: jdText }),
    })
    const data = await res.json()
    setResult(data)
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
          BiasDetect – JD analyzer
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Paste a job description to flag gendered or exclusive language.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <textarea
              className="h-60 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
              placeholder="Paste job description here…"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            <button
              onClick={analyse}
              className="mt-3 rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]"
            >
              Analyze bias
            </button>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Findings</h2>
            {!result && <p className="mt-3 text-sm text-[#f5f0e8]/70">Run an analysis to see results.</p>}
            {result && (
              <div className="mt-3 space-y-2 text-sm text-[#f5f0e8]/80">
                <p>Bias score: {result.biasScore}</p>
                {result.flags.map((f, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-1">
                    <p className="text-[#c9a84c]">“{f.word}”</p>
                    <p className="text-xs">{f.reason}</p>
                  </div>
                ))}
                {!result.flags.length && <p>No flagged words detected.</p>}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

