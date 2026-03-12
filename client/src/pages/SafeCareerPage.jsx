import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { INDIA_CITIES } from '../data/indiaCities'

export function SafeCareerPage() {
  const [jobs, setJobs] = useState([])
  const [city, setCity] = useState('')
  const [remote, setRemote] = useState('')

  const load = async () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (remote) params.set('remote', remote)
    const res = await fetch(`/api/jobs?${params.toString()}`)
    const data = await res.json()
    setJobs(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyFilters = (e) => {
    e.preventDefault()
    load()
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
          SafeCareer – Job board
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Safety-aware jobs with Kaabil‑friendly employers.
        </p>

        <form onSubmit={applyFilters} className="mt-6 flex flex-wrap gap-3">
          <select
            className="rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Filter by city"
          >
            <option value="">All cities</option>
            {INDIA_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            className="rounded border border-white/20 bg-white/5 px-3 py-2 text-sm text-[#f5f0e8]"
            value={remote}
            onChange={(e) => setRemote(e.target.value)}
          >
            <option value="">Any mode</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <button className="rounded bg-[#c9a84c] px-4 py-2 text-sm text-[#0a0a0a]">Apply filters</button>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <GlassCard key={job.id} className="p-4">
              <p className="font-medium text-[#f5f0e8]">{job.title}</p>
              <p className="text-sm text-[#f5f0e8]/70">{job.company}</p>
              <p className="mt-1 text-xs text-[#f5f0e8]/60">
                {job.city} · {job.remote} · Safety score {job.safetyScore}
              </p>
              <p className="mt-1 text-xs text-[#c9a84c]">{job.salary}</p>
              {job.kaabilUrl && (
                <a
                  href={job.kaabilUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-xs text-[#c9a84c] underline"
                >
                  View on Kaabil
                </a>
              )}
            </GlassCard>
          ))}
          {!jobs.length && <p className="text-sm text-[#f5f0e8]/70">No jobs found.</p>}
        </div>
      </div>
    </main>
  )
}

