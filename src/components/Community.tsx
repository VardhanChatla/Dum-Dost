import { useReveal } from '../hooks/useReveal'
import { useRipple } from '../hooks/useRipple'
import { WHATSAPP_COMMUNITY_LINK } from '../lib/whatsapp'
import communityQr from '../assets/Community QR.png'

export default function Community() {
  const ref = useReveal<HTMLDivElement>()
  const onRipple = useRipple()

  return (
    <section className="community">
      <div ref={ref} className="community__card reveal">
        <div className="community__text">
          <span className="section-heading__eyebrow">Join Our Community</span>
          <h2>Never miss an update</h2>
          <p>
            Join our WhatsApp community for announcements, offers and
            day-to-day availability — scan the QR or tap the button to join.
          </p>
          <a
            className="btn btn--primary btn--large ripple-btn"
            href={WHATSAPP_COMMUNITY_LINK}
            target="_blank"
            rel="noreferrer"
            onClick={onRipple}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              groups
            </span>
            Join WhatsApp Community
          </a>
        </div>
        <img
          className="community__qr"
          src={communityQr}
          alt="QR code to join the Dum Dost WhatsApp community"
          width={220}
          height={220}
        />
      </div>
    </section>
  )
}
