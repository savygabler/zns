"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { currentMember } from "@/lib/members";
import { useSite } from "./SiteProvider";

export default function ProductActions({ product }) {
  const { add, toast, setDrawer } = useSite();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [member, setMember] = useState(null);
  useEffect(() => setMember(currentMember()), []);

  if (product.members && !member)
    return (
      <p>
        Members only. <Link className="lk" href="/exclusive">Enter the Exclusive page</Link> to buy this piece.
      </p>
    );

  return (
    <>
      {product.sizes.length > 1 && (
        <>
          <p className="lbl">Size</p>
          <div className="pills">
            {product.sizes.map((s) => (
              <button key={s} className={size === s ? "on" : ""} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
        </>
      )}
      <p className="lbl">Quantity</p>
      <div className="qty big">
        <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer">−</button>
        <span>{qty}</span>
        <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="More">+</button>
      </div>
      <button
        className="co wide"
        onClick={() => {
          if (!size) return toast("Choose a size first");
          add(product.id, size, qty);
          toast(`Added ${product.name}`);
          setDrawer(true);
        }}
      >
        Add to cart
      </button>
    </>
  );
}
