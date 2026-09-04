import type { Dish } from "../data/dishes";
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
): string {
  const lines: string[] = [];
  let total = 0;

  for (const [key, qty] of Object.entries(quantities)) {
    if (qty <= 0) continue;
    const { dishId, portion } = parseLineItemKey(key);
    const dish = dishes.find((d) => d.id === dishId);
    if (!dish) continue;

    const unitPrice = dishPrice(dish, portion);
    const lineTotal = unitPrice * qty;
    total += lineTotal;
    lines.push(
      `• ${dish.name} (${portionLabel(portion)}) x${qty} — ₹${lineTotal}`,
    );
  }

  return [
    `Hi Dum Dost! I'd like to place this order:`,
    ...lines,
    ``,
    `Estimated total: ₹${total}`,
    `Could you confirm availability & delivery details?`,
  ].join("\n");
}

export function partyOrderMessage(): string {
  return `Hi Dum Dost! I'm planning a get-together and want to ask about bulk/party biryani orders. Could you share options & pricing?`;
}
