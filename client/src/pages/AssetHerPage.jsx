import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function AssetHerPage() {
  const [question, setQuestion] = useState('')
  const [queries, setQueries] = useState([])

  const load = async () => {
    const res = await fetch('/api/assether/queries')
    const data = await res.json()
    setQueries(data)
  }

  useEffect(() => {
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await fetch('/api/assether/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })
    setQuestion('')
    load()
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
          AssetHer – Property & ownership
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Log questions about property rights; full legal guidance can be plugged into Claude later.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard hover={false} className="p-6">
            <form onSubmit={submit} className="space-y-3">
              <textarea
                className="h-40 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
                placeholder="Ask about inheritance, adding your name to property, PMAY eligibility, etc."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">Submit</button>
            </form>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <h2 className="font-display text-lg text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Questions log</h2>
            <div className="mt-3 space-y-3 max-h-72 overflow-y-auto text-sm text-[#f5f0e8]/80">
              {queries.map((q) => (
                <div key={q.id} className="border-b border-white/10 pb-2">
                  {q.question}
                </div>
              ))}
              {!queries.length && <p>No questions logged yet.</p>}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

