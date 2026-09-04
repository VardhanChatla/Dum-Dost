import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { dishes } from '../data/dishes'
import type { Portion } from '../data/dishes'
import { buildWhatsAppLink, orderSummaryMessage } from '../lib/whatsapp'
import { dishPrice, lineItemKey, parseLineItemKey } from './lineItem'
import { OrderContext } from './order-context'

export function OrderProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [summaryOpen, setSummaryOpen] = useState(false)

  const addItem = (dishId: string, portion: Portion) => {
    const key = lineItemKey(dishId, portion)
    setQuantities((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }))
  }

  const removeItem = (lineKey: string) => {
    setQuantities((prev) => {
      const current = prev[lineKey] ?? 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[lineKey]
        return next
      }
      return { ...prev, [lineKey]: current - 1 }
    })
  }

  const totalCount = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities],
  )

  const totalPrice = useMemo(() => {
    let sum = 0
    for (const [key, qty] of Object.entries(quantities)) {
      const { dishId, portion } = parseLineItemKey(key)
      const dish = dishes.find((d) => d.id === dishId)
      if (dish) sum += dishPrice(dish, portion) * qty
    }
    return sum
  }, [quantities])

  const whatsAppLink = useMemo(
    () => buildWhatsAppLink(orderSummaryMessage(dishes, quantities)),
    [quantities],
  )

  return (
    <OrderContext.Provider
      value={{
        quantities,
        totalCount,
        totalPrice,
        addItem,
        removeItem,
        whatsAppLink,
        summaryOpen,
        openSummary: () => setSummaryOpen(true),
        closeSummary: () => setSummaryOpen(false),
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
