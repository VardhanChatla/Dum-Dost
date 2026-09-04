import { useReveal } from '../hooks/useReveal'

const values = [
  {
    icon: 'soup_kitchen',
    title: 'Cooked on Dum',
    text: 'Every batch is sealed and slow-cooked the traditional way — no rushing the flavour.',
  },
  {
    icon: 'grain',
    title: 'Honest Ingredients',
    text: 'Fresh basmati, real spices, no artificial colours or shortcuts. What you taste is what we cook.',
  },
  {
    icon: 'diversity_3',
    title: 'Made with Dosti',
    text: 'Three friends, one kitchen, zero corporate nonsense — just good food, cooked with care.',
  },
]

export default function About() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="about">
      <div ref={ref} className="section-heading reveal">
        <span className="section-heading__eyebrow">Our Story</span>
        <h2>Three friends. One obsession with biryani.</h2>
        <p>
          Dum Dost started as a weekend experiment between three college
          friends who couldn't stop chasing the perfect pot of biryani. Turns
          out, everyone else couldn't stop either — so here we are.
        </p>
      </div>

      <div className="about__values">
        {values.map((value, i) => (
          <div key={value.title} className="value-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="value-card__icon" aria-hidden="true">
              <span className="material-symbols-outlined">{value.icon}</span>
            </span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
