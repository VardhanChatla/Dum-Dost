import type { AddOn, Dish } from "../data/dishes";
import { dishPrice, parseLineItemKey, portionLabel } from "../order/lineItem";

const WHATSAPP_NUMBER = "919987008585";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function greetingMessage(): string {
  return `Hi Dum Dost! I'd like to place a biryani order. Could you share today's availability & delivery details?`;
}

export function dishMessage(dishName: string): string {
  return `Hi Dum Dost! I'd like to order the *${dishName}*. Could you share the price & delivery details?`;
}

export function orderSummaryMessage(
  dishes: Dish[],
  quantities: Record<string, number>,
  addOns: AddOn[] = [],
  addOnQuantities: Record<string, number> = {},
  deliveryTimeLabel = "",
  deliveryFee = 0,
  freebiesList: AddOn[] = [],
  freebieQuantities: Record<string, number> = {},
): string {
  const dishLines: string[] = [];
  let dishTotal = 0;

  for (const [key, qty] of Object.entries(quantities)) {
    if (qty <= 0) continue;
    const { dishId, portion } = parseLineItemKey(key);
    const dish = dishes.find((d) => d.id === dishId);
    if (!dish) continue;

    const unitPrice = dishPrice(dish, portion);
    const lineTotal = unitPrice * qty;
    dishTotal += lineTotal;
    dishLines.push(
      `• ${dish.name} (${portionLabel(portion)}) x${qty} — ₹${lineTotal}`,
    );
  }

  const addOnLines: string[] = [];
  let addOnTotal = 0;

  for (const [addOnId, qty] of Object.entries(addOnQuantities)) {
    if (qty <= 0) continue;
    const addOn = addOns.find((a) => a.id === addOnId);
    if (!addOn) continue;

    const lineTotal = addOn.price * qty;
    addOnTotal += lineTotal;
    addOnLines.push(`• ${addOn["wp-name"]} x${qty} — ₹${lineTotal}`);
  }

  const freebieLines: string[] = [];

  for (const [freebieId, qty] of Object.entries(freebieQuantities)) {
    if (qty <= 0) continue;
    const freebie = freebiesList.find((f) => f.id === freebieId);
    if (!freebie) continue;

    freebieLines.push(`• ${freebie["wp-name"]} x${qty} — FREE`);
  }

  const sections = [`Hi Dum Dost! I'd like to place this order:`, ``];

  if (deliveryTimeLabel) {
    sections.push(`*Delivery time :* ${deliveryTimeLabel}`, ``);
  }

  if (dishLines.length > 0) {
    sections.push(
      `*Dishes :*`,
      ...dishLines,
      `—————————————————————`,
      `*Dishes total: ₹${dishTotal}*`,
      ``,
    );
  }

  if (addOnLines.length > 0) {
    sections.push(
      `*Add-ons :*`,
      ...addOnLines,
      `—————————————————————`,
      `*Add-ons total: ₹${addOnTotal}*`,
      ``,
    );
  }

  if (freebieLines.length > 0) {
    sections.push(
      `*Freebies (on the house!) :*`,
      ...freebieLines,
      `—————————————————————`,
      `Free 200ml Coke included with your order — enjoy!`,
      ``,
    );
  }

  if (dishLines.length > 0 || addOnLines.length > 0) {
    sections.push(
      `*Delivery Fee:* ${deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}`,
      ``,
    );
  }

  sections.push(
    `==========================`,
    `*Overall total: ₹${dishTotal + addOnTotal + deliveryFee}*`,
    `==========================`,
    ` `,
    deliveryTimeLabel
      ? `Could you please confirm this delivery time works?`
      : `Could you confirm availability & delivery details?`,
  );

  return sections.join("\n");
}

export function partyOrderMessage(): string {
  return `Hi Dum Dost! I'm planning a get-together and want to ask about bulk/party biryani orders. Could you share options & pricing?`;
}
