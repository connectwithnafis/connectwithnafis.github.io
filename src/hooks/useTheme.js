import { useCallback, useEffect, useState } from 'react'

/**
 * Light/dark theme hook.
 * - Initial value matches the inline <head> script (stored pref → system pref)
 *   so there is no flash on first paint.
 * - Persists the choice to localStorage and toggles the `.dark` class on <html>.
 */
export function useTheme() {
  // Always start in LIGHT on every load. Dark is an in-session, opt-in
  // toggle only — never auto-restored — so the site always opens light/white.
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, toggleTheme }
}
