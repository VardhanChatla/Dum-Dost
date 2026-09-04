import logo from '../assets/dum-dost-logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="Dum Dost" className="footer__logo" />
          Dum Dost
        </div>
        <p>Slow-cooked biryani, made by 3 friends. Order via WhatsApp.</p>

        <p className="footer__copy">
          © {new Date().getFullYear()} Dum Dost. Made with dosti &amp; dum.
        </p>
      </div>
    </footer>
  )
}
