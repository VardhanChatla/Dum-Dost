import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    number: '01',
    icon: 'schedule',
    title: 'Cooked Only When You Order',
    text: 'No standing stock, no reheated batches. We start cooking once your WhatsApp order is confirmed.',
  },
  {
    number: '02',
    icon: 'blender',
    title: 'Hand-Ground Spices',
    text: 'Whole spices roasted and blended fresh — no ready-made masala packets or artificial colour.',
  },
  {
    number: '03',
    icon: 'package_2',
    title: 'Sealed Hot & Spill-Proof',
    text: 'Packed straight from the pot into leak-proof containers so it reaches you as hot as it left the kitchen.',
  },
  {
    number: '04',
    icon: 'diversity_3',
    title: 'Run by 3 Friends, Personally',
    text: 'No call centre, no franchise — you\'re chatting directly with the people who cook your food.',
  },
]

export default function QualityPromise() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="quality" className="quality">
      <div ref={ref} className="section-heading reveal">
        <span className="section-heading__eyebrow">Pure Taste, Zero Compromise</span>
        <h2>Why Dum Dost hits different</h2>
        <p>
          We're not a restaurant chain — we're three friends who got serious
          about one dish. Here's how we keep it honest.
        </p>
      </div>

      <div className="quality__grid">
        {steps.map((step, i) => (
          <QualityCard key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}

function QualityCard({
  step,
  index,
}: {
  step: (typeof steps)[number]
  index: number
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="quality-card reveal" style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="quality-card__top">
        <span className="quality-card__number">{step.number}</span>
        <span className="quality-card__icon">
          <span className="material-symbols-outlined">{step.icon}</span>
        </span>
      </div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </div>
  )
}
