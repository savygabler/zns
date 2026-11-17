"use client";

import { useState } from "react";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { SHIPPING, money, shippingCost, shippingFor } from "@/lib/site";
import { useSite } from "./SiteProvider";

export default function CartDrawer() {
  const { cart, setQty, drawer, setDrawer, toast } = useSite();
  const [busy, setBusy] = useState(false);
  const [country, setCountry] = useState(SHIPPING[0].code);
  const lines = cart.map((i) => ({ ...i, p: getProduct(i.id) })).filter((l) => l.p);
  const sum = lines.reduce((a, l) => a + l.p.price * l.qty, 0);
  const zone = shippingFor(country);
  const ship = lines.length ? shippingCost(zone, sum) : 0;
  const toFree = zone.freeOver - sum;

  async function checkout() {
    if (!lines.length) return toast("Your cart is empty");
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, country }),
      });
      const data = await res.json();
      if (data.url) return (window.location.href = data.url);
      toast(data.error || "Checkout failed, please try again");
    } catch {
      toast("Checkout failed, please try again");
    }
    setBusy(false);
  }

  return (
    <aside id="drawer" className={drawer ? "open" : ""}>
      <h2>
        YOUR CART <button onClick={() => setDrawer(false)} aria-label="Close">×</button>
      </h2>
      <div id="items">
        {lines.length ? (
          lines.map((l, i) => (
            <div className="it" key={l.id + l.size}>
              <div>
                <Link href={`/products/${l.p.id}`} onClick={() => setDrawer(false)}>{l.p.name}</Link>
                <small>{l.size} · {money(l.p.price)}</small>
                <div className="qty">
                  <button onClick={() => setQty(i, l.qty - 1)} aria-label="Remove one">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(i, l.qty + 1)} aria-label="Add one">+</button>
                </div>
              </div>
              <button onClick={() => setQty(i, 0)} aria-label="Remove">✕</button>
            </div>
          ))
        ) : (
          <p style={{ color: "#9a9a9a" }}>Your cart is empty.</p>
        )}
      </div>
      <label className="shipto">
        <span>Ship to</span>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {SHIPPING.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </label>
      <div className="row"><span>Subtotal</span><span>{money(sum)}</span></div>
      <div className="row"><span>Shipping</span><span>{ship ? money(ship) : "Free"}</span></div>
      {lines.length > 0 && toFree > 0 && <p className="hint2">Spend {money(toFree)} more for free shipping</p>}
      <div className="tot">
        <span>Total</span>
        <span>{money(sum + ship)}</span>
      </div>
      <button className="co" onClick={checkout} disabled={busy}>{busy ? "Opening checkout…" : "Checkout"}</button>
    </aside>
  );
}
