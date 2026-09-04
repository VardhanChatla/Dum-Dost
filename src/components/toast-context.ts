import { createContext } from 'react'

export interface ToastContextValue {
  showToast: (title: string, subtitle: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
