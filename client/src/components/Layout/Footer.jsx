import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useA11y } from '../../context/A11yContext'
import { useLanguage } from '../../context/LanguageContext'

const footerLinks = [
  { to: '/restart', label: 'ReStart' },
  { to: '/network', label: 'SheNetwork' },
  { to: '/jobs', label: 'SafeCareer' },
  { to: '/fundher', label: 'FundHer' },
  { to: '/safety', label: 'DroneWatch' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/vaani', label: 'VaaniBot' },
]
const legal = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export function Footer() {
  const { theme, setTheme } = useTheme()
  const { highContrast, setHighContrast, fontSize, setFontSize } = useA11y()
  const { language, setLanguage } = useLanguage()

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
              SheRise
            </p>
            <p className="mt-2 text-sm text-[#f5f0e8]/70">
              Every woman deserves a career, a voice, and a future she owns.
            </p>
          </div>
          <div>
            <h3 className="font-subhead text-sm font-semibold uppercase tracking-wider text-[#c9a84c]" style={{ fontFamily: 'var(--font-subhead)' }}>
              Features
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-[#f5f0e8]/70 hover:text-[#c9a84c] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-subhead text-sm font-semibold uppercase tracking-wider text-[#c9a84c]" style={{ fontFamily: 'var(--font-subhead)' }}>
              Accessibility
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-sm text-[#f5f0e8]/70 hover:text-[#c9a84c]">
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
              </li>
              <li>
                <button onClick={() => setHighContrast(!highContrast)} className="text-sm text-[#f5f0e8]/70 hover:text-[#c9a84c]">
                  High contrast
                </button>
              </li>
              <li>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="bg-transparent text-sm text-[#f5f0e8]/70 focus:text-[#c9a84c] border border-white/20 rounded px-2 py-1"
                  aria-label="Font size"
                >
                  <option value="normal">Normal text</option>
                  <option value="large">Large text</option>
                  <option value="xlarge">Larger text</option>
                </select>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-subhead text-sm font-semibold uppercase tracking-wider text-[#c9a84c]" style={{ fontFamily: 'var(--font-subhead)' }}>
              Language
            </h3>
            <select
              className="mt-3 rounded border border-white/20 bg-[#111] px-3 py-2 text-sm text-[#f5f0e8]"
              aria-label="Select language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="ml">മലയാളം</option>
            </select>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-6">
            <Link to="/admin" className="text-sm text-[#f5f0e8]/60 hover:text-[#c9a84c]">Admin</Link>
            {legal.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-[#f5f0e8]/60 hover:text-[#c9a84c]">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-[#f5f0e8]/50">© {new Date().getFullYear()} SheRise. For her. By her.</p>
        </div>
      </div>
    </footer>
  )
}
