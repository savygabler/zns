"use client";

import Link from "next/link";
import { money } from "@/lib/site";
import ProductImage from "./ProductImage";
import { useSite } from "./SiteProvider";

export default function ProductCard({ product, index }) {
  const { add, toast } = useSite();
  const one = product.sizes.length === 1;
  return (
    <div className="card" style={{ animationDelay: `${index * 50}ms` }}>
      <Link href={`/products/${product.id}`} className="cardlink">
        <ProductImage product={product} />
        <h3>{product.name}</h3>
        <p>{money(product.price)}</p>
      </Link>
      {one ? (
        <button className="add" onClick={() => { add(product.id, product.sizes[0]); toast(`Added ${product.name}`); }}>
          Add to cart
        </button>
      ) : (
        <Link className="add" href={`/products/${product.id}`}>Choose size</Link>
      )}
    </div>
  );
}
