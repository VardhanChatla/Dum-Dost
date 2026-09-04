import { useEffect } from 'react'
import { dishes } from '../data/dishes'
import { useOrder } from '../order/useOrder'
import { useRipple } from '../hooks/useRipple'
import { parseLineItemKey, portionLabel } from '../order/lineItem'

export default function OrderBar() {
  const { quantities, totalCount, totalPrice, whatsAppLink, openSummary } = useOrder()
  const onRipple = useRipple()

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

  return (
    <div id="order-bar" className="order-bar">
      <div className="order-bar__inner">
        <button type="button" className="order-bar__items order-bar__items--button" onClick={openSummary}>
          {lineItems.map(({ key, dish, portion, qty }) => (
            <span className="order-bar__chip" key={key}>
              {dish.name} <em>{portionLabel(portion)}</em> ×{qty}
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
            onClick={onRipple}
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
