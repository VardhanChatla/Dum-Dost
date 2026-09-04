import { createContext } from 'react'
import type { Portion } from '../data/dishes'

export interface OrderContextValue {
  quantities: Record<string, number>
  totalCount: number
  totalPrice: number
  addItem: (dishId: string, portion: Portion) => void
  removeItem: (lineKey: string) => void
  whatsAppLink: string
  summaryOpen: boolean
  openSummary: () => void
  closeSummary: () => void
}

export const OrderContext = createContext<OrderContextValue | null>(null)
