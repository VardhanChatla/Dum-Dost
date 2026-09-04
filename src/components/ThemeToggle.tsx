import { useState } from 'react'
import { useTheme } from '../theme/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [flipped, setFlipped] = useState(false)

  const handleClick = () => {
    setFlipped(true)
    toggleTheme()
    window.setTimeout(() => setFlipped(false), 450)
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle dark and light mode"
      onClick={handleClick}
    >
      <span className={`material-symbols-outlined theme-toggle__icon ${flipped ? 'is-flipped' : ''}`}>
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
      <span className="theme-toggle__label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
