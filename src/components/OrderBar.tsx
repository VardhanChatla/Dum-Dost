import { useEffect } from 'react'
import { addOns, dishes } from '../data/dishes'
import { useOrder } from '../order/useOrder'
import { useRipple } from '../hooks/useRipple'
import { useToast } from './useToast'
import { parseLineItemKey, portionLabel } from '../order/lineItem'

export default function OrderBar() {
  const {
    quantities,
    addOnQuantities,
    totalCount,
    totalPrice,
    isDeliveryTimeValid,
    whatsAppLink,
    openSummary,
  } = useOrder()
  const onRipple = useRipple()
  const { showToast } = useToast()

  useEffect(() => {
    document.body.classList.toggle('has-order-bar', totalCount > 0)
    return () => document.body.classList.remove('has-order-bar')
  }, [totalCount])

  if (totalCount === 0) return null

  const lineItems = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { dishId, portion } = parseLineItemKey(key)
      const dish = dishes.find((d) => d.id === dishId)
      return dish ? { key, dish, portion, qty } : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  const addOnItems = Object.entries(addOnQuantities)
    .filter(([, qty]) => qty > 0)
    .map(([addOnId, qty]) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      return addOn ? { addOnId, addOn, qty } : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  return (
    <div id="order-bar" className="order-bar">
      <div className="order-bar__inner">
        <button type="button" className="order-bar__items order-bar__items--button" onClick={openSummary}>
          {lineItems.map(({ key, dish, portion, qty }) => (
            <span className="order-bar__chip" key={key}>
              {dish.name} <em>{portionLabel(portion)}</em> ×{qty}
            </span>
          ))}
          {addOnItems.map(({ addOnId, addOn, qty }) => (
            <span className="order-bar__chip" key={addOnId}>
              {addOn.name} ×{qty}
            </span>
          ))}
          <span className="order-bar__view-link">
            View order <span className="material-symbols-outlined">north_east</span>
          </span>
        </button>

        <div className="order-bar__summary">
          <div className="order-bar__total">
            <span>{totalCount} item{totalCount > 1 ? 's' : ''}</span>
            <strong>₹{totalPrice}</strong>
          </div>
          <a
            className="btn btn--primary ripple-btn"
            href={whatsAppLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (!isDeliveryTimeValid) {
                e.preventDefault()
                openSummary()
                showToast('Pick a delivery time', 'Select a date & time before sending your order.')
                return
              }
              onRipple(e)
            }}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              chat
            </span>
            Send Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
