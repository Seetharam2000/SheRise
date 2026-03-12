import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
})

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sherise-language') || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sherise-language', language)
      // Update document lang attribute so the site language is reflected globally
      const langCode = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'ml' ? 'ml-IN' : 'en-IN'
      document.documentElement.setAttribute('lang', langCode)
    }
  }, [language])

  const setLanguage = (code) => {
    if (['en', 'hi', 'ta', 'ml'].includes(code)) setLanguageState(code)
    else setLanguageState('en')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

