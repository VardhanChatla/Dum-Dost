import dumBiryaniImg from '../assets/dum-biryani.jpg'
import seekhBiryaniImg from '../assets/seekh-biryani.jpg'
import tikkaBiryaniImg from '../assets/tikka-biryani.jpg'

export type Portion = 'half' | 'full'

export interface Dish {
  id: string
  name: string
  tagline: string
  description: string
  priceHalf: number
  priceFull: number
  spiceLevel: 1 | 2 | 3
  image: string
}

export const dishes: Dish[] = [
  {
    id: 'dum-biryani',
    name: 'Dum Biryani',
    tagline: 'Hyderabadi Dum',
    description:
      'Fragrant basmati layered with tender meat & whole spices, sealed and slow-cooked on dum for that unmistakable smoky aroma.',
    priceHalf: 120,
    priceFull: 200,
    spiceLevel: 2,
    image: dumBiryaniImg,
  },
  {
    id: 'seekh-biryani',
    name: 'Seekh Biryani',
    tagline: 'Sigri Seekh',
    description:
      'Juicy minced-meat seekh kebabs, charcoal-grilled and folded into saffron rice with a bold, smoky finish.',
    priceHalf: 170,
    priceFull: 280,
    spiceLevel: 3,
    image: seekhBiryaniImg,
  },
  {
    id: 'tikka-biryani',
    name: 'Tikka Biryani',
    tagline: 'Tandoori Tikka',
    description:
      'Tandoor-charred tikka pieces, marinated overnight and tossed through masala rice for a punch in every bite.',
    priceHalf: 140,
    priceFull: 250,
    spiceLevel: 2,
    image: tikkaBiryaniImg,
  },
]
