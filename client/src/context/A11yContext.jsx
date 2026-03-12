import { createContext, useContext, useState, useEffect } from 'react'

const A11yContext = createContext({
  highContrast: false,
  setHighContrast: () => {},
  fontSize: 'normal',
  setFontSize: () => {},
  reducedMotion: false,
  setReducedMotion: () => {},
})

export function A11yProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sherise-highContrast') === 'true'
    }
    return false
  })
  const [fontSize, setFontSizeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sherise-fontSize') || 'normal'
    }
    return 'normal'
  })
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches || localStorage.getItem('sherise-reducedMotion') === 'true'
    }
    return false
  })

  useEffect(() => {
    document.body.classList.remove('high-contrast', 'font-large', 'font-xlarge')
    if (highContrast) document.body.classList.add('high-contrast')
    if (fontSize === 'large') document.body.classList.add('font-large')
    if (fontSize === 'xlarge') document.body.classList.add('font-xlarge')
    if (typeof window !== 'undefined') {
      localStorage.setItem('sherise-highContrast', highContrast)
      localStorage.setItem('sherise-fontSize', fontSize)
    }
  }, [highContrast, fontSize])

  const setFontSize = (s) => setFontSizeState(s === 'large' || s === 'xlarge' ? s : 'normal')

  return (
    <A11yContext.Provider value={{
      highContrast, setHighContrast,
      fontSize, setFontSize,
      reducedMotion, setReducedMotion,
    }}>
      {children}
    </A11yContext.Provider>
  )
}

export function useA11y() {
  return useContext(A11yContext)
}
