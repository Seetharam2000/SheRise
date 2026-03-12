import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'

export function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Admin panel
        </motion.h1>
        <p className="mt-2 text-[#f5f0e8]/70">User analytics, feature heatmaps, API usage, Drone zone management.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'User analytics', desc: 'Registrations by state/district (choropleth)' },
            { title: 'Feature heatmap', desc: 'Most-used features' },
            { title: 'Mentor matching', desc: 'Success rate tracker' },
            { title: 'Drone zones', desc: 'Map + report clustering' },
            { title: 'Twilio stats', desc: 'WhatsApp/SMS delivery' },
            { title: 'Kaabil + Coursera', desc: 'API usage & conversion' },
            { title: 'BiasDetect aggregate', desc: 'Top biased phrases in JDs' },
            { title: 'FundHer', desc: 'Loans/schemes connected per week' },
            { title: 'KalaShop GMV', desc: 'Gross merchandise value' },
            { title: 'SheScore trend', desc: 'Platform-wide career health' },
          ].map((item) => (
            <GlassCard key={item.title} className="p-6">
              <h2 className="font-display font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h2>
              <p className="mt-2 text-sm text-[#f5f0e8]/70">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
  )
}
