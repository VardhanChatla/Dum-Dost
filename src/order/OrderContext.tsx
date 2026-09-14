import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { addOns, dishes } from '../data/dishes'
import type { Portion } from '../data/dishes'
import { buildWhatsAppLink, orderSummaryMessage } from '../lib/whatsapp'
import { formatDeliveryTime, isDeliveryTimeValid as checkDeliveryTimeValid } from '../lib/deliveryTime'
import { dishPrice, lineItemKey, parseLineItemKey } from './lineItem'
import { OrderContext } from './order-context'

export function OrderProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [addOnQuantities, setAddOnQuantities] = useState<Record<string, number>>({})
  const [deliveryTime, setDeliveryTime] = useState('')
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

  const addAddOn = (addOnId: string) => {
    setAddOnQuantities((prev) => ({ ...prev, [addOnId]: (prev[addOnId] ?? 0) + 1 }))
  }

  const removeAddOn = (addOnId: string) => {
    setAddOnQuantities((prev) => {
      const current = prev[addOnId] ?? 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[addOnId]
        return next
      }
      return { ...prev, [addOnId]: current - 1 }
    })
  }

  const totalCount = useMemo(
    () =>
      Object.values(quantities).reduce((sum, qty) => sum + qty, 0) +
      Object.values(addOnQuantities).reduce((sum, qty) => sum + qty, 0),
    [quantities, addOnQuantities],
  )

  const totalPrice = useMemo(() => {
    let sum = 0
    for (const [key, qty] of Object.entries(quantities)) {
      const { dishId, portion } = parseLineItemKey(key)
      const dish = dishes.find((d) => d.id === dishId)
      if (dish) sum += dishPrice(dish, portion) * qty
    }
    for (const [addOnId, qty] of Object.entries(addOnQuantities)) {
      const addOn = addOns.find((a) => a.id === addOnId)
      if (addOn) sum += addOn.price * qty
    }
    return sum
  }, [quantities, addOnQuantities])

  const isDeliveryTimeValid = checkDeliveryTimeValid(deliveryTime)
  const deliveryTimeLabel = deliveryTime ? formatDeliveryTime(deliveryTime) : ''

  const whatsAppLink = useMemo(
    () =>
      buildWhatsAppLink(
        orderSummaryMessage(dishes, quantities, addOns, addOnQuantities, deliveryTimeLabel),
      ),
    [quantities, addOnQuantities, deliveryTimeLabel],
  )

  return (
    <OrderContext.Provider
      value={{
        quantities,
        addOnQuantities,
        totalCount,
        totalPrice,
        addItem,
        removeItem,
        addAddOn,
        removeAddOn,
        deliveryTime,
        setDeliveryTime,
        isDeliveryTimeValid,
        deliveryTimeLabel,
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
