import type { MouseEvent } from 'react'
import { addOns } from '../data/dishes'
import { useOrder } from '../order/useOrder'
import { useRipple } from '../hooks/useRipple'

export default function AddOns() {
  const { addOnQuantities, addAddOn, removeAddOn } = useOrder()
  const onRipple = useRipple()

  const handleAdd = (event: MouseEvent<HTMLButtonElement>, addOnId: string) => {
    onRipple(event)
    addAddOn(addOnId)
  }

  return (
    <div className="addon-section">
      <h3 className="addon-section__title">Add-ons</h3>
      <p className="addon-section__hint">Top up your biryani with extras.</p>

      <div className="addon-list">
        {addOns.map((addOn) => {
          const qty = addOnQuantities[addOn.id] ?? 0
          return (
            <div className="addon-card" key={addOn.id}>
              <div className="addon-card__info">
                <span className="addon-card__name">{addOn.name}</span>
                <span className="addon-card__desc">{addOn.description}</span>
              </div>

              {qty > 0 ? (
                <div className="order-bar__stepper">
                  <button
                    type="button"
                    aria-label={`Remove one ${addOn.name}`}
                    onClick={() => removeAddOn(addOn.id)}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    aria-label={`Add one more ${addOn.name}`}
                    onClick={(e) => handleAdd(e, addOn.id)}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="addon-card__add ripple-btn"
                  onClick={(e) => handleAdd(e, addOn.id)}
                >
                  Add ₹{addOn.price}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
