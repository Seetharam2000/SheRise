import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { FeaturePage } from './FeaturePage'

const MOCK_WEEKS = [
  { week: 1, course: 'Introduction to Data Analysis', task: 'Update LinkedIn headline', tip: 'Focus on transferable skills from your break.' },
  { week: 2, course: 'Excel for Beginners', task: 'List 5 companies that hire returners', tip: 'Reach out to one mentor this week.' },
  { week: 3, course: 'Communication Skills', task: 'Draft a 2-minute pitch', tip: 'Practice in front of a mirror.' },
  { week: 4, course: 'Project Management Basics', task: 'Complete one Coursera module', tip: 'Block 30 min daily for upskilling.' },
]

export function ReStartPage() {
  const [yearsOut, setYearsOut] = useState('')
  const [lastRole, setLastRole] = useState('')
  const [roadmapGenerated, setRoadmapGenerated] = useState(false)

  const generateRoadmap = () => setRoadmapGenerated(true)

  return (
    <FeaturePage title="ReStart" tagline="AI-powered career re-entry for women on a break">
      <div className="space-y-10">
        <GlassCard hover={false} className="p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
            Your re-entry inputs
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-[#c9a84c]">Years out of workforce</label>
              <input
                type="text"
                value={yearsOut}
                onChange={(e) => setYearsOut(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-2 text-[#f5f0e8]"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label className="block text-sm text-[#c9a84c]">Last role / field</label>
              <input
                type="text"
                value={lastRole}
                onChange={(e) => setLastRole(e.target.value)}
                className="mt-1 w-full rounded border border-white/20 bg-white/5 px-4 py-2 text-[#f5f0e8]"
                placeholder="e.g. Teaching, IT"
              />
            </div>
          </div>
          <button
            onClick={generateRoadmap}
            className="mt-6 rounded bg-[#c9a84c] px-6 py-3 text-[#0a0a0a] hover:bg-[#d4b85c]"
          >
            Generate my 12-week roadmap
          </button>
        </GlassCard>

        {roadmapGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="font-display text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
              12-week timeline
            </h2>
            <div className="relative border-l-2 border-[#c9a84c]/50 pl-6">
              {MOCK_WEEKS.map((w, i) => (
                <motion.div
                  key={w.week}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="mb-8 last:mb-0"
                >
                  <div className="absolute -left-[29px] h-4 w-4 rounded-full bg-[#c9a84c]" />
                  <GlassCard hover={false} className="p-4">
                    <p className="text-sm font-medium text-[#c9a84c]">Week {w.week}</p>
                    <p className="mt-1 font-medium text-[#f5f0e8]">{w.course}</p>
                    <p className="mt-1 text-sm text-[#f5f0e8]/70">Task: {w.task}</p>
                    <p className="mt-1 text-sm italic text-[#f5f0e8]/60">Tip: {w.tip}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-[#f5f0e8]/60">
              Courses are fetched via Coursera API. Resume Gap Explainer and “What Changed” modules use Claude API.
            </p>
          </motion.div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard className="p-6">
            <h3 className="font-display font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>Resume Gap Explainer</h3>
            <p className="mt-2 text-sm text-[#f5f0e8]/70">Paste your career break — Claude rewrites it into positive professional framing.</p>
            <Link to="/dashboard" className="mt-4 inline-block text-sm text-[#c9a84c] hover:underline">Coming soon</Link>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="font-display font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>What Changed</h3>
            <p className="mt-2 text-sm text-[#f5f0e8]/70">AI briefing on industry changes during your break.</p>
            <Link to="/dashboard" className="mt-4 inline-block text-sm text-[#c9a84c] hover:underline">Coming soon</Link>
          </GlassCard>
        </div>
      </div>
    </FeaturePage>
  )
}
