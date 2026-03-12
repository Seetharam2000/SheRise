import { useLanguage } from '../../context/LanguageContext'

const LABELS = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  ml: 'മലയാളം',
}

export function LanguageChip() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#f5f0e8]/80">
      <span className="uppercase tracking-wide text-[0.65rem] text-[#c9a84c]">Language</span>
      <select
        className="bg-transparent text-xs text-[#f5f0e8] outline-none"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select app language"
      >
        <option value="en">{LABELS.en}</option>
        <option value="hi">{LABELS.hi}</option>
        <option value="ta">{LABELS.ta}</option>
        <option value="ml">{LABELS.ml}</option>
      </select>
    </div>
  )
}

