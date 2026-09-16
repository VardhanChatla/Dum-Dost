import dumBiryaniImg from "../assets/dum-biryani.jpg";
import seekhBiryaniImg from "../assets/seekh-biryani.png";
import tikkaBiryaniImg from "../assets/tikka-biryani.jpg";

export type Portion = "half" | "full";

export interface Dish {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceHalf: number;
  priceFull: number;
  /** Pre-discount price, shown struck through next to the current price. Omit if the dish isn't on offer. */
  originalPriceHalf?: number;
  originalPriceFull?: number;
  spiceLevel: 1 | 2 | 3;
  image: string;
}

export const dishes: Dish[] = [
  {
    id: "dum-biryani",
    name: "Chicken Dum Biryani",
    tagline: "Hyderabadi Dum",
    description:
      "Fragrant basmati layered with tender meat & whole spices, sealed and slow-cooked on dum for that unmistakable smoky aroma.",
    priceHalf: 179,
    priceFull: 299,
    originalPriceHalf: 199,
    originalPriceFull: 329,
    spiceLevel: 2,
    image: dumBiryaniImg,
  },
  {
    id: "seekh-biryani",
    name: "Chicken Malai Seekh Biryani",
    tagline: "Sigri Seekh",
    description:
      "Juicy minced-meat seekh kebabs, charcoal-grilled and folded into saffron rice with a bold, smoky finish.",
    priceHalf: 199,
    priceFull: 329,
    originalPriceHalf: 219,
    originalPriceFull: 349,
    spiceLevel: 3,
    image: seekhBiryaniImg,
  },
  {
    id: "tikka-biryani",
    name: "Chicken Tikka Biryani",
    tagline: "Tandoori Tikka",
    description:
      "Tandoor-charred tikka pieces, marinated overnight and tossed through masala rice for a punch in every bite.",
    priceHalf: 199,
    priceFull: 329,
    originalPriceHalf: 219,
    originalPriceFull: 349,
    spiceLevel: 2,
    image: tikkaBiryaniImg,
  },
];

export interface AddOn {
  id: string;
  name: string;
  "wp-name": string;
  description: string;
  price: number;
}

export const addOns: AddOn[] = [
  {
    id: "extra-raita",
    name: "Extra Raita",
    "wp-name": "Extra Raita",
    description: "1 portion",
    price: 30,
  },
  {
    id: "extra-chicken-tikka-3pc",
    name: "Extra Chicken Tikka",
    "wp-name": "Extra Chicken Tikka(3 pieces)",
    description: "3 pieces — ₹50",
    price: 50,
  },
  {
    id: "extra-chicken-tikka-6pc",
    name: "Extra Chicken Tikka",
    "wp-name": "Extra Chicken Tikka(6 pieces)",
    description: "6 pieces — ₹90",
    price: 90,
  },
  {
    id: "extra-chicken-seekh-2pc",
    name: "Extra Chicken Seekh",
    "wp-name": "Extra Chicken Seekh(2 pieces)",
    description: "2 pieces — ₹50",
    price: 50,
  },
  {
    id: "extra-chicken-seekh-5pc",
    name: "Extra Chicken Seekh",
    "wp-name": "Extra Chicken Seekh(5 pieces)",
    description: "5 pieces — ₹125",
    price: 125,
  },
  {
    id: "coke-200ml",
    name: "Coke 200ml",
    "wp-name": "Coke 200ml",
    description: "Chilled — ₹20",
    price: 20,
  },
];

/** Id of the freebie auto-added to every order while `FREEBIES_ENABLED` (see `src/lib/freebieConfig.ts`) is on. */
export const FREE_COKE_ID = "free-coke-200ml";

/**
 * Freebies category: items automatically included with an order at no charge
 * (currently just the limited-time free Coke) rather than something the
 * customer adds themselves like an add-on.
 */
export const freebies: AddOn[] = [
  {
    id: FREE_COKE_ID,
    name: "Coke 200ml",
    "wp-name": "Coke 200ml (Free)",
    description: "On the house for a limited time!",
    price: 0,
  },
];
