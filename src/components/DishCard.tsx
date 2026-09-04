import { useState } from 'react'
import type { MouseEvent } from 'react'
import type { Dish, Portion } from '../data/dishes'
import { useReveal } from '../hooks/useReveal'
import { useRipple } from '../hooks/useRipple'
import { useTilt } from '../hooks/useTilt'
import { useOrder } from '../order/useOrder'
import { dishPrice, lineItemKey, portionLabel } from '../order/lineItem'
import { useToast } from './useToast'

export default function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const ref = useReveal<HTMLDivElement>()
  const onRipple = useRipple()
  const { onMouseMove, onMouseLeave } = useTilt()
  const { addItem, quantities } = useOrder()
  const { showToast } = useToast()
  const [portion, setPortion] = useState<Portion>('full')
  const [justAdded, setJustAdded] = useState(false)

  const price = dishPrice(dish, portion)

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    onRipple(event)
    addItem(dish.id, portion)
    showToast(`${dish.name} (${portionLabel(portion)}) added!`, `₹${price} · added to your WhatsApp order`)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1400)
  }

  const inOrder =
    (quantities[lineItemKey(dish.id, 'half')] ?? 0) + (quantities[lineItemKey(dish.id, 'full')] ?? 0)

  return (
    <div
      ref={ref}
      className="dish-card tilt-card reveal"
      style={{ transitionDelay: `${index * 90}ms` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="dish-card__image-wrap">
        <img src={dish.image} alt={`${dish.name} — ${dish.tagline}`} className="dish-card__image" />
        {inOrder > 0 && (
          <span className="dish-card__in-order">
            <span className="material-symbols-outlined">check</span>
            {inOrder} in order
          </span>
        )}
      </div>

      <div className="dish-card__body">
        <h3 className="dish-card__name">{dish.name}</h3>
        <p className="dish-card__desc">{dish.description}</p>

        <div className="portion-toggle" role="group" aria-label={`Portion size for ${dish.name}`}>
          <button
            type="button"
            className={portion === 'half' ? 'is-active' : ''}
            onClick={() => setPortion('half')}
          >
            Half <span>₹{dish.priceHalf}</span>
          </button>
          <button
            type="button"
            className={portion === 'full' ? 'is-active' : ''}
            onClick={() => setPortion('full')}
          >
            Full <span>₹{dish.priceFull}</span>
          </button>
        </div>

        <div className="dish-card__meta">
          <span className="dish-card__price">₹{price}</span>
          <span className="dish-card__spice" title="Spice level">
            {Array.from({ length: 3 }, (_, i) => (
              <span
                key={i}
                className={`material-symbols-outlined ${i < dish.spiceLevel ? 'is-active' : ''}`}
              >
                local_fire_department
              </span>
            ))}
          </span>
        </div>

        <button
          type="button"
          className={`btn btn--primary btn--full ripple-btn add-btn ${justAdded ? 'is-added' : ''}`}
          onClick={handleAdd}
        >
          <span className="material-symbols-outlined">{justAdded ? 'done' : 'add'}</span>
          {justAdded ? 'Added' : `Add ${portionLabel(portion)} — ₹${price}`}
        </button>
      </div>
    </div>
  )
}
