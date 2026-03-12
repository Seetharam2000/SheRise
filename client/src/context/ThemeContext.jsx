import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sherise-theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    if (typeof window !== 'undefined') localStorage.setItem('sherise-theme', theme)
  }, [theme])

  const setTheme = (t) => setThemeState(t === 'light' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
