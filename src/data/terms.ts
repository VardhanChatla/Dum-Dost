export interface TermItem {
  icon: string;
  title: string;
  /** May contain **bold** segments, rendered as <strong> by the Terms component. */
  text: string;
}

export const terms: TermItem[] = [
  {
    icon: "chat",
    title: "Order Confirmation",
    text: "All orders are considered confirmed only after receiving confirmation from the Dum Dost team via WhatsApp.",
  },
  {
    icon: "local_fire_department",
    title: "Freshly Prepared",
    text: "All biryani orders are prepared fresh. Preparation and cooking times may vary depending on the number of orders and kitchen workload.",
  },
  {
    icon: "event_busy",
    title: "Order Changes & Cancellation",
    text: "Any changes or cancellation requests should be communicated as early as possible. Cancellations are generally accepted only up to **8 hours before the selected delivery time**. Once preparation has started, cancellation or modification of the order may not be possible.",
  },
  {
    icon: "delivery_dining",
    title: "Delivery",
    text: "Delivery times are approximate and may vary due to traffic, weather conditions, order volume, or other unforeseen circumstances. We appreciate your patience in case of unexpected delays.",
  },
  {
    icon: "payments",
    title: "Delivery Charges",
    text: "A ₹50 delivery fee will be applicable on orders with a total value of less than ₹299. Orders of ₹299 or more will be eligible for free delivery.",
  },
  {
    icon: "support_agent",
    title: "Food Quality Concerns",
    text: "If you experience any issue with your order, please contact the Dum Dost team as soon as possible with your order details. We will make every reasonable effort to understand and resolve the concern.",
  },
  {
    icon: "sell",
    title: "Menu & Pricing",
    text: "Menu items, prices, and availability are subject to change without prior notice. Certain items may occasionally be unavailable depending on ingredient availability.",
  },
  {
    icon: "inventory_2",
    title: "Order Availability",
    text: "All orders are subject to ingredient availability and our daily preparation capacity. Dum Dost reserves the right to temporarily stop accepting orders once our daily capacity has been reached.",
  },
  {
    icon: "task_alt",
    title: "Acceptance of Terms",
    text: "By placing an order with Dum Dost, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.",
  },
];
