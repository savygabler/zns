import Stripe from "stripe";
import { getProduct } from "@/lib/catalog";

// Creates a Stripe Checkout page for the cart. Prices always come from the catalog,
// never from the browser, so nobody can change what they pay.
export async function POST(request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json({ error: "Checkout isn’t connected yet: add STRIPE_SECRET_KEY" }, { status: 503 });
  }

  const { items } = await request.json().catch(() => ({}));
  const lines = (Array.isArray(items) ? items : [])
    .map((i) => ({ p: getProduct(i?.id), size: i?.size, qty: Math.floor(Number(i?.qty)) }))
    .filter((l) => l.p && l.p.sizes.includes(l.size) && l.qty >= 1 && l.qty <= 10);
  if (!lines.length) return Response.json({ error: "Your cart is empty" }, { status: 400 });

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lines.map((l) => ({
        quantity: l.qty,
        price_data: {
          currency: "usd",
          unit_amount: l.p.price * 100,
          product_data: { name: l.size === "One size" ? l.p.name : `${l.p.name} (${l.size})` },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });
    return Response.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Checkout failed, please try again" }, { status: 500 });
  }
}
