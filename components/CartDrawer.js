"use client";

import { useState } from "react";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { useSite } from "./SiteProvider";

export default function CartDrawer() {
  const { cart, setQty, drawer, setDrawer, toast } = useSite();
  const [busy, setBusy] = useState(false);
  const lines = cart.map((i) => ({ ...i, p: getProduct(i.id) })).filter((l) => l.p);
  const sum = lines.reduce((a, l) => a + l.p.price * l.qty, 0);

  async function checkout() {
    if (!lines.length) return toast("Your cart is empty");
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
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
                <small>{l.size} · ${l.p.price}</small>
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
      <div className="tot">
        <span>Subtotal</span>
        <span>${sum}</span>
      </div>
      <button className="co" onClick={checkout} disabled={busy}>{busy ? "Opening checkout…" : "Checkout"}</button>
    </aside>
  );
}
