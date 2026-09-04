import { useReveal } from '../hooks/useReveal'
import { useRipple } from '../hooks/useRipple'
import { buildWhatsAppLink, partyOrderMessage } from '../lib/whatsapp'

export default function GroupOrders() {
  const ref = useReveal<HTMLDivElement>()
  const onRipple = useRipple()

  return (
    <section className="group-orders">
      <div ref={ref} className="group-orders__card reveal">
        <div className="group-orders__text">
          <span className="section-heading__eyebrow">Group &amp; Party Orders</span>
          <h2>Hosting a get-together?</h2>
          <p>
            Movie night, office lunch or a flat party — message us ahead of
            time and we'll sort out quantities and timing for a crowd.
          </p>
          <div className="group-orders__tags">
            <span>
              <span className="material-symbols-outlined">groups</span> Any group size
            </span>
            <span>
              <span className="material-symbols-outlined">schedule</span> Pre-order ahead
            </span>
          </div>
        </div>
        <a
          className="btn btn--primary btn--large ripple-btn"
          href={buildWhatsAppLink(partyOrderMessage())}
          target="_blank"
          rel="noreferrer"
          onClick={onRipple}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            celebration
          </span>
          Ask About Group Orders
        </a>
      </div>
    </section>
  )
}
