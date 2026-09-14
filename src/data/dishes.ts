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
  description: string;
  price: number;
}

export const addOns: AddOn[] = [
  {
    id: "extra-raita",
    name: "Extra Raita",
    description: "1 portion",
    price: 30,
  },
  {
    id: "extra-chicken-tikka-3pc",
    name: "Extra Chicken Tikka",
    description: "3 pieces — ₹50",
    price: 50,
  },
  {
    id: "extra-chicken-tikka-6pc",
    name: "Extra Chicken Tikka",
    description: "6 pieces — ₹90",
    price: 90,
  },
  {
    id: "extra-chicken-seekh-2pc",
    name: "Extra Chicken Seekh",
    description: "2 pieces — ₹50",
    price: 50,
  },
  {
    id: "extra-chicken-seekh-5pc",
    name: "Extra Chicken Seekh",
    description: "5 pieces — ₹125",
    price: 125,
  },
];
