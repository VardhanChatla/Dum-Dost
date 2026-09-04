import { dishes } from '../data/dishes'
import DishCard from './DishCard'
import { useReveal } from '../hooks/useReveal'

export default function Menu() {
  const headingRef = useReveal<HTMLDivElement>()

  return (
    <section id="menu" className="menu">
      <div ref={headingRef} className="section-heading reveal">
        <span className="section-heading__eyebrow">The Menu</span>
        <h2>Three biryanis. Zero compromises.</h2>
        <p>
          We keep it small on purpose — every pot gets the attention it
          deserves. Tap a card to add it to your WhatsApp order.
        </p>
      </div>

      <div className="menu__grid">
        {dishes.map((dish, index) => (
          <DishCard key={dish.id} dish={dish} index={index} />
        ))}
      </div>
    </section>
  )
}
