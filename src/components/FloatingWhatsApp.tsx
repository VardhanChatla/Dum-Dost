import { buildWhatsAppLink, greetingMessage } from '../lib/whatsapp'

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={buildWhatsAppLink(greetingMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
    >
      <span className="floating-whatsapp__pulse" aria-hidden="true" />
      <svg viewBox="0 0 32 32" aria-hidden="true" className="floating-whatsapp__icon">
        <path
          fill="currentColor"
          d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.2.6 4.28 1.65 6.06L3 29l8.16-2.6a11.9 11.9 0 0 0 4.86 1.02h.01c6.62 0 12-5.38 12-12s-5.38-12.01-12-12.01Zm0 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.63 1.16 1.19-3.54-.24-.37A9.77 9.77 0 0 1 6.22 15c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8Zm5.36-7.34c-.29-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.15-.17.2-.34.22-.63.08-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.4-.07-.13-.26-.2-.55-.35Z"
        />
      </svg>
    </a>
  )
}
