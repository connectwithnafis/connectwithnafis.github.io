import { useCallback, useEffect, useState } from 'react'

/**
 * Light/dark theme hook.
 * - Initial value matches the inline <head> script (stored pref → system pref)
 *   so there is no flash on first paint.
 * - Persists the choice to localStorage and toggles the `.dark` class on <html>.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    // Default to LIGHT; only honour an explicit stored choice.
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, toggleTheme }
}
