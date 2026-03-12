import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export function Hero() {
  const { language } = useLanguage()

  const copy = {
    en: {
      title: 'Every Woman Deserves a Career, a Voice, and a Future She Owns',
      subtitle: "The world's most comprehensive platform for women's career, safety, and financial empowerment.",
      ctaStart: 'Start Your Journey',
      ctaDashboard: 'Go to Dashboard',
    },
    hi: {
      title: 'हर महिला एक करियर, एक आवाज़ और अपना भविष्य डिज़र्व करती है',
      subtitle: 'महिलाओं के कैरियर, सुरक्षा और आर्थिक सशक्तिकरण के लिए एक ही समग्र प्लेटफ़ॉर्म।',
      ctaStart: 'अपनी यात्रा शुरू करें',
      ctaDashboard: 'डैशबोर्ड पर जाएँ',
    },
    ta: {
      title: 'ஒவ்வொரு பெண்ணுக்கும் ஒரு தொழில், ஒரு குரல், அவள் சொந்தமான எதிர்காலம் தேவை',
      subtitle: 'தொழில், பாதுகாப்பு மற்றும் நிதி சுயநிலைக்கான பெண்களுக்கான முழுமையான தளம்.',
      ctaStart: 'உங்கள் பயணத்தை தொடங்குங்கள்',
      ctaDashboard: 'டாஷ்போர்டுக்கு செல்லுங்கள்',
    },
    ml: {
      title: 'ഓരോ സ്ത്രീക്കും ഒരു കരിയർ, ഒരു ശബ്‌ദം, സ്വന്തം ഭാവി അർഹമാണ്',
      subtitle: 'സ്ത്രീകളുടെ കരിയർ, സുരക്ഷ, സാമ്പത്തിക ശക്തികരണം എന്നിവയ്ക്കുള്ള സമഗ്ര പ്ലാറ്റ്ഫോം.',
      ctaStart: 'നിങ്ങളുടെ യാത്ര തുടങ്ങൂ',
      ctaDashboard: 'ഡാഷ്ബോർഡിലേക്ക് പോകുക',
    },
  }[language] || copy?.en

  return (
    <section
      className="relative min-h-[100vh] w-full overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero"
    >
      {/* Parallax / gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_#c9a84c33,_transparent)]" />
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex min-h-[100vh] flex-col items-center justify-center px-4 py-20 text-center">
        <motion.h1
          className="max-w-4xl font-display text-4xl font-medium leading-tight tracking-tight text-[#f5f0e8] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {copy.title}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl font-subhead text-xl text-[#f5f0e8]/80 sm:text-2xl"
          style={{ fontFamily: 'var(--font-subhead)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {copy.subtitle}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/onboarding"
            className="rounded-sm bg-[#c9a84c] px-8 py-4 font-medium text-[#0a0a0a] transition-all hover:bg-[#d4b85c] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            {copy.ctaStart}
          </Link>
          <Link
            to="/dashboard"
            className="rounded-sm border border-[#c9a84c]/60 px-8 py-4 font-medium text-[#f5f0e8] transition-all hover:bg-[#c9a84c]/10"
          >
            {copy.ctaDashboard}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
