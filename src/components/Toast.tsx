import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ToastContext } from './toast-context'

interface ToastData {
  title: string
  subtitle: string
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastData | null>(null)
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)

  const showToast = useCallback((title: string, subtitle: string) => {
    window.clearTimeout(timeoutRef.current)
    setToast({ title, subtitle })
    setVisible(true)
    timeoutRef.current = window.setTimeout(() => setVisible(false), 2600)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toast ${visible ? 'toast--visible' : ''}`} role="status" aria-live="polite">
        <span className="toast__check" aria-hidden="true">
          <span className="material-symbols-outlined">check</span>
        </span>
        <div>
          <p className="toast__title">{toast?.title}</p>
          <p className="toast__subtitle">{toast?.subtitle}</p>
        </div>
      </div>
    </ToastContext.Provider>
  )
}
