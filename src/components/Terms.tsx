import { useReveal } from '../hooks/useReveal'
import { terms } from '../data/terms'

function renderWithBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**') ? (
      <strong key={i}>{chunk.slice(2, -2)}</strong>
    ) : (
      chunk
    ),
  )
}

export default function Terms() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="terms" className="terms">
      <div ref={ref} className="section-heading reveal">
        <span className="section-heading__eyebrow">Please Read Before Ordering</span>
        <h2>Terms &amp; Conditions</h2>
        <p>The essentials that keep every order smooth &mdash; for you and for us.</p>
      </div>

      <ol className="terms__list">
        {terms.map((term, i) => (
          <TermRow key={term.title} term={term} index={i} />
        ))}
      </ol>
    </section>
  )
}

function TermRow({
  term,
  index,
}: {
  term: (typeof terms)[number]
  index: number
}) {
  const ref = useReveal<HTMLLIElement>()

  return (
    <li ref={ref} className="terms-item reveal" style={{ transitionDelay: `${index * 60}ms` }}>
      <span className="terms-item__icon" aria-hidden="true">
        <span className="material-symbols-outlined">{term.icon}</span>
      </span>
      <div className="terms-item__body">
        <h3>
          <span className="terms-item__number">{String(index + 1).padStart(2, '0')}</span>
          {term.title}
        </h3>
        <p>{renderWithBold(term.text)}</p>
      </div>
    </li>
  )
}
