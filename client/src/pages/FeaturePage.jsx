import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function FeaturePage({ title, tagline, slug, children }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link to="/dashboard" className="text-sm text-[#c9a84c] hover:underline">← Dashboard</Link>
          <h1 className="mt-4 font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h1>
          <p className="mt-2 font-subhead text-lg text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
            {tagline}
          </p>
        </motion.div>

        {children ?? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard hover={false} className="p-8 md:p-12">
              <p className="text-[#f5f0e8]/80">
                This is the <strong className="text-[#f5f0e8]">{title}</strong> feature. Full UI and API integrations (Claude, Kaabil, Coursera, Twilio, etc.) can be wired here. Navigate from the main nav or dashboard to any feature.
              </p>
              <Link to="/dashboard" className="mt-6 inline-block rounded bg-[#c9a84c] px-6 py-3 text-[#0a0a0a] hover:bg-[#d4b85c]">
                Back to Dashboard
              </Link>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </main>
  )
}
