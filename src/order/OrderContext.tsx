import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { addOns, dishes, freebies, FREE_COKE_ID } from '../data/dishes'
import type { Portion } from '../data/dishes'
import { buildWhatsAppLink, orderSummaryMessage } from '../lib/whatsapp'
import { formatDeliveryTime, isDeliveryTimeValid as checkDeliveryTimeValid } from '../lib/deliveryTime'
import { getDeliveryFee } from '../lib/deliveryFee'
import { FREEBIES_ENABLED } from '../lib/freebieConfig'
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

  const dishItemCount = useMemo(
    () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
    [quantities],
  )

  // Derived, not stored state: the freebie is present whenever the promo is on and
  // at least one dish is in the order — never user-addable/removable directly.
  const freebieQuantities = useMemo<Record<string, number>>(
    () => (FREEBIES_ENABLED && dishItemCount > 0 ? { [FREE_COKE_ID]: 1 } : ({} as Record<string, number>)),
    [dishItemCount],
  )

  const totalCount = useMemo(
    () =>
      dishItemCount +
      Object.values(addOnQuantities).reduce((sum, qty) => sum + qty, 0) +
      Object.values(freebieQuantities).reduce((sum, qty) => sum + qty, 0),
    [dishItemCount, addOnQuantities, freebieQuantities],
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
    for (const [freebieId, qty] of Object.entries(freebieQuantities)) {
      const freebie = freebies.find((f) => f.id === freebieId)
      if (freebie) sum += freebie.price * qty
    }
    return sum
  }, [quantities, addOnQuantities, freebieQuantities])

  const deliveryFee = useMemo(() => getDeliveryFee(totalPrice), [totalPrice])
  const grandTotal = totalPrice + deliveryFee

  const isDeliveryTimeValid = checkDeliveryTimeValid(deliveryTime)
  const deliveryTimeLabel = deliveryTime ? formatDeliveryTime(deliveryTime) : ''

  const whatsAppLink = useMemo(
    () =>
      buildWhatsAppLink(
        orderSummaryMessage(
          dishes,
          quantities,
          addOns,
          addOnQuantities,
          deliveryTimeLabel,
          deliveryFee,
          freebies,
          freebieQuantities,
        ),
      ),
    [quantities, addOnQuantities, freebieQuantities, deliveryTimeLabel, deliveryFee],
  )

  return (
    <OrderContext.Provider
      value={{
        quantities,
        addOnQuantities,
        freebieQuantities,
        totalCount,
        totalPrice,
        deliveryFee,
        grandTotal,
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
