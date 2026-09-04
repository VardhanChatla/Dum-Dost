import { useEffect, useState } from 'react'
import { buildWhatsAppLink, greetingMessage } from '../lib/whatsapp'
import { useOrder } from '../order/useOrder'
import { useRipple } from '../hooks/useRipple'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#quality', label: 'Our Quality' },
  { href: '#how-it-works', label: 'How to Order' },
  { href: '#about', label: 'Our Story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { totalCount, openSummary } = useOrder()
  const onRipple = useRipple()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="announcement-bar">
        <span className="material-symbols-outlined" aria-hidden="true">
          local_fire_department
        </span>
        Fresh dum biryani, cooked to order &mdash; order a day ahead on WhatsApp
      </div>

      <div className="navbar__inner">
        <a href="#top" className="navbar__brand">
          <span className="navbar__logo" aria-hidden="true">
            <span className="material-symbols-outlined">ramen_dining</span>
          </span>
          <span className="navbar__brand-text">
            <span className="navbar__brand-name">Dum Dost</span>
            <span className="navbar__brand-sub">Slow-cooked. Fast friendship.</span>
          </span>
        </a>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className="btn btn--primary btn--small ripple-btn"
            href={buildWhatsAppLink(greetingMessage())}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              onRipple(e)
              setOpen(false)
            }}
          >
            Order on WhatsApp
          </a>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />

          <button
            type="button"
            className="navbar__cart"
            onClick={openSummary}
            aria-label={`${totalCount} items in your order`}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {totalCount > 0 && <span className="navbar__cart-badge">{totalCount}</span>}
          </button>

          <button
            className="navbar__toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
