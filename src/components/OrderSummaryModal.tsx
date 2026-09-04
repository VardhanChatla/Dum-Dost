import { useEffect } from 'react'
import { dishes } from '../data/dishes'
import { useOrder } from '../order/useOrder'
import { dishPrice, parseLineItemKey, portionLabel } from '../order/lineItem'
import { useRipple } from '../hooks/useRipple'

export default function OrderSummaryModal() {
  const { quantities, totalCount, totalPrice, addItem, removeItem, whatsAppLink, summaryOpen, closeSummary } =
    useOrder()
  const onRipple = useRipple()

  useEffect(() => {
    if (!summaryOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSummary()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [summaryOpen, closeSummary])

  if (!summaryOpen) return null

  const lineItems = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { dishId, portion } = parseLineItemKey(key)
      const dish = dishes.find((d) => d.id === dishId)
      return dish ? { key, dish, portion, qty } : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  return (
    <div className="summary-overlay" onClick={closeSummary}>
      <div
        className="summary-card"
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="summary-card__header">
          <h2>Your Order</h2>
          <button
            type="button"
            className="summary-card__close"
            aria-label="Close order summary"
            onClick={closeSummary}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {lineItems.length === 0 ? (
          <div className="summary-card__empty">
            <span className="material-symbols-outlined">ramen_dining</span>
            <p>Your order is empty. Add a biryani to get started!</p>
          </div>
        ) : (
          <div className="summary-card__list">
            {lineItems.map(({ key, dish, portion, qty }) => {
              const unitPrice = dishPrice(dish, portion)
              return (
                <div className="summary-item" key={key}>
                  <img src={dish.image} alt={dish.name} className="summary-item__image" />
                  <div className="summary-item__info">
                    <strong>{dish.name}</strong>
                    <span className="summary-item__portion">{portionLabel(portion)} · ₹{unitPrice} each</span>
                  </div>
                  <div className="summary-item__controls">
                    <div className="order-bar__stepper">
                      <button type="button" aria-label={`Remove one ${dish.name} ${portionLabel(portion)}`} onClick={() => removeItem(key)}>
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span>{qty}</span>
                      <button type="button" aria-label={`Add one ${dish.name} ${portionLabel(portion)}`} onClick={() => addItem(dish.id, portion)}>
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                    <span className="summary-item__line-price">₹{unitPrice * qty}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="summary-card__footer">
          <div className="summary-card__total">
            <span>{totalCount} item{totalCount === 1 ? '' : 's'}</span>
            <strong>₹{totalPrice}</strong>
          </div>
          <a
            className={`btn btn--primary btn--large ripple-btn ${lineItems.length === 0 ? 'is-disabled' : ''}`}
            href={whatsAppLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (lineItems.length === 0) {
                e.preventDefault()
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
