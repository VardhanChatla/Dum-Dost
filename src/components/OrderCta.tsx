import { useReveal } from '../hooks/useReveal'
import { useRipple } from '../hooks/useRipple'
import { buildWhatsAppLink, greetingMessage } from '../lib/whatsapp'

export default function OrderCta() {
  const ref = useReveal<HTMLDivElement>()
  const onRipple = useRipple()

  return (
    <section id="order" className="order-cta">
      <div ref={ref} className="order-cta__card reveal">
        <span className="order-cta__icon" aria-hidden="true">
          <span className="material-symbols-outlined">local_fire_department</span>
        </span>
        <h2>Hungry yet?</h2>
        <p>
          Tap below to chat with us on WhatsApp — tell us what you're craving
          and we'll take it from there.
        </p>
        <a
          className="btn btn--primary btn--large ripple-btn"
          href={buildWhatsAppLink(greetingMessage())}
          target="_blank"
          rel="noreferrer"
          onClick={onRipple}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            chat
          </span>
          Chat &amp; Order on WhatsApp
        </a>
        <span className="order-cta__number">+91 99870 08585</span>
      </div>
    </section>
  )
}
