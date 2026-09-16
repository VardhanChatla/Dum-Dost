export const DELIVERY_FEE = 50;
export const FREE_DELIVERY_THRESHOLD = 299;

/** ₹50 delivery fee on orders under ₹299; free delivery at ₹299 or more. */
export function getDeliveryFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}
