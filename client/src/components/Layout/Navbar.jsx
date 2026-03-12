import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useA11y } from '../../context/A11yContext'
import { useLanguage } from '../../context/LanguageContext'

const baseLinks = [
  { to: '/', key: 'home' },
  { to: '/dashboard', key: 'dashboard' },
  { to: '/restart', key: 'restart' },
  { to: '/network', key: 'network' },
  { to: '/skillbridge', key: 'skillbridge' },
  { to: '/confidence', key: 'confidence' },
  { to: '/jobs', key: 'jobs' },
  { to: '/simulate', key: 'simulate' },
  { to: '/fundher', key: 'fundher' },
  { to: '/biasdetect', key: 'biasdetect' },
  { to: '/kalashop', key: 'kalashop' },
  { to: '/assether', key: 'assether' },
  { to: '/aisakhi', key: 'aisakhi' },
  { to: '/shescore', key: 'shescore' },
  { to: '/gigshe', key: 'gigshe' },
  { to: '/safety', key: 'safety' },
  { to: '/volunteer', key: 'volunteer' },
]

const labels = {
  en: {
    start: 'Start Journey',
    dashboard: 'Dashboard',
    features: 'Features',
    home: 'Home',
    restart: 'ReStart',
    network: 'SheNetwork',
    skillbridge: 'SkillBridge',
    confidence: 'ConfidenceOS',
    jobs: 'SafeCareer',
    simulate: 'SimuLearn',
    fundher: 'FundHer',
    biasdetect: 'BiasDetect',
    kalashop: 'KalaShop',
    assether: 'AssetHer',
    aisakhi: 'AI Sakhi',
    shescore: 'SheScore',
    gigshe: 'GigShe',
    safety: 'DroneWatch',
    volunteer: 'Volunteer',
  },
  hi: {
    start: 'यात्रा शुरू करें',
    dashboard: 'डैशबोर्ड',
    features: 'फ़ीचर्स',
    home: 'होम',
    restart: 'रीस्टार्ट',
    network: 'शी-नेटवर्क',
    skillbridge: 'स्किलब्रिज',
    confidence: 'कॉनफ़िडेंसOS',
    jobs: 'सेफ़ करियर',
    simulate: 'सिम्यूलर्न',
    fundher: 'फ़ंडहर',
    biasdetect: 'बायसडिटेक्ट',
    kalashop: 'कला-शॉप',
    assether: 'एसेटहर',
    aisakhi: 'एआई सखी',
    shescore: 'शीस्कोर',
    gigshe: 'गिगशी',
    safety: 'ड्रोनवॉच',
    volunteer: 'स्वयंसेवक',
  },
  ta: {
    start: 'பயணத்தை தொடங்குங்கள்',
    dashboard: 'டாஷ்போர்டு',
    features: 'வசதிகள்',
    home: 'முகப்பு',
    restart: 'ரீஸ்டார்ட்',
    network: 'SheNetwork',
    skillbridge: 'SkillBridge',
    confidence: 'ConfidenceOS',
    jobs: 'சேஃப் கேரியர்',
    simulate: 'SimuLearn',
    fundher: 'FundHer',
    biasdetect: 'BiasDetect',
    kalashop: 'KalaShop',
    assether: 'AssetHer',
    aisakhi: 'AI Sakhi',
    shescore: 'SheScore',
    gigshe: 'GigShe',
    safety: 'DroneWatch',
    volunteer: 'Volunteer',
  },
  ml: {
    start: 'യാത്ര തുടങ്ങി',
    dashboard: 'ഡാഷ്ബോർഡ്',
    features: 'ഫീച്ചറുകൾ',
    home: 'ഹോം',
    restart: 'റീസ്റ്റാർട്ട്',
    network: 'SheNetwork',
    skillbridge: 'SkillBridge',
    confidence: 'ConfidenceOS',
    jobs: 'സേഫ് കരിയർ',
    simulate: 'SimuLearn',
    fundher: 'FundHer',
    biasdetect: 'BiasDetect',
    kalashop: 'KalaShop',
    assether: 'AssetHer',
    aisakhi: 'AI Sakhi',
    shescore: 'SheScore',
    gigshe: 'GigShe',
    safety: 'DroneWatch',
    volunteer: 'സ്വयंസേവകൻ',
  },
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { highContrast, setHighContrast, fontSize, setFontSize } = useA11y()
  const location = useLocation()
  const { language } = useLanguage()

  const dict = labels[language] || labels.en
  const navLinks = baseLinks.map((l) => ({ ...l, label: dict[l.key] || l.key }))

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md dark:bg-[#0a0a0a]/90"
      role="banner"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6" aria-label="Main navigation">
        {/* Logo - center on desktop via order */}
        <div className="flex flex-1 items-center justify-start md:order-2 md:flex-none md:justify-center">
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tight text-[#f5f0e8] hover:text-[#c9a84c] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SheRise
          </Link>
        </div>

        {/* Desktop: Features dropdown + key links */}
        <div className="hidden flex-1 items-center justify-end gap-6 lg:flex md:order-3">
          <Link to="/onboarding" className="text-sm text-[#f5f0e8]/80 hover:text-[#c9a84c] transition-colors">
            {dict.start}
          </Link>
          <Link to="/dashboard" className="text-sm text-[#f5f0e8]/80 hover:text-[#c9a84c] transition-colors">
            {dict.dashboard}
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="text-sm text-[#f5f0e8]/80 hover:text-[#c9a84c] transition-colors"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {dict.features}
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-white/10 bg-[#111] p-2 shadow-xl"
                >
                  {navLinks.filter((l) => l.to !== '/' && l.to !== '/dashboard').map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setDropdownOpen(false)}
                      className={`block rounded px-3 py-2 text-sm ${location.pathname === link.to ? 'text-[#c9a84c]' : 'text-[#f5f0e8]/80 hover:bg-white/5 hover:text-[#c9a84c]'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full p-2 text-[#f5f0e8]/80 hover:bg-white/10 hover:text-[#c9a84c]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="relative" aria-label="Accessibility options">
            <button
              onClick={() => setDropdownOpen(false)}
              className="rounded-full p-2 text-[#f5f0e8]/80 hover:bg-white/10 hover:text-[#c9a84c]"
              aria-label="Accessibility"
            >
              ♿
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex flex-1 justify-end md:order-1 lg:hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded p-2 text-[#f5f0e8] hover:bg-white/10"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#0a0a0a] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <Link to="/onboarding" onClick={() => setOpen(false)} className="rounded py-2 text-[#f5f0e8] hover:bg-white/10">
                {dict.start}
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded py-2 text-[#f5f0e8] hover:bg-white/10">
                {dict.dashboard}
              </Link>
              {navLinks.filter((l) => l.to !== '/' && l.to !== '/dashboard').slice(0, 8).map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded py-2 text-[#f5f0e8]/80 hover:bg-white/10">
                  {link.label}
                </Link>
              ))}
              <Link to="/safety" onClick={() => setOpen(false)} className="rounded py-2 text-[#f5f0e8]/80 hover:bg-white/10">
                DroneWatch
              </Link>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded bg-white/10 px-3 py-2 text-sm">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
                <button onClick={() => setHighContrast(!highContrast)} className="rounded bg-white/10 px-3 py-2 text-sm">
                  High contrast
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
