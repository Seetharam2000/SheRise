import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { useLanguage } from '../context/LanguageContext'

const quickLinks = [
  { to: '/restart', title: 'ReStart', desc: 'Your roadmap' },
  { to: '/confidence', title: 'ConfidenceOS', desc: 'Coaching log' },
  { to: '/network', title: 'SheNetwork', desc: 'Mentors' },
  { to: '/simulate', title: 'SimuLearn', desc: 'Practice' },
  { to: '/jobs', title: 'SafeCareer', desc: 'Jobs' },
  { to: '/skillbridge', title: 'SkillBridge', desc: 'Lessons' },
  { to: '/fundher', title: 'FundHer', desc: 'Applications' },
  { to: '/shescore', title: 'SheScore', desc: 'Career health' },
  { to: '/safety', title: 'DroneWatch', desc: 'Coverage' },
  { href: 'https://www.coursera.org', title: 'Coursera', desc: 'Open courses (new tab)' },
  { href: 'https://kaabilprogram.org/jobs', title: 'Kaabil', desc: 'Open jobs (new tab)' },
]

export function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [sheScore, setSheScore] = useState(null)
  const [jobsCount, setJobsCount] = useState(0)
  const [mentorsCount, setMentorsCount] = useState(0)
  const [confidenceCount, setConfidenceCount] = useState(0)
  const [fundherCount, setFundherCount] = useState(0)
  const [gigsheIncomeCount, setGigsheIncomeCount] = useState(0)
  const { language } = useLanguage()

  const copy = {
    en: {
      title: 'Your dashboard',
      subtitle: 'Personalized for your journey',
      weekly: 'Weekly activity',
      sheScore: 'SheScore career health',
      opportunities: 'Opportunities available',
      quick: 'Quick access',
      actions: 'actions logged',
      outOf: 'Out of 100. Keep going!',
      loading: 'Loading…',
      jobsMentors: (jobs, mentors) => `${jobs} jobs · ${mentors} mentors`,
    },
    hi: {
      title: 'आपका डैशबोर्ड',
      subtitle: 'आपकी यात्रा के लिए व्यक्तिगत',
      weekly: 'साप्ताहिक गतिविधि',
      sheScore: 'शीस्कोर करियर हेल्थ',
      opportunities: 'उपलब्ध अवसर',
      quick: 'त्वरित पहुँच',
      actions: 'एक्शन दर्ज हुए',
      outOf: '100 में से। ऐसे ही आगे बढ़ते रहें।',
      loading: 'लोड हो रहा है…',
      jobsMentors: (jobs, mentors) => `${jobs} नौकरियाँ · ${mentors} मेंटर्स`,
    },
    ta: {
      title: 'உங்கள் டாஷ்போர்டு',
      subtitle: 'உங்கள் பயணத்திற்கே பொருந்தும்',
      weekly: 'வாராந்திர செயல்பாடு',
      sheScore: 'SheScore – தொழில் நலம்',
      opportunities: 'கிடைக்கும் வாய்ப்புகள்',
      quick: 'விரைவு அணுகல்',
      actions: 'செயல்கள் பதிவு செய்யப்பட்டன',
      outOf: '100 இல். தொடர்ந்து முன்னேறுங்கள்.',
      loading: 'ஏற்றப்படுகிறது…',
      jobsMentors: (jobs, mentors) => `${jobs} வேலைகள் · ${mentors} வழிகாட்டிகள்`,
    },
    ml: {
      title: 'നിങ്ങളുടെ ഡാഷ്ബോർഡ്',
      subtitle: 'നിങ്ങളുടെ യാത്രയ്ക്ക് അനുസരിച്ച്',
      weekly: 'ആഴ്‌ചയിലെ പ്രവർത്തനം',
      sheScore: 'SheScore കരിയർ ഹെൽത്ത്',
      opportunities: 'ലഭ്യമായ അവസരങ്ങൾ',
      quick: 'ക്വിക് ആക്‌സസ്',
      actions: 'പ്രവർത്തനങ്ങൾ രേഖപ്പെടുത്തി',
      outOf: '100 ൽ. ഇങ്ങനെ തന്നെ മുന്നോട്ട് പോകൂ.',
      loading: 'ലോഡ് ചെയ്യുന്നു…',
      jobsMentors: (jobs, mentors) => `${jobs} ജോലികൾ · ${mentors} മെന്റർമാർ`,
    },
  }[language] || {
    title: 'Your dashboard',
    subtitle: 'Personalized for your journey',
    weekly: 'Weekly activity',
    sheScore: 'SheScore career health',
    opportunities: 'Opportunities available',
    quick: 'Quick access',
    actions: 'actions logged',
    outOf: 'Out of 100. Keep going!',
    loading: 'Loading…',
    jobsMentors: (jobs, mentors) => `${jobs} jobs · ${mentors} mentors`,
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const [sheRes, jobsRes, mentorsRes, confRes, fundRes, gigIncomeRes] = await Promise.all([
          fetch('/api/shescore/summary'),
          fetch('/api/jobs'),
          fetch('/api/network/mentors'),
          fetch('/api/confidence/entries'),
          fetch('/api/fundher/applications'),
          fetch('/api/gigshe/income'),
        ])

        const she = await sheRes.json().catch(() => null)
        const jobs = await jobsRes.json().catch(() => [])
        const mentors = await mentorsRes.json().catch(() => [])
        const conf = await confRes.json().catch(() => [])
        const fund = await fundRes.json().catch(() => [])
        const gigIncome = await gigIncomeRes.json().catch(() => [])

        if (cancelled) return
        setSheScore(typeof she?.score === 'number' ? she.score : null)
        setJobsCount(Array.isArray(jobs) ? jobs.length : 0)
        setMentorsCount(Array.isArray(mentors) ? mentors.length : 0)
        setConfidenceCount(Array.isArray(conf) ? conf.length : 0)
        setFundherCount(Array.isArray(fund) ? fund.length : 0)
        setGigsheIncomeCount(Array.isArray(gigIncome) ? gigIncome.length : 0)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const activityThisWeek = useMemo(() => {
    return confidenceCount + fundherCount + gigsheIncomeCount
  }, [confidenceCount, fundherCount, gigsheIncomeCount])

  const weeklyProgress = useMemo(() => {
    // 10 activities/week target -> 100%
    return Math.min(100, Math.round((activityThisWeek / 10) * 100))
  }, [activityThisWeek])

  const opportunitiesToday = useMemo(() => jobsCount + mentorsCount, [jobsCount, mentorsCount])

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h1
          className="font-display text-3xl font-medium text-[#f5f0e8] md:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {copy.title}
        </motion.h1>
        <p className="mt-2 font-subhead text-[#f5f0e8]/80" style={{ fontFamily: 'var(--font-subhead)' }}>
          {copy.subtitle}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="p-6">
              <p className="text-sm text-[#c9a84c]">{copy.weekly}</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#c9a84c" strokeWidth="2" strokeDasharray={`${weeklyProgress}, 100`} strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="font-display text-2xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
                    {loading ? '—' : `${weeklyProgress}%`}
                  </span>
                  <p className="text-xs text-[#f5f0e8]/60">{loading ? copy.loading : `${activityThisWeek} ${copy.actions}`}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <GlassCard className="p-6">
              <p className="text-sm text-[#c9a84c]">{copy.sheScore}</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#c9a84c] text-[#c9a84c] font-display text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  {loading ? '—' : (sheScore ?? '—')}
                </div>
                <span className="text-[#f5f0e8]/80">{copy.outOf}</span>
              </div>
            </GlassCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className="p-6">
              <p className="text-sm text-[#c9a84c]">{copy.opportunities}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
                  {loading ? '—' : opportunitiesToday}
                </span>
                <span className="text-sm text-[#f5f0e8]/60">
                  {loading ? copy.loading : copy.jobsMentors(jobsCount, mentorsCount)}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.h2
          className="mt-12 font-display text-xl font-medium text-[#f5f0e8]"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {copy.quick}
        </motion.h2>
        <motion.div
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {quickLinks.map((link) => {
            const card = (
              <GlassCard className="flex items-center gap-4 p-4">
                <div>
                  <p className="font-medium text-[#f5f0e8]">{link.title}</p>
                  <p className="text-sm text-[#f5f0e8]/60">{link.desc}</p>
                </div>
              </GlassCard>
            )

            if (link.href) {
              return (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {card}
                </a>
              )
            }

            return (
              <Link key={link.to} to={link.to}>
                {card}
              </Link>
            )
          })}
        </motion.div>
      </div>
    </main>
  )
}
