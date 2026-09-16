/**
 * Master switch for the limited-time "free Coke on every order" promo.
 * Flip to `false` to turn it off everywhere in one place — the Navbar
 * announcement line, the freebie auto-added to the cart (OrderContext,
 * OrderBar, OrderSummaryModal), and the WhatsApp order message — without
 * touching any of those files.
 */
export const FREEBIES_ENABLED = true;
