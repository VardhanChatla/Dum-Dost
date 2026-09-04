import combinedImg from '../assets/combined-hero.jpg'
import BiryaniParticles from './BiryaniParticles'
import { buildWhatsAppLink, greetingMessage } from '../lib/whatsapp'
import { useRipple } from '../hooks/useRipple'

const trustItems = [
  { icon: 'skillet', title: 'Cooked Fresh, Per Order', text: 'No freezing, no reheating — every pot is made after you message us.' },
  { icon: 'package_2', title: 'Sealed & Spill-Proof', text: 'Packed hot, straight from the pot into leak-proof containers.' },
  { icon: 'eco', title: 'Honest Ingredients', text: 'Real basmati, real spices, no artificial colours or shortcuts.' },
  { icon: 'chat', title: 'One WhatsApp Away', text: 'No app, no signup — just message us and we take it from there.' },
]

export default function Hero() {
  const onRipple = useRipple()

  return (
    <section id="top" className="hero">
      <div className="hero__banner">
        <img
          src={combinedImg}
          alt="Dum Dost — Dum Biryani, Seekh Biryani and Tikka Biryani served in copper handi bowls with raita, onions and lemon"
          className="hero__banner-image"
        />
      </div>

      <div className="hero__content-wrap">
        <BiryaniParticles />

        <div className="hero__content">
          <span className="hero__badge">
            <span className="material-symbols-outlined" aria-hidden="true">
              local_fire_department
            </span>
            Slow-cooked. Fast friendship.
          </span>

          <h1 className="hero__title">
            Real <span className="hero__title-accent">Dum Biryani</span>,
            made by 3 friends who mean it.
          </h1>

          <p className="hero__subtitle">
            No shortcuts, no fuss — just fragrant basmati, honest spices and
            slow-cooked flavour, sealed the traditional way and delivered
            straight to your door.
          </p>

          <div className="hero__actions">
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
              Order on WhatsApp
            </a>
            <a className="btn btn--ghost btn--large ripple-btn" href="#menu" onClick={onRipple}>
              View Menu
            </a>
          </div>
        </div>

        <div className="hero__trust">
          {trustItems.map((item) => (
            <div className="hero__trust-item" key={item.title}>
              <span className="material-symbols-outlined" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
