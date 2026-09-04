import { useReveal } from '../hooks/useReveal'
import { useRipple } from '../hooks/useRipple'
import { buildWhatsAppLink, greetingMessage } from '../lib/whatsapp'

const steps = [
  {
    icon: 'chat',
    title: 'Message Us on WhatsApp',
    text: 'Tell us what you\'re craving — Dum, Seekh or Tikka biryani — and how many boxes you need.',
  },
  {
    icon: 'task_alt',
    title: 'We Confirm & Start Cooking',
    text: 'We\'ll confirm price, quantity and timing, then get the pot on the stove.',
  },
  {
    icon: 'moped',
    title: 'Hot Handoff',
    text: 'Pickup or delivery, straight from the kitchen — sealed hot and ready to eat.',
  },
]

export default function HowItWorks() {
  const ref = useReveal<HTMLDivElement>()
  const onRipple = useRipple()

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-it-works__inner">
        <div ref={ref} className="reveal">
          <span className="section-heading__eyebrow">How to Order</span>
          <h2>No app. No login. Just WhatsApp.</h2>
          <p className="how-it-works__intro">
            We keep ordering as simple as texting a friend — because that's
            exactly what we are.
          </p>

          <div className="how-it-works__steps">
            {steps.map((step, i) => (
              <div className="how-it-works__step" key={step.title}>
                <span className="how-it-works__step-index">{i + 1}</span>
                <span className="how-it-works__step-icon">
                  <span className="material-symbols-outlined">{step.icon}</span>
                </span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="how-it-works__cta">
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
              Chat on WhatsApp
            </a>
            <span className="how-it-works__number">+91 99870 08585</span>
          </div>
        </div>
      </div>
    </section>
  )
}
