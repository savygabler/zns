// Store-wide settings: contact email, currency and shipping.
// Change these values and every page and the checkout follow.

export const CONTACT_EMAIL = "wilsonsilas567@gmail.com";

// Prices in lib/catalog.js are in this currency. Stripe can show customers
// their local currency at checkout (Adaptive Pricing), but you're paid in this one.
export const CURRENCY = "aud";
export const money = (n) => `A$${n}`;

// Where we ship, what it costs, and when it's free. Amounts are in A$.
export const SHIPPING = [
  { code: "AU", name: "Australia", rate: 10, freeOver: 150, days: [2, 7] },
  { code: "NZ", name: "New Zealand", rate: 20, freeOver: 250, days: [5, 10] },
  { code: "US", name: "United States", rate: 30, freeOver: 300, days: [7, 15] },
  { code: "CA", name: "Canada", rate: 30, freeOver: 300, days: [7, 15] },
  { code: "GB", name: "United Kingdom", rate: 30, freeOver: 300, days: [7, 15] },
];

export const shippingFor = (code) => SHIPPING.find((s) => s.code === code);
export const shippingCost = (zone, subtotal) => (subtotal >= zone.freeOver ? 0 : zone.rate);

export const RETURN_DAYS = 14;
