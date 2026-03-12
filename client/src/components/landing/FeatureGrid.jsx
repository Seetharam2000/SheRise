import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '../ui/GlassCard'

const features = [
  { to: '/restart', title: 'ReStart', desc: 'AI-powered career re-entry roadmap for women on break', tag: 'Career' },
  { to: '/network', title: 'SheNetwork', desc: 'Bias-aware deep mentorship matching', tag: 'Community' },
  { to: '/skillbridge', title: 'SkillBridge', desc: 'WhatsApp/SMS-first learning for low-digital-access', tag: 'Learning' },
  { to: '/confidence', title: 'ConfidenceOS', desc: 'AI psychological coaching & role-play simulator', tag: 'Confidence' },
  { to: '/jobs', title: 'SafeCareer', desc: 'Safety-aware job board with gender-responsive ratings', tag: 'Jobs' },
  { to: '/simulate', title: 'SimuLearn', desc: 'Gamified interview & reskilling path simulator', tag: 'Practice' },
  { to: '/vaani', title: 'VaaniBot', desc: 'Voice-first vernacular career chatbot', tag: 'Voice' },
  { to: '/fundher', title: 'FundHer', desc: "Women's entrepreneurship finance navigator", tag: 'Finance' },
  { to: '/biasdetect', title: 'BiasDetect', desc: 'AI workplace bias auditor for JDs & resumes', tag: 'Bias' },
  { to: '/kalashop', title: 'KalaShop', desc: "Rural women's craft-to-commerce platform", tag: 'Craft' },
  { to: '/assether', title: 'AssetHer', desc: 'Property rights & financial ownership literacy', tag: 'Assets' },
  { to: '/aisakhi', title: 'AI Sakhi', desc: 'Bias-free AI career coach', tag: 'AI' },
  { to: '/shescore', title: 'SheScore', desc: 'Longitudinal career progress analytics', tag: 'Progress' },
  { to: '/gigshe', title: 'GigShe', desc: 'Safe gig economy onboarding for women', tag: 'Gig' },
  { to: '/safety', title: 'DroneWatch + Drone Didi', desc: 'Community safety network & NaMo Drone Didi', tag: 'Safety' },
]

const catalogLinks = [
  {
    href: 'https://www.coursera.org',
    title: 'Open Coursera',
    desc: 'Browse courses and certifications (opens in a new tab)',
    tag: 'Catalog',
  },
  {
    href: 'https://www.kaabil.me',
    title: 'Open Kaabil',
    desc: 'Browse hyperlocal job listings (opens in a new tab)',
    tag: 'Catalog',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeatureGrid() {
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28" aria-label="Features">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl lg:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          One platform. Every step of her journey.
        </motion.h2>
        <motion.p
          className="mt-4 max-w-2xl font-subhead text-lg text-[#f5f0e8]/80"
          style={{ fontFamily: 'var(--font-subhead)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          From restarting a career to building a business, staying safe, and owning her future.
        </motion.p>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((f) => (
            <motion.div key={f.to} variants={item}>
              <Link to={f.to}>
                <GlassCard className="block p-6 text-left">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#c9a84c]">{f.tag}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#f5f0e8]/70">{f.desc}</p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
          {catalogLinks.map((c) => (
            <motion.div key={c.href} variants={item}>
              <a href={c.href} target="_blank" rel="noreferrer">
                <GlassCard className="block p-6 text-left">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#c9a84c]">{c.tag}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#f5f0e8]/70">{c.desc}</p>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
