import { useContext } from 'react'
import { OrderContext } from './order-context'
import type { OrderContextValue } from './order-context'

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}
