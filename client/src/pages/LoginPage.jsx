import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Login failed')
        return
      }
      // In a full version, store token & user in context/localStorage
      navigate('/dashboard')
    } catch {
      setError('Unable to reach server')
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 md:py-20">
      <div className="mx-auto max-w-md px-4">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome back to SheRise
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          Log in to continue your journey
        </p>
        <GlassCard hover={false} className="mt-8 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#c9a84c]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/40 focus:border-[#c9a84c] focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#c9a84c]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-3 text-[#f5f0e8] focus:border-[#c9a84c] focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="mt-2 w-full rounded bg-[#c9a84c] px-4 py-3 text-[#0a0a0a] hover:bg-[#d4b85c]"
            >
              Log in
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  )
}

